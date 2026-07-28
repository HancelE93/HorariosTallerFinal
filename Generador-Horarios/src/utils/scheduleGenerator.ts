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