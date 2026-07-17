import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase-server';
import { validateLead, LEAD_FIELD_MAP } from '@/lib/validation';

// Rate limit persistente en Supabase (no en memoria): funciona de forma
// confiable en un entorno serverless como Vercel, donde cada invocación
// puede correr en una instancia nueva sin memoria compartida.
const SHORT_WINDOW_SECONDS = 30; // no más de 1 envío cada 30s por IP
const DAILY_LIMIT = 8; // no más de 8 envíos por IP en 24h

async function checkRateLimit(supabase, ip) {
  const now = Date.now();
  const shortCutoff = new Date(now - SHORT_WINDOW_SECONDS * 1000).toISOString();
  const dailyCutoff = new Date(now - 24 * 60 * 60 * 1000).toISOString();

  const { data: recent, error: recentError } = await supabase
    .from('oli_one_rate_limits')
    .select('id, created_at')
    .eq('ip', ip)
    .gte('created_at', dailyCutoff)
    .order('created_at', { ascending: false });

  // Si la consulta falla, no bloqueamos el envío por eso — el honeypot
  // y la validación siguen siendo la base de la defensa.
  if (recentError) return { limited: false };

  if (recent && recent.length >= DAILY_LIMIT) {
    return { limited: true, reason: 'daily' };
  }
  if (recent && recent[0] && recent[0].created_at > shortCutoff) {
    return { limited: true, reason: 'short' };
  }

  return { limited: false };
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Honeypot: campo invisible que un humano nunca llena.
    if (body.website) {
      // Respondemos éxito falso para no delatar la defensa a un bot.
      return NextResponse.json({ ok: true });
    }

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      'unknown';

    const supabase = getSupabaseServerClient();

    const { limited, reason } = await checkRateLimit(supabase, ip);
    if (limited) {
      return NextResponse.json(
        {
          ok: false,
          error:
            reason === 'daily'
              ? 'Ya recibimos varias solicitudes desde aquí hoy. Si necesitas ayuda urgente, escríbenos directo.'
              : 'Ya recibimos tu solicitud, dale un momento.',
        },
        { status: 429 }
      );
    }

    const { isValid, errors } = validateLead(body);
    if (!isValid) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    const record = {};
    for (const [clientField, dbColumn] of Object.entries(LEAD_FIELD_MAP)) {
      if (body[clientField] !== undefined) record[dbColumn] = body[clientField];
    }
    record.origen = 'oli-one';

    const { error } = await supabase.from('oli_one_leads').insert(record);

    if (error) {
      console.error('Error insertando lead en Supabase:', error.message);
      return NextResponse.json(
        {
          ok: false,
          error: 'No pudimos guardar tu solicitud. Intenta de nuevo.',
        },
        { status: 500 }
      );
    }

    // Registrar el envío para el rate limit. No bloquea la respuesta
    // al usuario si esto falla — es una capa adicional, no crítica.
    supabase
      .from('oli_one_rate_limits')
      .insert({ ip })
      .then(({ error: rlError }) => {
        if (rlError) console.error('Error registrando rate limit:', rlError.message);
      });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Error procesando el formulario de diagnóstico:', err);
    return NextResponse.json(
      { ok: false, error: 'Ocurrió un error inesperado. Intenta de nuevo.' },
      { status: 500 }
    );
  }
}
