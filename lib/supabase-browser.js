import { createClient } from '@supabase/supabase-js';

// Este cliente usa la anon key (pública, segura de exponer) y se apoya
// en RLS para restringir el acceso: solo usuarios autenticados de
// Supabase Auth pueden leer/actualizar oli_one_leads (ver migration.sql).
export const supabaseBrowser = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
