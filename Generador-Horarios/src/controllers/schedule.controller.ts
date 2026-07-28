import { type Request, type Response } from 'express';
import prisma from '../database/prisma.js';
import {
  type ScheduleConfiguration,
  type Course,
  calculateCombinationCount,
  generateCombinations,
  getCourseNameSet
} from '../utils/scheduleGenerator.js';

export const generarHorarios = async (req: Request, res: Response) => {
  try {
    const config: ScheduleConfiguration = req.body;

    // Se obtiene la lista de materias como conjutno universal ahora con prerequisitos
    const dbCourses = await prisma.courses.findMany({
      include: { prerequisites_prerequisites_course_idTocourses: true }
    });

    // Mapear hacia la interfaz Course
    const courses: Course[] = dbCourses.map(c => ({
      id: c.id,
      name: c.name,
      day: c.day,
      startTime: String(c.start_time),
      endTime: String(c.end_time),
      modality: c.modality,
      difficulty: c.difficulty,
      credits: c.credits,
      prerequisites: c.prerequisites_prerequisites_course_idTocourses
        ? c.prerequisites_prerequisites_course_idTocourses.map(p => p.prerequisite_course_id)
        : []
    }));

    const totalCoursesInDb = dbCourses.length;

    //  Validación de disponibilidad
    if (config.numberOfCourses > totalCoursesInDb) {
      return res.status(400).json({
        error: `No existen suficientes materias disponibles en el sistema (${totalCoursesInDb}) para cumplir con la cantidad solicitada (${config.numberOfCourses}).`
      });
    }

    const totalCombinations = calculateCombinationCount(totalCoursesInDb, config.numberOfCourses);

    const possibleCombinations = generateCombinations(courses, config.numberOfCourses);

    // Convertir cada combinación en un conjunto (Set)
    const scheduleSets = possibleCombinations.map(schedule =>
      getCourseNameSet(schedule)
    );

    // Respuesta parcial de prueba
    return res.status(200).json({
      totalCourses: totalCoursesInDb,
      selectedAmount: config.numberOfCourses,
      totalCombinations,
      generatedCombinationsCount: possibleCombinations.length,
      combinations: possibleCombinations,
      scheduleSets
    });

  } catch (error) {
    return res.status(500).json({ error: "Error al procesar la configuración del horario." });
  }
};