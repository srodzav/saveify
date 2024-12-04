import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function ProfileModal({ profile }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="link" className="nav-link text-white" onClick={handleShow}>
                &nbsp;&nbsp;<i className="bi bi-person-circle"></i> {profile.display_name}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton title="Close Button">
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <img
                            src={profile.images?.[0]?.url || "https://via.placeholder.com/150"}
                            alt="Profile"
                            className="img-fluid rounded-circle mb-3"
                            style={{ width: "150px", height: "150px", border: "3px solid #1db954" }}
                        />
                        <h2>{profile.display_name}</h2>
                        <p className="text-muted">{profile.email}</p>
                        <p className="badge bg-success fs-6 px-3 py-2">{profile.country}</p>
                    </div>
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

export default ProfileModal;
