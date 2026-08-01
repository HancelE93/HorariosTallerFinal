import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Resultados.css";


function Resultados() {

    const location = useLocation();
    const navigate = useNavigate();

    const resultado =
        location.state ||
        JSON.parse(localStorage.getItem("ultimoHorario"));

    // Ordenar los horarios para que los válidos aparezcan primero: 
    const horariosOrdenados = resultado?.schedules
        ? [...resultado.schedules].sort((a, b) => Number(b.valid) - Number(a.valid))
        : [];

    return (

        <div className="resultados-container">
            <h1>
                Resultados de horarios generados
            </h1>

            {
                resultado ? (
                    <>
                        <div className="resumen-resultados">
                            <p>
                                Materias disponibles: {resultado.totalCourses}
                            </p>

                            <p>
                                Materias por horario: {resultado.selectedAmount}
                            </p>

                            <p>
                                Combinaciones posibles: {resultado.totalCombinations}
                            </p>

                            <p>
                                Horarios válidos: {resultado.validSchedules}
                            </p>

                            <p>
                                Horarios descartados: {resultado.discardedSchedules}
                            </p>

                        </div>

                        <h2>
                            Horarios generados
                        </h2>

                        {/* Renderizado de los horarios ordenados con los válidos primero y sus motivos de rechazo si no son válidos */}

                        {horariosOrdenados.map((horario, index) => (
                            <div key={index} className="horario-card">
                                <h3>
                                    Horario {index + 1}
                                </h3>

                                <p className={horario.valid ? "estado-valido" : "estado-invalido"}>
                                    <strong>Estado:</strong>{" "}
                                    {horario.valid ? "✅ Válido" : "❌ Inválido"}
                                </p>

                                {/* Renderizado de los motivos de rechazo */}
                                {!horario.valid && horario.reasons && horario.reasons.length > 0 && (
                                    <div className="razones-descarte">
                                        <p style={{ color: "#d9534f", fontWeight: "bold", marginBottom: "5px" }}>
                                            Motivos de rechazo:
                                        </p>
                                        <ul>
                                            {horario.reasons.map((razon, i) => (
                                                <li key={i}>
                                                    ⚠️ {razon}
                                                </li>
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
                    </>

                ) : (
                    <>
                        <p>
                            No existe un horario generado todavía.
                        </p>

                        <button onClick={() => navigate("/configuracion")}>
                            Ir a configuración
                        </button>
                    </>
                )}
        </div>
    );
}

export default Resultados;