'use client';

import { useEffect, useRef, useState } from 'react';
import { COMPANY_SIZES, validateLead } from '@/lib/validation';

// Imágenes del carrusel del hero. Colócalas en /public con estos nombres
// exactos: public/1.png y public/2.png.
const FAQ_ITEMS = [
  {
    pregunta: '¿Cuánto cuesta el diagnóstico?',
    respuesta:
      'Es gratuito y sin compromiso. Sirve para que ambos decidamos si tiene sentido seguir — no te cobramos por esa primera conversación.',
  },
  {
    pregunta: '¿Cuánto tiempo toma implementar un sistema?',
    respuesta:
      'Depende del alcance real de tu empresa, y eso es justo lo que define el diagnóstico: dimensionamos tu caso antes de comprometernos a un tiempo o un presupuesto, en vez de darte un número genérico de entrada.',
  },
  {
    pregunta: '¿Mi equipo necesita saber de tecnología?',
    respuesta:
      'No. Diseñamos el sistema alrededor de cómo trabaja tu equipo hoy, y los capacitamos para operarlo — por eso existe OLI Academy dentro del proceso, no lo dejamos como un manual que nadie lee.',
  },
  {
    pregunta: '¿Esto es lo mismo que contratar una agencia de automatización?',
    respuesta:
      'No exactamente. No llegamos a vender una herramienta aislada de automatización — primero analizamos cómo opera tu empresa completa, y el sistema se diseña alrededor de eso, no al revés.',
  },
  {
    pregunta: '¿Qué pasa después del diagnóstico?',
    respuesta:
      'Te compartimos qué encontramos y una propuesta concreta con alcance y costo. Tú decides si avanzamos — no hay contrato automático ni presión para continuar.',
  },
  {
    pregunta: '¿Con qué tamaño de empresa trabajan mejor?',
    respuesta:
      'Con empresas de 11 a 500 personas que ya tienen procesos definidos, pero sienten que la operación depende de personas específicas en vez de sistemas que cualquiera pueda operar.',
  },
];

const HERO_IMAGES = [
  { src: '/1.png', alt: 'Oli — vista previa 1' },
  { src: '/2.png', alt: 'Oli — vista previa 2' },
];

const SISTEMA_STEPS = [
  {
    letter: 'S',
    word: 'Scan',
    verbo: 'Analizamos',
    detalle:
      'Mapeamos cómo funciona tu empresa hoy: procesos, herramientas, cuellos de botella y dónde se pierde información.',
  },
  {
    letter: 'I',
    word: 'Identify',
    verbo: 'Identificamos',
    detalle:
      'Señalamos con precisión qué procesos generan más trabajo repetitivo y qué decisiones dependen de información dispersa.',
  },
  {
    letter: 'S',
    word: 'Simplify',
    verbo: 'Simplificamos',
    detalle:
      'Quitamos pasos innecesarios y herramientas redundantes antes de automatizar nada. No se automatiza el desorden.',
  },
  {
    letter: 'T',
    word: 'Transform',
    verbo: 'Transformamos',
    detalle:
      'Diseñamos el sistema: flujos conectados, automatizaciones y agentes de IA donde generan valor real.',
  },
  {
    letter: 'E',
    word: 'Enable',
    verbo: 'Preparamos',
    detalle:
      'Capacitamos a tu equipo para operar el nuevo sistema, con documentación y acompañamiento durante la transición.',
  },
  {
    letter: 'M',
    word: 'Measure',
    verbo: 'Medimos',
    detalle:
      'Definimos qué indicadores importan para tu operación y damos seguimiento con datos, no con impresiones.',
  },
  {
    letter: 'A',
    word: 'Adapt',
    verbo: 'Mejoramos',
    detalle:
      'Ajustamos el sistema conforme cambia tu empresa. Un sistema que no evoluciona vuelve a ser un problema.',
  },
];

