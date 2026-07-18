'use client';

import { usePathname } from 'next/navigation';

const WHATSAPP_NUMBER = '528444443742';
const WHATSAPP_MESSAGE = 'Hola, vengo del sitio de Oli y quiero un diagnóstico';

export default function WhatsAppButton() {
  const pathname = usePathname();

  // No mostrar el botón dentro del CRM interno.
  if (pathname?.startsWith('/admin')) return null;

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Escríbenos por WhatsApp"
    >
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          d="M16.02 3C9.4 3 4 8.36 4 14.94c0 2.24.63 4.34 1.72 6.14L4 29l8.2-2.1a12.9 12.9 0 0 0 3.82.58c6.62 0 12.02-5.36 12.02-11.94C28.04 8.36 22.64 3 16.02 3Z"
          fill="#25D366"
        />
        <path
          d="M12.1 9.6c-.28-.62-.5-.63-.77-.64h-.66c-.23 0-.6.08-.92.42-.31.35-1.2 1.16-1.2 2.84 0 1.68 1.23 3.3 1.4 3.53.17.23 2.38 3.8 5.87 5.17 2.9 1.14 3.49.91 4.12.85.63-.06 2.03-.82 2.32-1.62.28-.8.28-1.48.2-1.62-.08-.14-.31-.23-.65-.4-.34-.17-2.03-1-2.35-1.11-.31-.12-.54-.17-.77.17-.23.34-.88 1.11-1.08 1.34-.2.23-.4.26-.74.09-.34-.17-1.43-.53-2.72-1.68-1-.9-1.68-2-1.88-2.35-.2-.34-.02-.53.15-.7.15-.15.34-.4.5-.6.17-.2.23-.34.34-.57.11-.23.06-.43-.03-.6-.09-.17-.75-1.87-1.06-2.55Z"
          fill="white"
        />
      </svg>
    </a>
  );
}
