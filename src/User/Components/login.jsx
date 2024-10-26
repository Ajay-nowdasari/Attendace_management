import React, { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";
import titlelogo from 'C:/Users/Harit/Desktop/project/frontend/src/assets/images/attendance_logo.png'
import { Form, Button, FloatingLabel, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import clickSound from "C:/Users/Harit/Desktop/project/frontend/src/assets/sounds/mouse-click-153941.mp3"
import closeSound from "C:/Users/Harit/Desktop/project/frontend/src/assets/sounds/close.mp3"
const Login = () => {
    const [registerErrors, setRegisterErrors] = useState({});
    const [userLoginErrors, setUserLoginErrors] = useState({});
    const [adminLoginErrors, setAdminLoginErrors] = useState({});
    const [registerLoading, setRegisterLoading] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const admin_base_url = "http://127.0.0.1:8000/api/";

    const [showAdmin, setShowAdmin] = useState(false);
    const [show, setShow] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [loading, setLoading] = useState(true)
    const [departments, setDepartments] = useState([]);

    const handleShowAdmin = () => { playClick(); setShowAdmin(true); }
    const handleAdminClose = () => { playClose(); setShowAdmin(false); }
    const handleClose = () => { playClose(); setShow(false); }
    const handleShow = () => { playClick(); setShow(true); setShowRegister(false); };
    const handleShowRegister = () => { playClick(); setShow(false); setShowRegister(true); };
    const handleCloseRegister = () => { playClose(); setShowRegister(false); }

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
        usertype: "user"
    });
    const [adminLoginData, setAdminLoginData] = useState({
        email: "",
        password: "",
        usertype: "admin"
    });

    const playClick = () => {
        const audio = new Audio(clickSound);
        audio.play();
    };

    const playClose = () => {
        const audio = new Audio(closeSound);
        audio.play();
    }

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = () => {
        axios.get("http://127.0.0.1:8000/api/departments/")
            .then(response => {
                setDepartments(response.data);
                setLoading(false)
            })
            .catch(error => {
                console.error("There was an error fetching the departments!", error);
                setLoading(false)
            });
    };
    const validatePassword = (password) => {
        // Regex pattern for password validation
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
        return passwordPattern.test(password);
    };
    const handleChangeRegister = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Password validation
        if (name === "password") {
            if (!validatePassword(value)) {
                setRegisterErrors((prev) => ({
                    ...prev,
                    password: "Password must be 8-16 characters long, include at least one letter, one number, and one special character.",
                }));
            } else {
                setRegisterErrors((prev) => ({
                    ...prev,
                    password: "",
                }));
            }
        }

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
        setRegisterLoading(true);
        if (registerErrors.password || registerErrors.confirm_password) {
            return;
        }
        try {
            const response = await axios.post(admin_base_url + "Register_user/", formData);
            console.log("Response data:", response.data);
            toast.success("You can login Now as a student");
            setTimeout(() => {
                handleCloseRegister();
            }, 1000);
        } catch (error) {
            if (error.response && error.response.data) {
                console.log("Registraion:", error.response.data);
                setRegisterErrors(error.response.data); // Set validation errors received from the backend
            } else {
                setRegisterErrors({ general: "Something went wrong. Please try again." });
            }
        } finally {
            setRegisterLoading(false);
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
        playClick();
        event.preventDefault();
        setUserLoginErrors("");
        setLoginLoading(true)
        const user = {
            email: userLoginData.email,
            password: userLoginData.password
        };
        console.log("mana user", user)
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
                setTimeout(() => {
                    navigate("/OTP", {
                        state: {
                            useremail: response.data.useremail,
                            usertype: response.data.usertype,
                            access_token: response.data.access_token,
                            refresh_token: response.data.refresh_token
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
        finally {
            setLoginLoading(false);
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
        playClick();
        event.preventDefault();
        setAdminLoginErrors("");
        setLoginLoading(true);
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
                localStorage.setItem("user_type", response.data.usertype)

                setTimeout(() => {
                    navigate("/OTP", {
                        state: {
                            useremail: response.data.useremail,
                            usertype: response.data.usertype,
                            access_token: response.data.access_token,
                            refresh_token: response.data.refresh_token
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
        finally {
            setLoginLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <div class="main-spinner" role="status">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <span class="visually-hidden">Loading...</span>
                </div>
            ) : (
                <div>

                    <ToastContainer />
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
                            <Button variant="success" onClick={handleShow}>Sign In as Student                 <div class="basic-spinner"></div>
                            </Button>
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
                                <Form.Floating className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChangeRegister}
                                        required
                                    />
                                    <Form.Label style={{ fontWeight: "bold", fontSize: "17px" }}><svg width="17px" height="23px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.95442 10.166C4.04608 9.76202 3.79293 9.36025 3.38898 9.26859C2.98504 9.17693 2.58327 9.43009 2.49161 9.83403L3.95442 10.166ZM5.49981 4.73283C5.19117 5.00907 5.1649 5.48322 5.44115 5.79187C5.71739 6.10051 6.19154 6.12678 6.50019 5.85053L5.49981 4.73283ZM15 14.25C14.5858 14.25 14.25 14.5858 14.25 15C14.25 15.4142 14.5858 15.75 15 15.75L15 14.25ZM17.25 18.7083C17.25 19.1225 17.5858 19.4583 18 19.4583C18.4142 19.4583 18.75 19.1225 18.75 18.7083H17.25ZM5.25 18.7083C5.25 19.1225 5.58579 19.4583 6 19.4583C6.41421 19.4583 6.75 19.1225 6.75 18.7083H5.25ZM9 15L8.99998 15.75H9V15ZM11 15.75C11.4142 15.75 11.75 15.4142 11.75 15C11.75 14.5858 11.4142 14.25 11 14.25V15.75ZM12 3.75C16.5563 3.75 20.25 7.44365 20.25 12H21.75C21.75 6.61522 17.3848 2.25 12 2.25V3.75ZM12 20.25C7.44365 20.25 3.75 16.5563 3.75 12H2.25C2.25 17.3848 6.61522 21.75 12 21.75V20.25ZM20.25 12C20.25 16.5563 16.5563 20.25 12 20.25V21.75C17.3848 21.75 21.75 17.3848 21.75 12H20.25ZM3.75 12C3.75 11.3688 3.82074 10.7551 3.95442 10.166L2.49161 9.83403C2.33338 10.5313 2.25 11.2564 2.25 12H3.75ZM6.50019 5.85053C7.96026 4.54373 9.88655 3.75 12 3.75V2.25C9.50333 2.25 7.22428 3.1894 5.49981 4.73283L6.50019 5.85053ZM14.25 9C14.25 10.2426 13.2426 11.25 12 11.25V12.75C14.0711 12.75 15.75 11.0711 15.75 9H14.25ZM12 11.25C10.7574 11.25 9.75 10.2426 9.75 9H8.25C8.25 11.0711 9.92893 12.75 12 12.75V11.25ZM9.75 9C9.75 7.75736 10.7574 6.75 12 6.75V5.25C9.92893 5.25 8.25 6.92893 8.25 9H9.75ZM12 6.75C13.2426 6.75 14.25 7.75736 14.25 9H15.75C15.75 6.92893 14.0711 5.25 12 5.25V6.75ZM15 15.75C15.6008 15.75 16.1482 16.0891 16.5769 16.6848C17.0089 17.2852 17.25 18.0598 17.25 18.7083H18.75C18.75 17.7371 18.4052 16.6575 17.7944 15.8086C17.1801 14.9551 16.2275 14.25 15 14.25L15 15.75ZM6.75 18.7083C6.75 18.0598 6.99109 17.2852 7.42315 16.6848C7.85183 16.0891 8.39919 15.75 8.99998 15.75L9.00002 14.25C7.77253 14.25 6.81989 14.9551 6.20564 15.8086C5.59477 16.6575 5.25 17.7371 5.25 18.7083H6.75ZM9 15.75H11V14.25H9V15.75Z" fill="#000000" /></svg>Name</Form.Label>
                                </Form.Floating>
                                <FloatingLabel controlId="formDept" label="Department" className="mb-3">
                                    <Form.Select
                                        name="dept"
                                        value={formData.dept}
                                        onChange={handleChangeRegister}
                                        required
                                    >
                                        <option value="">--Select Department--</option>
                                        {departments && departments.map((department) => (
                                            <option key={department.id} value={department.id}>
                                                {department.dept_name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </FloatingLabel>

                                <FloatingLabel controlId="formYear" label="Select a Year" className="mb-3">
                                    <Form.Select
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
                                    </Form.Select>
                                </FloatingLabel>

                                <FloatingLabel controlId="formSection" label="Section" className="mb-3">
                                    <Form.Select
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
                                    </Form.Select>
                                </FloatingLabel>

                                <Form.Floating controlId="formEmail" className="mb-3">
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChangeRegister}
                                        required
                                    />
                                    <Form.Label className="form-label"> <svg xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m440.72-509.72-317.13-200v386.85h392.82v91H123.59q-37.79 0-64.39-26.61-26.61-26.61-26.61-64.39v-474.26q0-37.78 26.61-64.39 26.6-26.61 64.39-26.61h634.26q37.78 0 64.39 26.61t26.61 64.39v200h-91v-112.59l-317.13 200Zm0-87.41 317.13-200H123.59l317.13 200ZM761.91-69.48q-68.39 0-116.94-48.55-48.56-48.56-48.56-116.95v-180q0-43.5 30.03-73.54 30.02-30.05 73.51-30.05 43.48 0 73.56 30.05 30.08 30.04 30.08 73.54v180H720v-180q0-8-6-14t-14-6q-8 0-14 6t-6 14v180q0 33.96 23.98 57.94 23.98 23.97 57.93 23.97 33.96 0 57.82-23.97 23.86-23.98 23.86-57.94v-161.67h83.82v161.67q0 68.39-48.55 116.95-48.56 48.55-116.95 48.55ZM123.59-709.72v-87.41 474.26-386.85Z" /></svg> Email</Form.Label>

                                    {/* Display email error */}
                                    {registerErrors.email && <span className="text-danger">{registerErrors.email}</span>}
                                </Form.Floating>

                                <Form.Floating controlId="formPassword" className="mb-3">
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChangeRegister}
                                        required
                                    />
                                    <Form.Label className="form-label"><svg xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M242.87-72.59q-37.54 0-64.27-26.73-26.73-26.73-26.73-64.27v-394.26q0-37.54 26.73-64.27 26.73-26.73 64.27-26.73h33.54v-73.06q0-84.92 59.46-144.61 59.46-59.7 144.13-59.7 84.67 0 144.13 59.7 59.46 59.69 59.46 144.61v73.06h33.54q37.54 0 64.27 26.73 26.73 26.73 26.73 64.27v394.26q0 37.54-26.73 64.27-26.73 26.73-64.27 26.73H242.87Zm0-91h474.26v-394.26H242.87v394.26ZM480-280.72q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5ZM367.41-648.85h225.18v-73.06q0-47.21-32.73-80.26-32.73-33.05-79.86-33.05t-79.86 33.05q-32.73 33.05-32.73 80.26v73.06ZM242.87-163.59v-394.26 394.26Z" /></svg>Password</Form.Label>
                                    {/* Display password error */}
                                    {registerErrors.password && <span className="text-danger">{registerErrors.password}</span>}
                                </Form.Floating>

                                <Form.Floating controlId="formConfirmPassword" className="mb-3">
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm password"
                                        name="confirm_password"
                                        value={formData.confirm_password}
                                        onChange={handleChangeRegister}
                                        required
                                    />
                                    <Form.Label className="form-label"><svg xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M242.87-72.59q-37.54 0-64.27-26.73-26.73-26.73-26.73-64.27v-394.26q0-37.54 26.73-64.27 26.73-26.73 64.27-26.73h33.54v-73.06q0-84.92 59.46-144.61 59.46-59.7 144.13-59.7 84.67 0 144.13 59.7 59.46 59.69 59.46 144.61v73.06h33.54q37.54 0 64.27 26.73 26.73 26.73 26.73 64.27v394.26q0 37.54-26.73 64.27-26.73 26.73-64.27 26.73H242.87Zm0-91h474.26v-394.26H242.87v394.26ZM480-280.72q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5ZM367.41-648.85h225.18v-73.06q0-47.21-32.73-80.26-32.73-33.05-79.86-33.05t-79.86 33.05q-32.73 33.05-32.73 80.26v73.06ZM242.87-163.59v-394.26 394.26Z" /></svg>Confirm Password</Form.Label>
                                    {/* Display confirm password error */}
                                    {registerErrors.confirm_password && <span className="text-danger">{registerErrors.confirm_password}</span>}
                                </Form.Floating>

                                <hr className="mx-5" />
                                <Form.Group className="mb-3">
                                    <Button type="submit" onClick={playClick} variant="success" style={{ width: "100%", border: "none" }}>
                                        {registerLoading ? (
                                            <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                                        ) : (
                                            "Register"
                                        )}
                                    </Button>
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
                                <Form.Floating className="mb-3">
                                    <Form.Control
                                        type="email"
                                        id="email"
                                        name="email"
                                        onChange={handleChangeLogin}
                                        placeholder="Enter email"
                                        value={userLoginData.email}
                                        required
                                    />
                                    <Form.Label style={{ fontWeight: "bold" }}> <svg xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m440.72-509.72-317.13-200v386.85h392.82v91H123.59q-37.79 0-64.39-26.61-26.61-26.61-26.61-64.39v-474.26q0-37.78 26.61-64.39 26.6-26.61 64.39-26.61h634.26q37.78 0 64.39 26.61t26.61 64.39v200h-91v-112.59l-317.13 200Zm0-87.41 317.13-200H123.59l317.13 200ZM761.91-69.48q-68.39 0-116.94-48.55-48.56-48.56-48.56-116.95v-180q0-43.5 30.03-73.54 30.02-30.05 73.51-30.05 43.48 0 73.56 30.05 30.08 30.04 30.08 73.54v180H720v-180q0-8-6-14t-14-6q-8 0-14 6t-6 14v180q0 33.96 23.98 57.94 23.98 23.97 57.93 23.97 33.96 0 57.82-23.97 23.86-23.98 23.86-57.94v-161.67h83.82v161.67q0 68.39-48.55 116.95-48.56 48.55-116.95 48.55ZM123.59-709.72v-87.41 474.26-386.85Z" /></svg> Email</Form.Label>
                                </Form.Floating>
                                <Form.Floating className="mb-3">

                                    <Form.Control
                                        type="password"
                                        id="password"
                                        name="password"
                                        onChange={handleChangeLogin}
                                        placeholder="Enter password"
                                        value={userLoginData.password}
                                        required
                                    />
                                    <Form.Label style={{ fontWeight: "bold", fontSize: "17px" }}><svg xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M242.87-72.59q-37.54 0-64.27-26.73-26.73-26.73-26.73-64.27v-394.26q0-37.54 26.73-64.27 26.73-26.73 64.27-26.73h33.54v-73.06q0-84.92 59.46-144.61 59.46-59.7 144.13-59.7 84.67 0 144.13 59.7 59.46 59.69 59.46 144.61v73.06h33.54q37.54 0 64.27 26.73 26.73 26.73 26.73 64.27v394.26q0 37.54-26.73 64.27-26.73 26.73-64.27 26.73H242.87Zm0-91h474.26v-394.26H242.87v394.26ZM480-280.72q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5ZM367.41-648.85h225.18v-73.06q0-47.21-32.73-80.26-32.73-33.05-79.86-33.05t-79.86 33.05q-32.73 33.05-32.73 80.26v73.06ZM242.87-163.59v-394.26 394.26Z" /></svg>Password</Form.Label>
                                </Form.Floating>
                                <hr className="mx-5" />
                                <Button type="submit" onClick={playClick} variant="success" style={{ width: "100%", border: "none" }}>
                                    {loginLoading ? (
                                        <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                                    ) : (
                                        "Sign In"
                                    )}
                                </Button>
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
                                <Form.Floating className="mb-3">
                                    <Form.Control
                                        type="email"
                                        name="email"  // Add the name attribute here
                                        placeholder="Enter email"
                                        value={adminLoginData.email}
                                        onChange={handleChangeAdmin}
                                        required
                                    />
                                    <Form.Label style={{ fontWeight: "bold", fontSize: "17px" }}><svg xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m440.72-509.72-317.13-200v386.85h392.82v91H123.59q-37.79 0-64.39-26.61-26.61-26.61-26.61-64.39v-474.26q0-37.78 26.61-64.39 26.6-26.61 64.39-26.61h634.26q37.78 0 64.39 26.61t26.61 64.39v200h-91v-112.59l-317.13 200Zm0-87.41 317.13-200H123.59l317.13 200ZM761.91-69.48q-68.39 0-116.94-48.55-48.56-48.56-48.56-116.95v-180q0-43.5 30.03-73.54 30.02-30.05 73.51-30.05 43.48 0 73.56 30.05 30.08 30.04 30.08 73.54v180H720v-180q0-8-6-14t-14-6q-8 0-14 6t-6 14v180q0 33.96 23.98 57.94 23.98 23.97 57.93 23.97 33.96 0 57.82-23.97 23.86-23.98 23.86-57.94v-161.67h83.82v161.67q0 68.39-48.55 116.95-48.56 48.55-116.95 48.55ZM123.59-709.72v-87.41 474.26-386.85Z" /></svg> Email</Form.Label>

                                </Form.Floating>
                                <Form.Floating className="mb-3">
                                    <Form.Control
                                        type="password"
                                        name="password"  // Add the name attribute here
                                        placeholder="Enter password"
                                        value={adminLoginData.password}
                                        onChange={handleChangeAdmin}
                                        required
                                    />
                                    <Form.Label style={{ fontWeight: "bold", fontSize: "17px" }}><svg xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M242.87-72.59q-37.54 0-64.27-26.73-26.73-26.73-26.73-64.27v-394.26q0-37.54 26.73-64.27 26.73-26.73 64.27-26.73h33.54v-73.06q0-84.92 59.46-144.61 59.46-59.7 144.13-59.7 84.67 0 144.13 59.7 59.46 59.69 59.46 144.61v73.06h33.54q37.54 0 64.27 26.73 26.73 26.73 26.73 64.27v394.26q0 37.54-26.73 64.27-26.73 26.73-64.27 26.73H242.87Zm0-91h474.26v-394.26H242.87v394.26ZM480-280.72q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5ZM367.41-648.85h225.18v-73.06q0-47.21-32.73-80.26-32.73-33.05-79.86-33.05t-79.86 33.05q-32.73 33.05-32.73 80.26v73.06ZM242.87-163.59v-394.26 394.26Z" /></svg>Password</Form.Label>

                                </Form.Floating>
                                <hr className="mx-5" />
                                <Button type="submit" variant="success" style={{ width: "100%", border: "none" }}>
                                    {loginLoading ? (
                                        <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                                    ) : (
                                        "Sign In"
                                    )}
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer className="modal-footer" style={{ justifyContent: "space-between" }}>
                            <p>Only authenticated Admins can Login</p>
                            <button onClick={handleAdminClose}>Cancel</button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )}
        </>
    );
};

export default Login;