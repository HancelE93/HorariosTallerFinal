import { Router } from "express";
import { obtenerMaterias, obtenerMateriaPorId, crearMateria, actualizarMateria, eliminarMateria} from "../controllers/course.controller.js";

const router = Router();

router.get("/", obtenerMaterias);
router.get("/:id", obtenerMateriaPorId);
router.post("/", crearMateria);
router.put("/:id", actualizarMateria);
router.delete("/:id", eliminarMateria);

export default router;