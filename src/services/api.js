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
		// silencioso: no rompemos la petición si falla el acceso a localStorage
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
	const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

	
	const rawImg =
		apiItem.imagen ??
		apiItem.img ??
		apiItem.image ??
		null;

	let img = null;

	if (rawImg) {
		const isAbsolute =
			rawImg.startsWith('http://') ||
			rawImg.startsWith('https://') ||
			rawImg.startsWith('//');

		img = isAbsolute
			? rawImg
			: `${apiBase}/productos/uploads/${rawImg}`;
	}

	return {
		id: apiItem.id,
		name: apiItem.nombre,
		price: apiItem.precio,
		img,
		stock: apiItem.stock,
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
		email: apiItem.email,
		role: apiItem.rol,
		_links: apiItem._links,
	};
}

// --- Productos ---

// Funciones para obtener/crear/actualizar/eliminar productos.
// Todas esperan y devuelven objetos con los nombres del backend.
export async function getProducts(params = {}) {
	const resp = await api.get('/productos', { params });
	const items = extractEmbedded(resp, 'productoModelList');
	return items.map(mapProducto);
}

// (debug helper removed) -- keeping API functions minimal

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

export async function getUsers(params = {}) {
  const resp = await api.get('/usuarios', { params });
  const items = resp.data._embedded?.usuarioModelList || resp.data; // Manejar ambos casos
  return items.map(mapUsuario);
}

export async function getUser(id) {
	const resp = await api.get(`/usuarios/${id}`);
	return mapUsuario(resp.data);
}

export async function createUser(user) {
  const payload = {
    nombre: user.nombre ?? user.name,   // <-- asegúrate de usar `nombre`
    email: user.email,
    password: user.password,
    rut: user.rut,
    rol: user.rol || 'USER'
  };

  try {
    const resp = await api.post('/usuarios', payload);
    return mapUsuario(resp.data);
  } catch (err) {
    console.error('--- ERROR EN CREATEUSER ---');
    console.error('Payload enviado:', payload);
    console.error('Response completa del backend:', err.response);
    throw err;
  }
}



export async function updateUser(id, user) {
	const payload = {
		nombre: user.nombre ?? user.name,
		email: user.email,
		...(user.password ? { contrasena: user.password } : {}),
		rut: user.rut,
		rol: user.rol
	};
	const resp = await api.put(`/usuarios/${id}`, payload);
	return mapUsuario(resp.data);
}

export async function deleteUser(id) {
	const resp = await api.delete(`/usuarios/${id}`);
	return resp.status === 200 || resp.status === 204;
}

// --- Pedidos (boletas) ---
/**
 * Mapea un objeto Pedido devuelto por el backend a una forma usada por la UI.
 * - Convierte `idPedido` -> `id`
 * - Mantiene `fecha`, `estado`, `total` y mapea `productos` usando `mapProducto`
 */
function mapOrder(apiItem) {
	// A veces el assembler puede envolver el modelo; intentamos obtener el objeto real
	const item = apiItem && apiItem.idPedido !== undefined ? apiItem : (apiItem && apiItem.pedido ? apiItem.pedido : apiItem);

	return {
		id: item?.idPedido,
		fecha: item?.fecha,
		estado: item?.estado,
		total: item?.total !== undefined ? Number(item.total) : null,
		productos: (item?.productos ?? []).map(mapProducto),
		_links: item?._links,
	};
}

export async function getOrders(params = {}) {
	const resp = await api.get('/pedidos', { params });
	const items = extractEmbedded(resp, 'pedidoModelList');
	return items.map(mapOrder);
}

export async function getOrder(id) {
	const resp = await api.get(`/pedidos/${id}`);
	return mapOrder(resp.data);
}

export async function createOrder(order) {
	// order puede contener: fecha, estado, total, productos (array)
	const payload = {
		...(order.fecha ? { fecha: order.fecha } : {}),
		...(order.estado ? { estado: order.estado } : {}),
		...(order.total !== undefined ? { total: order.total } : {}),
		...(order.productos ? { productos: order.productos.map(p => ({
			id: p.id,
			nombre: p.name ?? p.nombre,
			precio: p.price ?? p.precio,
			stock: p.stock,
			img: p.img ?? p.image ?? null,
			expirationDate: p.expirationDate ?? p.fechaExpiracion ?? null,
		})) } : {}),
	};

	const resp = await api.post('/pedidos', payload);
	return mapOrder(resp.data);
}

export async function updateOrder(id, order) {
	const payload = {
		...(order.fecha ? { fecha: order.fecha } : {}),
		...(order.estado ? { estado: order.estado } : {}),
		...(order.total !== undefined ? { total: order.total } : {}),
		...(order.productos ? { productos: order.productos } : {}),
	};
	const resp = await api.put(`/pedidos/${id}`, payload);
	return mapOrder(resp.data);
}

export async function deleteOrder(id) {
	const resp = await api.delete(`/pedidos/${id}`);
	return resp.status === 200 || resp.status === 204;
}

export async function addProductToOrder(idPedido, idProducto) {
	const resp = await api.post(`/pedidos/${idPedido}/productos/${idProducto}`);
	return mapOrder(resp.data);
}

export async function removeProductFromOrder(idPedido, idProducto) {
	const resp = await api.delete(`/pedidos/${idPedido}/productos/${idProducto}`);
	return mapOrder(resp.data);
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

/**
 * Realiza el inicio de sesión enviando las credenciales del usuario al servidor.
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {Promise<{ token: string, role: string }>} - Devuelve el token JWT y el rol del usuario.
 * @throws {Error} - Lanza un error si las credenciales son incorrectas o si ocurre algún problema.
 */
export async function login(email, password) {
  try {
    const response = await api.post('/auth/login', { email, password });

    // Extraer el token y el rol de la respuesta del servidor
    const { token, role } = response.data;

    // Guardar el token en localStorage para futuras solicitudes
    localStorage.setItem('token', token);

    return { token, role };
  } catch (error) {
    // Manejar errores del servidor
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);//si el servidor devuelve un mensaje de error
    }
    throw new Error('Error al iniciar sesión. Por favor, intenta nuevamente.');//si no, error genérico
  }
}

export default api;
