import React, { useState } from "react";
import axios from "axios";
import titlelogo from 'C:/Users/Harit/Desktop/project/frontend/src/assets/images/attendance_logo.png'
import { Form, Button, Row, Alert, Modal, Nav, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login =( {onLogin,usertype}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const [Show, setShow] = useState(false);
    const [showAdmin,SetShowAdmin]= useState(false);
    const [loginType, setLoginType] = useState("Admin");

    const navigate = useNavigate();


    // const navigate=useNavigate();
    const gotologin = () => {
        // navigate('/Rounting')
    }
    const handleClose = () => {
        setShow(false);
      };
    const handleShow = () => {
        setShow(true);
      };
    const handleShowRegister =() =>{
        setShow(false);
    }
    const handleShowAdmin =() => {
      SetShowAdmin(true)
    }
    const handleAdminclose = () => {
      SetShowAdmin(false)
    }

    const gotoOTP =()=>{
      navigate('/OTP');
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

    return(

        <div>
      <div className="background-image">
      </div>

        
                {/* intro page */}
                <div className="overlay-content" width='100%'>
                    <img src={titlelogo} alt="Title logo"/>
                    <br></br>
                    <br></br>
                    <h1>Hearty Welcome</h1>
                    <p>Here you can see your Attendance.</p>
                    {/* <Button    
                        variant="success"            
                        className="w-75 m-2 sign-in-button"
                        onClick={handleShowRegister}
                        style={{ backgroundColor: "#0002", color: "black" }}
                        >
                            Register as Student
                          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                            <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/>
                        </svg>
                    </Button>   */}
                    <hr></hr>
                    <div className="dbl_btns py-3">
                      <Button
                          className="mb-4"
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
                    onClick={gotoOTP}
                    style={{width: "100%", border: "none" }}
                  >
                    Sign in
                  </Button>
                </Form.Group>
              </Form>
                    </Modal.Body>

                    <Modal.Footer className="modal-footer"
                        style={{ justifyContent: "flex-end" }}
                        >
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
                    onClick={gotoOTP}
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

        </div>
    );
};
export default Login;