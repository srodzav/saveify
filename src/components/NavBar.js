import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import DisclaimerModal from "./DisclaimerModal";
import ProfileModal from "./ProfileModal";

function NavBar() {

    const [profile, setProfile] = useState(null);
    
    useEffect(() => {
        async function fetchProfile() {
            const token = localStorage.getItem("spotify_token");

            if (!token) return;

            try {
                const response = await fetch("https://api.spotify.com/v1/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProfile(data);
                } else {
                    console.error("Error fetching profile:", response.status);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        }

        fetchProfile();
    }, []);

    const handleLogin = () => {
        const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
        const redirectUri = process.env.REACT_APP_REDIRECT_URI;
        const scopes = process.env.REACT_APP_SCOPES;

        const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&redirect_uri=${encodeURIComponent(
            redirectUri
        )}&scope=${encodeURIComponent(scopes)}`;

        window.location.href = authUrl;
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand href="#home">&nbsp;&nbsp;<i className="bi bi-spotify"></i></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNav" />
                <Navbar.Collapse id="navbarNav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">&nbsp;&nbsp;<i className="bi bi-house-door-fill"></i> Home</Nav.Link>
                        <Nav.Link href="#fav">&nbsp;&nbsp;<i className="bi bi-bookmark-heart-fill"></i> Favorites</Nav.Link>
                        <Nav className="me-auto">
                            <DisclaimerModal />
                        </Nav>
                    </Nav>
                    <Nav className="ms-auto">
                        {profile ? (
                            <Nav className="me-auto">
                                <ProfileModal profile={profile} />
                            </Nav>
                        ) : (
                            <Nav.Link onClick={handleLogin}>
                                &nbsp;&nbsp;<i className="bi bi-spotify"></i> Log in with Spotify
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
