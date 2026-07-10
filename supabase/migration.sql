-- Migración: tabla de leads para OLI One
-- Se ejecuta en el mismo proyecto de Supabase que ya usa OLI Academy,
-- como tabla independiente de `leads`.

create table if not exists public.oli_one_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  nombre text not null,
  empresa text not null,
  puesto text not null,
  correo text not null,
  telefono text not null,
  tamano_empresa text not null,
  proceso text not null,
  herramientas text,
  mensaje text,
  consentimiento boolean not null default false,

  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,

  origen text not null default 'oli-one',
  estado text not null default 'Nuevo'
);

comment on table public.oli_one_leads is
  'Leads del formulario de diagnóstico de OLI One (marca madre), separados de leads de OLI Academy.';

-- Habilita RLS: nadie puede leer/escribir directo desde el cliente,
-- solo a través del endpoint del servidor (que usa la service role key)
-- o del admin autenticado.
alter table public.oli_one_leads enable row level security;

-- El admin (usuarios autenticados de Supabase Auth) puede leer y
-- actualizar el estado del lead en el Kanban.
create policy "Admins pueden leer oli_one_leads"
  on public.oli_one_leads
  for select
  to authenticated
  using (true);

create policy "Admins pueden actualizar oli_one_leads"
  on public.oli_one_leads
  for update
  to authenticated
  using (true);

-- No se crea policy de insert para el rol anon: los inserts solo
-- llegan vía /app/api/lead/route.js usando la service role key,
-- que se salta RLS por diseño. Esto evita inserts directos desde
-- el navegador hacia Supabase.

create index if not exists oli_one_leads_created_at_idx
  on public.oli_one_leads (created_at desc);

create index if not exists oli_one_leads_estado_idx
  on public.oli_one_leads (estado);
