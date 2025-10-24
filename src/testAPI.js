import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const TOKEN = process.env.JWT_TOKEN;
const BASE_URL = process.env.API_URL;

// Rutas a probar
const rutas = [
    { method: 'GET', path: 'usuarios' },
    { method: 'GET', path: 'usuarios/1' },
    { method: 'POST', path: 'productos', body: { nombre: 'Producto prueba', precio: 10 } },
    { method: 'PUT', path: 'productos/53', body: { nombre: 'Producto actualizado', precio: 15 } },
    { method: 'DELETE', path: 'productos/53' }
    // Agrega más rutas según tu API
];

// Función para ejecutar cada request
async function ejecutarRequest({ method, path, body }) {
    try {
        const config = {
            method,
            url: `${BASE_URL}/${path}`,
            headers: {
                Authorization: `Bearer ${TOKEN}`,
                'Content-Type': 'application/json'
            },
            data: body || null
        };
        const res = await axios(config);
        console.log(`✅ ${method} /${path} → OK`);
        console.log(res.data);
    } catch (err) {
        if (err.response) {
            console.error(`❌ ${method} /${path} →`, err.response.data);
        } else {
            console.error(`❌ ${method} /${path} → Error desconocido`, err.message);
        }
    }
}

// Ejecutar todas las rutas secuencialmente
async function probarAPI() {
    for (const ruta of rutas) {
        console.log('----------------------------');
        await ejecutarRequest(ruta);
    }
}

probarAPI();
