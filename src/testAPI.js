import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config(); // carga variables desde .env

const TOKEN = process.env.JWT_TOKEN;
const BASE_URL = process.env.API_URL;

const rutas = [
    "usuarios",
    "productos",
    "clientes",
    "pedidos"
];

async function probarRutas() {
    for (const ruta of rutas) {
        try {
            const res = await axios.get(`${BASE_URL}/${ruta}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    "Content-Type": "application/json"
                }
            });
            console.log(`✅ ${ruta}:`, res.data);
        } catch (err) {
            if (err.response) {
                console.error(`❌ ${ruta} →`, err.response.data);
            } else {
                console.error(`❌ ${ruta} →`, err);
            }
        }
    }
}

probarRutas();
