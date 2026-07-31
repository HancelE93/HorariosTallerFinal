import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Resultados.css";


function Resultados() {

    const location = useLocation();
    const navigate = useNavigate();


    const resultado =
        location.state ||
        JSON.parse(localStorage.getItem("ultimoHorario"));



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
                                Materias disponibles:
                                {" "}
                                {resultado.totalCourses}
                            </p>



                            <p>
                                Materias por horario:
                                {" "}
                                {resultado.selectedAmount}
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



                        <h2>
                            Horarios generados
                        </h2>



                        {
                            resultado.schedules?.map((horario, index) => (


                                <div
                                    key={index}
                                    className="horario-card"
                                >


                                    <h3>
                                        Horario {index + 1}
                                    </h3>



                                    <p>
                                        Estado:

                                        {" "}

                                        {
                                            horario.valid
                                            ? "Válido"
                                            : "Inválido"
                                        }

                                    </p>



                                    <button

                                        onClick={() => {


                                            localStorage.setItem(
                                                "ultimoDetalleHorario",
                                                JSON.stringify(horario)
                                            );


                                            navigate(
                                                "/detalle",
                                                {
                                                    state: horario
                                                }
                                            );


                                        }}

                                    >

                                        Ver detalle

                                    </button>



                                </div>


                            ))
                        }



                    </>


                ) : (

                    <>


                        <p>
                            No existe un horario generado todavía.
                        </p>



                        <button
                            onClick={() => navigate("/configuracion")}
                        >

                            Ir a configuración

                        </button>


                    </>

                )
            }


        </div>

    );

}


export default Resultados;