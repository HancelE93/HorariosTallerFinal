import { type Request, type Response } from 'express';
import prisma from '../database/prisma.js';
import {
  type ScheduleConfiguration,
  type Course,
  calculateCombinationCount,
  generateCombinations,
  evaluateSchedule
} from "../utils/scheduleGenerator.js";

export const generarHorarios = async (req: Request, res: Response) => {
  try {
    const config: ScheduleConfiguration = req.body;

    // 1. Obtener lista de materias del Conjunto Universal (PostgreSQL)
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

    // 2. Paso 3: Validación de disponibilidad
    if (config.numberOfCourses > totalCoursesInDb) {
      return res.status(400).json({
        error: `No existen suficientes materias disponibles en el sistema (${totalCoursesInDb}) para cumplir con la cantidad solicitada (${config.numberOfCourses}).`
      });
    }

    // 3. Paso 4: Cálculo de combinaciones teóricas
    const totalCombinations = calculateCombinationCount(totalCoursesInDb, config.numberOfCourses);

    // 4. Paso 5: Generar alternativas mediante algoritmo combinatorio
    const possibleCombinations = generateCombinations(courses, config.numberOfCourses);

    // se agrupan las condiciones: Materias obligatorias, cruce de horarios, creditos maximos, materias
    // dificiles/requeridas, virtual/presencial y prerequisitos / centrailizandole con evaluateSchedule:

    // 5. Paso 12, 14 y 16: Evaluar combinaciones y estructurar payload unificado
    const schedules = possibleCombinations.map(schedule => {
      const evaluation = evaluateSchedule(schedule, config);
      const totalCredits = schedule.reduce((sum, course) => sum + course.credits, 0);

      return {
        courses: schedule,
        totalCredits,
        valid: evaluation.valid,
        reasons: evaluation.reasons
      };
    });

    // Conteo de válidos y descartados
    const validCount = schedules.filter(s => s.valid).length;
    const discardedCount = schedules.filter(s => !s.valid).length;

    // 6. Paso 16: Respuesta JSON principal del endpoint para seguir el formato del taller
    return res.status(200).json({
      totalCourses: totalCoursesInDb,
      selectedAmount: config.numberOfCourses,
      totalCombinations,
      validSchedules: validCount,
      discardedSchedules: discardedCount,
      schedules
    });

  } catch (error) {
    return res.status(500).json({ error: "Error al procesar la configuración del horario." });
  }
};