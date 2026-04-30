import { Routes, Route, BrowserRouter } from "react-router-dom";
import { memo, FC } from "react";

import { Cards } from "../components/Card.js";
import { Home } from "../components/Home.js";
import { Register } from "../components/Register.js";

export const Router: FC = memo(() => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cards/register" element={<Register />} />
                <Route path="/cards/:id" element={<Cards />} />
            </Routes>
        </BrowserRouter>
    )
});