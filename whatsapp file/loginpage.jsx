import React, { useState } from "react";
import logo from "./assets/images/logo.jpeg";
import { Form, Button, Row, Alert, Modal, Nav } from "react-bootstrap";
import axios from "axios";

function LoginPage({ onLogin, usertype }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [loginType, setLoginType] = useState("Admin");

  const handleClose = () => {
    setShow(false);
  };

  const loginUser = async (event) => {
    event.preventDefault();
    setMessage("");
    setError(false);

    const user = { email, password };

    let loginEndpoint = "";

    if (loginType === "Admin") loginEndpoint = "admin-login/";
    else if (loginType === "Doctor") loginEndpoint = "admin-login/";
    else if (loginType === "Patient") loginEndpoint = "admin-login/";

    try {
      const response = await axios.post(
       " http://127.0.0.1:8000/api/${loginEndpoint}",
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

  return (
    <>
      <div className="login-background">
        <div className="logo-container">
          <img src={logo} alt="Hospital Logo" className="logo-image" />
          <h1>SAVSTHA</h1>
          <p>Providing Quality Healthcare Services</p>
        </div>
        <Button
          className="sign-in-button"
          onClick={() => setShow(true)}
          style={{ backgroundColor: "#fff", color: "#007bff" }}
        >
          Sign In
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title className="modal-title-custom">
            {loginType} Sign in
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Nav
            variant="tabs"
            defaultActiveKey="Admin"
            onSelect={(selectedKey) => setLoginType(selectedKey)}
            className="nav-tabs-custom"
          >
            <Nav.Item>
              <Nav.Link eventKey="Admin" className="nav-link-custom">
                Admin
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Doctor" className="nav-link-custom">
                Doctor
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Patient" className="nav-link-custom">
                Patient
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Row className="justify-content-center p-3">
            <div className="form-container">
              <Form onSubmit={loginUser}>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-input"
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
                    className="form-input"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Button
                    type="submit"
                    className="submit-button"
                    style={{ width: "100%", border: "none" }}
                  >
                    Sign in
                  </Button>
                </Form.Group>
              </Form>

              {message && (
                <Alert
                  variant={error ? "danger" : "success"}
                  className="alert-message"
                >
                  {message}
                </Alert>
              )}
            </div>
          </Row>
        </Modal.Body>
        <Modal.Footer
          className="modal-footer-custom"
          style={{ justifyContent: "space-between" }}
        >
          <Button variant="link" className="forgot-password">
            Forgot Password?
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginPage;