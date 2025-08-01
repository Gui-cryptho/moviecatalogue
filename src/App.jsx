import React from "react"
import Home from "./pages/Home"
import Favourites from "./pages/Favourites"
import AddMovie from "./pages/AddMovie"
import { Routes, Route } from "react-router-dom"

export default function App() {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favourites" element={<Favourites />} />
                <Route path="/AddMovie" element={<AddMovie/>}/>
            </Routes>
    )
}
