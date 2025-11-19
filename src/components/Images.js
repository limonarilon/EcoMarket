const images = import.meta.glob('../assets/images/*.{png,jpg,jpeg,svg}', { eager: true });
const formattedImages = {};

// Carga las imágenes locales y genera múltiples llaves de acceso
for (const path in images) {
  const keyBase = path.replace('../', '').replace(/\.[^/.]+$/, '');
  const baseName = keyBase.split('/').pop();

  formattedImages[baseName] = images[path].default;       // ejemplo: "producto1"
  formattedImages[keyBase] = images[path].default;        // ejemplo: "assets/images/producto1"
  formattedImages[`.${keyBase}`] = images[path].default;  // ejemplo: "./assets/images/producto1"
}

// Detecta si una string es una URL absoluta válida
function isAbsoluteUrl(s) {
  return (
    typeof s === 'string' &&
    (s.startsWith('http://') ||
      s.startsWith('https://') ||
      s.startsWith('//'))
  );
}

/**
 * getImageSrc(nameOrUrl)
 * - Si recibe una URL absoluta → la devuelve tal cual.
 * - Si recibe una cadena vacía o null → devuelve fallback.
 * - Si recibe una clave → la intenta resolver contra los assets locales.
 */
export function getImageSrc(nameOrUrl) {
  // Si no viene nada → fallback local
  if (!nameOrUrl) {
    return formattedImages['equipo-trabajo'] || Object.values(formattedImages)[0];
  }

  // 👉 Si ya es una URL del backend o externa — NO TOCAR
  if (isAbsoluteUrl(nameOrUrl)) {
    return nameOrUrl;
  }

  // Limpieza del nombre para búsquedas internas
  const cleaned = String(nameOrUrl)
    .replace(/^\.\//, '')
    .replace(/^\//, '')
    .replace(/\.[^/.]+$/, '');

  // Candidatos razonables para imágenes locales
  const candidates = [
    cleaned,
    cleaned.split('/').pop(),
    `assets/images/${cleaned}`,
    `./assets/images/${cleaned}`,
    `.${cleaned}`,
  ];

  for (const c of candidates) {
    if (formattedImages[c]) return formattedImages[c];
  }

  // Fallback si no se encuentra nada
  return Object.values(formattedImages)[0];
}

export default formattedImages;
