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

// Aplica la fórmula C(n, r) = n! / (r! * (n - r)!) para calcular la cantidad teórica de combinaciones posibles 
// de n elementos tomados de r en r. Devuelve 0 si r es menor que 0 o mayor que n.

// Calcula el factorial de un número n! de forma iterativa. Casos base: 0! = 1, 1! = 1.
export function factorial(n: number): number {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Obtenido el factorial se procede a calcular la cantidad de combinaciones posibles usando la fórmula combinatoria.
// Aplica la fórmula C(n, r) = n! / (r! * (n - r)!)
export function calculateCombinationCount(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  return Math.round(factorial(n) / (factorial(r) * factorial(n - r)));
}


/**
 * Genera recursivamente todas las combinaciones posibles de tamaño `size` (r)
 * a partir del arreglo de materias `elements` (n).
 */
export function generateCombinations(elements: Course[], size: number): Course[][] {
  const results: Course[][] = [];

  function combine(startIndex: number, currentCombination: Course[]) {
    // Caso base: se alcanzó el tamaño de materias requerido para el horario
    if (currentCombination.length === size) {
      results.push([...currentCombination]);
      return;
    }

    // Recorrido recursivo para formar las agrupaciones
    for (let index = startIndex; index < elements.length; index++) {
      const course = elements[index];
      if (!course) continue; // Si por alguna razón es undefined, lo salta

      currentCombination.push(course);
      combine(index + 1, currentCombination);
      currentCombination.pop(); // Backtracking
    }
  }


  combine(0, []);
  return results;
}

/**
 * Convierte una combinación de materias en un conjunto
 * con los nombres de las materias.
 */
export function getCourseNameSet(schedule: Course[]): Set<string> {
  return new Set(
    schedule.map(course => course.name)
  );
}

// Verifica que todas las materias obligatorias estén dentro del horario
export function includesRequiredCourses(
  scheduleSet: Set<string>,
  requiredCoursesSet: Set<string>
): boolean {

  return [...requiredCoursesSet].every(course =>
    scheduleSet.has(course)
  );

}

// Verifica si dos materias tienen cruce de horario
export function haveTimeConflict(
  courseA: Course,
  courseB: Course
): boolean {

  // Si son días diferentes no existe cruce
  if (courseA.day !== courseB.day) {
    return false;
  }

  // Verifica si los horarios se superponen
  return (
    courseA.startTime < courseB.endTime &&
    courseB.startTime < courseA.endTime
  );

}

// Verifica si dentro de un horario existen materias cruzadas
export function hasScheduleConflicts(
  schedule: Course[]
): boolean {

  for (let i = 0; i < schedule.length; i++) {

    for (let j = i + 1; j < schedule.length; j++) {

      const courseA = schedule[i];
      const courseB = schedule[j];

      if (!courseA || !courseB) {
        continue;
      }

      if (haveTimeConflict(courseA, courseB)) {
        return true;
      }

    }

  }

  return false;

}

/**
 * Filtra horarios que cumplen todas las validaciones
 */
export function filterValidSchedules(
  schedules: Course[][],
  requiredResults: boolean[],
  conflictResults: boolean[],
  creditResults: boolean[],
  difficultyResults: boolean[],
  modalityResults: boolean[],
  prerequisiteResults: boolean[]
): Course[][] {

  return schedules.filter((_, index) =>
    requiredResults[index] === true &&
    conflictResults[index] === false &&
    creditResults[index] === true &&
    difficultyResults[index] === true &&
    modalityResults[index] === true &&
    prerequisiteResults[index] === true
  );

}

/**
 * Verifica que un horario no supere el máximo de créditos permitido
 */
export function validateMaximumCredits(
  schedule: Course[],
  maximumCredits: number
): boolean {

  const totalCredits = schedule.reduce(
    (sum, course) => sum + course.credits,
    0
  );

  return totalCredits <= maximumCredits;
}

/**
 * Verifica que no se supere la cantidad máxima de materias difíciles
 */
export function validateMaximumDifficulty(
  schedule: Course[],
  maximumDifficultCourses: number
): boolean {

  const difficultCourses = schedule.filter(
    course => course.difficulty === "Avanzado"
  );

  return difficultCourses.length <= maximumDifficultCourses;
}

/**
 * Verifica que las materias cumplan la modalidad requerida
 */
export function validateRequiredModality(
  schedule: Course[],
  requiredModality?: string
): boolean {

  if (!requiredModality || requiredModality === "Cualquiera") {
    return true;
  }

  return schedule.every(
    course => course.modality === requiredModality
  );
}

/**
 * Verifica que el estudiante cumpla con los prerrequisitos de todas las materias del horario.
 * Aplica: Subconjuntos y Pertenencia (P_c ⊆ A)
 */
export function validatePrerequisites(
  schedule: Course[],
  completedCourses: number[] = [],
  shouldValidate: boolean = true
): boolean {
  // Si la opción está desactivada, se asume válido
  if (!shouldValidate) {
    return true;
  }

  const completedSet = new Set(completedCourses);

  // Cada materia en el horario debe tener sus prerrequisitos aprobados
  return schedule.every(course =>
    course.prerequisites.every(prereqId => completedSet.has(prereqId))
  );
}