const CAPACIDADES = [
  {
    titulo: 'Sistemas conectados',
    nivel: 'fundacional',
    detalle:
      'Diseñamos cómo hablan entre sí tus herramientas actuales, en vez de sumar una plataforma más. Es la base de todo lo demás que construimos.',
  },
  {
    titulo: 'Automatización de procesos',
    nivel: 'fundacional',
    detalle:
      'Conectamos tareas repetitivas entre plataformas para que dejen de depender de que alguien las haga manualmente.',
  },
  {
    titulo: 'Agentes de IA',
    nivel: 'complementario',
    detalle:
      'Asistentes que ejecutan tareas específicas dentro de tu operación: responder, clasificar, resumir, verificar.',
  },
  {
    titulo: 'Dashboards operativos',
    nivel: 'complementario',
    detalle:
      'Paneles con la información que tu equipo necesita ver, sin exportar hojas de cálculo cada semana.',
  },
  {
    titulo: 'Capacitación de equipos',
    nivel: 'continuo',
    detalle:
      'Formación práctica para que tu gente use el nuevo sistema desde el primer día, no solo lo reciba.',
  },
  {
    titulo: 'Consultoría continua',
    nivel: 'continuo',
    detalle:
      'Acompañamiento después de la implementación, con revisiones periódicas del sistema y sus resultados.',
  },
];

const NIVELES_LABEL = {
  fundacional: 'Fundacional — lo primero que construimos',
  complementario: 'Complementario — se suma según el caso',
  continuo: 'Continuo — acompaña todo el proceso',
};

const PROBLEMAS = [
  'Procesos que solo una persona sabe operar por completo.',
  'Información repartida entre hojas de cálculo, WhatsApp y correos.',
  'Herramientas que no se hablan entre sí y obligan a capturar todo dos veces.',
  'Decisiones que se toman sin datos actualizados a la mano.',
  'Onboarding y capacitación que dependen de explicar todo de palabra.',
];


// Detecta cuándo un contenedor entra al viewport, una sola vez.
// Se usa para disparar animaciones que no deben repetirse en cada scroll.
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

// Envuelve contenido y lo anima al entrar en el viewport (fade + slide up).
// Respeta prefers-reduced-motion vía CSS (.reveal queda sin animación ahí).
function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? ' reveal--visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

// Carrusel del hero: cross-fade automático entre imágenes, con puntos de
// navegación manual. Se detiene el auto-avance si el usuario prefiere
// menos movimiento en su sistema.
function HeroCarousel({ images }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return undefined;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    const id = setInterval(() => {
      setActive((current) => (current + 1) % images.length);
    }, 4500);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[0].src}
        alt={images[0].alt}
        loading="eager"
        className="hero-carousel-base"
      />
      {images.map((image, index) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={image.src}
          src={image.src}
          alt={image.alt}
          loading={index === 0 ? 'eager' : 'lazy'}
          className={`hero-carousel-img${index === active ? ' hero-carousel-img--active' : ''}`}
        />
      ))}
      {images.length > 1 && (
        <div className="hero-carousel-dots" role="tablist" aria-label="Vistas previas de Oli">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              role="tab"
              aria-current={index === active}
              aria-label={`Ver imagen ${index + 1}`}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      )}
    </>
  );
}

function IconArrow() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path
        d="M3.5 11.5L11.5 3.5M11.5 3.5H5M11.5 3.5V10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 10.5L8 14.5L16 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Rueda circular del método SISTEMA®: 7 nodos distribuidos en un círculo,
