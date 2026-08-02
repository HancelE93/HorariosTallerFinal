import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/ConfiguracionHorario.css";
import { API_BASE_URL } from "../config/apiConfig";

function ConfiguracionHorario() {

    const navigate = useNavigate();

    // Estado para guardar el listado de materias registrado en la base de datos
    const [materiasDisponibles, setMateriasDisponibles] = useState([]);

    const [configuracion, setConfiguracion] = useState({

        numberOfCourses: 2,

        maximumCredits: 12,

        maximumDifficultCourses: 2,

        requiredCourses: [""], // Arreglo dinámico para selects de materias obligatorias

        requiredModality: "Cualquiera",

        avoidTimeConflicts: true,

        validatePrerequisites: true,

    });

    // Cargar las materias disponibles desde la API al cargar el componente
    useEffect(() => {
        const obtenerMaterias = async () => {
            try {
                const respuesta = await fetch(`${API_BASE_URL}/courses`);
                if (respuesta.ok) {
                    const datos = await respuesta.json();
                    setMateriasDisponibles(datos);
                }
            } catch (error) {
                console.error("Error al cargar materias disponibles:", error);
            }
        };

        obtenerMaterias();
    }, []);

    const manejarCambio = (e) => {

        const { name, value, type, checked } = e.target;

        setConfiguracion({

            ...configuracion,

            [name]: type === "checkbox"
                ? checked
                : value,

        });

    };

    // Actualiza la materia seleccionada en un select específico
    const manejarSeleccionObligatoria = (index, value) => {
        const nuevasObligatorias = [...configuracion.requiredCourses];
        nuevasObligatorias[index] = value;
        setConfiguracion({
            ...configuracion,
            requiredCourses: nuevasObligatorias
        });
    };

    // Añade un nuevo select dinámico (+)
    const agregarCajaObligatoria = () => {
        setConfiguracion({
            ...configuracion,
            requiredCourses: [...configuracion.requiredCourses, ""]
        });
    };

    // Elimina un select específico (🗑️)
    const eliminarCajaObligatoria = (index) => {
        const nuevasObligatorias = configuracion.requiredCourses.filter((_, i) => i !== index);
        setConfiguracion({
            ...configuracion,
            requiredCourses: nuevasObligatorias.length > 0 ? nuevasObligatorias : [""]
        });
    };

    const generarHorario = async (e) => {

        e.preventDefault();

        // Filtramos para enviar únicamente las materias seleccionadas (no vacías)
        const obligatoriasFiltradas = configuracion.requiredCourses.filter(c => c !== "");

        const datos = {

            ...configuracion,

            numberOfCourses: Number(
                configuracion.numberOfCourses
            ),

            maximumCredits: Number(
                configuracion.maximumCredits
            ),

            maximumDifficultCourses: Number(
                configuracion.maximumDifficultCourses
            ),

            requiredCourses: obligatoriasFiltradas,

            completedCourses: []

        };

        try {

            const respuesta = await fetch(

                `${API_BASE_URL}/schedules/generate`,

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify(datos)

                }

            );

            if (!respuesta.ok) {

                throw new Error(
                    "Error generando horario"
                );

            }

            const horarioGenerado = await respuesta.json();

            console.log(
                "Horario generado:",
                horarioGenerado
            );

            // Guardar el horario para reutilizarlo
            localStorage.setItem(
                "ultimoHorario",
                JSON.stringify(horarioGenerado)
            );

            navigate("/resultados", {

                state: horarioGenerado

            });

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="configuracion-container">

            <h1>
                Smart Schedule Generator
            </h1>

            <form onSubmit={generarHorario}>

                <label>
                    Cantidad de materias
                </label>

                <input

                    type="number"

                    name="numberOfCourses"

                    value={
                        configuracion.numberOfCourses
                    }

                    onChange={manejarCambio}

                />

                <label>
                    Máximo de créditos
                </label>

                <input

                    type="number"

                    name="maximumCredits"

                    value={
                        configuracion.maximumCredits
                    }

                    onChange={manejarCambio}

                />

                <label>
                    Máximo de materias difíciles
                </label>

                <input

                    type="number"

                    name="maximumDifficultCourses"

                    value={
                        configuracion.maximumDifficultCourses
                    }

                    onChange={manejarCambio}

                />

                {/* BLOQUE DINÁMICO CON DESPLEGABLES DE MATERIAS EXISTENTES */}
                <div style={{ marginBottom: "15px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <label style={{ margin: 0 }}>
                            Materias obligatorias
                        </label>
                        <button
                            type="button"
                            onClick={agregarCajaObligatoria}
                            style={{
                                backgroundColor: "#10b981",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                padding: "4px 10px",
                                fontSize: "0.85rem",
                                fontWeight: "bold",
                                cursor: "pointer"
                            }}
                        >
                            ➕ Agregar otra
                        </button>
                    </div>

                    {configuracion.requiredCourses.map((materiaSeleccionada, index) => (
                        <div key={index} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                            <select
                                value={materiaSeleccionada}
                                onChange={(e) => manejarSeleccionObligatoria(index, e.target.value)}
                                style={{ flex: 1, margin: 0 }}
                            >
                                <option value="">-- Selecciona una materia --</option>
                                {materiasDisponibles.map((m) => (
                                    <option key={m.id || m._id} value={m.name}>
                                        📘 {m.name} ({m.day} - {m.credits} cr.)
                                    </option>
                                ))}
                            </select>

                            {configuracion.requiredCourses.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => eliminarCajaObligatoria(index)}
                                    style={{
                                        backgroundColor: "#ef4444",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "6px",
                                        padding: "0 12px",
                                        cursor: "pointer"
                                    }}
                                >
                                    🗑️
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <label>
                    Modalidad
                </label>

                <select

                    name="requiredModality"

                    value={
                        configuracion.requiredModality
                    }

                    onChange={manejarCambio}

                >

                    <option value="Cualquiera">
                        Cualquiera
                    </option>

                    <option value="Presencial">
                        Presencial
                    </option>

                    <option value="Virtual">
                        Virtual
                    </option>

                </select>

                <label>

                    <input

                        type="checkbox"

                        name="avoidTimeConflicts"

                        checked={
                            configuracion.avoidTimeConflicts
                        }

                        onChange={manejarCambio}

                    />

                    Evitar cruces de horario

                </label>

                <label>

                    <input

                        type="checkbox"

                        name="validatePrerequisites"

                        checked={
                            configuracion.validatePrerequisites
                        }

                        onChange={manejarCambio}

                    />

                    Validar prerrequisitos

                </label>

                <button type="submit">

                    Generar horario

                </button>

            </form>

        </div>

    );

}

export default ConfiguracionHorario;