export const metadata = {
  title: 'Aviso de Privacidad — Oli',
  description: 'Aviso de privacidad de Oli, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.',
  robots: { index: true, follow: true },
};

export default function AvisoPrivacidad() {
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
          <h1>Aviso de Privacidad</h1>
          <p className="legal-updated">Última actualización: julio de 2026</p>

          <p>
            En cumplimiento con la Ley Federal de Protección de Datos
            Personales en Posesión de los Particulares (LFPDPPP) y su
            Reglamento, ponemos a tu disposición el presente Aviso de
            Privacidad, aplicable a los datos personales que recabamos a
            través de nuestro sitio web y del formulario de diagnóstico.
          </p>

          <h2>1. Responsable del tratamiento de tus datos</h2>
          <p>
            <strong>Oli</strong> (&quot;nosotros&quot;), con domicilio en México, es
            responsable del tratamiento de los datos personales que nos
            proporciones, conforme a este Aviso de Privacidad. Puedes
            contactarnos a través de{' '}
            <a href="https://oli.academy" target="_blank" rel="noopener noreferrer">
              oli.academy
            </a>{' '}
            o mediante el formulario de contacto de este sitio.
          </p>

          <h2>2. Datos personales que recabamos</h2>
          <p>
            A través del formulario de diagnóstico de este sitio recabamos
            los siguientes datos personales:
          </p>
          <ul>
            <li>Nombre completo</li>
            <li>Nombre de la empresa y puesto que ocupas</li>
            <li>Correo electrónico y teléfono</li>
            <li>Tamaño de la empresa</li>
            <li>Información sobre el proceso que deseas mejorar y las herramientas que utilizas actualmente</li>
            <li>Cualquier mensaje adicional que decidas compartirnos</li>
            <li>Parámetros de origen de tu visita (UTM), cuando estén disponibles, para entender qué campañas generan contacto con nosotros</li>
          </ul>
          <p>
            No recabamos datos personales sensibles (como origen étnico,
            estado de salud, creencias religiosas, afiliación sindical o
            política, entre otros) a través de este formulario.
          </p>

          <h2>3. Finalidades del tratamiento</h2>
          <p>Tus datos personales serán utilizados para las siguientes finalidades, necesarias para el servicio que solicitas:</p>
          <ul>
            <li>Contactarte para agendar y realizar el diagnóstico que solicitaste</li>
            <li>Evaluar si tu empresa es un buen candidato para nuestros servicios de consultoría en sistemas y automatización</li>
            <li>Dar seguimiento comercial a tu solicitud</li>
            <li>Elaborar propuestas de trabajo, en caso de que decidas avanzar con nosotros</li>
          </ul>
          <p>
            De manera adicional, y solo si lo autorizas, podríamos usar tus
            datos para enviarte información relevante sobre nuestros
            servicios, metodología o contenido educativo relacionado. Puedes
            oponerte a este uso adicional en cualquier momento, sin que esto
            afecte el servicio principal que solicitaste.
          </p>

          <h2>4. Transferencia de datos</h2>
          <p>
            Tus datos personales se almacenan de forma segura en
            infraestructura proporcionada por Supabase Inc., nuestro
            proveedor de base de datos, quien actúa como encargado del
            tratamiento bajo las instrucciones y responsabilidad de Oli. No
            vendemos, rentamos ni compartimos tus datos personales con
            terceros para fines distintos a los aquí señalados, salvo que
            exista una obligación legal que nos requiera hacerlo.
          </p>

          <h2>5. Derechos ARCO</h2>
          <p>
            Tienes derecho a acceder, rectificar y cancelar tus datos
            personales, así como a oponerte al tratamiento de los mismos o
            revocar el consentimiento que nos hayas otorgado (derechos
            ARCO). Para ejercer cualquiera de estos derechos, envía tu
            solicitud a través del formulario de contacto de{' '}
            <a href="https://oli.academy" target="_blank" rel="noopener noreferrer">
              oli.academy
            </a>
            , indicando tu nombre completo, el derecho que deseas ejercer y
            un correo electrónico para darte seguimiento. Responderemos tu
            solicitud dentro de los plazos que establece la ley.
          </p>

          <h2>6. Uso de cookies y tecnologías similares</h2>
          <p>
            Este sitio puede utilizar cookies y tecnologías similares para
            fines de medición y publicidad (por ejemplo, el Pixel de Meta),
            que nos ayudan a entender el desempeño de nuestras campañas.
            Puedes deshabilitar el uso de cookies desde la configuración de
            tu navegador, aunque esto podría afectar algunas funciones del
            sitio.
          </p>

          <h2>7. Seguridad de tus datos</h2>
          <p>
            Implementamos medidas de seguridad administrativas y técnicas
            para proteger tus datos personales contra daño, pérdida,
            alteración, destrucción o el uso, acceso o tratamiento no
            autorizado. El acceso a los datos capturados está restringido
            únicamente a personal autorizado de Oli.
          </p>

          <h2>8. Cambios a este Aviso de Privacidad</h2>
          <p>
            Nos reservamos el derecho de actualizar este Aviso de
            Privacidad en cualquier momento, para atender novedades
            legislativas, políticas internas o nuevos requerimientos para
            la prestación de nuestros servicios. Cualquier cambio será
            publicado en esta misma página con su fecha de actualización
            correspondiente.
          </p>

          <h2>9. Consentimiento</h2>
          <p>
            Al proporcionar tus datos personales a través de nuestro
            formulario de diagnóstico y marcar la casilla de
            consentimiento, manifiestas haber leído y aceptado los términos
            de este Aviso de Privacidad.
          </p>
        </div>
      </main>
    </>
  );
}
