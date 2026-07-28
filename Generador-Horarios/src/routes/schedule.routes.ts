import { Router } from "express";
import { generarHorarios } from "../controllers/schedule.controller.js";

const router = Router();

router.post("/generate", generarHorarios);

export default router;