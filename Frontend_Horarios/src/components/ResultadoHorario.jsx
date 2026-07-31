import "./../styles/ResultadoHorario.css";

function ResultadoHorario({ resultado }) {

    return (
        <div className="resultado-container">

            <h2>
                Resultados
            </h2>


            <div className="resumen">

                <p>
                    Materias disponibles:
                    {" "}
                    {resultado.totalCourses}
                </p>


                <p>
                    Combinaciones posibles:
                    {" "}
                    {resultado.totalCombinations}
                </p>


                <p>
                    Horarios válidos:
                    {" "}
                    {resultado.validSchedules}
                </p>


                <p>
                    Horarios descartados:
                    {" "}
                    {resultado.discardedSchedules}
                </p>


            </div>



            <h3>
                Detalle:
            </h3>



            {
                resultado.schedules?.map((horario, index) => (

                    <div
                        key={index}
                        className="horario-card"
                    >


                        <h4>
                            Horario {index + 1}
                        </h4>



                        <p
                            className={
                                horario.valid
                                ? "estado-valido"
                                : "estado-invalido"
                            }
                        >

                            Estado:
                            {" "}
                            {
                                horario.valid
                                ? "Válido"
                                : "Inválido"
                            }

                        </p>



                        <p>
                            Razones:
                        </p>



                        <ul>

                            {
                                horario.reasons?.map((razon, i) => (

                                    <li key={i}>
                                        {razon}
                                    </li>

                                ))
                            }

                        </ul>



                        <h4>
                            Materias:
                        </h4>



                        {
                            horario.courses?.map((materia) => (

                                <div
                                    key={materia.id}
                                    className="materia-card"
                                >


                                    <h4>
                                        📘 {materia.name}
                                    </h4>



                                    <p>
                                        Día:
                                        {" "}
                                        {materia.day}
                                    </p>



                                    <p>
                                        Horario:
                                        {" "}

                                        {
                                            new Date(materia.startTime)
                                            .toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })
                                        }


                                        {" - "}


                                        {
                                            new Date(materia.endTime)
                                            .toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })
                                        }

                                    </p>



                                    <p>
                                        Modalidad:
                                        {" "}
                                        {materia.modality}
                                    </p>



                                    <p>
                                        Créditos:
                                        {" "}
                                        {materia.credits}
                                    </p>


                                </div>

                            ))
                        }


                    </div>

                ))
            }




            <div className="matematicas-container">


                <h3>
                    Conceptos matemáticos aplicados
                </h3>



                <h4>
                    Combinatoria
                </h4>


                <p>
                    El sistema utiliza combinaciones para generar
                    diferentes selecciones de materias.
                </p>


                <p>
                    Total de combinaciones generadas:
                    {" "}
                    {resultado.totalCombinations}
                </p>




                <h4>
                    Álgebra proposicional
                </h4>


                <p>
                    Cada horario es evaluado mediante reglas lógicas:
                </p>


                <ul>

                    <li>
                        El horario no debe tener cruces.
                    </li>


                    <li>
                        Debe cumplir los créditos máximos.
                    </li>


                    <li>
                        Debe cumplir las materias obligatorias.
                    </li>


                    <li>
                        Debe validar prerrequisitos.
                    </li>

                </ul>




                <h4>
                    Teoría de conjuntos
                </h4>


                <p>
                    Las materias disponibles representan el conjunto
                    universal.
                </p>


                <p>
                    Las materias seleccionadas forman un subconjunto
                    válido dentro del conjunto disponible.
                </p>


            </div>



        </div>
    );

}


export default ResultadoHorario;