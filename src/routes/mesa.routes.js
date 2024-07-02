import { Router } from "express";
import {
  createMesa,
  getMesas,
  deleteMesaById,
  getMesaById,
  updateMesaById,
  getMesasByRestaurante,
} from "../controllers/mesa.controller.js";

const router = Router();
router.get("/", getMesas);
router.get("/:id", getMesaById);
router.post("/", createMesa);
router.put("/:id", updateMesaById);
router.delete("/:id", deleteMesaById);
router.get("/restaurante/:restauranteId", getMesasByRestaurante);


export default router;