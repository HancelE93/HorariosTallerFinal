import { useState, useEffect, useCallback } from "react";
import ListaMaterias from "../components/ListaMaterias";
import { API_BASE_URL } from "../config/apiConfig";
import "../styles/GestionMaterias.css";

function GestionMaterias() {

    const [materias, setMaterias] = useState([]);

    const [mostrarModal, setMostrarModal] = useState(false);

    const [editando, setEditando] = useState(false);
    const [idEditar, setIdEditar] = useState(null);

    const [nombre, setNombre] = useState("");
    const [dia, setDia] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFin, setHoraFin] = useState("");
    const [modalidad, setModalidad] = useState("");
    const [dificultad, setDificultad] = useState("");
    const [creditos, setCreditos] = useState("");

    const cargarMaterias = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/courses`);

            if (!res.ok) {
                throw new Error("Error al cargar materias");
            }

            const data = await res.json();
            setMaterias(data);

        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        cargarMaterias();
    }, [cargarMaterias]);

    const crearMateria = async (e) => {
        e.preventDefault();

        if (
            !nombre ||
            !dia ||
            !horaInicio ||
            !horaFin ||
            !modalidad ||
            !dificultad ||
            !creditos
        ) {
            alert("Todos los campos son obligatorios");
            return;
        }

        const nuevaMateria = {
            name: nombre,
            day: dia,
            start_time: horaInicio,
            end_time: horaFin,
            modality: modalidad,
            difficulty: dificultad,
            credits: Number(creditos)
        };

        try {

            const res = await fetch(`${API_BASE_URL}/courses`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevaMateria)
            });

            if (!res.ok) {
                throw new Error("Error al crear materia");
            }

            alert("Materia creada correctamente");

            setNombre("");
            setDia("");
            setHoraInicio("");
            setHoraFin("");
            setModalidad("");
            setDificultad("");
            setCreditos("");

            setMostrarModal(false);

            cargarMaterias();

        } catch (error) {
            console.log(error);
        }
    };

    const actualizarMateria = async (e) => {

        e.preventDefault();

        if (
            !nombre ||
            !dia ||
            !horaInicio ||
            !horaFin ||
            !modalidad ||
            !dificultad ||
            !creditos
        ) {
            alert("Todos los campos son obligatorios");
            return;
        }
        const materia = {

            name: nombre,
            day: dia,
            start_time: horaInicio,
            end_time: horaFin,
            modality: modalidad,
            difficulty: dificultad,
            credits: Number(creditos)

        };

        try {

            const res = await fetch(
                `${API_BASE_URL}/courses/${idEditar}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(materia)
                }
            );

            if (!res.ok) {
                throw new Error("Error al actualizar");
            }

            alert("Materia actualizada correctamente");

            setMostrarModal(false);
            setEditando(false);
            setIdEditar(null);

            setNombre("");
            setDia("");
            setHoraInicio("");
            setHoraFin("");
            setModalidad("");
            setDificultad("");
            setCreditos("");

            cargarMaterias();

        } catch (error) {

            console.log(error);

        }

    };

    const editarMateria = (materia) => {

        setEditando(true);
        setMostrarModal(true);

        setIdEditar(materia.id);

        setNombre(materia.name);
        setDia(materia.day);

        setHoraInicio(
            new Date(materia.start_time)
                .toISOString()
                .substring(11, 16)
        );

        setHoraFin(
            new Date(materia.end_time)
                .toISOString()
                .substring(11, 16)
        );

        setModalidad(materia.modality);
        setDificultad(materia.difficulty);
        setCreditos(materia.credits);

    };

    const eliminarMateria = async (id) => {

        const confirmar = window.confirm(
            "¿Está seguro de eliminar esta materia?"
        );

        if (!confirmar) {
            return;
        }

        try {

            const res = await fetch(`${API_BASE_URL}/courses/${id}`, {
                method: "DELETE"
            });

            if (!res.ok) {
                throw new Error("Error al eliminar materia");
            }


            alert("Materia eliminada correctamente");

            cargarMaterias();

        } catch (error) {
            console.log(error);
        }

    };
    return (

        <div className="contenedor">

            <div className="header">

                <div>

                    <h1>📚 Gestión de Materias</h1>

                    <p>
                        Total de materias: {materias.length}
                    </p>

                </div>

                <button
                    className="btn-nueva"
                    onClick={() => setMostrarModal(true)}
                >
                    + Nueva Materia
                </button>

            </div>

            <ListaMaterias
                materias={materias}
                eliminarMateria={eliminarMateria}
                editarMateria={editarMateria}
            />

            {
                mostrarModal && (

                    <div className="modal-bg">

                        <div className="modal">

                            <form
                                onSubmit={
                                    editando
                                        ? actualizarMateria
                                        : crearMateria
                                }
                            >

                                <h2>
                                    {editando ? "Editar Materia" : "Nueva Materia"}
                                </h2>

                                <label>Nombre de la materia</label>
                                <input
                                    type="text"
                                    placeholder="Ingrese el nombre"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />

                                <label>Día</label>
                                <select
                                    value={dia}
                                    onChange={(e) => setDia(e.target.value)}
                                >
                                    <option value="">Seleccione un día</option>
                                    <option value="Lunes">Lunes</option>
                                    <option value="Martes">Martes</option>
                                    <option value="Miércoles">Miércoles</option>
                                    <option value="Jueves">Jueves</option>
                                    <option value="Viernes">Viernes</option>
                                    <option value="Sábado">Sábado</option>
                                </select>

                                <label>Hora de inicio</label>
                                <input
                                    type="time"
                                    value={horaInicio}
                                    onChange={(e) => setHoraInicio(e.target.value)}
                                />

                                <label>Hora de fin</label>
                                <input
                                    type="time"
                                    value={horaFin}
                                    onChange={(e) => setHoraFin(e.target.value)}
                                />

                                <label>Modalidad</label>
                                <select
                                    value={modalidad}
                                    onChange={(e) => setModalidad(e.target.value)}
                                >
                                    <option value="">Seleccione una modalidad</option>
                                    <option value="Presencial">Presencial</option>
                                    <option value="Virtual">Virtual</option>
                                    <option value="Híbrida">Híbrida</option>
                                </select>

                                <label>Dificultad</label>
                                <select
                                    value={dificultad}
                                    onChange={(e) => setDificultad(e.target.value)}
                                >
                                    <option value="">Seleccione una dificultad</option>
                                    <option value="Básico">Básico</option>
                                    <option value="Intermedio">Intermedio</option>
                                    <option value="Avanzado">Avanzado</option>
                                </select>

                                <label>Créditos</label>
                                <input
                                    type="number"
                                    placeholder="Ingrese los créditos"
                                    value={creditos}
                                    onChange={(e) => setCreditos(e.target.value)}
                                />

                                <div className="modal-botones">

                                    <button
                                        className="btn-guardar"
                                        type="submit"
                                    >
                                        {editando ? "Actualizar" : "Guardar"}
                                    </button>

                                    <button
                                        className="btn-cancelar"
                                        type="button"
                                        onClick={() => setMostrarModal(false)}
                                    >
                                        Cancelar
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                )
            }

        </div>

    );

}

export default GestionMaterias;