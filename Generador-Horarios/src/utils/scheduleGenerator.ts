// Se define la interfaz ScheduleConfiguration que representa la configuración para generar un horario académico. Esta interfaz incluye propiedades como el número de cursos, créditos máximos, cursos obligatorios, modalidad requerida, y opciones para evitar conflictos de horario y validar prerrequisitos. 
// Además, permite especificar cursos completados previamente mediante sus IDs.


// Estructura de un elemento del conjunto de materias (Course)
export interface Course {
  id: number;
  name: string;
  day: string;
  startTime: string;
  endTime: string;
  modality: string;
  difficulty: string;
  credits: number;
  prerequisites: number[];
}

// Estructura de la configuración/restricciones enviadas por el usuario
export interface ScheduleConfiguration {
  numberOfCourses: number;
  maximumCredits: number;
  maximumDifficultCourses: number;
  requiredCourses: string[]; // Nombres de materias obligatorias
  requiredModality?: string; // "Cualquiera" | "Presencial" | "Virtual"
  avoidTimeConflicts: boolean;
  validatePrerequisites: boolean;
  completedCourses?: number[]; // IDs de materias aprobadas previamente
}


