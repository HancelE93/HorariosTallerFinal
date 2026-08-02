import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {

    return (

        <nav>

            <Link to="/">
                Inicio
            </Link>

            <Link to="/materias">
                Materias
            </Link>

            <Link to="/configuracion">
                Configuración Horario
            </Link>

            <Link to="/resultados">
                Resultados
            </Link>

        </nav>

    );

}

export default Navbar;