import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";

function FavoriteSongs({ favorites, removeFromFavorites }) {
    const [favoriteTracks, setFavoriteTracks] = useState([]); // State to store favorite songs

    // Fetch favorite songs on mount
    useEffect(() => {
        const fetchFavorites = async () => {
            const token = localStorage.getItem("spotify_token");
            if (!token) return;

            const tracks = [];
            for (const trackId of favorites) {
                const track = await fetchTrack(trackId, token);
                if (track) tracks.push(track);
            }
            setFavoriteTracks(tracks);
        };

        fetchFavorites();
    }, [favorites]);

    // Function to fetch track details
    const fetchTrack = async (trackId, token) => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const track = await response.json();
                return {
                    artist: track.artists[0].name,
                    name: track.name,
                    image: track.album.images[0]?.url || "",
                    url: track.external_urls.spotify,
                    trackId: track.id,
                };
            }
        } catch (error) {
            console.error("Error fetching track:", error);
        }
        return null;
    };

    return (
        <>
            <h3 className="my-4" id="fav">Favorite Songs</h3>
            <Table striped hover>
                <thead className="thead-dark">
                    <tr>
                        <th className="irrelevance">Artist</th>
                        <th className="irrelevance">Song</th>
                        <th className="irrelevance">Album</th>
                        <th className="priority">Preview</th>
                        <th className="priority"></th>
                    </tr>
                </thead>
                <tbody>
                    {favoriteTracks.map((track) => (
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
                            <td>
                                <Button variant="danger" onClick={() => removeFromFavorites(track.trackId)} title="Unmark">
                                    <i className="bi bi-trash3-fill"></i>
                                </Button>
                            </td>
                        </tr>
                    ))} 
                </tbody>
            </Table>
        </>
    );
}

export default FavoriteSongs;
