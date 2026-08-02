import {
    BrowserRouter,
    Routes,
    Route,
    useLocation
} from "react-router-dom";

import GestionMaterias from "./pages/GestionMaterias";
import ConfiguracionHorario from "./pages/ConfiguracionHorario";
import Resultados from "./pages/Resultados";
import DetalleHorario from "./pages/DetalleHorario";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function Layout() {

    const location = useLocation();

    return (

        <>

            {
                location.pathname !== "/" &&
                <Navbar />
            }

            <Routes>

                <Route path="/" element={<Home />} />

                <Route
                    path="/materias"
                    element={<GestionMaterias />}
                />

                <Route
                    path="/configuracion"
                    element={<ConfiguracionHorario />}
                />

                <Route
                    path="/resultados"
                    element={<Resultados />}
                />

                <Route
                    path="/detalle"
                    element={<DetalleHorario />}
                />

            </Routes>

        </>

    );

}

function App() {

    return (

        <BrowserRouter>

            <Layout />

        </BrowserRouter>

    );

}

export default App;