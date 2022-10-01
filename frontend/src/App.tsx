import {Routes, Route, Link } from "react-router-dom"
import { CPPMap } from "./pages/home"


export function App() {

    return (

        <div id="root-div">

            <Routes>
                <Route path="/" element={<CPPMap/>}></Route>
            </Routes>

        </div>


    )


}