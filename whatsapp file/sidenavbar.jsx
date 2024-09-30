import React, { useState } from "react";
import { Navbar, Nav, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdDashboardCustomize } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import menu from "C:/Users/SUJAN PRASAD/OneDrive/Desktop/HMS/frontend/src/assets/images/menu.png";
import logout from "C:/Users/SUJAN PRASAD/OneDrive/Desktop/HMS/frontend/src/assets/images/logout.png";

const Sidebar = ({ onLogout }) => {
  const [show, setShow] = useState(false);
  const [appointmentsOpen, setAppointmentsOpen] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleAppointments = () => setAppointmentsOpen(!appointmentsOpen);

  return (
    <>
      <Navbar
        style={{
          background: "linear-gradient(135deg, #007bff, #00c6ff)",
          borderRadius: "10px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
        expand="lg"
        className="mb-3"
      >
        <Navbar.Brand>
          <b>Menu</b>
          <img
            className="d-none d-lg-inline"
            src={menu}
            alt="Menu Icon"
            style={{ width: "30px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
      </Navbar>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/">
              Dashboard <MdDashboardCustomize />
            </Nav.Link>
            <Nav.Link as={Link} to="/dashboard/Doctors">
              Doctors <FaUserDoctor />
            </Nav.Link>
            <Nav.Link as={Link} to="/dashboard/Patients">
              Patients<FaRegUser/>
            </Nav.Link>
            <Nav.Link
              onClick={toggleAppointments}
              style={{ cursor: "pointer" }}
            >
              Appointments<SlCalender/>
            </Nav.Link>
            {appointmentsOpen && (
              <>
                <Nav.Link
                  as={Link}
                  to="/dashboard/Appointments/Total"
                  className="ms-3"
                >
                  Total Appointments
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/dashboard/Appointments/Today"
                  className="ms-3"
                >
                  Today's Appointments
                </Nav.Link>
              </>
            )}
            <Nav.Link onClick={onLogout} style={{ color: "red" }}>
              Logout{" "}
              <img
                src={logout}
                alt="logout img"
                style={{ width: "20px", marginLeft: "10px" }}
              />
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <div
        className="d-none d-lg-block sidebar"
        style={{ backgroundColor: "skyblue", borderRadius: "10px" }}
      >
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/" className="sidebar-item">
            Dashboard <MdDashboardCustomize />
          </Nav.Link>
          <Nav.Link as={Link} to="/dashboard/Doctors" className="sidebar-item">
            Doctors <FaUserDoctor />
          </Nav.Link>
          <Nav.Link as={Link} to="/dashboard/Patients" className="sidebar-item">
            Patients<FaRegUser/>
          </Nav.Link>
          <Nav.Link
            onClick={toggleAppointments}
            className="sidebar-item"
            style={{ cursor: "pointer" }}
          >
            Appointments <SlCalender/>
          </Nav.Link>
          {appointmentsOpen && (
            <>
              <Nav.Link
                as={Link}
                to="/dashboard/Appointments/Total"
                className="sidebar-item ms-3"
              >
                Total Appointments
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/dashboard/Appointments/Today"
                className="sidebar-item ms-3"
              >
                Today's Appointments
              </Nav.Link>
            </>
          )}
          <Nav.Link onClick={onLogout} style={{ color: "red" }}>
            Logout
            <img
              src={logout}
              alt="logout img"
              style={{ width: "20px", marginLeft: "10px" }}
            />
          </Nav.Link>
        </Nav>
      </div>
    </>
  );
};

export default Sidebar;