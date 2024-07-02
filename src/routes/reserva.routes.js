import express from "express";
import {
    getReservas,
    postReservas,
    putReservas,
    deleteReservas,
    getLibres
   } from "../controllers/reserva.controller.js";

const router = express.Router();

router.post("/", postReservas)
router.get("/", getReservas)
router.put("/:id", putReservas)
router.delete("/:id", deleteReservas)
router.post("/libres", getLibres)

export default router;