export function formatPriceCLP(value) {
  if (value === undefined || value === null) return "";
  try {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(Number(value));
  } catch (e) {
    return `$${value}`;
  }
}
