import { BrowserRouter, Routes, Route } from "react-router-dom";


import GestionMaterias from "./pages/GestionMaterias";
import ConfiguracionHorario from "./pages/ConfiguracionHorario";
import Resultados from "./pages/Resultados";
import DetalleHorario from "./pages/DetalleHorario";
import Navbar from "./components/Navbar";


function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/materias" element={<GestionMaterias />} />

                <Route path="/configuracion" element={<ConfiguracionHorario />} />

                <Route path="/resultados" element={<Resultados />} />

                <Route path="/detalle" element={<DetalleHorario />} />

            </Routes>

        </BrowserRouter>

    );

}

export default App;