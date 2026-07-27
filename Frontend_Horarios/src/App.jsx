import { BrowserRouter, Routes, Route } from "react-router-dom";
import GestionMaterias from "./pages/GestionMaterias";


function App(){

    return(

        <BrowserRouter>

            <Routes>

                <Route
                    path="/materias"
                    element={<GestionMaterias />}
                />

            </Routes>

        </BrowserRouter>

    )

}


export default App;