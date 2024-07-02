import { Router } from "express";
import {
  createProductos,
  getProductos,
  deleteProductoById,
  getProductosById,
  updateProductoById,
  //getProductosByCategoria,
} from "../controllers/productos.controller.js";

const router = Router();
router.get("/", getProductos);
router.get("/:id", getProductosById);
router.post("/", createProductos);
router.put("/:id", updateProductoById);
router.delete("/:id", deleteProductoById);

export default router;