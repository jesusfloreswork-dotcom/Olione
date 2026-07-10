# OLI One — Landing

Landing oficial de OLI One, empresa madre de OLI Academy. Next.js 14 (App
Router), JavaScript, CSS-in-JS, Supabase para leads.

## Instalación local

```bash
npm install
cp .env.example .env.local
# completa SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env.local
npm run dev
```

Abre http://localhost:3000

## Crear la tabla en Supabase

Este proyecto usa el **mismo proyecto de Supabase que OLI Academy**, con una
tabla independiente para no mezclar leads.

1. Entra al proyecto de Supabase en https://supabase.com/dashboard
2. Ve a **SQL Editor** → **New query**
3. Pega y ejecuta el contenido de [`supabase/migration.sql`](./supabase/migration.sql)
4. Verifica en **Table Editor** que se creó `oli_one_leads` con RLS activado

## Variables de entorno

Copia `.env.example` a `.env.local` y llena:

- `SUPABASE_URL` — la misma URL de proyecto que usa OLI Academy
- `SUPABASE_SERVICE_ROLE_KEY` — Settings → API → `service_role` (secreta, solo
  se usa en el servidor, nunca se expone al cliente)
- `NEXT_PUBLIC_SITE_URL` — dominio del sitio (usa `https://olione.vercel.app`
  hasta que se defina el dominio final)

## Conectar GitHub con Vercel

1. Sube este proyecto al repo `jesusfloreswork-dotcom/Olione` (ver comandos abajo)
2. En Vercel: **Add New… → Project → Import Git Repository**
3. Selecciona `Olione`
4. En **Environment Variables**, agrega las mismas variables de `.env.example`
5. Deploy

### Subir el proyecto por primera vez

```bash
git init
git remote add origin https://github.com/jesusfloreswork-dotcom/Olione.git
git add .
git commit -m "Landing inicial de OLI One"
git branch -M main
git push -u origin main
```

## Checklist de lanzamiento

- [ ] Tabla `oli_one_leads` creada y con RLS verificado en Supabase
- [ ] Variables de entorno configuradas en Vercel (Production y Preview)
- [ ] `npm run build` corre sin errores
- [ ] `npm run lint` sin errores
- [ ] Probar el formulario de diagnóstico de punta a punta (envío real, ver el
      lead en Supabase)
- [ ] Confirmar que el honeypot no bloquea envíos reales
- [ ] Revisar `NEXT_PUBLIC_SITE_URL` con el dominio final antes de publicar
- [ ] Reemplazar los recursos visuales pendientes (ver abajo)
- [ ] Revisar copys de Indicadores con datos reales del negocio cuando existan
- [ ] Verificar navegación por teclado y contraste en modo claro/oscuro
- [ ] Actualizar `Aviso de privacidad` y `Términos` (rutas `/aviso-de-privacidad`
      y `/terminos` aún no existen — ver pendientes)

## Recursos visuales pendientes

El hero usa un diagrama SVG generado en código (no foto) para evitar clichés
de IA genéricos. Nada bloquea el lanzamiento por falta de fotografía, pero
quedan pendientes para una siguiente iteración:

1. **Fotografía profesional del equipo/oficina** para reforzar "consultora
   tecnológica" en secciones donde hoy solo hay texto (por ejemplo, arriba de
   Propuesta de valor).
2. **Logo real de OLI One** — actualmente el header usa el nombre en texto
   (`Space Grotesk`, sin isotipo). Si existe un logo, reemplazar en
   `app/page.js`, componente del header.
3. **Páginas legales** `/aviso-de-privacidad` y `/terminos` — el footer ya
   enlaza a esas rutas pero no existen todavía; hay que crearlas o quitar el
   enlace mientras tanto.
4. **Indicadores con datos reales** — la sección de Indicadores lista
   categorías medibles sin inventar cifras, tal como se pidió. Cuando haya
   casos reales, se pueden agregar números concretos.

## Decisiones técnicas y de diseño (registro)

- **Stack**: JS (no TypeScript), un archivo por ruta, CSS-in-JS embebido
  directo en el JSX (no vía `useEffect`) para evitar FOUC — misma convención
  que OLI Academy.
- **Validación**: manual en `lib/validation.js`, compartida entre cliente y
  servidor. No se usó Zod para mantener el proyecto 100% JS sin dependencias
  adicionales de validación.
- **Supabase**: mismo proyecto que OLI Academy, tabla nueva `oli_one_leads`
  con RLS. Los inserts solo pasan por `/app/api/lead/route.js` usando la
  `service_role` key; no hay policy de insert para el rol `anon`.
- **Hero**: diagrama SVG en vez de fotografía o ilustración genérica de IA,
  para reforzar visualmente "sistema conectado" sin caer en clichés (robots,
  cerebros, manos holográficas).
- **Método SISTEMA®**: las 7 letras funcionan como acordeón interactivo — es
  el "signature element" de la página, ya que el orden de las letras es
  información real del proceso, no decoración.
- **Dominio**: se usa `olione.vercel.app` como referencia en metadata/OG
  mientras no se compre el dominio final; está centralizado en
  `NEXT_PUBLIC_SITE_URL` para cambiarlo en un solo lugar.
