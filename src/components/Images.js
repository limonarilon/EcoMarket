const images = import.meta.glob('../assets/images/*.{png,jpg,jpeg,svg}', { eager: true });
const formattedImages = {};

for (const path in images) {
  const keyBase = path.replace('../', '').replace(/\.[^/.]+$/, '');
  const baseName = keyBase.split('/').pop();
  formattedImages[baseName] = images[path].default;
  formattedImages[keyBase] = images[path].default;
  formattedImages[`.${keyBase}`] = images[path].default;
}

function isAbsoluteUrl(s) {
  return typeof s === 'string' && (s.startsWith('http://') || s.startsWith('https://') || s.startsWith('//'));
}

/**
 * getImageSrc(nameOrUrl)
 * - Si recibe una URL absoluta la devuelve tal cual.
 * - Si recibe una clave/nombre trata de resolverla contra los assets importados.
 * - Si no encuentra nada devuelve la primera imagen disponible como fallback.
 */
export function getImageSrc(nameOrUrl) {
  if (!nameOrUrl) return formattedImages['equipo-trabajo'] || Object.values(formattedImages)[0];
  if (isAbsoluteUrl(nameOrUrl)) return nameOrUrl;
  const cleaned = String(nameOrUrl).replace(/^\.\//, '').replace(/^\//, '').replace(/\.[^/.]+$/, '');
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
  return Object.values(formattedImages)[0];
}

export default formattedImages;