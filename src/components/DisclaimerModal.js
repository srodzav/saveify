import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function DisclaimerModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="link" className="nav-link text-white" onClick={handleShow}>
                &nbsp;&nbsp;<i className="bi bi-exclamation-triangle-fill"></i> Disclaimer
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Disclaimer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        This application is a personal project created to demonstrate the use of the Spotify API.
                        It is not endorsed, certified, or otherwise approved by Spotify. All song titles, album covers, 
                        and artist names are copyright of Spotify and their respective owners.
                    </p>
                    <p>
                        No data is stored permanently, and this app does not collect or share user data. 
                        It is provided for educational purposes only.
                    </p>
                    <p className="text-muted text-center">
                        <strong>Sebastian Rodriguez</strong>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        <i className="bi bi-x-circle-fill"></i> Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DisclaimerModal;
