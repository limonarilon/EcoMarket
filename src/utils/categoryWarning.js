import { classify } from '../utils/classifyProduct';

export function getCategoryWarning(name, description) {
  const product = { name, descripcion: description };
  const category = classify(product);
  return category === 'sin-categoria';
}
