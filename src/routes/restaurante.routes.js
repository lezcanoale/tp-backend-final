import { Router } from "express";
import {
    createRestaurante,
    getRestaurantes,
    getRestauranteById,
    deleteRestauranteById,
    updateRestauranteById,
} from "../controllers/restaurante.controller.js";

const router = Router();
router.get("/", getRestaurantes);
router.get("/:id", getRestauranteById);
router.post("/", createRestaurante);
router.put("/:id", updateRestauranteById);
router.delete("/:id", deleteRestauranteById);

export default router;