import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://olione.vercel.app';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Oli — Empresas más inteligentes',
  description:
    'Oli analiza cómo funciona tu empresa y construye sistemas, automatizaciones y soluciones con inteligencia artificial para reducir trabajo repetitivo, conectar procesos y mejorar tu operación.',
  keywords: [
    'automatización de procesos',
    'inteligencia artificial para empresas',
    'sistemas empresariales',
    'consultoría tecnológica',
    'Oli',
  ],
  authors: [{ name: 'Oli' }],
  openGraph: {
    title: 'Oli — Empresas más inteligentes',
    description:
      'Tu empresa no necesita más herramientas. Necesita un mejor sistema.',
    url: siteUrl,
    siteName: 'Oli',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oli — Empresas más inteligentes',
    description:
      'Tu empresa no necesita más herramientas. Necesita un mejor sistema.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Oli',
  url: siteUrl,
  description:
    'Oli diseña sistemas, automatizaciones y soluciones con inteligencia artificial para empresas.',
  slogan: 'Empresas más inteligentes.',
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Consultoría en sistemas y automatización empresarial con IA',
  provider: {
    '@type': 'Organization',
    name: 'Oli',
  },
  areaServed: 'MX',
  description:
    'Diagnóstico, diseño e implementación de sistemas, automatizaciones y agentes de IA para empresas, siguiendo el método SISTEMA®.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
      </body>
    </html>
  );
}
