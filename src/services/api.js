
import axios from 'axios';

/*
	src/services/api.js

	Servicio centralizado para comunicar el frontend con el backend Java (Spring).

	- Usa axios y toma la URL base desde la variable de entorno Vite:
			VITE_API_BASE_URL (por ejemplo: http://localhost:8080)
		Si no existe, cae al fallback 'http://localhost:8080'.

	- Maneja automáticamente:
		* Extracción de listas devueltas en formato HAL (_embedded)
		* Mapeo de campos del backend (manteniendo nombres en español: nombre, precio, stock)
		* Omisión del campo `contrasena` al exponer usuarios a la UI
		* Interceptor para añadir Authorization: Bearer <token> si hay token en localStorage
		* Funciones CRUD exportadas para `productos` y `usuarios`

	Notas:
	- El backend usa Spring HATEOAS y las listas vienen dentro de `resp.data._embedded`.
	- `precio` está en enteros CLP (pesos chilenos). Para mostrarlo en la UI usar
		`formatPriceCLP(value)`.
	- No se modifica el backend; el frontend mapea y usa los mismos nombres de campos.
*/

// URL base configurable por Vite (.env): VITE_API_BASE_URL
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 10000,
});

// Interceptor de peticiones: si existe un token en localStorage, lo añade
// al header Authorization en cada request. Esto facilita usar JWT sin
// repetir el header en cada llamada.
api.interceptors.request.use((config) => {
	try {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers = config.headers || {};
			config.headers.Authorization = `Bearer ${token}`;
		}
	} catch (e) {
		// Si no se puede acceder a localStorage (por ejemplo en tests), no fallar
	}
	return config;
});

/**
 * Extrae de forma segura la lista dentro de la propiedad HAL `_embedded`.
 * Si no existe `_embedded` o la key, devuelve un arreglo vacío.
 *
 * Ejemplo: extractEmbedded(resp, 'productoModelList') -> [ {...}, {...} ]
 */
function extractEmbedded(resp, key) {
	return resp?.data?._embedded?.[key] ?? [];
}

/**
 * Mapea el objeto recibido desde la API a la forma que usará la UI.
 * Conservamos los nombres del backend (`nombre`, `precio`, `stock`) para
 * evitar cambios en el backend. `_links` se mantiene por si es necesario.
 */
function mapProducto(apiItem) {
	// Convertimos los campos del backend (español) a los que espera el frontend
	// (inglés), para no tener que cambiar todos los componentes.
	return {
		id: apiItem.id,
		name: apiItem.nombre,
		price: apiItem.precio, // entero en CLP
		stock: apiItem.stock,
		// Si el backend devuelve campos extra (por ejemplo categoria, expirationDate),
		// los podemos incluir aquí si existen.
		expirationDate: apiItem.expirationDate ?? apiItem.fechaExpiracion ?? null,
		category: apiItem.categoria ?? null,
		_links: apiItem._links,
	};
}

/**
 * Mapea usuario y elimina el campo `contrasena` antes de exponerlo a la UI.
 * El backend puede devolver hashes en `contrasena`, pero no deben mostrarse
 * ni propagarse en la interfaz.
 */
function mapUsuario(apiItem) {
	// Mapeamos a los campos que usan los componentes del frontend
	return {
		id: apiItem.id,
		name: apiItem.nombre,
		email: apiItem.correo,
		role: apiItem.rol,
		_links: apiItem._links,
	};
}

// --- Productos ---
// --- Productos ---
// Funciones para obtener/crear/actualizar/eliminar productos.
// Todas esperan y devuelven objetos con los nombres del backend.
export async function getProducts(params = {}) {
	const resp = await api.get('/productos', { params });
	const items = extractEmbedded(resp, 'productoModelList');
	return items.map(mapProducto);
}

export async function getProduct(id) {
	const resp = await api.get(`/productos/${id}`);
	// En este caso la API devuelve el objeto directamente (no HAL)
	return mapProducto(resp.data);
}

export async function createProduct(product) {
	// product esperado en el frontend: { name, price, stock, expirationDate?, category? }
	// Aquí mapeamos al payload que espera el backend (español): nombre, precio, stock
	const payload = {
		nombre: product.name,
		precio: product.price,
		stock: product.stock,
		// Si el backend soporta campos adicionales como 'categoria' o 'expirationDate',
		// podemos incluirlos. Si no los soporta, el backend normalmente los ignorará.
		...(product.category ? { categoria: product.category } : {}),
		...(product.expirationDate ? { expirationDate: product.expirationDate } : {}),
	};
	const resp = await api.post('/productos', payload);
	return mapProducto(resp.data);
}

export async function updateProduct(id, product) {
	const payload = {
		nombre: product.name,
		precio: product.price,
		stock: product.stock,
		...(product.category ? { categoria: product.category } : {}),
		...(product.expirationDate ? { expirationDate: product.expirationDate } : {}),
	};
	const resp = await api.put(`/productos/${id}`, payload);
	return mapProducto(resp.data);
}

export async function deleteProduct(id) {
	const resp = await api.delete(`/productos/${id}`);
	return resp.status === 200 || resp.status === 204;
}

// --- Usuarios ---
// --- Usuarios ---
export async function getUsers(params = {}) {
	const resp = await api.get('/usuarios', { params });
	const items = extractEmbedded(resp, 'usuarioModelList');
	return items.map(mapUsuario);
}

export async function getUser(id) {
	const resp = await api.get(`/usuarios/${id}`);
	return mapUsuario(resp.data);
}

export async function createUser(user) {
	// user esperado por los componentes del frontend: { name, email, password, role }
	// Mapear al payload que espera el backend: nombre, correo, contrasena, rol
	const payload = {
		nombre: user.name,
		correo: user.email,
		contrasena: user.password,
		rol: user.role || (user.role === undefined ? 'USER' : user.role),
	};
	const resp = await api.post('/usuarios', payload);
	return mapUsuario(resp.data);
}

export async function updateUser(id, user) {
	const payload = {
		nombre: user.name,
		correo: user.email,
		...(user.password ? { contrasena: user.password } : {}),
		rol: user.role,
	};
	const resp = await api.put(`/usuarios/${id}`, payload);
	return mapUsuario(resp.data);
}

export async function deleteUser(id) {
	const resp = await api.delete(`/usuarios/${id}`);
	return resp.status === 200 || resp.status === 204;
}

/**
 * Utilitario para formatear precios en CLP (enteros). Devuelve un string
 * legible para mostrar en la interfaz, por ejemplo "$12.000".
 */
export function formatPriceCLP(value) {
	try {
		return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
	} catch (e) {
		return String(value);
	}
}

export default api;