// conectados por un trazo que se dibuja al entrar en el viewport. Representa
// el método como ciclo continuo (Adapt vuelve a conectar con Scan), no como
// una línea de tiempo cerrada.
function SistemaWheel({ steps, activeIndex, onSelect, inView }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="wheel-wrap">
      <svg viewBox="0 0 100 100" className="wheel-svg" aria-hidden="true">
        <circle className="wheel-track" cx="50" cy="50" r={radius} />
        <circle
          className="wheel-progress"
          cx="50"
          cy="50"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={inView ? 0 : circumference}
        />
      </svg>
      <div className="wheel-center">
        <b>SISTEMA®</b>
        <span>Ciclo de mejora continua</span>
      </div>
      {steps.map((step, index) => {
        const angle = (index / steps.length) * 2 * Math.PI - Math.PI / 2;
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);
        const isActive = activeIndex === index;
        return (
          <button
            key={`${step.letter}-${index}`}
            type="button"
            className={`wheel-node-btn${isActive ? ' wheel-node-btn--active' : ''}`}
            style={{ left: `${x}%`, top: `${y}%` }}
            onClick={() => onSelect(index)}
            aria-pressed={isActive}
            aria-label={`${step.word}: ${step.verbo}`}
          >
            {step.letter}
          </button>
        );
      })}
    </div>
  );
}

