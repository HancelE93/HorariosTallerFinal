import { type Request, type Response } from "express";
import prisma from "../database/prisma.js";

export const obtenerMaterias = async (req: Request, res: Response) => {
    try {
        const materias = await prisma.courses.findMany({
            select: {
                id: true,
                name: true,
                day: true,
                start_time: true,
                end_time: true,
                modality: true,
                difficulty: true,
                credits: true,
                // funcion para obtener los prerequisitos de cada materia como un join con la tabla de prerequisitos
                prerequisites_prerequisites_course_idTocourses: true
            }
        });
        res.status(200).json(materias);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener materias" });
    }
};

export const obtenerMateriaPorId = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const materia = await prisma.courses.findUnique({
            where: { id: Number(id) },
            select: {
                id: true,
                name: true,
                day: true,
                start_time: true,
                end_time: true,
                modality: true,
                difficulty: true,
                credits: true,
                prerequisites_prerequisites_course_idTocourses: true
            }
        });

        if (!materia) {
            res.status(404).json({ error: `Materia con ID ${id} no encontrada` });
            return;
        }

        res.status(200).json(materia);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la materia" });
    }
};

export const crearMateria = async (req: Request, res: Response) => {
    const { name, day, start_time, end_time, startTime, endTime, modality, difficulty, credits, prerequisites } = req.body;

    const horaInicio = start_time || startTime;
    const horaFin = end_time || endTime;

    if (!name || !day || !horaInicio || !horaFin || !modality || !difficulty || !credits) {
        res.status(400).json({ error: "Todos los campos obligatorios deben estar presentes" });
        return;
    }

    try {
        const nuevaMateria = await prisma.courses.create({
            data: {
                name,
                day,
                start_time: new Date(`1970-01-01T${horaInicio}:00.000Z`),
                end_time: new Date(`1970-01-01T${horaFin}:00.000Z`),
                modality,
                difficulty,
                credits: Number(credits)
            }
        });

        // Con esta condicion se Valida que 'prerequisites' exista, sea un arreglo válido y contenga al menos un ID 
        // antes de insertar las relaciones

        if (prerequisites && Array.isArray(prerequisites) && prerequisites.length > 0) {
            await prisma.prerequisites.createMany({
                data: prerequisites.map((prereqId: number) => ({
                    course_id: nuevaMateria.id,
                    prerequisite_course_id: Number(prereqId)
                }))
            });
        }

        res.status(201).json(nuevaMateria);
    } catch (error) {
        res.status(500).json({ error: "Error al crear la materia" });
    }
};

export const actualizarMateria = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, day, start_time, end_time, startTime, endTime, modality, difficulty, credits } = req.body;

    const buscarMateria = await prisma.courses.findUnique({ where: { id: Number(id) } });

    if (!buscarMateria) {
        res.status(404).json({ error: `Materia con ID ${id} no encontrada` });
        return;
    }

    const horaInicio = start_time || startTime;
    const horaFin = end_time || endTime;

    try {
        const materiaActualizada = await prisma.courses.update({
            where: { id: Number(id) },
            data: { // Se deja el valor original si no se proporciona un nuevo valor en la solicitud
                name: name || buscarMateria.name,
                day: day || buscarMateria.day,
                start_time: horaInicio ? new Date(`1970-01-01T${horaInicio}:00.000Z`) : buscarMateria.start_time,
                end_time: horaFin ? new Date(`1970-01-01T${horaFin}:00.000Z`) : buscarMateria.end_time,
                modality: modality || buscarMateria.modality,
                difficulty: difficulty || buscarMateria.difficulty,
                credits: credits ? Number(credits) : buscarMateria.credits
            }
        });

        res.status(200).json(materiaActualizada);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la materia" });
    }
};

export const eliminarMateria = async (req: Request, res: Response) => {
    const { id } = req.params;

    const buscarMateria = await prisma.courses.findUnique({ where: { id: Number(id) } });

    if (!buscarMateria) {
        res.status(404).json({ error: `Materia con ID ${id} no encontrada` });
        return;
    }

    try {
        await prisma.courses.delete({ where: { id: Number(id) } });
        res.status(200).json({ mensaje: "Materia eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la materia" });
    }
};