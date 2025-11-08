import { Router } from "express";
import { postCompra } from "../controladores/comprasCtrl.js";
import { verifyToken } from "../jwt/verifytoken.js";

const router = Router();

router.post("/", verifyToken, postCompra);

export default router;
