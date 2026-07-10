import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase-server';
import { validateLead, LEAD_FIELDS } from '@/lib/validation';

// Protección básica anti-spam en memoria: limita envíos repetidos desde
// la misma IP en una ventana corta. En un entorno serverless esto se
// reinicia entre invocaciones frías, así que es una capa adicional,
// no la única defensa (el honeypot + validación son la base).
const recentSubmissions = new Map();
const WINDOW_MS = 30_000;

function isRateLimited(ip) {
  const last = recentSubmissions.get(ip);
  const now = Date.now();
  if (last && now - last < WINDOW_MS) return true;
  recentSubmissions.set(ip, now);
  // Limpieza simple para no crecer indefinidamente.
  if (recentSubmissions.size > 500) {
    const cutoff = now - WINDOW_MS;
    for (const [key, ts] of recentSubmissions) {
      if (ts < cutoff) recentSubmissions.delete(key);
    }
  }
  return false;
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

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: 'Ya recibimos tu solicitud, dale un momento.' },
        { status: 429 }
      );
    }

    const { isValid, errors } = validateLead(body);
    if (!isValid) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    const record = {};
    for (const field of LEAD_FIELDS) {
      if (body[field] !== undefined) record[field] = body[field];
    }
    record.origen = 'oli-one';

    const supabase = getSupabaseServerClient();
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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Error procesando el formulario de diagnóstico:', err);
    return NextResponse.json(
      { ok: false, error: 'Ocurrió un error inesperado. Intenta de nuevo.' },
      { status: 500 }
    );
  }
}
