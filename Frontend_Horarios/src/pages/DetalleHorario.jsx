import { useLocation, useNavigate } from "react-router-dom";
import "../styles/DetalleHorario.css";

function DetalleHorario() {
    const location = useLocation();
    const navigate = useNavigate();

    const horario =
        location.state ||
        JSON.parse(localStorage.getItem("ultimoDetalleHorario"));

    // Recuperamos el objeto global cargado previamente en localStorage
    const resultadoGlobal = JSON.parse(localStorage.getItem("ultimoHorario")) || {};

    // Recuperar la configuración utilizada
    const config = horario?.config || resultadoGlobal?.config || {};

    // Evaluaciones proposicionales dinámicas basadas en los motivos de rechazo
    const reasons = horario?.reasons || [];

    // Evaluaciones lógicas (Si NO existe en los motivos, se cumplió la proposición = True)
    const quantityValid = !reasons.some(r => r.includes("cantidad") || r.includes("solicitadas"));
    const includesRequired = !reasons.some(r => r.includes("obligatorias"));
    const creditsValid = !reasons.some(r => r.includes("créditos"));
    const difficultyValid = !reasons.some(r => r.includes("difíciles"));
    const modalityValid = !reasons.some(r => r.includes("modalidad"));
    const hasNoConflicts = !reasons.some(r => r.includes("cruces") || r.includes("superposición"));
    const prerequisitesValid = !reasons.some(r => r.includes("prerrequisitos"));

    // OBTENER NOMBRES DE MATERIAS OBLIGATORIAS
    let requiredCoursesList =
        config?.requiredCourses ||
        horario?.requiredCourses ||
        [];

    if (requiredCoursesList.length === 0) {
        const todosLosHorarios = resultadoGlobal?.schedules || [horario];

        for (const h of todosLosHorarios) {
            const razon = h?.reasons?.find(r => typeof r === "string" && r.includes("Faltan materias obligatorias:"));
            if (razon) {
                const materiaExtraida = razon.replace("Faltan materias obligatorias:", "").replace(".", "").trim();
                if (materiaExtraida) {
                    requiredCoursesList = [materiaExtraida];
                    break;
                }
            }
        }
    }

    const nombresObligatorias = requiredCoursesList.length > 0
        ? requiredCoursesList.join(", ")
        : "Ninguna";

    // CÁLCULOS DINÁMICOS PARA LA TABLA COMPARATIVA
    const materiasArray = horario?.courses || [];
    const totalCreditos = materiasArray.reduce((sum, c) => sum + c.credits, 0);
    const cantDificiles = materiasArray.filter(c => c.difficulty === "Alta" || c.difficulty === "Avanzado").length;
    const modalidadesUnicas = [...new Set(materiasArray.map(c => c.modality))].join(" y ");

    return (

        <div className="detalle-container">

            {/* Título con el número de horario */}
            <h1>
                Detalle del Horario {horario?.numeroHorario ? `# ${horario.numeroHorario}` : ""}
            </h1>

            {/* ESTADO GLOBAL Y RAZONES DE DESCARTE */}
            {horario && (
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                        Estado:{" "}
                        <span className={horario.valid ? "estado-valido" : "estado-invalido"}>
                            {horario.valid ? "✅ Válido" : "❌ Inválido"}
                        </span>
                    </p>

                    {!horario.valid && reasons.length > 0 && (
                        <div className="razones-descarte" style={{ maxWidth: "600px", margin: "15px auto", padding: "12px", backgroundColor: "#fef2f2", borderRadius: "10px", border: "1px solid #fca5a5" }}>
                            <p style={{ color: "#dc2626", fontWeight: "bold", marginBottom: "8px" }}>
                                ⚠️ Motivos de rechazo:
                            </p>
                            <ul style={{ textAlign: "left", display: "inline-block", color: "#991b1b" }}>
                                {reasons.map((razon, i) => (
                                    <li key={i}>{razon}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            <div className="matematicas-detalle-container">
                <h3>🧮 Evaluación Lógico-Matemática del Horario #{horario?.numeroHorario || 1}</h3>

                {/* Sub-bloque 1: Álgebra Proposicional */}
                <div className="bloque-matematico">
                    <h4>1. Álgebra Proposicional (Regla de Conjunción)</h4>

                    {/* FÓRMULA ORDENADA: T ∧ O ∧ R ∧ D ∧ M ∧ C ∧ P */}
                    <p className="formula-logica">
                        <strong>Evaluación:</strong> T ∧ O ∧ R ∧ D ∧ M ∧ C ∧ P ≡ {horario?.valid ? "1 (VERDADERO)" : "0 (FALSO)"}
                    </p>

                    {/* TARJETAS ORDENADAS EXACTAMENTE IGUAL A LA TABLA */}
                    <div className="proposiciones-grid">
                        <div className="item-proposicion">
                            <span className="estado-icon">{quantityValid ? "✅" : "❌"}</span>
                            <span><strong>T</strong> (Cantidad Materias)</span>
                        </div>

                        <div className="item-proposicion">
                            <span className="estado-icon">{includesRequired ? "✅" : "❌"}</span>
                            <span><strong>O</strong> (Obligatorias)</span>
                        </div>

                        <div className="item-proposicion">
                            <span className="estado-icon">{creditsValid ? "✅" : "❌"}</span>
                            <span><strong>R</strong> (Límite Créditos)</span>
                        </div>

                        <div className="item-proposicion">
                            <span className="estado-icon">{difficultyValid ? "✅" : "❌"}</span>
                            <span><strong>D</strong> (Máx. Dificultad)</span>
                        </div>

                        <div className="item-proposicion">
                            <span className="estado-icon">{modalityValid ? "✅" : "❌"}</span>
                            <span><strong>M</strong> (Modalidad)</span>
                        </div>

                        <div className="item-proposicion">
                            <span className="estado-icon">{hasNoConflicts ? "✅" : "❌"}</span>
                            <span><strong>C</strong> (Sin Cruces)</span>
                        </div>

                        <div className="item-proposicion">
                            <span className="estado-icon">{prerequisitesValid ? "✅" : "❌"}</span>
                            <span><strong>P</strong> (Prerrequisitos)</span>
                        </div>
                    </div>
                </div>

                {/* Sub-bloque 2: Teoría de Conjuntos */}
                <div className="bloque-matematico">
                    <h4>2. Teoría de Conjuntos (Inclusión de Subconjuntos)</h4>

                    <p className="formula-conjuntos">
                        {"{ Materias Obligatorias } ⊆ { Materias de este Horario }"}
                    </p>

                    <div className="detalle-obligatorias">
                        <p>
                            <strong>Materias Obligatorias requeridas:</strong>{" "}
                            {nombresObligatorias !== "Ninguna" ? (
                                <span className="lista-obligatorias">{nombresObligatorias}</span>
                            ) : (
                                <em>Ninguna marcada como obligatoria</em>
                            )}
                        </p>

                        <p className="explicacion-matematica">
                            {includesRequired ? (
                                <span>
                                    ✅ <strong>Se cumple la inclusión:</strong> Todas las materias obligatorias seleccionadas forman parte de este horario.
                                </span>
                            ) : (
                                <span>
                                    ❌ <strong>No se cumple la inclusión:</strong> El horario carece de una o más materias indispensables.
                                </span>
                            )}
                        </p>
                    </div>
                </div>

                {/* Sub-bloque 3: Tabla Comparativa Piloto */}
                <div className="bloque-matematico" style={{ overflowX: "auto" }}>
                    <h4>3. Cuadro Comparativo de Restricciones</h4>
                    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px", textAlign: "left", fontSize: "0.95rem" }}>
                        <thead>
                            <tr style={{ backgroundColor: "#2563eb", color: "white" }}>
                                <th style={{ padding: "10px", border: "1px solid #bfdbfe" }}>Regla Lógica</th>
                                <th style={{ padding: "10px", border: "1px solid #bfdbfe" }}>Configuración Registrada</th>
                                <th style={{ padding: "10px", border: "1px solid #bfdbfe" }}>Valor en este Horario</th>
                                <th style={{ padding: "10px", border: "1px solid #bfdbfe" }}>Evaluación</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: "10px", border: "1px solid #e2e8f0" }}><b>T:</b> Cantidad de materias</td>
                                <td style={{ padding: "10px", border: "1px solid #e2e8f0" }}>{config?.numberOfCourses ?? 3} materias</td>
                                <td style={{ padding: "10px", border: "1px solid #e2e8f0" }}>{materiasArray.length} materias</td>
                                <td style={{ padding: "10px", border: "1px solid #e2e8f0" }}>{quantityValid ? "✅ V (Cumple)" : "❌ F (No cumple)"}</td>
                            </tr>
                            <tr>
                                <td style={{ padding: "10px", border: "1px solid #e2e8f0" }}><b>O:</b> Materias obligatorias</td>
                                <td style={{ padding: "10px", border: "1px solid #e2e8f0" }}>{nombresObligatorias}</td>
                                <td style={{ padding: "10px", border: "1px solid #e2e8f0" }}>{includesRequired ? "Todas incluidas" : "Faltan obligatorias"}</td>
                                <td style={{ padding: "10px", border: "1px solid #e2e8f0" }}>{includesRequired ? "✅ V (Incluidas)" : "❌ F (Faltan)"}</td>
                            </tr>
                            <tr>
                                <td style={{ padding: "10px", border: "1px solid #e2e8f0" }}><b>R:</b> Créditos máximos</td>
                                <td style={{ padding: "10px", border: "1px solid #e2e8f0" }}>≤ {config?.maximumCredits ?? 10} cr.</td>
                                <td style={{ padding: "10px", border: "1px solid #e2e8f0" }}>{totalCreditos} créditos sumados</td>
                                <td style={{ padding: "10px", border: "1px solid #e2e8f0" }}>{creditsValid ? "✅ V (Dentro del límite)" : "❌ F (Excede límite)"}</td>
                            </tr>
                            <tr>
                                <td style={{ padding: "10px", border: "1px solid #e2e8f0" }}><b>D:</b> Materias difíciles</td>
                                <td style={{ padding: "10px", border: "1px solid #e2e8f0" }}>≤ {config?.maximumDifficultCourses ?? 1} máx.</td>
                                <td style={{ padding: "10px", border: "1px solid #e2e8f0" }}>{cantDificiles} materia(s) alta(s)</td>
                                <td style={{ padding: "10px", border: "1px solid #e2e8f0" }}>{difficultyValid ? "✅ V (Dentro del límite)" : "❌ F (Demasiadas)"}</td>
                            </tr>
                            <tr>
                                <td style={{ padding: "10px", border: "1px solid #e2e8f0" }}><b>M:</b> Modalidad</td>
                                <td style={{ padding: "10px", border: "1px solid #e2e8f0" }}>{config?.requiredModality ?? "Cualquiera"}</td>
                                <td style={{ padding: "10px", border: "1px solid #e2e8f0" }}>{modalidadesUnicas || "N/A"}</td>
                                <td style={{ padding: "10px", border: "1px solid #e2e8f0" }}>{modalityValid ? "✅ V (Cumple requisito)" : "❌ F (Modalidad incorrecta)"}</td>
                            </tr>
                            <tr>
                                <td style={{ padding: "10px", border: "1px solid #e2e8f0" }}><b>C:</b> Cruces de horario</td>
                                <td style={{ padding: "10px", border: "1px solid #e2e8f0" }}>
                                    {config?.avoidTimeConflicts === false ? "Permitir cruces" : "Evitar cruces"}
                                </td>
                                <td style={{ padding: "10px", border: "1px solid #e2e8f0" }}>
                                    {hasNoConflicts ? "0 Solapamientos" : "Existen cruces"}
                                </td>
                                <td style={{ padding: "10px", border: "1px solid #e2e8f0" }}>
                                    {hasNoConflicts ? "✅ V (Sin cruces)" : "❌ F (Existen cruces)"}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: "10px", border: "1px solid #e2e8f0" }}><b>P:</b> Prerrequisitos</td>
                                <td style={{ padding: "10px", border: "1px solid #e2e8f0" }}>
                                    {config?.validatePrerequisites === false ? "Ignorar" : "Validar prerrequisitos"}
                                </td>
                                <td style={{ padding: "10px", border: "1px solid #e2e8f0" }}>
                                    {prerequisitesValid ? "Cumplidos / Aprobados" : "Falta asignatura previa"}
                                </td>
                                <td style={{ padding: "10px", border: "1px solid #e2e8f0" }}>
                                    {prerequisitesValid ? "✅ V (Cumple todos)" : "❌ F (Faltan previas)"}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

            {
                horario ? (

                    <>
                        <div className="dias-container">
                            {
                                horario.courses?.map((materia) => (
                                    <div
                                        key={materia.id}
                                        className="dia-container"
                                    >
                                        <h2>
                                            {materia.day}
                                        </h2>

                                        <div className="materia-detalle">
                                            <h3>
                                                📘 {materia.name}
                                            </h3>

                                            <p>
                                                <strong>Hora:</strong>{" "}
                                                {
                                                    new Date(materia.startTime).toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        timeZone: "UTC"
                                                    })
                                                }
                                                {" - "}
                                                {
                                                    new Date(materia.endTime).toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        timeZone: "UTC"
                                                    })
                                                }
                                            </p>

                                            <p>
                                                <strong>Modalidad:</strong>{" "}
                                                {materia.modality}
                                            </p>

                                            <p>
                                                <strong>Dificultad:</strong>{" "}
                                                {materia.difficulty || "Media"}
                                            </p>

                                            <p>
                                                <strong>Créditos:</strong>{" "}
                                                {materia.credits}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        {/* BOTÓN ÚNICO DE ACCIÓN */}
                        <div style={{ textAlign: "center", marginTop: "25px" }}>
                            <button
                                className="btn-volver"
                                onClick={() => navigate("/resultados")}
                                style={{
                                    backgroundColor: "#2563eb",
                                    color: "white",
                                    padding: "12px 28px",
                                    borderRadius: "10px",
                                    border: "none",
                                    fontWeight: "bold",
                                    fontSize: "1rem",
                                    cursor: "pointer",
                                    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)"
                                }}
                            >
                                ⬅️ Volver a Resultados
                            </button>
                        </div>
                    </>

                ) : (

                    <>
                        <p>
                            No hay horario seleccionado.
                        </p>

                        <button
                            onClick={() => navigate("/resultados")}
                        >
                            Volver a resultados
                        </button>
                    </>

                )
            }

        </div>

    );

}

export default DetalleHorario;