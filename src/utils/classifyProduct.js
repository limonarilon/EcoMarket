/**
 * classify(product)
 * Asigna una categoría a un producto usando heurística de palabras clave
 * y, opcionalmente, un mapeo por ID.
 *
 * Devuelve: 'dulce' | 'salado' | 'integral' | 'bebestibles' | 'sin-categoria'
 */
const CATEGORY_BY_ID = {
    // Opcional: mantener pares id: 'categoria' si se quiere forzar categorización por id
    // 101: 'dulce', 201: 'salado', ...
    // Esto permitiría que no hayan "falsos positivos" en la clasificación por palabras clave. POrjemplo:
    // si un producto llamado "Pan de chocolate" debe ser 'dulce' y no 'salado' aunque tenga la palabra pan.
 };

const KEYWORDS = {
    dulce: ['chocolate', 'gallet', 'mermelad', 'miel', 'barra', 'dulce', 'manteca'],
    salado: ['quinoa', 'aceitun', 'aceite', 'salado', 'semilla', 'semillas', 'pasta', 'sal', 'snack', 'frutos secos', 'fruto seco'],
    integral: ['integral', 'harina', 'pan', 'tortilla', 'cereal', 'avena', 'grano'],
    bebestibles: ['kombucha', 'agua', 'jugo', 'leche', 'té', 'te', 'bebida', 'bebestible', 'jugos', 'té']
};

export function classify(product) {
    // Normalizamos el texto donde buscaremos palabras clave.
    // Usamos varios campos por compatibilidad con distintas APIs.
    const raw = product?.nombre ?? product?.name ?? product?.title ?? product?.descripcion ?? product?.description ?? '';
    const text = String(raw).toLowerCase();

    // 1) Si hay un mapeo explícito por ID, lo respetamos.
    if (product?.id !== undefined && CATEGORY_BY_ID[product.id]) {
        return CATEGORY_BY_ID[product.id];
    }

    // 2) Buscar coincidencias de palabras clave por categoría.
    for (const [category, keywords] of Object.entries(KEYWORDS)) {
        for (const kw of keywords) {
            if (text.includes(kw)) {
                return category;
            }
        }
    }

    // 3) Si no encontramos nada, retornamos 'sin-categoria'
    return 'sin-categoria';
}

export function classifyMany(products) {
    return products.map(p => ({ ...p, category: p.category ?? classify(p) }));
}