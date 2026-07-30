import { useLocation, useNavigate } from "react-router-dom";
import ResultadoHorario from "../components/ResultadoHorario";
import "../styles/Resultados.css";


function Resultados() {

    const location = useLocation();
    const navigate = useNavigate();


    console.log("Datos recibidos:", location.state);


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


                        <button
                            onClick={() => navigate("/detalle-horario")}
                        >
                            Ver detalle del horario
                        </button>


                    </>


                ) : (

                    <>

                        <p>
                            No existe un horario generado todavía.
                        </p>


                        <button
                            onClick={() => navigate("/")}
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