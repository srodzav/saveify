import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Table, Collapse } from "react-bootstrap";

function Home({ addToFavorites }) {
    const [open, setOpen] = useState(true); 
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [query, setQuery] = useState("");
    const [tracks, setTracks] = useState([]);
    const [artistFilter, setArtistFilter] = useState("");
    const [songFilter, setSongFilter] = useState("");
    const [hiddenTracks, setHiddenTracks] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("spotify_token");
        setIsLoggedIn(!!token);
    }, []);

    const buscarCancion = async () => {
        const token = localStorage.getItem("spotify_token");

        if (!token || !query) {
            console.error("User not logged in or query is empty.");
            return;
        }

        try {
            const response = await fetch(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                const results = data.tracks.items.map((item) => ({
                    artist: item.artists[0].name,
                    name: item.name,
                    image: item.album.images[0]?.url,
                    url: item.external_urls.spotify,
                    trackId: item.id,
                }));
                setTracks(results);
                setQuery("");
                setSongFilter("");
                setArtistFilter("");
            } else {
                console.error("Error fetching tracks:", response.status);
            }
        } catch (error) {
            console.error("Error performing search:", error);
        }
    };

    const hideTrack = (trackId) => {
        setHiddenTracks([...hiddenTracks, trackId]);
    };

    const filteredTracks = tracks.filter((track) => 
        track.artist.toLowerCase().includes(artistFilter.toLowerCase()) &&
        track.name.toLowerCase().includes(songFilter.toLowerCase())
    );

    const visibleTracks = filteredTracks.filter((track) => !hiddenTracks.includes(track.trackId));

    return (
        <>
            <h2 id="home">Saveify</h2>
            <Row className="mt-4 mb-3">
                <Col>
                    <Form.Group controlId="query">
                        <Form.Control type="text" placeholder="Search for a song" disabled={!isLoggedIn} value={query} onChange={(e) => setQuery(e.target.value)}/>
                    </Form.Group>
                </Col>
                <Col xs="auto">
                    <Button variant="primary" onClick={() => { buscarCancion(); setHiddenTracks([]);} } title="Search" disabled={!isLoggedIn}>
                        <i className="bi bi-search"></i>
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col lg={4} md={4} xs={5}>
                    <Form.Group controlId="artistFilter">
                        <Form.Label>Filter by Artist:</Form.Label>
                        <Form.Select
                            value={artistFilter}
                            onChange={(e) => setArtistFilter(e.target.value)}
                            disabled={!isLoggedIn}
                        >
                            <option value="">All Artists</option>
                            {[...new Set(tracks.map((track) => track.artist))].map((artist) => (
                                <option key={artist} value={artist}>
                                    {artist}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col lg={4} md={4} xs={4}>
                    <Form.Group controlId="songFilter">
                        <Form.Label>Filter by Song:</Form.Label>
                        <Form.Control
                            type="text"
                            value={songFilter}
                            onChange={(e) => setSongFilter(e.target.value)}
                            placeholder="Search within results"
                            disabled={!isLoggedIn}
                        />
                    </Form.Group>
                </Col>
                <Col lg={1} md={1} xs={1} className="align-self-end">
                    <Button variant="warning" onClick={() => { setArtistFilter(""); setSongFilter(""); setHiddenTracks([]); }} title="Reset Filters">
                        <i className="bi bi-arrow-clockwise"></i>
                    </Button>
                </Col>
            </Row>
            <div className="d-flex justify-content-between align-items-center my-4">
                <h3>Search Results</h3>
                <Button
                    variant="outline-primary"
                    onClick={() => setOpen(!open)}
                    aria-controls="resultsCollapse"
                    aria-expanded={open}
                >
                    <i className={`bi ${open ? "bi-chevron-up" : "bi-chevron-down"}`}></i> {open ? "Hide" : "Show"} Results
                </Button>
            </div>
            <Collapse in={open}>
                <div id="resultsCollapse">
                    <Table striped hover>
                        <thead className="table-dark">
                            <tr>
                                <th className="irrelevance">Artist</th>
                                <th className="irrelevance">Song</th>
                                <th className="irrelevance">Album</th>
                                <th>Preview</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="results">
                            {visibleTracks.map((track) => (
                                <tr key={track.trackId}>
                                    <td className="irrelevance">{track.artist}</td>
                                    <td className="irrelevance">{track.name}</td>
                                    <td className="irrelevance">
                                        <img
                                            src={track.image}
                                            alt="Album cover"
                                            style={{ width: "50px" }}
                                        />
                                    </td>
                                    <td>
                                        <iframe
                                            title={track.name}
                                            style={{ borderRadius: "12px" }}
                                            src={`https://open.spotify.com/embed/track/${track.trackId}`}
                                            width="100%"
                                            height="80"
                                            frameBorder="0"
                                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                            loading="lazy"
                                        ></iframe>
                                    </td>
                                    <td className="justify-content-center">
                                        <Button variant="success" onClick={() => addToFavorites(track.trackId)} title="Bookmark">
                                            <i className="bi bi-bookmark-star-fill"></i>
                                        </Button>
                                        <Button variant="danger" onClick={() => hideTrack(track.trackId)} title="Hide">
                                            <i className="bi bi-slash-circle"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Collapse>
        </>
    );
}

export default Home;
