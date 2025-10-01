import React from "react";
import {
    Routes,
    Route,
} from 'react-router-dom';
import { Layout } from "../pages/layout/Layout";
import { Home } from "../pages/Home/Home";
import { PokemonView } from "../pages/PokemonView/PokemonView";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="" element={<Home />} />
                <Route path="pokemon/:id" element={<PokemonView />} />
            </Route>
        </Routes>
    );
}