export default function OliOneLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sistemaActive, setSistemaActive] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [sistemaRef, sistemaInView] = useInView(0.2);
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    puesto: '',
    correo: '',
    telefono: '',
    tamanoEmpresa: '',
    proceso: '',
    herramientas: '',
    mensaje: '',
    consentimiento: false,
    website: '', // honeypot
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [statusMessage, setStatusMessage] = useState('');

  function updateField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function getUtmParams() {
    if (typeof window === 'undefined') return {};
    const params = new URLSearchParams(window.location.search);
    return {
      utmSource: params.get('utm_source') || undefined,
      utmMedium: params.get('utm_medium') || undefined,
      utmCampaign: params.get('utm_campaign') || undefined,
      utmTerm: params.get('utm_term') || undefined,
      utmContent: params.get('utm_content') || undefined,
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const { isValid, errors: fieldErrors } = validateLead(formData);
    setErrors(fieldErrors);

    if (!isValid) {
      setStatus('error');
      setStatusMessage('Revisa los campos marcados antes de continuar.');
      return;
    }

    setStatus('loading');
    setStatusMessage('');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, ...getUtmParams() }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        setStatus('error');
        setStatusMessage(
          result.error || 'No pudimos enviar tu solicitud. Intenta de nuevo.'
        );
        return;
      }

      setStatus('success');
      setStatusMessage(
        'Recibimos tu solicitud. Te contactaremos en menos de dos días hábiles.'
      );

      // Meta Pixel: evento de conversión para optimizar la campaña.
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'Lead');
      }

      setFormData({
        nombre: '',
        empresa: '',
        puesto: '',
        correo: '',
        telefono: '',
        tamanoEmpresa: '',
        proceso: '',
        herramientas: '',
        mensaje: '',
        consentimiento: false,
        website: '',
      });
    } catch (err) {
      setStatus('error');
      setStatusMessage('Ocurrió un error de conexión. Intenta de nuevo.');
    }
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      {/* Header */}
      <header className="site-header">
        <div className="site-header__inner">
          <a href="#top" className="logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Oli" className="logo-img" />
          </a>

          <nav aria-label="Navegación principal" className="nav-desktop">
            <a href="#metodo">Método SISTEMA®</a>
            <a href="#capacidades">Capacidades</a>
            <a href="#academy">OLI Academy</a>
            <a href="#diagnostico">Contacto</a>
          </nav>

          <div className="header-actions">
            <a href="#diagnostico" className="btn btn--lime header-cta">
              Solicita un diagnóstico
              <IconArrow />
            </a>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                {menuOpen ? (
                  <path d="M6 6L20 20M20 6L6 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M4 8H22M4 13H22M4 18H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav id="mobile-nav" aria-label="Navegación móvil" className="nav-mobile">
            <a href="#metodo" onClick={() => setMenuOpen(false)}>Método SISTEMA®</a>
            <a href="#capacidades" onClick={() => setMenuOpen(false)}>Capacidades</a>
            <a href="#academy" onClick={() => setMenuOpen(false)}>OLI Academy</a>
            <a href="#diagnostico" onClick={() => setMenuOpen(false)} className="btn btn--primary">
              Solicita un diagnóstico
            </a>
          </nav>
        )}
      </header>

      <main id="main-content">
        {/* Hero */}
        <section className="hero" id="top">
          <div className="container hero__grid">
            <div>
              <h1>Diseñamos empresas <mark>más inteligentes</mark>.</h1>
              <p className="hero__sub">
                Tu empresa no necesita más herramientas. Necesita un mejor sistema.
                Analizamos cómo funciona tu operación y construimos sistemas,
                automatizaciones y soluciones con inteligencia artificial para
                reducir trabajo repetitivo, conectar procesos y mejorar tu operación.
              </p>
              <div className="hero__ctas">
                <a href="#diagnostico" className="btn btn--lime">
                  Solicita un diagnóstico
                  <IconArrow />
                </a>
                <a href="#metodo" className="btn btn--outline">Conoce el método SISTEMA®</a>
              </div>
              <p className="hero__trust">
                <IconCheck />
                Diagnóstico sin costo — respuesta en menos de 48 horas
              </p>

            </div>

            <div className="hero__visual">
              <div className="hero-photo">
                <HeroCarousel images={HERO_IMAGES} />
              </div>
            </div>
          </div>
        </section>

        {/* Problemas operativos */}
        <section className="section" aria-labelledby="problemas-title">
          <div className="container">
            <span className="eyebrow">Diagnóstico</span>
            <h2 id="problemas-title" className="section-title">
              Estas son las señales más comunes de que tu empresa necesita un mejor sistema.
            </h2>
            <div className="problemas-grid">
              {PROBLEMAS.map((problema, index) => (
                <Reveal key={problema} delay={index * 80} className="problema-card">
                  <span className="problema-icon">
                    <IconCheck />
                  </span>
                  <p>{problema}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Propuesta de valor */}
        <section className="section" style={{ paddingTop: 0 }} aria-labelledby="valor-title">
          <div className="container">
            <span className="eyebrow">Propuesta</span>
            <h2 id="valor-title" className="section-title">
              No vendemos software. Diseñamos cómo funciona tu empresa.
            </h2>
            <div className="valor-grid">
              <div className="valor-card" style={{ '--accent': 'var(--violet)' }}>
                <span className="num">01</span>
                <h3>Consultoría, no plantillas</h3>
                <p>Cada sistema se diseña a partir de cómo opera tu empresa hoy, no de un paquete genérico.</p>
              </div>
              <div className="valor-card" style={{ '--accent': 'var(--orange)' }}>
                <span className="num">02</span>
                <h3>Automatización con propósito</h3>
                <p>Automatizamos donde reduce trabajo real, no donde se ve bien en una demo.</p>
              </div>
              <div className="valor-card" style={{ '--accent': 'var(--ink)' }}>
                <h3>Acompañamiento continuo</h3>
                <p>El sistema evoluciona con tu empresa: lo medimos y ajustamos después de implementarlo.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Método SISTEMA */}
        <section className="section section--dark" id="metodo" aria-labelledby="metodo-title">
          <div className="container">
            <span className="eyebrow">Metodología</span>
            <h2 id="metodo-title" className="section-title">
              El método SISTEMA®: un ciclo de mejora continua, no una fórmula mágica.
            </h2>
            <p className="section-lede">
              Cada letra es una etapa real del trabajo que hacemos con tu empresa.
              Al llegar a Adapt, el ciclo vuelve a empezar — por eso es una rueda,
              no una línea recta.
            </p>
            <div className="sistema-layout" ref={sistemaRef}>
              <SistemaWheel
                steps={SISTEMA_STEPS}
                activeIndex={sistemaActive}
                onSelect={setSistemaActive}
                inView={sistemaInView}
              />
              <div className="sistema-detail">
                <div className="sistema-detail-head">
                  <span className="sistema-detail-letter" aria-hidden="true">
                    {SISTEMA_STEPS[sistemaActive].letter}
                  </span>
                  <div>
                    <div className="sistema-detail-word">
                      {SISTEMA_STEPS[sistemaActive].word} — {SISTEMA_STEPS[sistemaActive].verbo}
                    </div>
                    <div className="sistema-detail-verbo">
                      Etapa {sistemaActive + 1} de {SISTEMA_STEPS.length}
                    </div>
                  </div>
                </div>
                <p>{SISTEMA_STEPS[sistemaActive].detalle}</p>
                <div className="sistema-detail-nav">
                  <span className="sistema-detail-count">
                    {String(sistemaActive + 1).padStart(2, '0')} / {String(SISTEMA_STEPS.length).padStart(2, '0')}
                  </span>
                  <div className="sistema-detail-buttons">
                    <button
                      type="button"
                      className="sistema-nav-btn"
                      aria-label="Etapa anterior"
                      onClick={() =>
                        setSistemaActive((current) => (current - 1 + SISTEMA_STEPS.length) % SISTEMA_STEPS.length)
                      }
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="sistema-nav-btn"
                      aria-label="Siguiente etapa"
                      onClick={() => setSistemaActive((current) => (current + 1) % SISTEMA_STEPS.length)}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Capacidades */}
        <section className="section section--dark" id="capacidades" aria-labelledby="capacidades-title" style={{ paddingTop: 0 }}>
          <div className="container">
            <span className="eyebrow">Capacidades</span>
            <h2 id="capacidades-title" className="section-title">
              Lo que construimos dentro de cada sistema.
            </h2>
            <p className="section-lede">
              No todo se construye al mismo tiempo. Así priorizamos según dónde
              está tu empresa hoy.
            </p>
            <div className="heatmap-legend">
              {Object.entries(NIVELES_LABEL).map(([nivel, label]) => (
                <span className="heatmap-legend-item" key={nivel}>
                  <span className={`heatmap-legend-swatch capacidad-card--${nivel}`} />
                  {label}
                </span>
              ))}
            </div>
            <div className="capacidades-grid">
              {CAPACIDADES.map((cap, index) => (
                <Reveal
                  key={cap.titulo}
                  delay={index * 70}
                  className={`capacidad-card capacidad-card--${cap.nivel}`}
                >
                  <h3>{cap.titulo}</h3>
                  <p>{cap.detalle}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* OLI Academy */}
        <section className="section" id="academy" aria-labelledby="academy-title">
          <div className="container">
            <span className="eyebrow">Una solución de Oli</span>
            <h2 id="academy-title" className="section-title">
              Una vez implementado el sistema, no te dejamos solo.
            </h2>
            <div className="academy-card">
              <div>
                <span className="academy-tag">Una solución de Oli</span>
                <h3>Capacitamos a tu equipo con las metodologías necesarias para operarlo.</h3>
                <p>
                  Aplicar el sistema es solo la mitad del trabajo. OLI Academy
                  convierte ese nuevo sistema en cursos interactivos de onboarding
                  y capacitación, con seguimiento de progreso — para que tu equipo
                  aprenda a operarlo desde el día uno, en vez de quedarse con un
                  manual que nadie lee.
                </p>
                <a
                  href="https://oli.academy"
                  className="btn academy-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Conoce
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/oli-academy-logo.png" alt="OLI Academy" className="academy-btn-logo" />
                </a>
              </div>
              <div className="academy-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/oli-academy.png"
                  alt="Vista previa de OLI Academy"
                  className="academy-img"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="faq" style={{ paddingTop: 0 }} aria-labelledby="faq-title">
          <div className="container">
            <span className="eyebrow">Preguntas frecuentes</span>
            <h2 id="faq-title" className="section-title">
              ¿Tienes dudas? Te las aclaramos.
            </h2>
            <div className="faq-list">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <div className="faq-item" key={item.pregunta} data-open={isOpen}>
                    <button
                      type="button"
                      className="faq-trigger"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                    >
                      <span>{item.pregunta}</span>
                      <span className="faq-icon" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <path d="M4 7L9 12L14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                    {isOpen && (
                      <div className="faq-panel" id={`faq-panel-${index}`}>
                        {item.respuesta}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Formulario de diagnóstico */}
        <section className="section" id="diagnostico" style={{ paddingTop: 0 }} aria-labelledby="form-title">
          <div className="container">
            <span className="eyebrow">Diagnóstico</span>
            <h2 id="form-title" className="section-title">
              Solicita un diagnóstico para tu empresa.
            </h2>
            <p className="section-lede">
              Cuéntanos sobre tu operación. Te contactaremos para agendar una
              primera conversación, sin costo.
            </p>

            <form className="form-card" onSubmit={handleSubmit} noValidate>
              <div className="form-grid form-grid--two">
                <div className="field">
                  <label htmlFor="nombre">Nombre completo</label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    autoComplete="name"
                    value={formData.nombre}
                    onChange={(e) => updateField('nombre', e.target.value)}
                    aria-invalid={Boolean(errors.nombre)}
                    aria-describedby={errors.nombre ? 'error-nombre' : undefined}
                  />
                  {errors.nombre && <span className="field-error" id="error-nombre">{errors.nombre}</span>}
                </div>

                <div className="field">
                  <label htmlFor="empresa">Empresa</label>
                  <input
                    id="empresa"
                    name="empresa"
                    type="text"
                    autoComplete="organization"
                    value={formData.empresa}
                    onChange={(e) => updateField('empresa', e.target.value)}
                    aria-invalid={Boolean(errors.empresa)}
                    aria-describedby={errors.empresa ? 'error-empresa' : undefined}
                  />
                  {errors.empresa && <span className="field-error" id="error-empresa">{errors.empresa}</span>}
                </div>

                <div className="field">
                  <label htmlFor="puesto">Puesto</label>
                  <input
                    id="puesto"
                    name="puesto"
                    type="text"
                    autoComplete="organization-title"
                    value={formData.puesto}
                    onChange={(e) => updateField('puesto', e.target.value)}
                    aria-invalid={Boolean(errors.puesto)}
                    aria-describedby={errors.puesto ? 'error-puesto' : undefined}
                  />
                  {errors.puesto && <span className="field-error" id="error-puesto">{errors.puesto}</span>}
                </div>

                <div className="field">
                  <label htmlFor="correo">Correo</label>
                  <input
                    id="correo"
                    name="correo"
                    type="email"
                    autoComplete="email"
                    value={formData.correo}
                    onChange={(e) => updateField('correo', e.target.value)}
                    aria-invalid={Boolean(errors.correo)}
                    aria-describedby={errors.correo ? 'error-correo' : undefined}
                  />
                  {errors.correo && <span className="field-error" id="error-correo">{errors.correo}</span>}
                </div>

                <div className="field">
                  <label htmlFor="telefono">Teléfono</label>
                  <input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    autoComplete="tel"
                    value={formData.telefono}
                    onChange={(e) => updateField('telefono', e.target.value)}
                    aria-invalid={Boolean(errors.telefono)}
                    aria-describedby={errors.telefono ? 'error-telefono' : undefined}
                  />
                  {errors.telefono && <span className="field-error" id="error-telefono">{errors.telefono}</span>}
                </div>

                <div className="field">
                  <label htmlFor="tamanoEmpresa">Tamaño de la empresa</label>
                  <select
                    id="tamanoEmpresa"
                    name="tamanoEmpresa"
                    value={formData.tamanoEmpresa}
                    onChange={(e) => updateField('tamanoEmpresa', e.target.value)}
                    aria-invalid={Boolean(errors.tamanoEmpresa)}
                    aria-describedby={errors.tamanoEmpresa ? 'error-tamano' : undefined}
                  >
                    <option value="">Selecciona una opción</option>
                    {COMPANY_SIZES.map((size) => (
                      <option key={size.value} value={size.value}>{size.label}</option>
                    ))}
                  </select>
                  {errors.tamanoEmpresa && <span className="field-error" id="error-tamano">{errors.tamanoEmpresa}</span>}
                </div>
              </div>

              <div className="form-grid" style={{ marginTop: '1.25rem' }}>
                <div className="field">
                  <label htmlFor="proceso">¿Qué proceso quieres mejorar?</label>
                  <textarea
                    id="proceso"
                    name="proceso"
                    value={formData.proceso}
                    onChange={(e) => updateField('proceso', e.target.value)}
                    aria-invalid={Boolean(errors.proceso)}
                    aria-describedby={errors.proceso ? 'error-proceso' : undefined}
                  />
                  {errors.proceso && <span className="field-error" id="error-proceso">{errors.proceso}</span>}
                </div>

                <div className="field">
                  <label htmlFor="herramientas">Herramientas que usan actualmente (opcional)</label>
                  <input
                    id="herramientas"
                    name="herramientas"
                    type="text"
                    value={formData.herramientas}
                    onChange={(e) => updateField('herramientas', e.target.value)}
                  />
                </div>

                <div className="field">
                  <label htmlFor="mensaje">Mensaje adicional (opcional)</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={(e) => updateField('mensaje', e.target.value)}
                  />
                </div>

                {/* Honeypot: invisible para personas, visible para bots */}
                <div className="honeypot-field" aria-hidden="true">
                  <label htmlFor="website">No llenar este campo</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => updateField('website', e.target.value)}
                  />
                </div>

                <div className="field field-checkbox">
                  <input
                    id="consentimiento"
                    name="consentimiento"
                    type="checkbox"
                    checked={formData.consentimiento}
                    onChange={(e) => updateField('consentimiento', e.target.checked)}
                    aria-invalid={Boolean(errors.consentimiento)}
                    aria-describedby={errors.consentimiento ? 'error-consentimiento' : undefined}
                  />
                  <label htmlFor="consentimiento">
                    Acepto que Oli me contacte y almacene mis datos conforme al aviso de privacidad.
                  </label>
                </div>
                {errors.consentimiento && <span className="field-error" id="error-consentimiento">{errors.consentimiento}</span>}
              </div>

              <div className="form-submit">
                <button type="submit" className="btn btn--lime" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Enviando…' : 'Solicita un diagnóstico'}
                </button>
              </div>

              {status === 'success' && (
                <div className="form-status form-status--success" role="status">
                  {statusMessage}
                </div>
              )}
              {status === 'error' && (
                <div className="form-status form-status--error" role="alert">
                  {statusMessage}
                </div>
              )}
            </form>
          </div>
        </section>

        {/* CTA final */}
        <section className="section section--dark cta-final" aria-labelledby="cta-final-title">
          <div className="container">
            <h2 id="cta-final-title" className="section-title">
              Tu empresa no necesita más herramientas. <mark>Necesita un mejor sistema.</mark>
            </h2>
            <p className="cta-final-rhythm">
              Lo diagnosticamos. Lo diseñamos. Lo medimos. Y cuando tu empresa
              cambie, lo volvemos a ajustar.
            </p>
            <div className="hero__ctas">
              <a href="#diagnostico" className="btn btn--lime">Solicita un diagnóstico</a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <span className="logo" style={{ color: 'var(--cream)' }}>Oli</span>
            <p>
              Empresas más inteligentes. Diseñamos sistemas, automatizaciones y
              soluciones con inteligencia artificial para empresas en México.
            </p>
          </div>
          <div className="footer-col">
            <h4>Producto</h4>
            <ul>
              <li><a href="#metodo">Método SISTEMA®</a></li>
              <li><a href="#capacidades">Capacidades</a></li>
              <li><a href="https://oli.academy" target="_blank" rel="noopener noreferrer">OLI Academy</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="/aviso-de-privacidad">Aviso de privacidad</a></li>
              <li><a href="/terminos">Términos y condiciones</a></li>
            </ul>
          </div>
        </div>
        <div className="container footer-bottom">
          <span suppressHydrationWarning>© {new Date().getFullYear()}</span> Oli. Todos los derechos reservados. SISTEMA® es una metodología propia de Oli.
        </div>
      </footer>
    </>
  );
}
