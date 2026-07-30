import { BrowserRouter, Routes, Route } from "react-router-dom";
import GestionMaterias from "./pages/GestionMaterias";
import ConfiguracionHorario from "./pages/ConfiguracionHorario";



function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/materias"
                    element={<GestionMaterias />}
                />
                <Route
                    path="/"
                    element={<ConfiguracionHorario />}
                />

            </Routes>

        </BrowserRouter>

    )

}


export default App;