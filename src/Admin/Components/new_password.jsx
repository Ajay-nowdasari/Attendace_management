import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate,useSearchParams } from 'react-router-dom';
import { Modal,Spinner,Button, Form  } from 'react-bootstrap';
import clickSound from "../../assets/sounds/mouse-click-153941.mp3";
import closeSound from "../../assets/sounds/close.mp3";
const PasswordResetForm = () => {
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email'); // Retrieve the email parameter
    const otpLength = 6; // Number of OTP digits
    const [timeleft, setTimeleft] = useState(60); // Timer for 60 seconds
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: email,
        otp: "",
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();

    const playClick = () => {
        const audio = new Audio(clickSound);
        audio.play();
    };

    const playClose = () => {
        const audio = new Audio(closeSound);
        audio.play();
    }

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

        // Independent validation for password and confirmPassword
        if (name === "password") {
            if (!validatePassword(value)) {
                setMessage("Password must be 8-16 characters long, include at least one letter, one number, and one special character.");
            } else if (formData.confirmPassword && value !== formData.confirmPassword) {
                setMessage("Passwords do not match.");
            } else {
                setMessage("");
            }
        }

        if (name === "confirmPassword") {
            if (value !== formData.password) {
                setMessage("Passwords do not match.");
            } else {
                setMessage("");
            }
        }
    };

    const handleSubmit = async (e) => {
        playClick()
        e.preventDefault();
        setLoading(true);
        if (!validatePassword(formData.password)) {
            setMessage("Password must be 8-16 characters long, include at least one letter, one number, and one special character.");
            return;
        }
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
        } finally {
            setLoading(false); // End loading
        }
    };
    const handleClose = () => {
        playClose();
        navigate("/All_students");
    }
    useEffect(() => {
        if (timeleft > 0) {
            const timer = setTimeout(() => setTimeleft(timeleft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeleft]);

    return (
        <div>
            <div className="background-image"></div>
            <Modal show={true} onHide={handleClose} centered className='new_pswd_mdl'>

                <Modal.Header closeButton className='px-5 change_password_header'>
                    <Modal.Title className='my-4'>Reset Password</Modal.Title>
                </Modal.Header>
                <Modal.Body className='mx-4 mt-3'>
                    <Form onSubmit={handleSubmit} >
                        {message && <div className="alert alert-info">{message}</div>}
                        {/* <Form.Floating controlId="formEmail" className='mb-4'>
                            <Form.Control
                                type="email"
                                name='email'
                                placeholder="Enter your email"
                                value={email}
                                onChange={handleChange}
                                required
                            />
                            <Form.Label className="form-label"> <svg xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m440.72-509.72-317.13-200v386.85h392.82v91H123.59q-37.79 0-64.39-26.61-26.61-26.61-26.61-64.39v-474.26q0-37.78 26.61-64.39 26.6-26.61 64.39-26.61h634.26q37.78 0 64.39 26.61t26.61 64.39v200h-91v-112.59l-317.13 200Zm0-87.41 317.13-200H123.59l317.13 200ZM761.91-69.48q-68.39 0-116.94-48.55-48.56-48.56-48.56-116.95v-180q0-43.5 30.03-73.54 30.02-30.05 73.51-30.05 43.48 0 73.56 30.05 30.08 30.04 30.08 73.54v180H720v-180q0-8-6-14t-14-6q-8 0-14 6t-6 14v180q0 33.96 23.98 57.94 23.98 23.97 57.93 23.97 33.96 0 57.82-23.97 23.86-23.98 23.86-57.94v-161.67h83.82v161.67q0 68.39-48.55 116.95-48.56 48.55-116.95 48.55ZM123.59-709.72v-87.41 474.26-386.85Z" /></svg> Email</Form.Label>
                        </Form.Floating> */}
                    <p align="center">Check your email for the OTP.</p>
                    <p align="center">Enter the {otpLength}-digit code below.</p>

                        <Form.Floating controlId="formOtp" className='mb-4'>
                            <Form.Control
                                type="text"
                                name='otp'
                                placeholder="Enter the OTP"
                                value={formData.otp}
                                onChange={handleChange}
                                required
                            />
                            <Form.Label><svg fill="#000000" width="24px" height="17px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">

                                <g id="Change_password">
                                    <path d="M464.4326,147.54a9.8985,9.8985,0,0,0-17.56,9.1406,214.2638,214.2638,0,0,1-38.7686,251.42c-83.8564,83.8476-220.3154,83.874-304.207-.0088a9.8957,9.8957,0,0,0-16.8926,7.0049v56.9a9.8965,9.8965,0,0,0,19.793,0v-34.55A234.9509,234.9509,0,0,0,464.4326,147.54Z" />
                                    <path d="M103.8965,103.9022c83.8828-83.874,220.3418-83.8652,304.207-.0088a9.8906,9.8906,0,0,0,16.8926-6.9961v-56.9a9.8965,9.8965,0,0,0-19.793,0v34.55C313.0234-1.3556,176.0547,3.7509,89.9043,89.9012A233.9561,233.9561,0,0,0,47.5674,364.454a9.8985,9.8985,0,0,0,17.56-9.1406A214.2485,214.2485,0,0,1,103.8965,103.9022Z" />
                                    <path d="M126.4009,254.5555v109.44a27.08,27.08,0,0,0,27,27H358.5991a27.077,27.077,0,0,0,27-27v-109.44a27.0777,27.0777,0,0,0-27-27H153.4009A27.0805,27.0805,0,0,0,126.4009,254.5555ZM328,288.13a21.1465,21.1465,0,1,1-21.1465,21.1464A21.1667,21.1667,0,0,1,328,288.13Zm-72,0a21.1465,21.1465,0,1,1-21.1465,21.1464A21.1667,21.1667,0,0,1,256,288.13Zm-72,0a21.1465,21.1465,0,1,1-21.1465,21.1464A21.1667,21.1667,0,0,1,184,288.13Z" />
                                    <path d="M343.6533,207.756V171.7538a87.6533,87.6533,0,0,0-175.3066,0V207.756H188.14V171.7538a67.86,67.86,0,0,1,135.7208,0V207.756Z" />
                                </g>

                            </svg>OTP</Form.Label>
                        </Form.Floating>
                        <p>Your OTP expires in {timeleft} seconds.</p>
                        <Form.Floating controlId="formpassword" className='mb-4'>
                            <Form.Control
                                type="password"
                                name='password'
                                placeholder="Enter new password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <Form.Label style={{ fontWeight: "bold", fontSize: "17px" }}><svg xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M242.87-72.59q-37.54 0-64.27-26.73-26.73-26.73-26.73-64.27v-394.26q0-37.54 26.73-64.27 26.73-26.73 64.27-26.73h33.54v-73.06q0-84.92 59.46-144.61 59.46-59.7 144.13-59.7 84.67 0 144.13 59.7 59.46 59.69 59.46 144.61v73.06h33.54q37.54 0 64.27 26.73 26.73 26.73 26.73 64.27v394.26q0 37.54-26.73 64.27-26.73 26.73-64.27 26.73H242.87Zm0-91h474.26v-394.26H242.87v394.26ZM480-280.72q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5ZM367.41-648.85h225.18v-73.06q0-47.21-32.73-80.26-32.73-33.05-79.86-33.05t-79.86 33.05q-32.73 33.05-32.73 80.26v73.06ZM242.87-163.59v-394.26 394.26Z" /></svg>Password</Form.Label>

                        </Form.Floating>
                        <Form.Floating controlId="formConfirmPassword">
                            <Form.Control
                                type="password"
                                name='confirmPassword'
                                placeholder="Confirm new password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <Form.Label style={{ fontWeight: "bold", fontSize: "17px" }}><svg xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M242.87-72.59q-37.54 0-64.27-26.73-26.73-26.73-26.73-64.27v-394.26q0-37.54 26.73-64.27 26.73-26.73 64.27-26.73h33.54v-73.06q0-84.92 59.46-144.61 59.46-59.7 144.13-59.7 84.67 0 144.13 59.7 59.46 59.69 59.46 144.61v73.06h33.54q37.54 0 64.27 26.73 26.73 26.73 26.73 64.27v394.26q0 37.54-26.73 64.27-26.73 26.73-64.27 26.73H242.87Zm0-91h474.26v-394.26H242.87v394.26ZM480-280.72q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5ZM367.41-648.85h225.18v-73.06q0-47.21-32.73-80.26-32.73-33.05-79.86-33.05t-79.86 33.05q-32.73 33.05-32.73 80.26v73.06ZM242.87-163.59v-394.26 394.26Z" /></svg>Confim Password</Form.Label>
                        </Form.Floating>

                        <Modal.Footer className='mt-4 pt-4'>
                            <Button variant="warning" type="submit" disabled={loading} className="d-flex align-items-center">
                                {loading ? (
                                    <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                                ) : (
                                    "Reset Password"
                                )}
                            </Button>
                            <Button variant="secondary" onClick={handleClose} disabled={loading}>
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default PasswordResetForm;