const images = import.meta.glob('../assets/images/*.{png,jpg,jpeg,svg}', { eager: true });
const formattedImages = {};

for (const path in images) {
  // Extraemos el nombre sin extensión y lo usamos como key
  const key = path.replace('./', '').replace(/\.[^/.]+$/, '');
  formattedImages[key] = images[path].default;
}

export default formattedImages;