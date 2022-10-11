import {Routes, Route, Link } from "react-router-dom"
import { Home } from "./pages/Home"
import { Navigation } from './components/Navigation'


export function App() {

    return (

        <div id="root-div">
            <Navigation />
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                
            </Routes>

        </div>


    )


}
