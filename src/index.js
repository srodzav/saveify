import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Callback from "./Callback";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/callback" element={<Callback />} />
            </Routes>
        </Router>
    </React.StrictMode>
);
