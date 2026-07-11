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
  title: 'OLI One — Empresas más inteligentes',
  description:
    'OLI One analiza cómo funciona tu empresa y construye sistemas, automatizaciones y soluciones con inteligencia artificial para reducir trabajo repetitivo, conectar procesos y mejorar tu operación.',
  keywords: [
    'automatización de procesos',
    'inteligencia artificial para empresas',
    'sistemas empresariales',
    'consultoría tecnológica',
    'OLI One',
  ],
  authors: [{ name: 'OLI One' }],
  openGraph: {
    title: 'OLI One — Empresas más inteligentes',
    description:
      'Tu empresa no necesita más herramientas. Necesita un mejor sistema.',
    url: siteUrl,
    siteName: 'OLI One',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OLI One — Empresas más inteligentes',
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
  name: 'OLI One',
  url: siteUrl,
  description:
    'OLI One diseña sistemas, automatizaciones y soluciones con inteligencia artificial para empresas.',
  slogan: 'Empresas más inteligentes.',
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Consultoría en sistemas y automatización empresarial con IA',
  provider: {
    '@type': 'Organization',
    name: 'OLI One',
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
