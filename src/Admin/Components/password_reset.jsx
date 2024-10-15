import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const PasswordResetRequest = ({ show, onHide }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post('http://127.0.0.1:8000/api/request-password-reset/', { email });
          setMessage("Check your email for a link to reset your password.");
          navigate("/reset-password");
        } catch (error) {
          console.error("Error sending password reset email:", error);
          setMessage("Failed to send reset email.");
        }
    };

    return (
        <Modal show={show} onHide={onHide} backdropClassName="custom-modal-backdrop" className='custom-modal'  centered>
            <Modal.Header closeButton>
                <Modal.Title>Reset Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message && <div className="alert alert-danger">{message}</div>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter your email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </Form.Group>

                <Modal.Footer>
                <Button variant="warning" type="submit">
                        Send OTP
                    </Button>
                    <button
                    onClick={onHide}>
                            Cancel
                        </button>
                </Modal.Footer>
                
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default PasswordResetRequest;
