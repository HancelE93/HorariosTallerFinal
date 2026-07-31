import { useLocation, useNavigate } from "react-router-dom";
import "../styles/DetalleHorario.css";


function DetalleHorario() {

    const location = useLocation();
    const navigate = useNavigate();


    const horario =
        location.state ||
        JSON.parse(localStorage.getItem("ultimoDetalleHorario"));



    return (

        <div className="detalle-container">


            <h1>
                Detalle del Horario
            </h1>



            {
                horario ? (

                    <>


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

                                            <strong>
                                                Hora:
                                            </strong>

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

                                            <strong>
                                                Modalidad:
                                            </strong>

                                            {" "}

                                            {materia.modality}

                                        </p>



                                        <p>

                                            <strong>
                                                Créditos:
                                            </strong>

                                            {" "}

                                            {materia.credits}

                                        </p>


                                    </div>


                                </div>


                            ))
                        }



                        <button className="btn-pdf">

                            Descargar PDF

                        </button>


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