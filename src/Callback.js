import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Callback() {
    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash; // Leer el hash fragment de la URL
        const params = new URLSearchParams(hash.replace("#", "")); // Reemplaza "#" por ""
        const token = params.get("access_token"); // Extraer el access_token

        if (token) {
            localStorage.setItem("spotify_token", token); // Almacenar el token en localStorage
            navigate("/"); // Redirigir al home
        } else {
            console.error("No token found in the URL");
        }
    }, [navigate]);

    return <div>Loading...</div>;
}

export default Callback;
