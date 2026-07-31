import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/ConfiguracionHorario.css";
import { API_BASE_URL } from "../config/apiConfig";

function ConfiguracionHorario() {

    const navigate = useNavigate();

    const [configuracion, setConfiguracion] = useState({

        numberOfCourses: 2,

        maximumCredits: 12,

        maximumDifficultCourses: 2,

        requiredCourses: "",

        requiredModality: "Cualquiera",

        avoidTimeConflicts: true,

        validatePrerequisites: true,

    });

    const manejarCambio = (e) => {

        const { name, value, type, checked } = e.target;

        setConfiguracion({

            ...configuracion,

            [name]: type === "checkbox"
                ? checked
                : value,

        });

    };

    const generarHorario = async (e) => {

        e.preventDefault();

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

            requiredCourses: configuracion.requiredCourses
                ? [configuracion.requiredCourses]
                : [],

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
                Generador Inteligente de Horarios
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

                <label>
                    Materias obligatorias
                </label>

                <input

                    type="text"

                    name="requiredCourses"

                    placeholder="Ej: Programacion Node"

                    value={
                        configuracion.requiredCourses
                    }

                    onChange={manejarCambio}

                />

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