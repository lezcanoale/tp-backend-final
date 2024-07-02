import { Router } from "express";
import {
  createCategoria,
  getCategorias,
  deleteCategoriaById,
  getCategoriaById,
  updateCategoriaById,
} from "../controllers/categoria.controller.js";

const router = Router();
router.get("/", getCategorias);
router.get("/:id", getCategoriaById);
router.post("/", createCategoria);
router.put("/:id", updateCategoriaById);
router.delete("/:id", deleteCategoriaById);

export default router;
