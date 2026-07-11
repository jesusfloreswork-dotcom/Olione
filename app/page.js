'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { COMPANY_SIZES, validateLead } from '@/lib/validation';

// Imágenes del carrusel del hero. Colócalas en /public con estos nombres
// exactos: public/1.png y public/2.png.
const HERO_IMAGES = [
  { src: '/1.png', alt: 'OLI One — vista previa 1' },
  { src: '/2.png', alt: 'OLI One — vista previa 2' },
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
      {images.map((image, index) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 960px) 90vw, 420px"
          priority={index === 0}
          className={`hero-carousel-img${index === active ? ' hero-carousel-img--active' : ''}`}
        />
      ))}
      {images.length > 1 && (
        <div className="hero-carousel-dots" role="tablist" aria-label="Vistas previas de OLI One">
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
      <style>{`
        :root {
          --cream: #f1eee7;
          --cream-soft: #e4dfd3;
          --ink: #1c1b1f;
          --ink-soft: #5c5964;
          --lime: #d9e600;
          --orange: #ff5a35;
          --violet: #5b45c7;
          --border-soft: #e4dfd3;
        }

        * { box-sizing: border-box; }

        html { scroll-behavior: smooth; }

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }

        body {
          margin: 0;
          background: var(--cream);
          color: var(--ink);
          font-family: var(--font-body);
          -webkit-font-smoothing: antialiased;
        }

        h1, h2, h3, h4 {
          font-family: var(--font-display);
          margin: 0;
          line-height: 1.1;
        }

        p { margin: 0; line-height: 1.6; }

        a { color: inherit; }

        .skip-link {
          position: absolute;
          left: -999px;
          top: 0;
          background: var(--ink);
          color: var(--cream);
          padding: 0.75rem 1.25rem;
          z-index: 100;
          border-radius: 0 0 8px 0;
        }
        .skip-link:focus {
          left: 0;
        }

        button, input, textarea, select {
          font-family: inherit;
          font-size: 1rem;
        }

        :focus-visible {
          outline: 3px solid var(--orange);
          outline-offset: 2px;
        }

        .container {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 32px;
        }
        @media (max-width: 640px) {
          .container { padding: 0 20px; }
        }

        .section {
          padding: 90px 0;
        }

        .section--dark {
          background: var(--ink);
          color: var(--cream);
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 13px;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--violet);
          margin-bottom: 1.25rem;
        }
        .eyebrow::before {
          content: '';
          width: 16px;
          height: 3px;
          background: var(--orange);
          border-radius: 2px;
          flex-shrink: 0;
        }

        .section--dark .eyebrow { color: var(--lime); }
        .section--dark .eyebrow::before { background: var(--lime); }

        .section-title {
          font-size: clamp(26px, 4vw, 40px);
          font-weight: 700;
          line-height: 1.15;
          max-width: 42rem;
        }

        .section-lede {
          font-size: 16.5px;
          line-height: 1.6;
          max-width: 38rem;
          margin-top: 0.875rem;
          color: var(--ink-soft);
        }
        .section--dark .section-lede { color: rgba(241, 238, 231, 0.72); }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 15px 26px;
          min-height: 44px;
          border-radius: 100px;
          font-weight: 600;
          font-size: 15px;
          border: 2px solid transparent;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.18s ease, background 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
        }
        .btn:hover { transform: translateY(-2px); }
        .btn:active { transform: translateY(0); }

        .btn--primary {
          background: var(--ink);
          color: var(--cream);
          border-color: var(--ink);
        }
        .btn--primary:hover {
          background: white;
          color: var(--ink);
        }

        .btn--outline {
          background: transparent;
          color: var(--ink);
          border-color: var(--ink);
        }
        .btn--outline:hover {
          background: var(--ink);
          color: var(--cream);
        }

        .section--dark .btn--outline {
          color: var(--cream);
          border-color: var(--cream);
        }
        .section--dark .btn--outline:hover {
          background: var(--cream);
          color: var(--ink);
        }

        .btn--lime {
          background: var(--lime);
          color: var(--ink);
        }
        .btn--lime:hover {
          box-shadow: 0 8px 20px rgba(217, 230, 0, 0.4);
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        /* Header */
        .site-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(241, 238, 231, 0.92);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--border-soft);
        }

        .site-header__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 32px;
          max-width: 1180px;
          margin: 0 auto;
        }
        @media (max-width: 640px) {
          .site-header__inner { padding: 1rem 20px; }
        }

        .logo {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.2rem;
          text-decoration: none;
          letter-spacing: -0.01em;
          color: var(--ink);
        }
        .logo-mark {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .logo-mark span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--lime);
        }

        .nav-desktop {
          display: none;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-desktop a {
          text-decoration: none;
          font-weight: 500;
          font-size: 14.5px;
          color: var(--ink-soft);
          transition: color 0.15s ease;
        }
        .nav-desktop a:hover { color: var(--ink); }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .header-cta {
          display: none;
        }

        .menu-toggle {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          color: var(--ink);
        }

        .nav-mobile {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          list-style: none;
          margin: 0;
          padding: 1.5rem;
          border-top: 1px solid var(--border-soft);
        }

        .nav-mobile a {
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
        }

        @media (min-width: 900px) {
          .nav-desktop { display: flex; }
          .menu-toggle { display: none; }
          .header-cta { display: inline-flex; }
        }

        /* Hero */
        .hero {
          padding: 3.5rem 0 5.5rem;
        }

        .hero__grid {
          display: grid;
          gap: 3rem;
          align-items: center;
        }

        @media (min-width: 960px) {
          .hero__grid {
            grid-template-columns: 1.05fr 0.95fr;
            gap: 2.5rem;
          }
        }

        .hero h1 {
          font-size: clamp(32px, 5vw, 54px);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -1px;
        }
        .hero h1 mark {
          background: var(--lime);
          color: var(--ink);
          padding: 0 8px;
          border-radius: 6px;
          font-style: normal;
        }

        .hero__sub {
          margin-top: 1.375rem;
          font-size: 17.5px;
          line-height: 1.6;
          max-width: 520px;
          color: var(--ink-soft);
        }

        .hero__ctas {
          margin-top: 2.2rem;
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .hero__trust {
          margin-top: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 13.5px;
          color: var(--ink-soft);
        }
        .hero__trust svg { color: var(--lime); flex-shrink: 0; }

        /* Visual: foto + tarjetas flotantes, estilo referencia */
        .hero__visual {
          position: relative;
          max-width: 420px;
          margin: 0 auto;
        }
        @media (min-width: 960px) {
          .hero__visual { margin: 0 0 0 auto; }
        }

        .hero-photo {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          aspect-ratio: 4 / 5;
          background: linear-gradient(155deg, var(--violet) 0%, var(--ink) 75%);
        }
        .hero-carousel-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 1.5rem;
          box-sizing: border-box;
          opacity: 0;
          transition: opacity 0.9s ease;
        }
        .hero-carousel-img--active {
          opacity: 1;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-carousel-img { transition: none; }
        }
        .hero-carousel-dots {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 2;
        }
        .hero-carousel-dots button {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          border: none;
          background: rgba(241, 238, 231, 0.5);
          cursor: pointer;
          padding: 0;
        }
        .hero-carousel-dots button[aria-current='true'] {
          background: var(--lime);
          width: 22px;
          border-radius: 5px;
        }
        .hero-carousel-dots button:focus-visible {
          outline: 2px solid var(--lime);
          outline-offset: 2px;
        }

        .hero-float {
          position: absolute;
          background: white;
          border-radius: 16px;
          box-shadow: 0 18px 34px rgba(28, 27, 31, 0.18);
          display: flex;
          align-items: center;
          gap: 0.7rem;
          padding: 0.9rem 1.1rem;
        }
        .hero-float--badge {
          top: 1.5rem;
          left: -1rem;
        }
        .hero-float--badge .hero-float-icon {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(217, 230, 0, 0.25);
          color: #8a9600;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .hero-float--badge b { display: block; font-size: 13.5px; font-weight: 700; }
        .hero-float--badge span { font-size: 11.5px; color: var(--ink-soft); }

        .hero-float--dark {
          background: var(--ink);
          color: var(--cream);
          bottom: 6.5rem;
          left: -1.5rem;
          max-width: 13.5rem;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.4rem;
          padding: 1.125rem 1.25rem;
        }
        .hero-float--dark .hero-float-icon {
          width: 26px;
          height: 26px;
          border-radius: 8px;
          background: var(--lime);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-float--dark p {
          font-size: 12.5px;
          line-height: 1.5;
          color: rgba(241, 238, 231, 0.85);
        }

        .hero-float--chip {
          bottom: 1.5rem;
          right: -0.75rem;
        }
        .hero-float--chip .sw {
          width: 30px;
          height: 30px;
          border-radius: 9px;
          background: var(--orange);
          flex-shrink: 0;
        }
        .hero-float--chip b {
          display: block;
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 700;
        }
        .hero-float--chip span {
          font-size: 11px;
          color: var(--ink-soft);
        }

        @media (max-width: 700px) {
          .hero-float {
            position: static;
            width: 100%;
            box-sizing: border-box;
            margin-top: 0.75rem;
            max-width: none;
          }
          .hero-float--dark { flex-direction: row; align-items: center; }
        }

        /* Problemas */
        .problemas-grid {
          margin-top: 2.5rem;
          display: grid;
          gap: 1rem;
        }
        @media (min-width: 700px) {
          .problemas-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .problema-card {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          background: white;
          border: 1px solid var(--border-soft);
          border-radius: 16px;
          padding: 1.25rem 1.375rem;
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
        }
        .problema-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(28, 27, 31, 0.1);
          border-color: rgba(255, 90, 53, 0.3);
        }
        .problema-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 90, 53, 0.12);
          color: var(--orange);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .problema-card p {
          font-size: 15px;
          line-height: 1.55;
          font-weight: 500;
          padding-top: 0.4rem;
        }

        /* Reveal on scroll */
        .reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .reveal--visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        /* Propuesta de valor */
        .valor-grid {
          margin-top: 2.5rem;
          display: grid;
          gap: 1.375rem;
        }
        @media (min-width: 760px) {
          .valor-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .valor-card {
          background: white;
          border: 1px solid var(--border-soft);
          border-top: 5px solid var(--accent, var(--violet));
          border-radius: 18px;
          padding: 2rem 1.75rem;
          transition: transform 0.18s ease;
        }
        .valor-card:hover { transform: translateY(-3px); }
        .valor-card .num {
          display: block;
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          color: var(--accent, var(--violet));
          margin-bottom: 1.125rem;
        }
        .valor-card h3 {
          font-size: 21px;
          font-weight: 700;
          margin-bottom: 0.625rem;
        }
        .valor-card p {
          color: var(--ink-soft);
          font-size: 15px;
          line-height: 1.6;
        }

        /* SISTEMA — rueda circular (ciclo continuo de mejora) */
        .sistema-layout {
          margin-top: 2.5rem;
          display: grid;
          gap: 2.5rem;
          justify-items: center;
        }
        @media (min-width: 860px) {
          .sistema-layout {
            grid-template-columns: minmax(280px, 380px) 1fr;
            align-items: center;
            justify-items: stretch;
          }
        }

        .wheel-wrap {
          position: relative;
          width: 100%;
          max-width: 340px;
          aspect-ratio: 1 / 1;
          margin: 0 auto;
        }
        .wheel-svg {
          width: 100%;
          height: 100%;
          display: block;
        }
        .wheel-track {
          fill: none;
          stroke: rgba(241, 238, 231, 0.15);
          stroke-width: 1.6;
        }
        .wheel-progress {
          fill: none;
          stroke: var(--lime);
          stroke-width: 1.6;
          stroke-linecap: round;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
          transition: stroke-dashoffset 1.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (prefers-reduced-motion: reduce) {
          .wheel-progress { transition: none; }
        }
        .wheel-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          pointer-events: none;
          width: 60%;
        }
        .wheel-center b {
          display: block;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--cream);
          letter-spacing: 0.02em;
        }
        .wheel-center span {
          display: block;
          font-size: 0.7rem;
          color: rgba(241, 238, 231, 0.5);
          margin-top: 0.3rem;
          line-height: 1.4;
        }
        .wheel-node-btn {
          position: absolute;
          width: 52px;
          height: 52px;
          margin-left: -26px;
          margin-top: -26px;
          border-radius: 50%;
          border: 2px solid rgba(241, 238, 231, 0.2);
          background: var(--ink);
          color: var(--cream);
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.15rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease, color 0.2s ease;
        }
        .wheel-node-btn:hover {
          border-color: var(--lime);
          transform: scale(1.08);
        }
        .wheel-node-btn--active {
          background: var(--lime);
          color: var(--ink);
          border-color: var(--lime);
          transform: scale(1.1);
        }

        .sistema-detail {
          background: rgba(241, 238, 231, 0.05);
          border: 1px solid rgba(241, 238, 231, 0.12);
          border-radius: 20px;
          padding: 2rem;
          width: 100%;
        }
        .sistema-detail-head {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .sistema-detail-letter {
          font-family: var(--font-display);
          font-size: 2.25rem;
          font-weight: 700;
          color: var(--lime);
          line-height: 1;
        }
        .sistema-detail-word {
          font-weight: 700;
          font-size: 1.15rem;
        }
        .sistema-detail-verbo {
          font-size: 0.9rem;
          color: rgba(241, 238, 231, 0.6);
        }
        .sistema-detail p {
          margin-top: 1.25rem;
          font-size: 1rem;
          line-height: 1.6;
          color: rgba(241, 238, 231, 0.85);
        }
        .sistema-detail-nav {
          margin-top: 1.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .sistema-detail-count {
          font-family: var(--font-display);
          font-size: 0.85rem;
          color: rgba(241, 238, 231, 0.5);
        }
        .sistema-detail-buttons {
          display: flex;
          gap: 0.6rem;
        }
        .sistema-nav-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: none;
          background: rgba(241, 238, 231, 0.08);
          color: var(--cream);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .sistema-nav-btn:hover { background: rgba(241, 238, 231, 0.18); }

        /* Capacidades — mapa de calor por nivel de implementación */
        .heatmap-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-top: 1.75rem;
        }
        .heatmap-legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: rgba(241, 238, 231, 0.65);
        }
        .heatmap-legend-swatch {
          width: 14px;
          height: 14px;
          border-radius: 4px;
          flex-shrink: 0;
        }

        .capacidades-grid {
          margin-top: 1.75rem;
          display: grid;
          gap: 0.875rem;
          grid-template-columns: 1fr;
        }
        @media (min-width: 700px) {
          .capacidades-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .capacidad-card {
          border-radius: 16px;
          padding: 1.5rem;
          border: 1px solid transparent;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: default;
        }
        .capacidad-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.25);
        }
        .capacidad-card h3 {
          font-size: 1.02rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .capacidad-card p {
          font-size: 0.9rem;
          line-height: 1.5;
        }
        /* Tres niveles de intensidad, del más "caliente" (fundacional) al más
           suave (continuo) — representa dónde enfocamos primero el trabajo,
           no una métrica de negocio. */
        .capacidad-card--fundacional {
          background: rgba(217, 230, 0, 0.22);
          border-color: rgba(217, 230, 0, 0.4);
        }
        .capacidad-card--fundacional h3 { color: var(--lime); }
        .capacidad-card--fundacional p { color: rgba(241, 238, 231, 0.9); }

        .capacidad-card--complementario {
          background: rgba(255, 90, 53, 0.16);
          border-color: rgba(255, 90, 53, 0.32);
        }
        .capacidad-card--complementario h3 { color: #ff8a6b; }
        .capacidad-card--complementario p { color: rgba(241, 238, 231, 0.82); }

        .capacidad-card--continuo {
          background: rgba(241, 238, 231, 0.05);
          border-color: rgba(241, 238, 231, 0.15);
        }
        .capacidad-card--continuo h3 { color: var(--cream); }
        .capacidad-card--continuo p { color: rgba(241, 238, 231, 0.65); }

        /* OLI Academy */
        .academy-card {
          margin-top: 2.5rem;
          background: var(--violet);
          color: white;
          border-radius: 24px;
          padding: 2.5rem;
          display: grid;
          gap: 1.5rem;
        }
        @media (min-width: 800px) {
          .academy-card {
            grid-template-columns: 1.3fr 1fr;
            align-items: center;
            padding: 3rem;
          }
        }
        .academy-tag {
          display: inline-block;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          background: rgba(255, 255, 255, 0.18);
          padding: 0.35rem 0.75rem;
          border-radius: 999px;
          margin-bottom: 1rem;
        }
        .academy-card h3 {
          font-size: 1.6rem;
          margin-bottom: 0.75rem;
        }
        .academy-card p { opacity: 0.9; }
        .academy-card .btn { margin-top: 1.5rem; }

        /* Formulario */
        .form-card {
          margin-top: 2.5rem;
          background: white;
          border: 1px solid var(--border-soft);
          border-radius: 24px;
          padding: 2rem;
        }
        @media (min-width: 700px) {
          .form-card { padding: 2.75rem; }
        }
        .form-grid {
          display: grid;
          gap: 1.25rem;
        }
        @media (min-width: 700px) {
          .form-grid--two { grid-template-columns: 1fr 1fr; }
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .field label {
          font-weight: 600;
          font-size: 0.9rem;
        }
        .field input,
        .field select,
        .field textarea {
          padding: 0.75rem 0.9rem;
          border-radius: 10px;
          border: 1.5px solid var(--border-soft);
          background: var(--cream);
        }
        .field textarea { resize: vertical; min-height: 6rem; }
        .field-error {
          color: var(--orange);
          font-size: 0.85rem;
        }
        .field-checkbox {
          flex-direction: row;
          align-items: flex-start;
          gap: 0.6rem;
        }
        .field-checkbox input { margin-top: 0.2rem; }
        .honeypot-field {
          position: absolute;
          left: -9999px;
          width: 1px;
          height: 1px;
          overflow: hidden;
        }
        .form-status {
          margin-top: 1.25rem;
          padding: 0.9rem 1.1rem;
          border-radius: 10px;
          font-size: 0.95rem;
        }
        .form-status--success {
          background: rgba(217, 230, 0, 0.35);
        }
        .form-status--error {
          background: rgba(232, 98, 61, 0.15);
          color: #a83c1f;
        }
        .form-submit {
          margin-top: 1.75rem;
        }

        /* CTA final */
        .cta-final {
          text-align: center;
        }
        .cta-final .section-title {
          margin: 0 auto;
        }
        .cta-final .hero__ctas {
          justify-content: center;
        }

        /* Footer */
        .site-footer {
          background: var(--ink);
          color: var(--cream);
          padding: 3.5rem 0 2rem;
        }
        .footer-grid {
          display: grid;
          gap: 2rem;
        }
        @media (min-width: 760px) {
          .footer-grid { grid-template-columns: 2fr 1fr 1fr; }
        }
        .footer-brand p {
          opacity: 0.65;
          margin-top: 0.75rem;
          max-width: 26rem;
          font-size: 0.9rem;
        }
        .footer-col h4 {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          opacity: 0.6;
          margin-bottom: 0.9rem;
        }
        .footer-col ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 0.6rem;
        }
        .footer-col a {
          text-decoration: none;
          font-size: 0.92rem;
          opacity: 0.85;
        }
        .footer-bottom {
          margin-top: 3rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(241, 238, 231, 0.15);
          font-size: 0.82rem;
          opacity: 0.55;
        }
      `}</style>

      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      {/* Header */}
      <header className="site-header">
        <div className="site-header__inner">
          <a href="#top" className="logo">
            <span className="logo-mark" aria-hidden="true"><span /></span>
            OLI One
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

              <div className="hero-float hero-float--badge">
                <span className="hero-float-icon"><IconCheck /></span>
                <div>
                  <b>Diagnóstico gratuito</b>
                  <span>Sin compromiso</span>
                </div>
              </div>

              <div className="hero-float hero-float--dark">
                <span className="hero-float-icon" aria-hidden="true" />
                <p>Consultoría que combina estrategia, datos e inteligencia artificial.</p>
              </div>

              <div className="hero-float hero-float--chip">
                <span className="sw" aria-hidden="true" />
                <div>
                  <b>7</b>
                  <span>Etapas del método SISTEMA®</span>
                </div>
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
            <span className="eyebrow">Una solución de OLI One</span>
            <h2 id="academy-title" className="section-title">
              Una vez implementado el sistema, no te dejamos solo.
            </h2>
            <div className="academy-card">
              <div>
                <span className="academy-tag">Una solución de OLI One</span>
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
                  className="btn btn--primary"
                  style={{ background: 'white', color: 'var(--violet)' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Conoce OLI Academy
                </a>
              </div>
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
                    Acepto que OLI One me contacte y almacene mis datos conforme al aviso de privacidad.
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
              Tu empresa no necesita más herramientas. Necesita un mejor sistema.
            </h2>
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
            <span className="logo">OLI One</span>
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
          © {new Date().getFullYear()} OLI One. Todos los derechos reservados. SISTEMA® es una metodología propia de OLI One.
        </div>
      </footer>
    </>
  );
}
