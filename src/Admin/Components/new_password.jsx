import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

const PasswordResetForm = () => {
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        email: "",
        otp: "",
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();



    const validatePassword = (password) => {
        // Regex pattern for password validation
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
        return passwordPattern.test(password);
    };
const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
        ...formData,
        [name]: value,
    });

    // Password validation
    if (name === "password") {
        if (!validatePassword(value)) {
            setMessage("Password must be 8-16 characters long, include at least one letter, one number, and one special character.");
        } else {
            setMessage("");
        }
    }

    // Confirm password validation
    if (name === "confirmPassword") {
        if (value !== formData.password) {
            setMessage("Passwords do not match.");
        } else {
            setMessage("");
        }
    }
};

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }



        try {
            await axios.post('http://127.0.0.1:8000/api/reset-password/', formData);

            setMessage("Password has been reset successfully!");
            setTimeout(() => {
                navigate("/All_students")
            }, 3000);
        } catch (error) {
            console.error("Error resetting password:", error);
            setMessage("Failed to reset password.");
        }
    };
    const handleclose = () => {
        navigate("/All_students");
    }

    return (
        <div>     
        <div className="background-image"></div>
        <Modal show={true} onHide={handleclose} centered className='new_pswd_mdl'>
    
            <Modal.Header closeButton className='px-5'>
                <Modal.Title  className='my-4'>Reset Password</Modal.Title>
            </Modal.Header>
            <Modal.Body className='mx-4 mt-3'>
                <Form onSubmit={handleSubmit} >
                    {message && <div className="alert alert-info">{message}</div>}
                    <Form.Group controlId="formEmail" className='mb-4'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name='email'
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formOtp" className='mb-4'>
                        <Form.Label>OTP</Form.Label>
                        <Form.Control
                            type="text"
                            name='otp'
                            placeholder="Enter the OTP"
                            value={formData.otp}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formpassword" className='mb-4'>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            name='password'
                            placeholder="Enter new password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            name='confirmPassword'
                            placeholder="Confirm new password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    
                    <Modal.Footer className='mt-4 pt-4'>
                        <Button variant="warning" type="submit">
                                Reset Password
                        </Button>
                        <button onClick={handleclose}>
                            Cancel
                        </button>
                    </Modal.Footer>

                    </Form>
            </Modal.Body>

        </Modal>
        </div>

    );
};

export default PasswordResetForm;
