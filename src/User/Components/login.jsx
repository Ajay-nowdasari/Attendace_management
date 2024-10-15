import React, { useState } from "react";
import axios from 'axios';
import titlelogo from 'C:/Users/Harit/Desktop/project/frontend/src/assets/images/attendance_logo.png'
import { Form, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [registerErrors, setRegisterErrors] = useState({});
    const [userLoginErrors,setUserLoginErrors] =useState({});
    const [adminLoginErrors,setAdminLoginErrors] =useState({});

    const admin_base_url = "http://127.0.0.1:8000/api/";

    const [showAdmin, setShowAdmin] = useState(false);
    const [show, setShow] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleShowAdmin = () => setShowAdmin(true);
    const handleAdminClose = () => setShowAdmin(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true);setShowRegister(false);};
    const handleShowRegister = () => {setShow(false);setShowRegister(true);};
    const handleCloseRegister = () => setShowRegister(false);


    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        dept: "",
        year: "",
        section: "",
    });
    const [userLoginData, setUserLoginData] = useState({
        email: "",
        password: "",
        usertype:"user"
    });
    const [adminLoginData, setAdminLoginData] = useState({
        email: "",
        password: "",
        usertype:"admin"
    });
    
    const validatePassword = (password) => {
        // Regex pattern for password validation
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
        return passwordPattern.test(password);
    };
    const handleChangeRegister = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });

          // Password validation
        // if (name === "password") {
        //     if (!validatePassword(value)) {
        //         setRegisterErrors((prev) => ({
        //             ...prev,
        //             password: "Password must be 8-16 characters long, include at least one letter, one number, and one special character.",
        //         }));
        //     } else {
        //         setRegisterErrors((prev) => ({
        //             ...prev,
        //             password: "",
        //         }));
        //     }
        // }

        // Confirm password validation
        if (name === "confirm_password") {
            if (value !== formData.password) {
                setRegisterErrors((prev) => ({
                    ...prev,
                    confirm_password: "Passwords do not match.",
                }));
            } else {
                setRegisterErrors((prev) => ({
                    ...prev,
                    confirm_password: "",
                }));
            }
        }
    };
    const registerUser = async (e) => {
        e.preventDefault();
        setRegisterErrors("");

        if (registerErrors.password || registerErrors.confirm_password) {
            return;
        }
        try {
            const response = await axios.post(admin_base_url + "Register_user/", formData);
            console.log("Response data:", response.data);
            setTimeout(() => {
                handleCloseRegister();
                alert("You can login Now as a student");
            }, 500);
        } catch (error) {
            if (error.response && error.response.data) {
                console.log("Registraion:", error.response.data);
                setRegisterErrors(error.response.data); // Set validation errors received from the backend
            } else {
                setRegisterErrors({ general: "Something went wrong. Please try again." });
            }
        }
    };


    const handleChangeLogin = (event) => {
        const { name, value } = event.target;
        setUserLoginData({
            ...userLoginData,
            [name]: value,
        });
    };
    const loginUser = async (event) => {
        event.preventDefault();
        setUserLoginErrors("");

        const user = { 
            email: userLoginData.email, 
            password: userLoginData.password
        };
        console.log("user",user)
        try {
            const response = await axios.post(
                admin_base_url + "user_login/",
                user,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            if (response) {
            setUserLoginErrors("Login successful, redirecting.");
            localStorage.clear();
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
            setTimeout(() => {
                navigate("/OTP", {  
                    state: {
                        username: response.data.username,
                        usertype: response.data.usertype,
                    },
                });
            }, 1000);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const errorData = error.response.data;

                // If the error data is in a dictionary format, map it to show in the UI
                const errorMessages = Object.values(errorData).join(" ");
                console.error("Login Error:", errorMessages);
                setUserLoginErrors(errorMessages);
            } else {
                setUserLoginErrors("An unexpected error occurred");
            }
        }
    };


    const handleChangeAdmin = (event) => {
        const { name, value } = event.target;
        setAdminLoginData((prevData) => ({
            ...prevData,
            [name]: value,  // Dynamically set the correct field (email or password)
        }));
    };
    const loginAdmin = async (event) => {
        event.preventDefault();
        setAdminLoginErrors("");
    
        const auth_user = {
            email: adminLoginData.email,  // Correct access for email
            password: adminLoginData.password,  // Correct access for password
        };
    
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/admin_login/",
                auth_user,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
    
            if (response) {
                localStorage.clear();
                localStorage.setItem("access_token", response.data.access_token);
                localStorage.setItem("refresh_token", response.data.refresh_token);
    
                setTimeout(() => {
                    navigate("/OTP",{        
                        state: {
                            username: response.data.username,
                            usertype: response.data.usertype,
                        },
                    });
                }, 1000);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                // Assuming the API returns errors as { "non_field_errors": ["error message"] }
                const errorMessages = error.response.data;
    
                // Concatenate error messages into a single string
                let errors = "";
                for (const key in errorMessages) {
                    if (Array.isArray(errorMessages[key])) {
                        errors += errorMessages[key].join(" ") + " ";
                    }
                }
    
                setAdminLoginErrors(errors.trim() || "Invalid login credentials.");
            } else {
                setAdminLoginErrors("An unexpected error occurred.");
            }
        }
    };

    return (
        <div>
            <div className="background-image"></div>
            {/* Intro page */}
            <div className="overlay-content" width='100%'>
                <img src={titlelogo} alt="Title logo" />
                <br /><br />
                <h1>Hearty Welcome</h1>
                <p>Your attendance details are provided here.</p>
                <Button
                    variant="success"
                    className="w-75 my-2 sign-in-button"
                    onClick={handleShowRegister}
                    style={{ backgroundColor: "#0002", color: "black" }}
                >
                    Register as Student
                    
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#black">
                                <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
                    </svg>
                </Button>
                <hr />
                <div className="py-3" style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                    <Button variant="success" onClick={handleShow}>Sign In as Student</Button>
                    <Button variant="success" onClick={handleShowAdmin}>Sign In as Admin</Button>
                </div>
            </div>

                {/* Student Registration */}
                <Modal show={showRegister} onHide={handleCloseRegister} centered>
                    <Modal.Header closeButton className="px-4">
                        <Modal.Title>Student Registration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="px-5">
                        {registerErrors.general && (
                            <div className="alert alert-danger">{registerErrors.general}</div>
                        )}
                        <Form onSubmit={registerUser}>
                            <Form.Group controlId="formname" className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChangeRegister}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formDept" className="mb-3">
                                <Form.Label>Department</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="dept"
                                    value={formData.dept}
                                    onChange={handleChangeRegister}
                                    required
                                >
                                    <option value="">--Select Department--</option>
                                    <option value="IT">IT</option>
                                    <option value="HR">HR</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Operations">Operations</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formYear" className="mb-3">
                                <Form.Label>Select a Year</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChangeRegister}
                                    required
                                >
                                    <option value="">--Select Year--</option>
                                    <option value="1st">1st year</option>
                                    <option value="2nd">2nd year</option>
                                    <option value="3rd">3rd year</option>
                                    <option value="4th">Final year</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formSection" className="mb-3">
                                <Form.Label>Section</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="section"
                                    value={formData.section}
                                    onChange={handleChangeRegister}
                                    required
                                >
                                    <option value="">--Select Section--</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChangeRegister}
                                    required
                                />
                                {/* Display email error */}
                                {registerErrors.email && <span className="text-danger">{registerErrors.email}</span>}
                            </Form.Group>

                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChangeRegister}
                                    required
                                />
                                {/* Display password error */}
                                {registerErrors.password && <span className="text-danger">{registerErrors.password}</span>}
                            </Form.Group>

                            <Form.Group controlId="formConfirmPassword" className="mb-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm password"
                                    name="confirm_password"
                                    value={formData.confirm_password}
                                    onChange={handleChangeRegister}
                                    required
                                />
                                {/* Display confirm password error */}
                                {registerErrors.confirm_password && <span className="text-danger">{registerErrors.confirm_password}</span>}
                            </Form.Group>

                            <hr className="mx-5" />
                            <Form.Group className="mb-3">
                                <Button type="submit" variant="success" style={{ width: "100%", border: "none" }}>Register</Button>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="modal-footer" style={{ justifyContent: "space-between" }}>
                        <p>Do you have an account..? <Button variant="link" onClick={handleShow}>Login</Button></p>
                        <button onClick={handleCloseRegister}>Cancel</button>
                    </Modal.Footer>
                </Modal>

                 {/* Student Login Modal */}
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton className="px-4">
                        <Modal.Title>Student Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="px-5">
                    {typeof userLoginErrors === "string" && userLoginErrors && (
                            <div className="alert alert-danger" role="alert">
                                {userLoginErrors}
                            </div>
                        )}
                        <Form onSubmit={loginUser}>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    id="email"
                                    name="email"
                                    onChange={handleChangeLogin}
                                    placeholder="Enter email"
                                    value={userLoginData.email}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    id="password"
                                    name="password"
                                    onChange={handleChangeLogin} 
                                    placeholder="Enter password"
                                    value={userLoginData.password}
                                    required
                                />
                            </Form.Group>
                            <hr className="mx-5" />
                            <Button type="submit" variant="success" style={{ width: "100%", border: "none" }}>Sign in</Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="modal-footer" style={{ justifyContent: "space-between" }}>
                        <p>Don't have an account..? <Button variant="link" onClick={handleShowRegister}>Register</Button></p>
                        <button onClick={handleClose}>Cancel</button>
                    </Modal.Footer>
                </Modal>

                {/* Admin Login Modal */}
                <Modal show={showAdmin} onHide={handleAdminClose} centered>
                    <Modal.Header closeButton className="px-4">
                        <Modal.Title>Admin Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="px-5">
                        <Form onSubmit={loginAdmin}>
                        {typeof adminLoginErrors === "string" && adminLoginErrors && (
                            <div className="alert alert-danger" role="alert">
                                {adminLoginErrors}
                            </div>
                        )}
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"  // Add the name attribute here
                                    placeholder="Enter email"
                                    value={adminLoginData.email}
                                    onChange={handleChangeAdmin}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"  // Add the name attribute here
                                    placeholder="Enter password"
                                    value={adminLoginData.password}
                                    onChange={handleChangeAdmin}
                                    required
                                />
                            </Form.Group>
                            <hr className="mx-5" />
                            <Button type="submit" variant="success" style={{ width: "100%", border: "none" }}>
                                Sign in
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="modal-footer" style={{ justifyContent: "space-between" }}>
                        <p>Only authenticated Admins can Login</p>
                        <button onClick={handleAdminClose}>Cancel</button>
                    </Modal.Footer>
                </Modal>
        </div>
    );
};

export default Login;
{/* <Modal show={showResetModal} onHide={handleCloseReset} centered>
<Modal.Header closeButton>
    <Modal.Title>Password Reset</Modal.Title>
</Modal.Header>
<Modal.Body>
    {resetError && <div className="alert alert-danger">{resetError}</div>}
    {resetSuccess && <div className="alert alert-success">{resetSuccess}</div>}
    <Form onSubmit={handleResetPassword}>
        <Form.Group controlId="formResetEmail" className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={handleEmailChange}
                required
            />
        </Form.Group>
        <Button type="submit" variant="success">Send Reset Email</Button>
    </Form>
</Modal.Body>
<Modal.Footer>
    <Button variant="secondary" onClick={handleCloseReset}>Close</Button>
</Modal.Footer>
</Modal> */}
