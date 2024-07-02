import { Router } from "express";
import {
    createCliente,
    getClientes,
    getOneCliente,
    deleteCliente,
    updateCliente,
    getClientByCedula
} from "../controllers/cliente.controller.js";

const router = Router();
router.get("/", getClientes);
router.get("/:id", getOneCliente);
router.post("/", createCliente);
router.put("/:id", updateCliente);
router.delete("/:id", deleteCliente);
router.get("/cedula/:cedula", getClientByCedula);


export default router;