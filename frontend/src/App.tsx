import {Routes, Route, Link } from "react-router-dom"
import { Home } from "./pages/Home"


export function App() {

    return (

        <div id="root-div">

            <Routes>
                <Route path="/" element={<Home/>}></Route>
            </Routes>

        </div>


    )


}