import { Router } from "express";
import {
  getobetenerClientes,
  getClientesxId,
  getClientePorCedula, // ✅ nuevo
  postClientes,
  putClientes,
  deleteClientes,
} from "../controladores/clientesCtrl.js";

import { verifyToken } from "../jwt/verifytoken.js";

const router = Router();

// ✅ Ruta nueva para buscar por cédula
router.get("/cedula/:cedula", verifyToken, getClientePorCedula);

// ✅ Rutas existentes
router.get("/", verifyToken, getobetenerClientes);
router.get("/:id", verifyToken, getClientesxId);
router.post("/", verifyToken, postClientes);
router.put("/:id", verifyToken, putClientes);
router.delete("/:id", verifyToken, deleteClientes);

export default router;

