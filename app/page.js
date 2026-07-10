'use client';

import { useState } from 'react';
import { COMPANY_SIZES, validateLead } from '@/lib/validation';

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
    detalle:
      'Diseñamos cómo hablan entre sí tus herramientas actuales, en vez de sumar una plataforma más. Es la base de todo lo demás que construimos.',
  },
  {
    titulo: 'Automatización de procesos',
    detalle:
      'Conectamos tareas repetitivas entre plataformas para que dejen de depender de que alguien las haga manualmente.',
  },
  {
    titulo: 'Agentes de IA',
    detalle:
      'Asistentes que ejecutan tareas específicas dentro de tu operación: responder, clasificar, resumir, verificar.',
  },
  {
    titulo: 'Dashboards operativos',
    detalle:
      'Paneles con la información que tu equipo necesita ver, sin exportar hojas de cálculo cada semana.',
  },
  {
    titulo: 'Capacitación de equipos',
    detalle:
      'Formación práctica para que tu gente use el nuevo sistema desde el primer día, no solo lo reciba.',
  },
  {
    titulo: 'Consultoría continua',
    detalle:
      'Acompañamiento después de la implementación, con revisiones periódicas del sistema y sus resultados.',
  },
];

const PROBLEMAS = [
  'Procesos que solo una persona sabe operar por completo.',
  'Información repartida entre hojas de cálculo, WhatsApp y correos.',
  'Herramientas que no se hablan entre sí y obligan a capturar todo dos veces.',
  'Decisiones que se toman sin datos actualizados a la mano.',
  'Onboarding y capacitación que dependen de explicar todo de palabra.',
];

const CASOS_USO = [
  {
    depto: 'Recursos Humanos',
    detalle:
      'Onboarding estructurado, seguimiento de capacitación y procesos de contratación sin depender de carpetas sueltas.',
  },
  {
    depto: 'Operaciones',
    detalle:
      'Visibilidad del estado de cada proceso en tiempo real, con alertas cuando algo se detiene.',
  },
  {
    depto: 'Administración',
    detalle:
      'Flujos de aprobación y control documental sin cadenas interminables de correos.',
  },
  {
    depto: 'Atención a cliente',
    detalle:
      'Respuestas consistentes y trazabilidad de cada solicitud, con agentes de IA que resuelven lo repetitivo.',
  },
  {
    depto: 'Dirección general',
    detalle:
      'Un panel único para entender cómo está operando la empresa, sin pedir reportes a cada área.',
  },
];

const INDICADORES = [
  'Tiempo de ciclo por proceso',
  'Horas de trabajo manual reducidas',
  'Errores por captura duplicada',
  'Tiempo de respuesta a clientes internos y externos',
  'Tiempo de incorporación de nuevo personal',
];

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

function SystemDiagram() {
  return (
    <svg
      viewBox="0 0 480 360"
      role="img"
      aria-label="Diagrama que muestra procesos dispersos convergiendo en OLI One para formar un sistema conectado"
      className="hero-diagram"
    >
      <g className="diagram-node diagram-node--scattered">
        <rect x="20" y="30" width="110" height="46" rx="10" />
        <text x="75" y="58" textAnchor="middle">Hojas de cálculo</text>
      </g>
      <g className="diagram-node diagram-node--scattered">
        <rect x="20" y="100" width="110" height="46" rx="10" />
        <text x="75" y="128" textAnchor="middle">WhatsApp</text>
      </g>
      <g className="diagram-node diagram-node--scattered">
        <rect x="20" y="170" width="110" height="46" rx="10" />
        <text x="75" y="198" textAnchor="middle">Correos</text>
      </g>
      <g className="diagram-node diagram-node--scattered">
        <rect x="20" y="240" width="110" height="46" rx="10" />
        <text x="75" y="268" textAnchor="middle">Plataformas sueltas</text>
      </g>

      <path className="diagram-line" d="M130 53 L210 175" />
      <path className="diagram-line" d="M130 123 L210 175" />
      <path className="diagram-line" d="M130 193 L210 185" />
      <path className="diagram-line" d="M130 263 L210 195" />

      <g className="diagram-node diagram-node--core">
        <rect x="210" y="140" width="110" height="70" rx="14" />
        <text x="265" y="180" textAnchor="middle" className="diagram-core-label">
          OLI One
        </text>
      </g>

      <path className="diagram-line diagram-line--out" d="M320 175 L400 175" />

      <g className="diagram-node diagram-node--system">
        <rect x="400" y="140" width="60" height="70" rx="14" />
        <text x="430" y="180" textAnchor="middle">Sistema</text>
      </g>
    </svg>
  );
}

