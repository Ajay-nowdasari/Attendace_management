import { Row, Col, Form, Modal, Button } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from "./admin_nav";
import Footer from "./footer";

const AddDept = () => {
    const [show, setShow] = useState(false);
    const [deptId, setDeptId] = useState("");
    const [deptName, setDeptName] = useState("");
    const [departments, setDepartments] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const token = localStorage.getItem('access_token');

    const handleClose = () => {
        setShow(false);
        setIsEdit(false);
        setDeptId('');
        setDeptName('');
        setEditId(null);
    }

    const handleShow = () => {
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
                    alert("Department updated successfully!");
                    fetchDepartments();
                    handleClose();
                })
                .catch(error => {
                    console.error("There was an error updating the department!", error);
                });
        } else {
            axios.post("http://127.0.0.1:8000/api/departments/add/", data)
                .then(response => {
                    alert("Department added successfully!");
                    fetchDepartments();
                    handleClose();
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                        // Show specific error message from backend
                        const errorMessage = error.response.data.dept_id 
                            ? error.response.data.dept_id[0] // Extracts the message from the dept_id field
                            : "There was an error adding the department!";
                        alert(errorMessage);
                    } else {
                        console.error("There was an error adding the department!", error);
                        alert("An unexpected error occurred. Please try again.");
                    }
                });
        }
    }

    const handleUpdate = (id) => {
        const dept = departments.find(d => d.id === id);
        setDeptId(dept.dept_id);
        setDeptName(dept.dept_name);
        setIsEdit(true);
        setEditId(id);
        setShow(true);
    }

    const handleDelete = (id) => {

        if (window.confirm("Are you sure you want to delete this department?")) {
            axios.delete(`http://127.0.0.1:8000/api/departments/delete/${id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
                .then(response => {
                    alert("Department deleted successfully!");
                    fetchDepartments();
                })
                .catch(error => {
                    console.error("There was an error deleting the department!", error);
                });
        }
    }

    return (
        <div className="for_ftr">
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
                            <path d="M500-482q29-32 44.5-73t15.5-85q0-44-15.5-85T500-798q60 8 100 53t40 105q0 60-40 105t-100 53Zm220 322v-120q0-36-16-68.5T662-406q51 18 94.5 46.5T800-280v120h-80Zm80-280v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Zm-480-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM0-160v-112q0-34 17.5-62.5T64-378q62-31 126-46.5T320-440q66 0 130 15.5T576-378q29 15 46.5 43.5T640-272v112H0Zm320-400q33 0 56.5-23.5T400-640q0-33-23.5-56.5T320-720q-33 0-56.5 23.5T240-640q0 33 23.5 56.5T320-560ZM80-240h480v-32q0-11-5.5-20T540-306q-54-27-109-40.5T320-360q-56 0-111 13.5T100-306q-9 5-14.5 14T80-272v32Zm240-400Zm0 400Z"/>
                        </svg>
                    </Button>
                </div>

                <div className="mx-3 p-2 border rounded-sm">
                    <div className="table-responsive scrollable-content" style={{ maxHeight: '410px', overflowY: 'auto' }}>
                        <table className="table table-hover table-bordered Add_dept_tbl">
                            <thead className="thead-dark table-warning" style={{ zIndex: "0" }}>
                                <tr>
                                    <th>S.no</th>
                                    <th>Department ID</th>
                                    <th>Department Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className='table-secondary'>                    
                                {departments.map((entry, index) => (
                                    <tr key={entry.id}> 
                                        <td>{index + 1}</td>
                                        <td>{entry.dept_id}</td>
                                        <td>{entry.dept_name}</td>
                                        <td style={{justifyContent:"space-evenly",alignItems:"center",display:"flex"}}>
                                            <Button
                                                variant="secondary"
                                                onClick={() => handleUpdate(entry.id)}
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
                                ))} 
                            </tbody>
                        </table>
                    </div>
                </div>

                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton className="px-4">
                        <Modal.Title>{isEdit ? "Edit Department" : "Add Department"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="px-5">
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
                                    {isEdit ? "Update" : "Add"}
                                </Button>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="modal-footer" style={{ justifyContent: "space-between" }}>
                        <p>Only authenticated Admins are allowed</p>
                        <button onClick={handleClose}>Close</button>
                    </Modal.Footer>
                </Modal>
            </div>
            <Footer />
        </div>
    );
}

export default AddDept;
