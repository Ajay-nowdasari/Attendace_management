import React, { useState } from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Spinner} from 'react-bootstrap';

const PasswordResetRequest = ({ show, onHide }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://127.0.0.1:8000/api/request-password-reset/', { email });
            setMessage("Check your email for a link to reset your password.");
            navigate("/reset-password");
        } catch (error) {
            console.error("Error sending password reset email:", error);
            setMessage("Failed to send reset email.");
        } finally {
            setLoading(false); // Reset loading state after request
        }
    };

    return (
        <Modal show={show} onHide={onHide} backdropClassName="custom-modal-backdrop" className='custom-modal' centered>
            <Modal.Header className='change_password_header' closeButton>
                <Modal.Title>Reset Password</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                {message && <div className="alert alert-danger">{message}</div>}
                <Form onSubmit={handleSubmit}>
                    <Form.Label><svg xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m440.72-509.72-317.13-200v386.85h392.82v91H123.59q-37.79 0-64.39-26.61-26.61-26.61-26.61-64.39v-474.26q0-37.78 26.61-64.39 26.6-26.61 64.39-26.61h634.26q37.78 0 64.39 26.61t26.61 64.39v200h-91v-112.59l-317.13 200Zm0-87.41 317.13-200H123.59l317.13 200ZM761.91-69.48q-68.39 0-116.94-48.55-48.56-48.56-48.56-116.95v-180q0-43.5 30.03-73.54 30.02-30.05 73.51-30.05 43.48 0 73.56 30.05 30.08 30.04 30.08 73.54v180H720v-180q0-8-6-14t-14-6q-8 0-14 6t-6 14v180q0 33.96 23.98 57.94 23.98 23.97 57.93 23.97 33.96 0 57.82-23.97 23.86-23.98 23.86-57.94v-161.67h83.82v161.67q0 68.39-48.55 116.95-48.56 48.55-116.95 48.55ZM123.59-709.72v-87.41 474.26-386.85Z" /></svg> Email address</Form.Label>
                    <FloatingLabel controlId="formEmail" label="Email" className="mb-3">
                        <Form.Control
                            type="email"
                            value={email}
                            placeholder='Enter email'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </FloatingLabel>

                    <Modal.Footer>
                        <Button variant="warning" type="submit" >
                            {loading ? (
            <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
        ) : (
                                'Send OTP'
                            )}
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