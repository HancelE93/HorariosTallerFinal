import "../styles/ListaMaterias.css";

function ListaMaterias({
    materias,
    eliminarMateria,
    editarMateria
}) {

    return (

        <div className="lista">

            {
                materias.map((materia) => (

                    <div
                        key={materia.id}
                        className="card"
                    >

                        <h2>
                            📚 {materia.name}
                        </h2>

                        <p>
                            📅 <strong>Día:</strong> {materia.day}
                        </p>

                        <p>
                            ⏰ <strong>Horario:</strong>{" "}
                            {
                                new Date(materia.start_time)
                                    .toISOString()
                                    .substring(11, 16)
                            }
                            {" - "}
                            {
                                new Date(materia.end_time)
                                    .toISOString()
                                    .substring(11, 16)
                            }
                        </p>

                        <p>
                            💻 <strong>Modalidad:</strong> {materia.modality}
                        </p>

                        <p>
                            ⭐ <strong>Dificultad:</strong> {materia.difficulty}
                        </p>

                        <p>
                            🎓 <strong>Créditos:</strong> {materia.credits}
                        </p>

                        <div className="botones">

                            <button
                                className="btn-editar"
                                onClick={() => editarMateria(materia)}
                            >
                                ✏️ Editar
                            </button>

                            <button
                                className="btn-eliminar"
                                onClick={() => eliminarMateria(materia.id)}
                            >
                                🗑️ Eliminar
                            </button>

                        </div>

                    </div>

                ))
            }

        </div>

    );

}

export default ListaMaterias;