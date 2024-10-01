import React, { useState } from "react";
import axios from "axios";
import titlelogo from 'C:/Users/Harit/Desktop/project/frontend/src/assets/images/attendance_logo.png'
import { Form, Button, Row, Alert, Modal, Nav, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const StudentLogin =( {onLogin,usertype}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const [Show, setShow] = useState(false);
    const [showAdmin,SetShowAdmin]= useState(false);
    const [showRegister,setShowRegister] = useState(false);
    const [loginType, setLoginType] = useState("Admin");
    const [confirm_password,setConfirm_Password] = useState("");
    const [Dept,setDept] =useState("");
    const [Year,setYear] =useState("");
    const [Section,setSection] =useState("");
    const [Name,setName] =useState("");
    const navigate = useNavigate();


    // const navigate=useNavigate();
    const gotologin = () => {
        // navigate('/Rounting')
    }
    const handleClose = () => {
        setShow(false);
      };
    const handleCloseRegister =() =>{
        setShowRegister(false)
    }
    const handleShow = () => {
        setShowRegister(false)
        setShow(true);
      };
    const handleShowRegister =() =>{
        setShow(false);
        setShowRegister(true);
    }
    const handleShowAdmin =() => {
      SetShowAdmin(true)
    }
    const handleAdminclose = () => {
      SetShowAdmin(false)
    }

    const gotoStudent =()=>{
      navigate('/StudentDashboard');
    }

    const gotoAdmin = () => {
      navigate('/Add_dept')
    }

    const loginUser = async (event) => {
    event.preventDefault();
    setMessage("");
    setError(false);

    const user = { email, password };

    let loginEndpoint = "";

    if (loginType === "Admin") loginEndpoint = "admin-login/";
    else if (loginType === "User") loginEndpoint = "admin-login/";

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/${loginEndpoint}", 
        user,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setMessage("Login successful, redirecting to dashboard.");

      const token = response.data.access_token;

      setTimeout(() => {
        usertype(loginType);
        onLogin(token);
      }, 2000);
      
    } catch (error) {
      setError(true);
      setMessage("Login details are invalid");
    }
};

    const Registeruser  = () => {
        
    }
    return(

        <div>
      <div className="background-image">
      </div>

        
                {/* intro page */}
                <div className="overlay-content" width='100%'>
                    <img src={titlelogo} width='100%' alt="Title logo"/>
                    <br></br>
                    <br></br>
                    <h1>Hearty Welcome</h1>
                    <p>Here you can see your Attendance.</p>
                    <Button    
                        variant="success"            
                        className="w-75 m-2 sign-in-button"
                        onClick={handleShowRegister}
                        style={{ backgroundColor: "#0002", color: "black" }}
                        >
                            Register as Student
                          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                            <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/>
                        </svg>
                    </Button>  
                    <hr></hr>
                    <div className="dbl_btns py-3">
                      <Button
                          className="sign-in-button"
                          onClick={handleShow}
                          variant="success"
                          >
                          Sign In as Student
                      </Button>    
                      <Button
                          className="sign-in-button"
                          onClick={handleShowAdmin}
                          variant="success"
                          >
                          Sign In as Admin
                      </Button>    
                    </div>
                </div>

                {/* Student login Modal */}
                <Modal show={Show} onHide={handleClose} centered>
                    <Modal.Header closeButton className="px-4">
                        <Modal.Title>
                            Student Login
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="px-5">
                <Form onSubmit={loginUser}>
                    <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <hr className="mx-5"></hr>
                <Form.Group className="mb-3">
                  <Button
                    type="submit"
                    variant="success"
                    onClick={gotoStudent}
                    style={{width: "100%", border: "none" }}
                  >
                    Sign in
                  </Button>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer className="modal-footer"
                style={{ justifyContent: "space-between" }}
                >
                <p>Don't have an account.. ?
                <Button variant="link" onClick={handleShowRegister}>
                Register
                </Button>
                </p>     
                <button onClick={handleClose}>
                    Cancel
                </button>
            </Modal.Footer>
                </Modal>


                {/* Admin login Modal */}
                <Modal show={showAdmin} onHide={handleAdminclose} centered>
                    <Modal.Header closeButton className="px-4">
                        <Modal.Title>
                            Admin Login
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="px-5">
                <Form onSubmit={loginUser}>
                    <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <hr className="mx-5"></hr>
                <Form.Group className="mb-3">
                  <Button
                    type="submit"
                    variant="success"
                    onClick={gotoAdmin}
                    style={{width: "100%", border: "none" }}
                  >
                    Sign in
                  </Button>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer className="modal-footer"
                style={{ justifyContent: "space-between" }}
                >
                <p>Only authenticated Admins are allowed</p>     
                <button onClick={handleAdminclose}>
                    Cancel
                </button>
            </Modal.Footer>
                </Modal>

                {/* Student registraion modal */}
                <Modal show={showRegister}  onHide={handleCloseRegister} centered>
                    <Modal.Header closeButton className="px-4">
                        <Modal.Title>
                            Student Registration
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="px-5">
                    <Form onSubmit={Registeruser}>

                    <Form.Group controlId="formname" className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </Form.Group>
                    
                    <Form.Group controlId="formDept" className="mb-3">
                        <Form.Label>Department</Form.Label>
                        <Form.Control
                            as="select"  // Change to 'select' to create a dropdown
                            value={Dept}
                            onChange={(e) => setDept(e.target.value)}
                            required
                        >
                            <option value="">--Select Department--</option>  {/* Default placeholder */}
                            <option value="IT">IT</option>
                            <option value="HR">HR</option>
                            <option value="Finance">Finance</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Operations">Operations</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formDropdown" className="mb-3">
                        <Form.Label>Select a Year</Form.Label>
                        <Form.Control
                            as="select"    // Change to 'select' to create a dropdown
                            value={Year}
                            onChange={(e) => setYear(e.target.value)} // Update the state on selection
                            required
                        >
                            <option value="">--Select Year--</option>  {/* Default option */}
                            <option value="1st">1st year</option>
                            <option value="2nd">2nd year</option>
                            <option value="3rd">3rd year</option>
                            <option value="4th">Final year</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formSection" className="mb-3">
                    <Form.Label>Section</Form.Label>
                    <Form.Control
                        as="select"  // Change 'type="email"' to 'as="select"' to make it a dropdown
                        value={Section}
                        onChange={(e) => setSection(e.target.value)}
                        required
                    >
                        <option value="">--Select Section--</option> {/* Default option */}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formConfirmPassword" className="mb-3">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter confirmation password"
                        value={confirm_password}
                        onChange={(e) => setConfirm_Password(e.target.value)}
                        required
                      />
                    </Form.Group>
                    
                    <hr className="mx-5"></hr>
                    <Form.Group className="mb-3">
                      <Button
                        type="submit"
                        variant="success"
                        onClick={gotoStudent}
                        style={{width: "100%", border: "none" }}
                      >
                        Register
                      </Button>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer className="modal-footer"
                    style={{ justifyContent: "space-between" }}
                    >
                    <p>Do you have an account.. ?
                    <Button variant="link" onClick={handleShow}>
                    Login
                    </Button>
                    </p>     
                    <button onClick={handleCloseRegister}>
                        Cancel
                    </button>
                </Modal.Footer>

                </Modal>
        </div>
    );
};
export default StudentLogin;