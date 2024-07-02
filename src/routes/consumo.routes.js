import express from "express";
import {
    createConsumo, 
    createDetallesConsumo,
    getConsumosByMesa,
    closeStatus,
    generatePDF
} from "../controllers/consumo.controller.js";

const router = express.Router();

router.post("/", createConsumo);
router.post("/detalles", createDetallesConsumo);
router.get("/mesa/:idMesa", getConsumosByMesa);
router.put("/close/:id", closeStatus);
router.get("/pdf/:idMesa", generatePDF);

export default router;
