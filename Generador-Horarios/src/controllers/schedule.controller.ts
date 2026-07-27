import { type Request, type Response } from 'express';
import prisma from '../database/prisma.js';
import { type ScheduleConfiguration, type Course } from '../utils/scheduleGenerator.js';

export const generarHorarios = async (req: Request, res: Response) => {
  try {
    const config: ScheduleConfiguration = req.body;

    // Se obtiene la lista de materias como conjutno universal
    const dbCourses = await prisma.courses.findMany();

    const totalCoursesInDb = dbCourses.length;

    //  Validación de disponibilidad
    if (config.numberOfCourses > totalCoursesInDb) {
      return res.status(400).json({
        error: `No existen suficientes materias disponibles en el sistema (${totalCoursesInDb}) para cumplir con la cantidad solicitada (${config.numberOfCourses}).`
      });
    }

    // Se evalua la logica que contenga la materias disponibles 
    return res.status(200).json({
      message: "Configuración recibida y validada correctamente.",
      availableCourses: totalCoursesInDb,
      requestedCourses: config.numberOfCourses
    });

  } catch (error) {
    return res.status(500).json({ error: "Error al procesar la configuración del horario." });
  }
};