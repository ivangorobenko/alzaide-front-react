import * as React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import InformationsAccompagne from "./domain/communication/informationsAccompagne";
import TableauDeBordAccompagnant from "./domain/communication/tableauDeBordAccompagnant";

export const Routing = () =>
    (
        <Router>
            <Routes>
                <Route path='/' element={<InformationsAccompagne/>}/>
                <Route path='/dashboard-helper' element={<TableauDeBordAccompagnant/>}/>
            </Routes>
        </Router>
    )

export default Routing
