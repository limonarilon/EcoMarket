const images = import.meta.glob('./*.{png,jpg,jpeg,svg}', { eager: true });
const formattedImages = {};

for (const path in images) {
  const keyBase = path
    .replace('./', '')
    .replace(/\.[^/.]+$/, '');
  // keyBase ejemplo: 'pasta' o 'blog-banner'
  formattedImages[keyBase] = images[path].default;
  // también registrar con posible prefijos para compatibilidad
  formattedImages[`assets/images/${keyBase}`] = images[path].default;
  formattedImages[`./assets/images/${keyBase}`] = images[path].default;
  formattedImages[`.assets/images/${keyBase}`] = images[path].default;
}

function isAbsoluteUrl(s) {
  return typeof s === 'string' && (s.startsWith('http://') || s.startsWith('https://') || s.startsWith('//'));
}

export function getImageSrc(nameOrUrl) {
  if (!nameOrUrl) return formattedImages['.assets/images/equipo-trabajo'];
  if (isAbsoluteUrl(nameOrUrl)) return nameOrUrl;
  const cleaned = String(nameOrUrl).replace(/^\.\/|^\/|^\.\//, '').replace(/\.[^/.]+$/, '');
  // try several candidate keys
  const candidates = [
    cleaned,
    `assets/images/${cleaned}`,
    `./assets/images/${cleaned}`,
    `.assets/images/${cleaned}`,
    cleaned.replace(/^assets\//, ''),
  ];
  for (const c of candidates) {
    if (formattedImages[c]) return formattedImages[c];
  }
  return formattedImages['.assets/images/equipo-trabajo'];
}

export default formattedImages;
