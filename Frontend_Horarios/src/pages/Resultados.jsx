import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Resultados.css";

function Resultados() {
    const location = useLocation();
    const navigate = useNavigate();

    // Estado para controlar cuántos horarios se muestran (Empieza en 10)
    const [limiteHorarios, setLimiteHorarios] = useState(10);

    const resultado =
        location.state ||
        JSON.parse(localStorage.getItem("ultimoHorario"));

    // Ordenar los horarios para que los válidos aparezcan primero
    const horariosOrdenados = resultado?.schedules
        ? [...resultado.schedules].sort((a, b) => Number(b.valid) - Number(a.valid))
        : [];

    // Cortamos la lista según el límite actual
    const horariosVisibles = horariosOrdenados.slice(0, limiteHorarios);

    const porcentajeValidos = resultado?.totalCombinations > 0
        ? ((resultado.validSchedules / resultado.totalCombinations) * 100).toFixed(1)
        : 0;

    return (
        <div className="resultados-container">
            <h1>Resultados de Horarios Generados</h1>

            {resultado ? (
                <>
                    <div className="resumen-horizontal-container">
                        <div className="item-resumen">
                            <span className="resumen-icon">🌌</span>
                            <span className="resumen-texto">
                                Materias Disponibles: <strong>{resultado.totalCourses}</strong>
                            </span>
                        </div>

                        <span className="separador">|</span>

                        <div className="item-resumen">
                            <span className="resumen-icon">📌</span>
                            <span className="resumen-texto">
                                Materias Seleccionadas: <strong>{resultado.selectedAmount}</strong>
                            </span>
                        </div>
                    </div>

                    <div className="matematicas-container-unificado">
                        <h3>📐 Fundamento Matemático Aplicado (Análisis Global)</h3>

                        <div className="bloques-grid">
                            {/* Sub-bloque 1 */}
                            <div className="bloque-matematico-interno">
                                <h4>1. Cálculo Combinatorio (Teoría de Conteo)</h4>

                                <div className="formula-destacada">
                                    <span>C({resultado.totalCourses}, {resultado.selectedAmount}) = </span>
                                    <strong className="resultado-combinatoria">{resultado.totalCombinations}</strong>
                                </div>

                                <p className="explicacion-matematica">
                                    Representa el número de combinaciones posibles de horarios, seleccionando{" "}
                                    <strong>{resultado.selectedAmount}</strong> materias a partir de{" "}
                                    <strong>{resultado.totalCourses}</strong> materias disponibles.
                                </p>
                            </div>

                            {/* Sub-bloque 2 */}
                            <div className="bloque-matematico-interno">
                                <h4>2. Horarios Obtenidos</h4>
                                <div className="grafico-torta-container">
                                    <div
                                        className="grafico-torta"
                                        style={{
                                            background: `conic-gradient(#10b981 0% ${porcentajeValidos}%, #ef4444 ${porcentajeValidos}% 100%)`
                                        }}
                                    ></div>

                                    <div className="leyenda-torta">
                                        <p>
                                            <span className="dot verde"></span>
                                            <strong>Válidos:</strong> {porcentajeValidos}% ({resultado.validSchedules})
                                        </p>
                                        <p>
                                            <span className="dot rojo"></span>
                                            <strong>Descartados:</strong> {(100 - porcentajeValidos).toFixed(1)}% ({resultado.discardedSchedules})
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2>Detalle de Horarios Generados</h2>

                    {/* TARJETAS EN GRID / FILA */}
                    <div className="horarios-container">
                        {horariosVisibles.map((horario, index) => (
                            <div key={index} className="horario-card">
                                <h3>Horario {index + 1}</h3>

                                <p className={horario.valid ? "estado-valido" : "estado-invalido"}>
                                    <strong>Estado:</strong>{" "}
                                    {horario.valid ? "✅ Válido" : "❌ Inválido"}
                                </p>

                                {!horario.valid && horario.reasons && horario.reasons.length > 0 && (
                                    <div className="razones-descarte">
                                        <p style={{ color: "#d9534f", fontWeight: "bold" }}>
                                            Motivos de rechazo:
                                        </p>
                                        <ul>
                                            {horario.reasons.map((razon, i) => (
                                                <li key={i}>⚠️ {razon}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <button
                                    onClick={() => {
                                        const detalleConNumero = {
                                            ...horario,
                                            numeroHorario: index + 1
                                        };

                                        localStorage.setItem(
                                            "ultimoDetalleHorario",
                                            JSON.stringify(detalleConNumero)
                                        );

                                        navigate("/detalle", { state: detalleConNumero });
                                    }}
                                >
                                    Ver detalle
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* BOTÓN MOSTRAR MÁS HORARIOS */}
                    {horariosOrdenados.length > limiteHorarios && (
                        <div style={{ textAlign: "center", marginTop: "35px", marginBottom: "20px" }}>
                            <button
                                onClick={() => setLimiteHorarios(prev => prev + 10)}
                                style={{
                                    padding: "14px 28px",
                                    fontSize: "1rem",
                                    borderRadius: "14px",
                                    boxShadow: "0 8px 20px rgba(37, 99, 235, 0.3)"
                                }}
                            >
                                ➕ Cargar más horarios ({horariosOrdenados.length - limiteHorarios} restantes)
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <p>No existe un horario generado todavía.</p>
                    <button onClick={() => navigate("/configuracion")}>
                        Ir a configuración
                    </button>
                </>
            )}
        </div>
    );
}

export default Resultados;