import { useLocation, useNavigate } from "react-router-dom";
import ResultadoHorario from "../components/ResultadoHorario";
import "../styles/Resultados.css";


function Resultados() {


    const location = useLocation();
    const navigate = useNavigate();


    const resultado = location.state;



    return (

        <div className="resultados-container">


            <h1>
                Resultados de horarios generados
            </h1>



            {
                resultado ? (

                    <>


                        <ResultadoHorario
                            resultado={resultado}
                        />



                        <h2>
                            Seleccionar horario
                        </h2>



                        {
                            resultado.schedules?.map((horario, index) => (


                                <div key={index}>


                                    <h3>
                                        Horario {index + 1}
                                    </h3>



                                    <p>
                                        Estado:
                                        {
                                            horario.valid
                                            ? " Válido"
                                            : " Inválido"
                                        }
                                    </p>



                                    <button
                                        onClick={() =>
                                            navigate(
                                                "/detalle",
                                                {
                                                    state: horario
                                                }
                                            )
                                        }
                                    >
                                        Ver detalle Horario {index + 1}
                                    </button>


                                    <hr />


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