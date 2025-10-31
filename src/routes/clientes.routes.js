import { Router } from "express";
import {
  obetenerClientes,
  getobetenerClientes,
  getClientesxId,
  postClientes,
  putClientes,
  patchClientes,
  deleteClientes
} from "../controladores/clientesCtrl.js";

import { verifyToken } from "../jwt/verifytoken.js"; // 🔐 Importamos el middleware de verificación

const router = Router();

// 🧩 Rutas protegidas con verifyToken
router.get("/", verifyToken, getobetenerClientes); // obtener todos
router.get("/:id", verifyToken, getClientesxId);  // obtener por id

// 🔓 Rutas abiertas (puedes protegerlas también si quieres)
router.post("/", verifyToken,postClientes);  // insertar
router.put("/:id",verifyToken, putClientes);  // actualizar completo
router.patch("/:id", verifyToken,patchClientes); // actualizar parcial
router.delete("/:id",verifyToken, deleteClientes); // eliminar

export default router;
