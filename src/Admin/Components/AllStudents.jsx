import { Button, Modal, Form, Spinner,InputGroup  } from "react-bootstrap";
import NavBar from "./admin_nav";
import Footer from "./footer";
import React,{ useRef, useState, useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchStudents, deleteStudent, updateStudent } from "../../api";
import { useNavigate } from "react-router-dom";
import PasswordResetRequest from "./password_reset";
import clickSound from "../../assets/sounds/mouse-click-153941.mp3";
import closeSound from "../../assets/sounds/close.mp3";
import DropdownSound from "../../assets/sounds/dropdown.mp3";
import deleteSound from "../../assets/sounds/delete.mp3";

const AllStudents = () => {
    const admin_base_url = "http://127.0.0.1:8000/api/";

    const [registerErrors, setRegisterErrors] = useState({});
    // for filter
    const [filYear, setFilYear] = useState("");
    const [filDept, setFilDept] = useState("");
    const [filSec, setFilSec] = useState("");
    const [showRegister, setShowRegister] = useState(false);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const handleCloseRegister = () => { playClose(); setShowRegister(false); }
    const handleCloseEdit = () => { playClose(); setShowEdit(false); }
    const [edit, setEdit] = useState(null);
    const [showEdit, setShowEdit] = useState(false);
    const [showResetRequest, setShowResetRequest] = useState(false);
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [registerLoading, setRegisterLoading] = useState(true);
    const [showOkDeleteModal, setShowOkDeleteModal] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const inputRef = useRef(null);

    const handleIconClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    useEffect(() => {
        setTimeout(() => setLoading(false), 1000); // Change duration as needed
    }, []);
    const playDropDown = () => {
        const audio = new Audio(DropdownSound);
        audio.play();
    }

    const playClick = () => {
        const audio = new Audio(clickSound);
        audio.play();
    };

    const playDelete = () => {
        const audio = new Audio(deleteSound);
        audio.play();
    }

    const playClose = () => {
        const audio = new Audio(closeSound);
        audio.play();
    }

    console.log(filteredData, "filter data")

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        dept: "",
        year: "",
        section: "",
    });

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

    const reset_password = () => {
        setShowResetRequest(true);
    };

    const registerUser = async (e) => {
        playClick();
        setRegisterLoading(false)
        e.preventDefault();
        setRegisterErrors("");
        handleCloseEdit();
        console.log("Available Departments:", departments);
        console.log("Form Data being sent:", formData);

        // Check for any registration errors before proceeding
        if (registerErrors.password || registerErrors.confirm_password) {
            return;
        }

        try {
            // For editing an existing student
            if (edit) {
                await updateStudent(edit, formData);
                await loadStudents();
                toast.success("Successfully updated a student");
                setTimeout(() => {
                    handleCloseRegister();
                }, 1000);
            } else {
                // For new registration
                const response = await axios.post(admin_base_url + "Register_user/", formData);
                console.log("Response data:", response.data);
                toast.success("You can login now as a student");
                // Successful registration alert
                setTimeout(() => {
                    loadStudents();
                    handleCloseRegister();
                }, 1000);
            }
        } catch (error) {
            // Handle registration errors
            if (error.response && error.response.data) {
                console.log("Registration error:", error.response.data);
                setRegisterErrors(error.response.data); // Set validation errors from backend
            } else {
                setRegisterErrors({ general: "Something went wrong. Please try again." });
            }
        } finally {
            setRegisterLoading(true)
        }
    };

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        try {
            const students = await fetchStudents();
            setData(students);
            setFilteredData(students);
            console.log("data", filteredData)
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchQuery(value);
        // Filter your data here
        const filtered = data.filter(entry =>
            entry.name.toLowerCase().includes(value) ||
            entry.dept_name.toLowerCase().includes(value) ||
            entry.year.toString().includes(value) ||
            entry.section.toLowerCase().includes(value)
        );

        setFilteredData(filtered);
    };


    const fetchDepartments = () => {

        axios.get("http://127.0.0.1:8000/api/departments/")
            .then(response => {
                setDepartments(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the departments!", error);
            });
    };
    const handleDelete = (id) => {
        setDeleteId(id); // Store ID of the student to be deleted
        setShowOkDeleteModal(true);
    };

    const confirmDelete = async () => {
        setDeleteLoading(true);
        try {
            playDelete();
            await deleteStudent(deleteId); // Use stored ID
            setData(data.filter((product) => product.id !== deleteId));
            setFilteredData(filteredData.filter((product) => product.id !== deleteId));
        } catch (error) {
            console.error("Error deleting student:", error);
            // Show error notification or alert
        } finally {
            setDeleteLoading(false);
            setShowOkDeleteModal(false); // Hide modal after the process
            setDeleteId(null); // Clear stored ID
        }
    };

    const handleCloseDeleteModal = () => {
        setShowOkDeleteModal(false);
        setDeleteId(null); // Clear stored ID
    };
    const handleUpdate = (id, index) => {
        playClick();
        setFormData({
            name: data[index].name,
            email: data[index].email,
            password: data[index].password,
            confirm_password: data[index].confirm_password,
            dept: data[index].dept,
            year: data[index].year,
            section: data[index].section,
        });
        setShowEdit(true);
        setEdit(id);
    };

    const handleShowRegister = () => {
        playClick();
        setShowRegister(true);
        setEdit(null);
        setFormData({
            name: "",
            email: "",
            password: "",
            confirm_password: "",
            dept: "",
            year: "",
            section: ""
        });
    }

    useEffect(() => {
        const filtered = data.filter((entry) => {
            const matchesYear = !filYear || entry.year === filYear;
            const matchesDept = !filDept || entry.dept_name === filDept;
            const matchesSec = !filSec || entry.section === filSec;
            return matchesYear && matchesDept && matchesSec;
        });
        setFilteredData(filtered);

    }, [filYear, filDept, filSec, data]);

    const handleChange = (event) => {
        setLoading(true)
        setTimeout(() => setLoading(false), 1000);
        const { name, value } = event.target;
        playDropDown();
        // Update filter state
        if (name === "filYear") setFilYear(value);
        if (name === "filDept") setFilDept(value);
        if (name === "filSec") setFilSec(value);

        // Filter data based on selected values
        const filtered = data.filter((entry) => {
            const matchesYear = filYear ? entry.year === filYear : true;
            const matchesDept = filDept ? entry.dept_name === filDept : true; // Convert to integer if needed
            const matchesSec = filSec ? entry.section === filSec : true;
            return matchesYear && matchesDept && matchesSec;
        });
        setFilteredData(filtered);
    };

    return (
        <div className="for_ftr">
            <ToastContainer />
            <div className="cnt">
                <>
                    {/* ṇav bar */}
                    <div style={{ position: "sticky", top: "0", zIndex: "1" }}>
                        <NavBar />
                    </div>

                    {/* ADD student button */}
                    <div className="Add_dept_div">
                        <PasswordResetRequest show={showResetRequest} onHide={() => setShowResetRequest(false)} />
                        <div className="pe-4">
                            <label>
                                Add a Student :
                            </label>
                            <Button
                                variant="success"
                                onClick={handleShowRegister}
                                style={{ backgroundColor: "#3f4961", color: "#c3c7d3", paddingTop: "3px", paddingBottom: "3px" }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#c3c7d3">
                                    <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z" />
                                </svg><span>Add</span>
                            </Button>
                        </div>

                    </div>

                    <br />
                    {/* filters */}
                    <div className="all_std_nav">
                        <div>
                            <Form.Group controlId="filYear" className="mb-3" style={{ width: "150px", flexDirection: "column", alignItems: "start" }}>
                                <Form.Label className="ps-2">Choose a Year:</Form.Label>
                                <Form.Select
                                    style={{ backgroundColor: "#c3c7d3", color: "#3f4961" }}
                                    className="custom-input"
                                    name="filYear"
                                    value={filYear}
                                    onChange={handleChange}
                                >
                                    <option value="">All</option>
                                    <option value="1st">1st Year</option>
                                    <option value="2nd">2nd Year</option>
                                    <option value="3rd">3rd Year</option>
                                    <option value="4th">Final Year</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div>
                            <Form.Group controlId="filDept" className="mb-3" style={{ width: "150px", flexDirection: "column", alignItems: "start" }}>
                                <Form.Label className="ps-2">Choose a Department:</Form.Label>
                                <Form.Select
                                    style={{ backgroundColor: "#c3c7d3", color: "#3f4961" }}
                                    className="custom-input"
                                    name="filDept"
                                    value={filDept}
                                    onChange={handleChange}
                                >
                                    <option value="">All</option>
                                    {departments.map((department) => (
                                        <option key={department.id} value={department.dept_name}>
                                            {department.dept_name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div>
                            <Form.Group controlId="filSec" className="mb-3" style={{ width: "150px", flexDirection: "column", alignItems: "start" }}>
                                <Form.Label className="ps-2">Choose a Section:</Form.Label>
                                <Form.Select
                                    style={{ backgroundColor: "#c3c7d3", color: "#3f4961" }}
                                    className="custom-input"
                                    name="filSec"
                                    value={filSec}
                                    onChange={handleChange}
                                >
                                    <option value="">All</option>
                                    <option value="A">A Section</option>
                                    <option value="B">B Section</option>
                                    <option value="C">C Section</option>
                                    <option value="D">D Section</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                    </div>
                    <br />

                    {/* table */}
                    <div className="mx-3 p-2 border rounded-sm">
                        <div class="search-container">
                            <input
                                type="text"
                                placeholder="Search Students..."
                                value={searchQuery}
                                ref={inputRef}
                                onChange={handleSearch}
                                className="search-input-slide" />
                                <svg onClick={handleIconClick} style={{ cursor: "pointer" }} width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#c3c7d3" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#7b42f5" stroke-width="2" />
                                    <path d="M14 14L16 16" stroke="#3f4961" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M15 11.5C15 13.433 13.433 15 11.5 15C9.567 15 8 13.433 8 11.5C8 9.567 9.567 8 11.5 8C13.433 8 15 9.567 15 11.5Z" stroke="#3f4961" stroke-width="2" />
                                </svg>
                        </div>
                        <div className="table-responsive scrollable-content" style={{ maxHeight: '410px', overflowY: 'auto' }}>
                            <table className="table table-hover table-success table-striped table-bordered">

                                <thead className="thead-dark table-warning" style={{ zIndex: "0" }}>
                                    <tr>
                                        <th>S.no</th>
                                        <th>Name</th>
                                        <th>Department</th>
                                        <th>Year</th>
                                        <th>Section</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <div class="table-spinner" role="status">
                                        <div class="dot"></div>
                                        <div class="dot"></div>
                                        <div class="dot"></div>
                                        <div class="dot"></div>
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    <tbody className='table-secondary'>
                                        {filteredData.length === 0 && (
                                            <tr>
                                                <td colSpan="6" className="text-center">No data available</td>
                                            </tr>
                                        )}
                                        {filteredData.map((entry, index) => (
                                            <tr key={entry.id}>
                                                <td>{index + 1}</td>
                                                <td>{entry.name}</td>
                                                <td>{entry.dept_name}</td>
                                                <td>{entry.year}</td>
                                                <td>{entry.section}</td>
                                                <td style={{ justifyContent: "space-evenly", alignItems: "center", display: "flex" }}>
                                                    <Button variant="secondary" onClick={() => handleUpdate(entry.id, index)}>
                                                        Edit
                                                    </Button>
                                                    <Button variant="danger" onClick={() => handleDelete(entry.id)}>
                                                        {deleteLoading ? (
                                                            <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                                                        ) : (
                                                            "Delete"
                                                        )}                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                )}
                            </table>
                        </div>
                    </div>
                    <br />

                    {/* change password button*/}
                    <div className="ps-5">
                        <label>
                            change student's password:
                        </label> <Button
                            style={{ backgroundColor: "#3f4961", color: "#c3c7d3", paddingTop: "3px", paddingBottom: "3px" }}
                            onClick={reset_password}>
                            <svg fill="#c3c7d3" height="20px" width="20px" version="1.1" id="Icon"
                                viewBox="0 0 24 24" enable-background="new 0 0 24 24" >
                                <path d="M24,19v-2h-2.14c-0.09-0.36-0.24-0.7-0.42-1.02l1.52-1.52l-1.41-1.41l-1.52,1.52c-0.32-0.19-0.66-0.33-1.02-0.42V12h-2v2.14
                        c-0.36,0.09-0.7,0.24-1.02,0.42l-1.52-1.52l-1.41,1.41l1.52,1.52c-0.19,0.32-0.33,0.66-0.42,1.02H12v2h2.14
                        c0.09,0.36,0.24,0.7,0.42,1.02l-1.52,1.52l1.41,1.41l1.52-1.52c0.32,0.19,0.66,0.33,1.02,0.42V24h2v-2.14
                        c0.36-0.09,0.7-0.24,1.02-0.42l1.52,1.52l1.41-1.41l-1.52-1.52c0.19-0.32,0.33-0.66,0.42-1.02H24z M18,20c-1.1,0-2-0.9-2-2
                        s0.9-2,2-2s2,0.9,2,2S19.1,20,18,20z M11,7.41l3.29,3.29l1.41-1.41L12.41,6L13,5.41l2.29,2.29l1.41-1.41L14.41,4L15,3.41l3.29,3.29
                        l1.41-1.41L16.41,2l0.29-0.29l-1.41-1.41L6.89,8.7C6.19,8.26,5.38,8,4.5,8C2.02,8,0,10.02,0,12.5S2.02,17,4.5,17S9,14.98,9,12.5
                        c0-0.88-0.26-1.69-0.7-2.39L11,7.41z M4.5,15C3.12,15,2,13.88,2,12.5S3.12,10,4.5,10S7,11.12,7,12.5S5.88,15,4.5,15z"/>
                            </svg>Change
                        </Button>
                    </div>
                    <Footer />
                </>
            </div>


            {/* register modal */}
            <Modal show={showRegister} onHide={handleCloseRegister} centered>
                <Modal.Header closeButton className="px-4">
                    <Modal.Title>Student Registration</Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-5">
                    {registerErrors.general && (
                        <div className="alert alert-danger">{registerErrors.general}</div>
                    )}
                    <Form onSubmit={registerUser}>
                        <Form.Floating controlId="formname" className="mb-3">
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
                                {departments && departments.map((department) => (
                                    <option key={department.id} value={department.id}>
                                        {department.dept_name}
                                    </option>
                                ))}
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

                        <Form.Floating controlId="formEmail" className="mb-3">
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={formData.email}
                                onChange={handleChangeRegister}
                                required
                            />
                            <Form.Label style={{ fontWeight: "bold", fontSize: "17px" }}><svg xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m440.72-509.72-317.13-200v386.85h392.82v91H123.59q-37.79 0-64.39-26.61-26.61-26.61-26.61-64.39v-474.26q0-37.78 26.61-64.39 26.6-26.61 64.39-26.61h634.26q37.78 0 64.39 26.61t26.61 64.39v200h-91v-112.59l-317.13 200Zm0-87.41 317.13-200H123.59l317.13 200ZM761.91-69.48q-68.39 0-116.94-48.55-48.56-48.56-48.56-116.95v-180q0-43.5 30.03-73.54 30.02-30.05 73.51-30.05 43.48 0 73.56 30.05 30.08 30.04 30.08 73.54v180H720v-180q0-8-6-14t-14-6q-8 0-14 6t-6 14v180q0 33.96 23.98 57.94 23.98 23.97 57.93 23.97 33.96 0 57.82-23.97 23.86-23.98 23.86-57.94v-161.67h83.82v161.67q0 68.39-48.55 116.95-48.56 48.55-116.95 48.55ZM123.59-709.72v-87.41 474.26-386.85Z" /></svg> Email</Form.Label>
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
                            <Form.Label style={{ fontWeight: "bold", fontSize: "17px" }}><svg xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M242.87-72.59q-37.54 0-64.27-26.73-26.73-26.73-26.73-64.27v-394.26q0-37.54 26.73-64.27 26.73-26.73 64.27-26.73h33.54v-73.06q0-84.92 59.46-144.61 59.46-59.7 144.13-59.7 84.67 0 144.13 59.7 59.46 59.69 59.46 144.61v73.06h33.54q37.54 0 64.27 26.73 26.73 26.73 26.73 64.27v394.26q0 37.54-26.73 64.27-26.73 26.73-64.27 26.73H242.87Zm0-91h474.26v-394.26H242.87v394.26ZM480-280.72q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5ZM367.41-648.85h225.18v-73.06q0-47.21-32.73-80.26-32.73-33.05-79.86-33.05t-79.86 33.05q-32.73 33.05-32.73 80.26v73.06ZM242.87-163.59v-394.26 394.26Z" /></svg>Password</Form.Label>
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
                            <Form.Label style={{ fontWeight: "bold", fontSize: "17px" }}><svg xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M242.87-72.59q-37.54 0-64.27-26.73-26.73-26.73-26.73-64.27v-394.26q0-37.54 26.73-64.27 26.73-26.73 64.27-26.73h33.54v-73.06q0-84.92 59.46-144.61 59.46-59.7 144.13-59.7 84.67 0 144.13 59.7 59.46 59.69 59.46 144.61v73.06h33.54q37.54 0 64.27 26.73 26.73 26.73 26.73 64.27v394.26q0 37.54-26.73 64.27-26.73 26.73-64.27 26.73H242.87Zm0-91h474.26v-394.26H242.87v394.26ZM480-280.72q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5ZM367.41-648.85h225.18v-73.06q0-47.21-32.73-80.26-32.73-33.05-79.86-33.05t-79.86 33.05q-32.73 33.05-32.73 80.26v73.06ZM242.87-163.59v-394.26 394.26Z" /></svg>Confirm Password</Form.Label>
                            {/* Display confirm password error */}
                            {registerErrors.confirm_password && <span className="text-danger">{registerErrors.confirm_password}</span>}
                        </Form.Floating>

                        <hr className="mx-5" />
                        <Form.Group className="mb-3">
                            <Button type="submit" variant="success" style={{ width: "100%", border: "none" }}>
                                {!registerLoading ? (
                                    <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                                ) : (
                                    edit ? "Edit" : "Register"
                                )}
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="modal-footer" style={{ justifyContent: "space-between" }}>
                    <button onClick={handleCloseRegister}>Cancel</button>
                </Modal.Footer>
            </Modal>

            {/* edit modal */}
            <Modal show={showEdit} onHide={handleCloseEdit} centered>
                <Modal.Header closeButton className="px-4">
                    <Modal.Title>Edit Student</Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-5">
                    {registerErrors.general && (
                        <div className="alert alert-danger">{registerErrors.general}</div>
                    )}
                    <Form onSubmit={registerUser}>
                        <Form.Floating controlId="formname" className="mb-3">
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
                                {departments && departments.map((department) => (
                                    <option key={department.id} value={department.id}>
                                        {department.dept_name}
                                    </option>
                                ))}
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

                        <Form.Floating controlId="formEmail" className="mb-3">
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={formData.email}
                                onChange={handleChangeRegister}
                                required
                            />
                            <Form.Label style={{ fontWeight: "bold", fontSize: "17px" }}><svg xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m440.72-509.72-317.13-200v386.85h392.82v91H123.59q-37.79 0-64.39-26.61-26.61-26.61-26.61-64.39v-474.26q0-37.78 26.61-64.39 26.6-26.61 64.39-26.61h634.26q37.78 0 64.39 26.61t26.61 64.39v200h-91v-112.59l-317.13 200Zm0-87.41 317.13-200H123.59l317.13 200ZM761.91-69.48q-68.39 0-116.94-48.55-48.56-48.56-48.56-116.95v-180q0-43.5 30.03-73.54 30.02-30.05 73.51-30.05 43.48 0 73.56 30.05 30.08 30.04 30.08 73.54v180H720v-180q0-8-6-14t-14-6q-8 0-14 6t-6 14v180q0 33.96 23.98 57.94 23.98 23.97 57.93 23.97 33.96 0 57.82-23.97 23.86-23.98 23.86-57.94v-161.67h83.82v161.67q0 68.39-48.55 116.95-48.56 48.55-116.95 48.55ZM123.59-709.72v-87.41 474.26-386.85Z" /></svg> Email</Form.Label>
                            {/* Display email error */}
                            {registerErrors.email && <span className="text-danger">{registerErrors.email}</span>}
                        </Form.Floating>

                        <hr className="mx-5" />
                        <Form.Group className="mb-3">
                            <Button type="submit" variant="success" style={{ width: "100%", border: "none" }}>
                                {!registerLoading ? (
                                    <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                                ) : (
                                    "Save"
                                )}
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="modal-footer d-flex">
                    <Button variant="secondary" align="right" onClick={handleCloseEdit}>Close</Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showOkDeleteModal} onHide={handleCloseDeleteModal} centered>
                <Modal.Header closeButton className="bg-danger text-white">
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <p>Are you sure you want to delete this student?</p>
                    <div className="d-flex justify-content-center">
                        <Button variant="danger" onClick={confirmDelete} className="me-3">
                            {deleteLoading ? (
                                <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                            ) : (
                                "Yes, Delete!"
                            )}
                        </Button>
                        <Button variant="secondary" onClick={handleCloseDeleteModal}>
                            No
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default AllStudents;