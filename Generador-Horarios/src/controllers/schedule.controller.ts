import { type Request, type Response } from 'express';
import prisma from '../database/prisma.js';
import { type ScheduleConfiguration, type Course, calculateCombinationCount } from '../utils/scheduleGenerator.js';

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

    const totalCombinations = calculateCombinationCount(totalCoursesInDb, config.numberOfCourses);

    // Respuesta parcial de prueba
    return res.status(200).json({
      totalCourses: totalCoursesInDb,
      selectedAmount: config.numberOfCourses,
      totalCombinations: totalCombinations,
      message: `Con ${totalCoursesInDb} materias disponibles se pueden formar ${totalCombinations} combinaciones de ${config.numberOfCourses} materias.`
    });

  } catch (error) {
    return res.status(500).json({ error: "Error al procesar la configuración del horario." });
  }
};