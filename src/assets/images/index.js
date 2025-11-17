const images = import.meta.glob('./*.{png,jpg,jpeg,svg}', { eager: true });
const formattedImages = {};

for (const path in images) {
  const key = path
    .replace('./', '')       // quitar "./"
    .replace(/\.[^/.]+$/, ''); // quitar extensión
  formattedImages[key] = images[path].default;
}

export default formattedImages;
