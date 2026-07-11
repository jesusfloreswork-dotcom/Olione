export const metadata = {
  title: 'Términos y Condiciones — Oli',
  description: 'Términos y condiciones de uso del sitio web de Oli.',
  robots: { index: true, follow: true },
};

export default function Terminos() {
  return (
    <>
      <header className="legal-header">
        <div className="container">
          <a href="/" className="logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Oli" className="logo-img" />
          </a>
          <a href="/" className="back-link">← Volver al inicio</a>
        </div>
      </header>

      <main className="legal-main">
        <div className="container">
          <h1>Términos y Condiciones</h1>
          <p className="legal-updated">Última actualización: julio de 2026</p>

          <p>
            Estos Términos y Condiciones regulan el uso del sitio web de
            Oli (el &quot;Sitio&quot;) y de la información, formularios y contenidos
            que en él se ofrecen. Al usar este Sitio, aceptas los términos
            aquí descritos. Si no estás de acuerdo con ellos, te pedimos no
            utilizar el Sitio.
          </p>

          <h2>1. Sobre Oli</h2>
          <p>
            Oli analiza cómo funcionan las empresas y construye sistemas,
            automatizaciones y soluciones con inteligencia artificial para
            reducir trabajo repetitivo, conectar procesos y mejorar la
            operación de sus clientes. Este Sitio tiene como propósito
            presentar nuestros servicios y permitir que empresas
            interesadas soliciten un diagnóstico inicial.
          </p>

          <h2>2. Uso del Sitio</h2>
          <p>
            Te comprometes a usar este Sitio de forma lícita, sin infringir
            derechos de terceros ni intentar vulnerar su seguridad,
            funcionamiento o disponibilidad. En particular, no debes:
          </p>
          <ul>
            <li>Enviar información falsa o suplantar la identidad de otra persona o empresa a través del formulario de diagnóstico</li>
            <li>Intentar acceder sin autorización a áreas restringidas del Sitio o a los sistemas que lo soportan</li>
            <li>Utilizar el Sitio para distribuir malware, spam, o cualquier contenido dañino</li>
            <li>Extraer de forma automatizada (scraping) el contenido del Sitio sin autorización previa por escrito</li>
          </ul>

          <h2>3. Formulario de diagnóstico</h2>
          <p>
            Al completar el formulario de diagnóstico, declaras que la
            información que proporcionas es verídica y que cuentas con la
            autorización necesaria (en caso de representar a una empresa)
            para solicitar este servicio en su nombre. El envío del
            formulario no genera ninguna relación contractual entre tú y
            Oli — únicamente nos permite contactarte para agendar una
            primera conversación. Cualquier acuerdo de servicios posterior
            se formalizará por separado, por escrito.
          </p>

          <h2>4. Propiedad intelectual</h2>
          <p>
            El contenido de este Sitio — incluyendo textos, gráficos,
            logotipos, el método SISTEMA® y demás materiales — es
            propiedad de Oli o de sus licenciantes, y está protegido por
            las leyes de propiedad intelectual aplicables. No está
            permitido reproducir, distribuir o crear obras derivadas de
            este contenido sin autorización previa por escrito de Oli.
          </p>

          <h2>5. Enlaces a terceros</h2>
          <p>
            Este Sitio puede contener enlaces a sitios de terceros, como{' '}
            <a href="https://oli.academy" target="_blank" rel="noopener noreferrer">
              oli.academy
            </a>
            . No somos responsables del contenido, políticas de privacidad
            o prácticas de dichos sitios. Te recomendamos revisar los
            términos y avisos de privacidad de cualquier sitio de terceros
            que visites.
          </p>

          <h2>6. Sin garantías</h2>
          <p>
            El contenido de este Sitio se proporciona &quot;tal cual&quot; y con
            fines informativos. Aunque nos esforzamos por mantener la
            información actualizada y precisa, no garantizamos que el
            Sitio esté libre de errores o interrupciones en todo momento.
          </p>

          <h2>7. Limitación de responsabilidad</h2>
          <p>
            En la medida permitida por la ley aplicable, Oli no será
            responsable por daños indirectos, incidentales o consecuentes
            derivados del uso o la imposibilidad de uso de este Sitio.
          </p>

          <h2>8. Modificaciones</h2>
          <p>
            Podemos actualizar estos Términos y Condiciones en cualquier
            momento. Los cambios entrarán en vigor a partir de su
            publicación en esta página, con su fecha de actualización
            correspondiente.
          </p>

          <h2>9. Legislación aplicable</h2>
          <p>
            Estos Términos y Condiciones se rigen por las leyes vigentes en
            los Estados Unidos Mexicanos. Cualquier controversia
            relacionada con el uso de este Sitio se someterá a los
            tribunales competentes en México.
          </p>

          <h2>10. Contacto</h2>
          <p>
            Si tienes dudas sobre estos Términos y Condiciones, puedes
            contactarnos a través del formulario de diagnóstico de este
            Sitio o a través de{' '}
            <a href="https://oli.academy" target="_blank" rel="noopener noreferrer">
              oli.academy
            </a>
            .
          </p>
        </div>
      </main>
    </>
  );
}