export default function OliOneLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openStep, setOpenStep] = useState('S-0');
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
          --cream: #f5f1e8;
          --cream-soft: #eee8d9;
          --ink: #1a1a18;
          --ink-soft: #2a2a26;
          --lime: #c4f42a;
          --orange: #e8623d;
          --violet: #6b5ce0;
          --border-soft: rgba(26, 26, 24, 0.12);
          --font-display: var(--font-display), 'Space Grotesk', sans-serif;
          --font-body: var(--font-body), 'Inter', sans-serif;
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
          padding: 0 1.5rem;
        }

        .section {
          padding: 5rem 0;
        }

        .section--dark {
          background: var(--ink);
          color: var(--cream);
        }

        .eyebrow {
          display: inline-block;
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--orange);
          margin-bottom: 1rem;
        }

        .section--dark .eyebrow { color: var(--lime); }

        .section-title {
          font-size: clamp(1.8rem, 3.2vw, 2.6rem);
          font-weight: 700;
          max-width: 42rem;
        }

        .section-lede {
          font-size: 1.05rem;
          max-width: 38rem;
          margin-top: 1rem;
          opacity: 0.85;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.85rem 1.5rem;
          border-radius: 999px;
          font-weight: 600;
          font-size: 0.95rem;
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
        }
        .btn--primary:hover {
          background: var(--ink-soft);
          box-shadow: 0 8px 20px rgba(26, 26, 24, 0.25);
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
          box-shadow: 0 8px 20px rgba(196, 244, 42, 0.35);
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
          background: rgba(245, 241, 232, 0.92);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--border-soft);
        }

        .site-header__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.1rem 1.5rem;
          max-width: 1180px;
          margin: 0 auto;
        }

        .logo {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.3rem;
          text-decoration: none;
          letter-spacing: -0.01em;
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
          font-size: 0.95rem;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .menu-toggle {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
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
          .header-actions .btn--primary-desktop-only { display: inline-flex; }
        }

        /* Hero */
        .hero {
          padding: 4rem 0 5rem;
        }

        .hero__grid {
          display: grid;
          gap: 3rem;
          align-items: center;
        }

        @media (min-width: 960px) {
          .hero__grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .hero h1 {
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          letter-spacing: -0.01em;
        }

        .hero__sub {
          margin-top: 1.5rem;
          font-size: 1.15rem;
          max-width: 34rem;
          opacity: 0.85;
        }

        .hero__ctas {
          margin-top: 2.2rem;
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .hero__visual {
          background: var(--ink);
          border-radius: 24px;
          padding: 1.5rem;
        }

        .hero-diagram {
          width: 100%;
          height: auto;
        }
        .hero-diagram text {
          font-family: var(--font-body);
          font-size: 12px;
          fill: var(--cream);
        }
        .diagram-node--scattered rect {
          fill: none;
          stroke: rgba(245, 241, 232, 0.35);
          stroke-width: 1.5;
        }
        .diagram-node--core rect {
          fill: var(--lime);
        }
        .diagram-node--core text {
          fill: var(--ink);
          font-weight: 700;
          font-size: 15px;
        }
        .diagram-node--system rect {
          fill: var(--orange);
        }
        .diagram-node--system text {
          fill: var(--ink);
          font-weight: 600;
        }
        .diagram-line {
          stroke: rgba(245, 241, 232, 0.3);
          stroke-width: 1.5;
          fill: none;
        }
        .diagram-line--out {
          stroke: var(--lime);
          stroke-width: 2;
        }

        /* Problemas */
        .problemas-list {
          margin-top: 2.5rem;
          display: grid;
          gap: 1rem;
          list-style: none;
          padding: 0;
          max-width: 44rem;
        }
        .problemas-list li {
          display: flex;
          gap: 0.9rem;
          align-items: flex-start;
          padding: 1rem 0;
          border-bottom: 1px solid var(--border-soft);
          font-size: 1.02rem;
        }
        .problemas-list svg {
          flex-shrink: 0;
          margin-top: 0.15rem;
          color: var(--orange);
        }

        /* Propuesta de valor */
        .valor-grid {
          margin-top: 2.5rem;
          display: grid;
          gap: 1.5rem;
        }
        @media (min-width: 760px) {
          .valor-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .valor-card {
          background: white;
          border: 1px solid var(--border-soft);
          border-radius: 18px;
          padding: 1.75rem;
        }
        .valor-card h3 {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 0.6rem;
        }
        .valor-card p { opacity: 0.8; }

        /* SISTEMA */
        .sistema-list {
          margin-top: 2.5rem;
          display: grid;
          gap: 0.75rem;
        }
        .sistema-item {
          border: 1px solid rgba(245, 241, 232, 0.2);
          border-radius: 16px;
          overflow: hidden;
        }
        .sistema-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          background: transparent;
          border: none;
          color: var(--cream);
          padding: 1.25rem 1.5rem;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s ease;
        }
        .sistema-trigger:hover {
          background: rgba(245, 241, 232, 0.06);
        }
        .sistema-letter {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--lime);
          width: 2rem;
          flex-shrink: 0;
        }
        .sistema-heading {
          display: flex;
          flex-direction: column;
        }
        .sistema-word {
          font-weight: 700;
          font-size: 1.05rem;
        }
        .sistema-verbo {
          font-size: 0.9rem;
          opacity: 0.7;
        }
        .sistema-chevron {
          margin-left: auto;
          transition: transform 0.2s ease;
          flex-shrink: 0;
        }
        .sistema-item[data-open="true"] .sistema-chevron {
          transform: rotate(180deg);
        }
        .sistema-panel {
          padding: 0 1.5rem 1.5rem 4.75rem;
          font-size: 0.98rem;
          opacity: 0.85;
          max-width: 40rem;
        }

        /* Capacidades */
        .capacidades-grid {
          margin-top: 2.5rem;
          display: grid;
          gap: 1.25rem;
          grid-template-columns: 1fr;
        }
        @media (min-width: 760px) {
          .capacidades-grid {
            grid-template-columns: repeat(4, 1fr);
            grid-auto-rows: minmax(160px, auto);
          }
        }
        .capacidad-card {
          background: var(--ink-soft);
          border-radius: 18px;
          padding: 1.75rem;
          border: 1px solid transparent;
          transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
          cursor: default;
        }
        .capacidad-card:hover {
          transform: translateY(-3px);
          border-color: rgba(196, 244, 42, 0.35);
          background: #333329;
        }
        .capacidad-card h3 {
          font-size: 1.05rem;
          font-weight: 700;
          margin-bottom: 0.6rem;
          color: var(--lime);
        }
        .capacidad-card p {
          opacity: 0.8;
          font-size: 0.95rem;
        }
        /* La primera tarjeta (Sistemas conectados) es la pieza central del bento:
           ocupa el doble de ancho y alto en pantallas medianas+ para reflejar
           que es el diferenciador principal de OLI One. */
        @media (min-width: 760px) {
          .capacidad-card--featured {
            grid-column: span 2;
            grid-row: span 2;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .capacidad-card--featured h3 {
            font-size: 1.4rem;
          }
          .capacidad-card--featured p {
            font-size: 1.05rem;
            max-width: 26rem;
          }
        }

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

        /* Casos de uso */
        .casos-grid {
          margin-top: 2.5rem;
          display: grid;
          gap: 1.25rem;
        }
        @media (min-width: 760px) {
          .casos-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1080px) {
          .casos-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .caso-card {
          border: 1px solid var(--border-soft);
          border-radius: 16px;
          padding: 1.5rem;
          background: white;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .caso-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(26, 26, 24, 0.08);
        }
        .caso-card h3 {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .caso-card p {
          font-size: 0.92rem;
          opacity: 0.78;
        }

        /* Indicadores */
        .indicadores-list {
          margin-top: 2.5rem;
          display: grid;
          gap: 0.75rem;
          list-style: none;
          padding: 0;
          max-width: 40rem;
        }
        .indicadores-list li {
          padding: 1rem 1.25rem;
          background: white;
          border: 1px solid var(--border-soft);
          border-radius: 12px;
          font-weight: 500;
        }
        .indicadores-note {
          margin-top: 1.5rem;
          font-size: 0.9rem;
          opacity: 0.65;
          max-width: 38rem;
        }

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
          background: rgba(196, 244, 42, 0.35);
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
          border-top: 1px solid rgba(245, 241, 232, 0.15);
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
          <a href="#top" className="logo">OLI One</a>

          <nav aria-label="Navegación principal" className="nav-desktop">
            <a href="#metodo">Método SISTEMA®</a>
            <a href="#capacidades">Capacidades</a>
            <a href="#academy">OLI Academy</a>
            <a href="#casos">Casos de uso</a>
            <a href="#diagnostico">Contacto</a>
          </nav>

          <div className="header-actions">
            <a href="#diagnostico" className="btn btn--primary btn--primary-desktop-only" style={{ display: 'none' }}>
              Solicita un diagnóstico
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
            <a href="#casos" onClick={() => setMenuOpen(false)}>Casos de uso</a>
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
              <h1>Diseñamos empresas más inteligentes.</h1>
              <p className="hero__sub">
                Tu empresa no necesita más herramientas. Necesita un mejor sistema.
                Analizamos cómo funciona tu operación y construimos sistemas,
                automatizaciones y soluciones con inteligencia artificial para
                reducir trabajo repetitivo, conectar procesos y mejorar tu operación.
              </p>
              <div className="hero__ctas">
                <a href="#diagnostico" className="btn btn--lime">Solicita un diagnóstico</a>
                <a href="#metodo" className="btn btn--outline">Conoce el método SISTEMA®</a>
              </div>
            </div>
            <div className="hero__visual">
              <SystemDiagram />
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
            <ul className="problemas-list">
              {PROBLEMAS.map((problema) => (
                <li key={problema}>
                  <IconCheck />
                  <span>{problema}</span>
                </li>
              ))}
            </ul>
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
              <div className="valor-card">
                <h3>Consultoría, no plantillas</h3>
                <p>Cada sistema se diseña a partir de cómo opera tu empresa hoy, no de un paquete genérico.</p>
              </div>
              <div className="valor-card">
                <h3>Automatización con propósito</h3>
                <p>Automatizamos donde reduce trabajo real, no donde se ve bien en una demo.</p>
              </div>
              <div className="valor-card">
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
              El método SISTEMA®: un proceso consultivo, no una fórmula mágica.
            </h2>
            <p className="section-lede">
              Cada letra es una etapa real del trabajo que hacemos con tu empresa, en orden.
            </p>
            <div className="sistema-list">
              {SISTEMA_STEPS.map((step, index) => {
                const id = `${step.letter}-${index}`;
                const isOpen = openStep === id;
                return (
                  <div className="sistema-item" key={id} data-open={isOpen}>
                    <button
                      type="button"
                      className="sistema-trigger"
                      aria-expanded={isOpen}
                      aria-controls={`panel-${id}`}
                      onClick={() => setOpenStep(isOpen ? null : id)}
                    >
                      <span className="sistema-letter" aria-hidden="true">{step.letter}</span>
                      <span className="sistema-heading">
                        <span className="sistema-word">{step.word} — {step.verbo}</span>
                      </span>
                      <span className="sistema-chevron" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <path d="M4 7L9 12L14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                    {isOpen && (
                      <div className="sistema-panel" id={`panel-${id}`}>
                        {step.detalle}
                      </div>
                    )}
                  </div>
                );
              })}
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
            <div className="capacidades-grid">
              {CAPACIDADES.map((cap, index) => (
                <div
                  className={`capacidad-card${index === 0 ? ' capacidad-card--featured' : ''}`}
                  key={cap.titulo}
                >
                  <h3>{cap.titulo}</h3>
                  <p>{cap.detalle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OLI Academy */}
        <section className="section" id="academy" aria-labelledby="academy-title">
          <div className="container">
            <span className="eyebrow">Una solución de OLI One</span>
            <h2 id="academy-title" className="section-title">
              OLI Academy: la capacitación dentro de tu sistema.
            </h2>
            <div className="academy-card">
              <div>
                <span className="academy-tag">Una solución de OLI One</span>
                <h3>Academias digitales para capacitación, onboarding y cumplimiento.</h3>
                <p>
                  OLI Academy convierte el conocimiento interno de tu empresa en
                  cursos interactivos con seguimiento de progreso, para que la
                  capacitación deje de depender de explicar todo de palabra.
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

        {/* Casos de uso */}
        <section className="section" id="casos" style={{ paddingTop: 0 }} aria-labelledby="casos-title">
          <div className="container">
            <span className="eyebrow">Casos de uso</span>
            <h2 id="casos-title" className="section-title">
              Un sistema distinto para cada área, conectado al mismo lugar.
            </h2>
            <div className="casos-grid">
              {CASOS_USO.map((caso) => (
                <div className="caso-card" key={caso.depto}>
                  <h3>{caso.depto}</h3>
                  <p>{caso.detalle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Indicadores */}
        <section className="section" aria-labelledby="indicadores-title">
          <div className="container">
            <span className="eyebrow">Medición</span>
            <h2 id="indicadores-title" className="section-title">
              Esto es lo que medimos una vez implementado el sistema.
            </h2>
            <ul className="indicadores-list">
              {INDICADORES.map((ind) => (
                <li key={ind}>{ind}</li>
              ))}
            </ul>
            <p className="indicadores-note">
              Los resultados varían según cada empresa y proceso. Definimos las
              métricas específicas de tu operación durante el diagnóstico, antes
              de implementar cualquier cambio.
            </p>
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
