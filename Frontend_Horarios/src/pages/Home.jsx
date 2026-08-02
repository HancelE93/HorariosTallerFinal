import { Link } from "react-router-dom";
import "../styles/Home.css";


function Home() {

    return (

        <div className="home-container">


            <div className="hero">


                <h1>
                    Bienvenido
                </h1>

                <p>
                    Generador Inteligente de Horarios Académicos.
                    Administra materias, configura restricciones
                    y genera horarios aplicando conceptos de
                    Matemáticas Discretas.
                </p>

                <h3 className="inicio-texto">
                    🚀 Comienza registrando tus materias.
                </h3>




            </div>



            <div className="cards-container">



                <Link
                    to="/materias"
                    className="card"
                >

                    <h2>
                        📚 Gestión de Materias
                    </h2>


                    <p>
                        Permite registrar, editar, eliminar y consultar
                        las materias disponibles para generar horarios.
                    </p>


                </Link>




                <Link
                    to="/configuracion"
                    className="card"
                >

                    <h2>
                        ⚙️ Configuración del Horario
                    </h2>


                    <p>
                        Permite establecer cantidad de materias,
                        créditos máximos, modalidad y restricciones.
                    </p>


                </Link>




                <Link
                    to="/resultados"
                    className="card"
                >

                    <h2>
                        📊 Resultados
                    </h2>


                    <p>
                        Muestra las combinaciones generadas,
                        horarios válidos y descartados.
                    </p>


                </Link>




                <Link
                    to="/detalle"
                    className="card"
                >

                    <h2>
                        📅 Detalle del Horario
                    </h2>


                    <p>
                        Permite consultar días, horas, modalidades,
                        créditos y estado del horario seleccionado.
                    </p>


                </Link>


            </div>





            <div className="conceptos-container">


                <h2>
                    🧮 Conceptos Matemáticos Aplicados
                </h2>



                <div className="concepto-card">


                    <h3>
                        🔢 Combinatoria
                    </h3>


                    <p>
                        Se utiliza para generar todas las selecciones
                        posibles de materias sin importar el orden.
                    </p>


                    <p>
                        Ejemplo:
                    </p>


                    <strong>
                        C(3,2)=3 combinaciones posibles
                    </strong>


                </div>





                <div className="concepto-card">


                    <h3>
                        🔗 Teoría de Conjuntos
                    </h3>


                    <p>
                        Las materias disponibles representan el conjunto
                        universal y cada horario generado forma un
                        subconjunto válido.
                    </p>


                    <strong>
                        Horario seleccionado ⊆ Materias disponibles
                    </strong>


                </div>





                <div className="concepto-card">


                    <h3>
                        🧠 Álgebra Proposicional
                    </h3>


                    <p>
                        Los horarios son evaluados mediante reglas lógicas
                        utilizando condiciones verdaderas o falsas.
                    </p>


                    <strong>
                        Sin cruces AND Créditos permitidos
                    </strong>


                </div>


            </div>



        </div>

    );

}


export default Home;