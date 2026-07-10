import { createClient } from '@supabase/supabase-js';

// Este cliente solo debe usarse dentro de API routes / server actions.
// Nunca se importa desde un componente marcado con 'use client'.
export function getSupabaseServerClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      'Faltan las variables de entorno SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.'
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
