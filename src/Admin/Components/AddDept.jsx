import { Row, Col, Form, Modal, Button } from "react-bootstrap";
import React, { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import NavBar from "./admin_nav";
import Footer from "./footer";
import clickSound from "../../assets/sounds/mouse-click-153941.mp3";
import closeSound from "../../assets/sounds/close.mp3";
import deleteSound from "../../assets/sounds/delete.mp3"
import { Spinner } from "react-bootstrap";
const AddDept = () => {
    const [show, setShow] = useState(false);
    const [deptId, setDeptId] = useState("");
    const [deptName, setDeptName] = useState("");
    const [departments, setDepartments] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const token = localStorage.getItem('access_token');
    const [registerErrors, setRegisterErrors] = useState();
    const [loading, setLoading] = useState(true)
    const [registerLoading, setRegisterLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [showOkDeleteModal, setShowOkDeleteModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDepartments, setFilteredDepartments] = useState(departments);
    const inputRef = useRef(null);

    const handleIconClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000); // Change duration as needed
    }, []);
    const playDelete = () => {
        const audio = new Audio(deleteSound);
        audio.play();
    }

    const playClick = () => {
        const audio = new Audio(clickSound);
        audio.play();
    };

    const playClose = () => {
        const audio = new Audio(closeSound);
        audio.play();
    }
    const handleClose = () => {
        playClose()
        setShow(false);
        setIsEdit(false);
        setDeptId('');
        setDeptName('');
        setEditId(null);
    }

    const handleShow = () => {
        playClick()
        setShow(true);
    }

    // Fetch departments on component mount
    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = () => {
        axios.get("http://127.0.0.1:8000/api/departments/")
            .then(response => {
                setDepartments(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the departments!", error);
            });
    };

    const handleAddOrUpdateDept = (e) => {
        playClick();
        setRegisterLoading(true);
        e.preventDefault();
        const data = { dept_id: deptId, dept_name: deptName };

        if (isEdit) {
            axios.put(`http://127.0.0.1:8000/api/departments/update/${editId}/`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
                .then(response => {
                    toast.success("Department updated successfully!");
                    fetchDepartments();
                    handleClose();
                    setRegisterErrors(""); // Clear errors on success
                })
                .catch(error => {
                    console.error("There was an error updating the department!", error);
                    if (error.response && error.response.data) {
                        const errorMessage = error.response.data.dept_id
                            ? error.response.data.dept_id[0]
                            : "There was an error updating the department!";
                        setRegisterErrors(errorMessage);
                    } else {
                        setRegisterErrors("An unexpected error occurred. Please try again.");
                    }
                })
                .finally(() => {
                    setRegisterLoading(false); // Stop loading indicator
                });
        } else {
            axios.post("http://127.0.0.1:8000/api/departments/add/", data)
                .then(response => {
                    toast.success("Department added successfully!");
                    fetchDepartments();
                    handleClose();
                    setRegisterErrors(""); // Clear errors on success
                })
                .catch(error => {
                    console.error("There was an error adding the department!", error);
                    if (error.response && error.response.data) {
                        const errorMessage = error.response.data.dept_id
                            ? error.response.data.dept_id[0]
                            : "There was an error adding the department!";
                        setRegisterErrors(errorMessage);
                    } else {
                        setRegisterErrors("An unexpected error occurred. Please try again.");
                    }
                })
                .finally(() => {
                    setRegisterLoading(false); // Stop loading indicator
                });
        }
    };

    useEffect(() => {
        const filtered = departments.filter(entry =>
            entry.dept_id.toString().includes(searchQuery) || // Assuming dept_id can be a number
            entry.dept_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredDepartments(filtered);
    }, [searchQuery, departments]); // Add departments to dependencies


    // Helper function to extract and format error messages
    const extractErrorMessages = (data) => {
        let messages = [];
        for (const key in data) {
            if (data.hasOwnProperty(key) && Array.isArray(data[key])) {
                messages.push(`${key}: ${data[key].join(", ")}`);
            }
        }
        return messages.join("\n");
    };


    const handleUpdate = (id) => {
        playClick();
        const dept = departments.find(d => d.id === id);
        setDeptId(dept.dept_id);
        setDeptName(dept.dept_name);
        setIsEdit(true);
        setEditId(id);
        setShow(true);
    }

    const handleDelete = (id) => {
        setDeleteId(id); // Store ID of the student to be deleted
        setShowOkDeleteModal(true);
    }
    const confirmDelete = async () => {
        if (deleteId) {
            setDeleteLoading(true);
            playDelete();
            try {
                await axios.delete(`http://127.0.0.1:8000/api/departments/delete/${deleteId}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                toast.success("Department deleted successfully!", { autoClose: 3000 });
                fetchDepartments();
            } catch (error) {
                console.error("There was an error deleting the department!", error);
                // Optionally, show an error toast to the user
            } finally {
                setDeleteLoading(false);
                setShowOkDeleteModal(false); // Close the modal after deletion
                setDeleteId(null); // Reset the deleteId state
            }
        }
    };

    const handleCloseDeleteModal = () => {
        setShowOkDeleteModal(false);
        setDeleteId(null); // Clear stored ID
        setDeleteLoading(false); // Stop loading spinner if the modal is closed
    };
    return (
        <div className="for_ftr">
            <ToastContainer />
            <div className="cnt">
                <div style={{ position: "sticky", top: "0", zIndex: "1" }}>
                    <NavBar />
                </div>

                <div className="Add_dept_div pe-3">
                    <label>Add a Department:</label>
                    <Button
                        variant="success"
                        onClick={handleShow}
                        style={{ backgroundColor: "#3f4961", color: "#c3c7d3", paddingTop: "3px", paddingBottom: "3px" }}
                    >
                        Add
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#c3c7d3">
                            <path d="M500-482q29-32 44.5-73t15.5-85q0-44-15.5-85T500-798q60 8 100 53t40 105q0 60-40 105t-100 53Zm220 322v-120q0-36-16-68.5T662-406q51 18 94.5 46.5T800-280v120h-80Zm80-280v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Zm-480-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM0-160v-112q0-34 17.5-62.5T64-378q62-31 126-46.5T320-440q66 0 130 15.5T576-378q29 15 46.5 43.5T640-272v112H0Zm320-400q33 0 56.5-23.5T400-640q0-33-23.5-56.5T320-720q-33 0-56.5 23.5T240-640q0 33 23.5 56.5T320-560ZM80-240h480v-32q0-11-5.5-20T540-306q-54-27-109-40.5T320-360q-56 0-111 13.5T100-306q-9 5-14.5 14T80-272v32Zm240-400Zm0 400Z" />
                        </svg>
                    </Button>
                </div>



                <div className="table-responsive scrollable-content" style={{ maxHeight: '410px', overflowY: 'auto' }}>
                    <div className="mx-3 p-2 border rounded-sm">
                        <div class="search-container">
                            <input
                                type="text"
                                placeholder="Search Departments..."
                                value={searchQuery}
                                ref={inputRef}
                                onChange={(event) => setSearchQuery(event.target.value)}
                                className="search-input-slide" />
                            <svg onClick={handleIconClick} style={{ cursor: "pointer" }} width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#c3c7d3" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#7b42f5" stroke-width="2" />
                                <path d="M14 14L16 16" stroke="#3f4961" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M15 11.5C15 13.433 13.433 15 11.5 15C9.567 15 8 13.433 8 11.5C8 9.567 9.567 8 11.5 8C13.433 8 15 9.567 15 11.5Z" stroke="#3f4961" stroke-width="2" />
                            </svg>
                        </div>
                        <table className="table table-hover table-bordered Add_dept_tbl">
                            <thead className="thead-dark table-warning" style={{ zIndex: "0" }}>
                                <tr>
                                    <th>S.no</th>
                                    <th>Department ID</th>
                                    <th>Department Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {loading ? (
                                <>
                                    <div className="table-spinner" role="status">
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </>
                            ) : (
                                <tbody className='table-secondary'>
                                    {filteredDepartments.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="text-center">
                                                No Departments found
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredDepartments.map((entry, index) => (
                                            <tr key={entry.id}>
                                                <td>{index + 1}</td>
                                                <td>{entry.dept_id}</td>
                                                <td>{entry.dept_name}</td>
                                                <td style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                                                    <Button
                                                        variant="secondary"
                                                        onClick={() => handleUpdate(entry.id)}
                                                        className="me-2"
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => handleDelete(entry.id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>

                <Modal show={show} onHide={handleClose} centered>

                    <Modal.Header closeButton className="px-4">
                        <Modal.Title>{isEdit ? "Edit Department" : "Add Department"}<svg className="ms-2" version="1.0" id="Layer_1"
                            width="24px" height="24px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" >
                            <g>
                                <path fill="#231F20" d="M22,29c-1.657,0-3,1.343-3,3v2c0,1.657,1.343,3,3,3s3-1.343,3-3v-2C25,30.343,23.657,29,22,29z" />
                                <path fill="#231F20" d="M22,23c-6.627,0-12,5.373-12,12c0,3.072,1.165,5.867,3.064,7.989C14.343,41.326,17.014,39,22,39
		c-2.762,0-5-2.238-5-5v-2c0-2.762,2.238-5,5-5s5,2.238,5,5v2c0,2.762-2.238,5-5,5c4.986,0,7.657,2.326,8.936,3.989
		C32.835,40.867,34,38.072,34,35C34,28.373,28.627,23,22,23z"/>
                                <path fill="#231F20" d="M22,41c-4.361,0-6.543,2.08-7.479,3.374C16.572,46.014,19.169,47,22,47s5.428-0.986,7.48-2.626
		C28.545,43.082,26.363,41,22,41z"/>
                                <path fill="#231F20" d="M60,11h-8V6c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5H20V6c0-0.553-0.447-1-1-1h-6
		c-0.553,0-1,0.447-1,1v5H4c-2.211,0-4,1.789-4,4v40c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V15C64,12.789,62.211,11,60,11z
		 M46,7h4v8h-4V7z M41,25h6c0.553,0,1,0.447,1,1s-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1S40.447,25,41,25z M14,7h4v8h-4V7z M22,49
		c-7.731,0-14-6.269-14-14s6.269-14,14-14s14,6.269,14,14S29.731,49,22,49z M55,45H41c-0.553,0-1-0.447-1-1s0.447-1,1-1h14
		c0.553,0,1,0.447,1,1S55.553,45,55,45z M40,38c0-0.553,0.447-1,1-1h10c0.553,0,1,0.447,1,1s-0.447,1-1,1H41
		C40.447,39,40,38.553,40,38z M55,33H41c-0.553,0-1-0.447-1-1s0.447-1,1-1h14c0.553,0,1,0.447,1,1S55.553,33,55,33z"/>
                            </g>
                        </svg>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="px-5">
                        {registerErrors && (
                            <div className="alert alert-danger">{registerErrors}</div>
                        )}
                        <Form onSubmit={handleAddOrUpdateDept}>
                            <Form.Group controlId="formDeptId" className="mb-3">
                                <Form.Label>Department ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter ID"
                                    value={deptId}
                                    onChange={(e) => setDeptId(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formName" className="mb-3">
                                <Form.Label>Department Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter New Department Name"
                                    value={deptName}
                                    onChange={(e) => setDeptName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <hr className="mx-5" />
                            <Form.Group className="mb-3">
                                <Button
                                    type="submit"
                                    variant="success"
                                    style={{ width: "100%", border: "none" }}
                                >
                                    {registerLoading ? (
                                        <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                                    ) : (
                                        isEdit ? "Update" : "Add"
                                    )}
                                </Button>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="modal-footer" style={{ justifyContent: "space-between" }}>
                        <p>Only authenticated Admins are allowed</p>
                        <button onClick={handleClose}>Close</button>
                    </Modal.Footer>
                </Modal>
                <Footer />
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
        </div>
    );
}

export default AddDept;
