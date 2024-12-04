import React, { useState, useEffect } from "react";
import "./styles/App.css";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import DisclaimerModal from "./components/DisclaimerModal";
import FavoriteSongs from "./components/FavoriteSongs";
import { Container } from "react-bootstrap";
import { Alert } from "react-bootstrap";

function App() {

    const [alerts, setAlerts] = useState([]);
    const [favorites, setFavorites] = useState([]);

    const showAlert = (message, variant) => {
        const id = Date.now();
        setAlerts((prevAlerts) => [...prevAlerts, { id, message, variant }]);

        setTimeout(() => {
            setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
        }, 3000);
    };

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    const addToFavorites = (trackId) => {
        if (!favorites.includes(trackId)) {
            const updatedFavorites = [...favorites, trackId];
            setFavorites(updatedFavorites);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            showAlert("Song added to bookmarks!", "success");
        } else {
            showAlert("Song already in bookmarks!", "warning");
        }
    };

    const removeFromFavorites = (trackId) => {
        const updatedFavorites = favorites.filter((id) => id !== trackId);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        showAlert("Song removed from bookmarks!", "danger");
    };

    return (
        <>
            <NavBar />
            <Container >
                <div className="mx-auto" style={{ position: "fixed", top: "20px", right: "20px", zIndex: 1055 }}>
                    {alerts.map((alert) => (
                        <Alert key={alert.id} variant={alert.variant} className="mb-2">
                            {alert.message}
                        </Alert>
                    ))}
                </div>
                <Home addToFavorites={addToFavorites} />
                <FavoriteSongs
                    favorites={favorites}
                    removeFromFavorites={removeFromFavorites}
                />
            </Container>
            <Footer />
            <DisclaimerModal />
        </>
    );
}

export default App;