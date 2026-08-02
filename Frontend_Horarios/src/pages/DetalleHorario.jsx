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

    // Evaluaciones proposicionales dinámicas basadas en los motivos de rechazo
    const reasons = horario?.reasons || [];

    // Evaluaciones lógicas (Si NO existe en los motivos, se cumplió la proposición = True)
    const hasNoConflicts = !reasons.some(r => r.includes("cruces") || r.includes("superposición"));
    const includesRequired = !reasons.some(r => r.includes("obligatorias"));
    const creditsValid = !reasons.some(r => r.includes("créditos"));
    const difficultyValid = !reasons.some(r => r.includes("difíciles"));
    const modalityValid = !reasons.some(r => r.includes("modalidad"));
    const prerequisitesValid = !reasons.some(r => r.includes("prerrequisitos"));

    // OBTENER NOMBRES DE MATERIAS OBLIGATORIAS
    let requiredCoursesList =
        horario?.requiredCourses ||
        horario?.config?.requiredCourses ||
        resultadoGlobal?.config?.requiredCourses ||
        resultadoGlobal?.requiredCourses ||
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
        : "";

    return (

        <div className="detalle-container">

            {/* Título con el número de horario */}
            <h1>
                Detalle del Horario {horario?.numeroHorario ? `# ${horario.numeroHorario}` : ""}
            </h1>

            {/* ESTADO GLOBAL Y RAZONES DE DESCARTE (EXIGIDO EN PANTALLA 4) */}
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

                    <p className="formula-logica">
                        <strong>Evaluación:</strong> C ∧ O ∧ R ∧ D ∧ M ∧ P ≡ {horario?.valid ? "1 (VERDADERO)" : "0 (FALSO)"}
                    </p>

                    <div className="proposiciones-grid">
                        <div className="item-proposicion">
                            <span className="estado-icon">{hasNoConflicts ? "✅" : "❌"}</span>
                            <span><strong>C</strong> (Sin Cruces)</span>
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
                            {nombresObligatorias ? (
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

                        {/* BOTÓN ÚNICO DE ACCIÓN (VOLVER A RESULTADOS) */}
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