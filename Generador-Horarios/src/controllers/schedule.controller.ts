import { type Request, type Response } from 'express';
import prisma from '../database/prisma.js';
import {
  type ScheduleConfiguration,
  type Course,
  calculateCombinationCount,
  generateCombinations,
  getCourseNameSet,
  includesRequiredCourses,
  hasScheduleConflicts,
  filterValidSchedules,
  validateMaximumCredits,
  validateMaximumDifficulty,
  validateRequiredModality,
  validatePrerequisites
} from "../utils/scheduleGenerator.js";

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

    const requiredCoursesSet = new Set(config.requiredCourses);

    const validationResults = scheduleSets.map(scheduleSet =>
      includesRequiredCourses(
        scheduleSet,
        requiredCoursesSet
      )
    );

    // Validar cruces de horario (Paso 8)
    const conflictResults = possibleCombinations.map(schedule =>
      hasScheduleConflicts(schedule)
    );


    // Validar créditos máximos
    const creditResults = possibleCombinations.map(schedule =>
      validateMaximumCredits(
        schedule,
        config.maximumCredits
      )
    );

    // Validar cantidad máxima de materias difíciles
    const difficultyResults = possibleCombinations.map(schedule =>
      validateMaximumDifficulty(
        schedule,
        config.maximumDifficultCourses
      )
    );

    // Validar modalidad requerida
    const modalityResults = possibleCombinations.map(schedule =>
      validateRequiredModality(
        schedule,
        config.requiredModality
      )
    );


    const prerequisiteResults = possibleCombinations.map(schedule =>
      validatePrerequisites(
        schedule,
        config.completedCourses,
        config.validatePrerequisites
      )
    );

    const validSchedules = filterValidSchedules(
      possibleCombinations,
      validationResults,
      conflictResults,
      creditResults,
      difficultyResults,
      modalityResults,
      prerequisiteResults
    );


    // Respuesta parcial de prueba
    return res.status(200).json({

      totalCourses: totalCoursesInDb,

      totalCombinations,

      validSchedules,

      validationResults,

      conflictResults,

      creditResults,

      difficultyResults,

      modalityResults

    });

  } catch (error) {
    return res.status(500).json({ error: "Error al procesar la configuración del horario." });
  }
};