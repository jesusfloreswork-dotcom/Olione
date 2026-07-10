// Validación manual del formulario de diagnóstico de OLI One.
// Se usa tanto en el cliente (feedback inmediato) como en el servidor
// (fuente de verdad, nunca confiar solo en el cliente).

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+()\-.\s]{7,20}$/;

export const COMPANY_SIZES = [
  { value: '1-10', label: '1 a 10 personas' },
  { value: '11-50', label: '11 a 50 personas' },
  { value: '51-200', label: '51 a 200 personas' },
  { value: '201-500', label: '201 a 500 personas' },
  { value: '500+', label: 'Más de 500 personas' },
];

export function validateLead(data) {
  const errors = {};

  if (!data.nombre || data.nombre.trim().length < 2) {
    errors.nombre = 'Escribe tu nombre completo.';
  }

  if (!data.empresa || data.empresa.trim().length < 2) {
    errors.empresa = 'Escribe el nombre de tu empresa.';
  }

  if (!data.puesto || data.puesto.trim().length < 2) {
    errors.puesto = 'Escribe tu puesto o rol.';
  }

  if (!data.correo || !EMAIL_REGEX.test(data.correo.trim())) {
    errors.correo = 'Escribe un correo válido.';
  }

  if (!data.telefono || !PHONE_REGEX.test(data.telefono.trim())) {
    errors.telefono = 'Escribe un teléfono válido.';
  }

  if (!data.tamanoEmpresa) {
    errors.tamanoEmpresa = 'Selecciona el tamaño de tu empresa.';
  }

  if (!data.proceso || data.proceso.trim().length < 5) {
    errors.proceso = 'Cuéntanos qué proceso quieres mejorar.';
  }

  if (!data.consentimiento) {
    errors.consentimiento = 'Necesitamos tu consentimiento para contactarte.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// Campos permitidos que pasan de cliente a servidor a Supabase.
// Cualquier campo fuera de esta lista se ignora al insertar.
export const LEAD_FIELDS = [
  'nombre',
  'empresa',
  'puesto',
  'correo',
  'telefono',
  'tamanoEmpresa',
  'proceso',
  'herramientas',
  'mensaje',
  'consentimiento',
  'utmSource',
  'utmMedium',
  'utmCampaign',
  'utmTerm',
  'utmContent',
];
