import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clickSound from "../../assets/sounds/mouse-click-153941.mp3";
import closeSound from "../../assets/sounds/close.mp3";
import deleteSound from "../../assets/sounds/delete.mp3"
import sidebarSound from "../../assets/sounds/sidebar.mp3";
import transitionSound from "C:/Users/Harit/Desktop/project/frontend/src/assets/sounds/transition-base-121422.mp3";
import logoutSound from "C:/Users/Harit/Desktop/project/frontend/src/assets/sounds/pllogout-169389.mp3"
import {Spinner} from "react-bootstrap";
import navimg from 'C:/Users/Harit/Desktop/project/frontend/src/assets/images/gmrlogo-removebg-preview (1).png';
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
const NavBar = () => {
    const navigate = useNavigate();
    const [showLogout, setShowLogout] = useState(false);
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [isSubmenuVisible, setSubmenuVisible] = useState(false);
    const [Show, setShow] = useState(false);
    const [isedit, setIsEdit] = useState(true);
    const [adminName, setAdminName] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [showEditInfoModal, setShowEditInfoModal] = useState(false);
    const [showAccessModal, setShowAccessModal] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);
    const API_BASE_URL = "http://127.0.0.1:8000/api/";

    const toggleSidebar = () => {
        playSidebar();
        setSidebarVisible(!isSidebarVisible);
    };
    const toggleSubmenu = () => {
        playSidebar();
        setSubmenuVisible(!isSubmenuVisible);
    };
    const handleClose = () => {
        playClose();
        setShow(false);
    };
    const handleShow = () => {
        playClick();
        setShow(true);
    };
    const handleEdit = () => {
        playClick();
        setIsEdit(!isedit);
        if (isedit) {
            setShowEditInfoModal(true);
        }
    }

    const playlogout = () => {
        const audio = new Audio(logoutSound);
        audio.play();
    }

    const playTransition = () => {
        const audio = new Audio(transitionSound);
        audio.play();
    };

    const playSidebar = () => {
        const audio = new Audio(sidebarSound);
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


    useEffect(() => {
        const fetchAdmin = async () => {
            const token = localStorage.getItem("access_token");
            const usertype = localStorage.getItem("user_type");
            if (usertype !== "admin") {
                setShowAccessModal(true); // Show the access restriction modal
                return; // Stop further execution if the user is not an admin
            }
            try {
                const response = await axios.get(`${API_BASE_URL}admin_profile/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data);
                setAdminName(response.data.name);
                setAdminEmail(response.data.email);
            } catch (error) {
                console.error("Error fetching admin profile:", error);
            }
        };
        fetchAdmin();
    }, []);



    const [activeItem, setActiveItem] = useState(null);

    // Handlers for each menu item click
    const gotoAdd_dept = () => {
        playTransition()
        setActiveItem('add_dept');
        navigate('/add_dept');
        // Navigate or handle the department logic
    };

    const gotoAllstudents = () => {
        playTransition();
        setActiveItem('all_students');
        navigate('/all_students');
        // Navigate or handle the students logic
    };

    const gotoAttendance = () => {
        playTransition();
        setActiveItem('attendance');
        navigate('/attendance');
        // Navigate or handle the attendance logic
    };

    const gotohome = () => {
        setShowLogout(true); // Show the logout confirmation modal
    };
    const handleCloseLogout = () => {
        setShowLogout(false); // Close the modal without logging out
        setLogoutLoading(false); // Stop loading indicator if active
      };
    
      const confirmLogout = () => {
        setLogoutLoading(true); // Show loading indicator
        localStorage.clear();
        navigate('/');
        playlogout();
        setShowLogout(false); // Close modal after logout
        setLogoutLoading(false);
      };

    const gotoDashboard = () => {
        playTransition();
        navigate('/Admin_dashboard')
    }

    return (
        <div>
            <div className="navimg_div">
                <img className="navimg" src={navimg} alt="Dr.B.R.Ambedhkar Government Model Residential Polytechnic, Rajamahendravaram" />
            </div>

            <hr className="m-0" />
            <nav>
                {/* Sidebar Menu */}
                <ul className={`sidebar ${isSidebarVisible ? 'visible' : 'hidden'}`}>
                    <li onClick={toggleSidebar}>
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a onClick={handleShow}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="black">
                                <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
                            </svg>
                            Profile
                        </a>
                    </li>
                    <li>
                        <a onClick={gotoAdd_dept}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
                                <path d="M500-482q29-32 44.5-73t15.5-85q0-44-15.5-85T500-798q60 8 100 53t40 105q0 60-40 105t-100 53Zm220 322v-120q0-36-16-68.5T662-406q51 18 94.5 46.5T800-280v120h-80Zm80-280v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Zm-480-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM0-160v-112q0-34 17.5-62.5T64-378q62-31 126-46.5T320-440q66 0 130 15.5T576-378q29 15 46.5 43.5T640-272v112H0Zm320-400q33 0 56.5-23.5T400-640q0-33-23.5-56.5T320-720q-33 0-56.5 23.5T240-640q0 33 23.5 56.5T320-560ZM80-240h480v-32q0-11-5.5-20T540-306q-54-27-109-40.5T320-360q-56 0-111 13.5T100-306q-9 5-14.5 14T80-272v32Zm240-400Zm0 400Z" />
                            </svg>
                            Department
                        </a>
                    </li>
                    <li>
                        <a onClick={gotoAllstudents}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="black">
                                <path d="M640-400q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM400-160v-76q0-21 10-40t28-30q45-27 95.5-40.5T640-360q56 0 106.5 13.5T842-306q18 11 28 30t10 40v76H400Zm86-80h308q-35-20-74-30t-80-10q-41 0-80 10t-74 30Zm154-240q17 0 28.5-11.5T680-520q0-17-11.5-28.5T640-560q-17 0-28.5 11.5T600-520q0 17 11.5 28.5T640-480Zm0-40Zm0 280ZM120-400v-80h320v80H120Zm0-320v-80h480v80H120Zm324 160H120v-80h360q-14 17-22.5 37T444-560Z" />
                            </svg>
                            Students
                        </a>
                    </li>
                    <li>
                        <a onClick={gotoAttendance}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="black">
                                <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
                            </svg>
                            Student's Attendance
                        </a>
                    </li>
                    <li>
                        <a onClick={gotohome}>
                            Log Out
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#black">
                                <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
                            </svg>
                        </a>
                    </li>
                </ul>

                {/* Top Navbar */}
                <ul className="top-nav">
                    <li>
                        <h1 onClick={gotoDashboard}>
                            <span className="fs-1">A</span>
                            <span className="fs-3">D</span>
                            <span className="fs-3">M</span>
                            <span className="fs-3">I</span>
                            <span className="fs-3">N</span>
                        </h1>
                    </li>

                    <div className="top-nav_menu">
                        <ul>
                            <li className={`hideOnMobile nav_active ${activeItem === 'add_dept' ? 'active' : ''}`}>
                                <a onClick={gotoAdd_dept}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#c3c7d3">
                                        <path d="M500-482q29-32 44.5-73t15.5-85q0-44-15.5-85T500-798q60 8 100 53t40 105q0 60-40 105t-100 53Zm220 322v-120q0-36-16-68.5T662-406q51 18 94.5 46.5T800-280v120h-80Zm80-280v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Zm-480-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM0-160v-112q0-34 17.5-62.5T64-378q62-31 126-46.5T320-440q66 0 130 15.5T576-378q29 15 46.5 43.5T640-272v112H0Zm320-400q33 0 56.5-23.5T400-640q0-33-23.5-56.5T320-720q-33 0-56.5 23.5T240-640q0 33 23.5 56.5T320-560ZM80-240h480v-32q0-11-5.5-20T540-306q-54-27-109-40.5T320-360q-56 0-111 13.5T100-306q-9 5-14.5 14T80-272v32Zm240-400Zm0 400Z" />
                                    </svg>
                                    Department
                                </a>
                            </li>
                            <li className={`hideOnMobile nav_active ${activeItem === 'all_students' ? 'active' : ''}`}>
                                <a onClick={gotoAllstudents}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#c3c7d3">
                                        <path d="M640-400q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM400-160v-76q0-21 10-40t28-30q45-27 95.5-40.5T640-360q56 0 106.5 13.5T842-306q18 11 28 30t10 40v76H400Zm86-80h308q-35-20-74-30t-80-10q-41 0-80 10t-74 30Zm154-240q17 0 28.5-11.5T680-520q0-17-11.5-28.5T640-560q-17 0-28.5 11.5T600-520q0 17 11.5 28.5T640-480Zm0-40Zm0 280ZM120-400v-80h320v80H120Zm0-320v-80h480v80H120Zm324 160H120v-80h360q-14 17-22.5 37T444-560Z" />
                                    </svg>
                                    Students
                                </a>
                            </li>
                            <li className={`hideOnMobile nav_active ${activeItem === 'attendance' ? 'active' : ''}`}>
                                <a onClick={gotoAttendance}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#c3c7d3">
                                        <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
                                    </svg>
                                    Student's Attendance
                                </a>
                            </li>
                        </ul>
                    </div>

                    <li className="submenu-btn hideOnMobile" onClick={toggleSubmenu}>
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#c3c7d3">
                                <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
                            </svg>
                        </a>
                    </li>
                    <li className="menu-button" onClick={toggleSidebar}>
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#c3c7d3">
                                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                            </svg>
                        </a>
                    </li>
                </ul>

                {/* 3 dot menu */}
                <ul className={`submenu ${isSubmenuVisible ? 'visible' : 'hidden'}`}>
                    <li onClick={toggleSubmenu}>
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#c3c7d3">
                                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a onClick={handleShow}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#c3c7d3">
                                <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
                            </svg>
                            Profile
                        </a>
                    </li>
                    <li>
                        <a onClick={gotohome}>
                            Log Out
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#c3c7d3">
                                <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
                            </svg>
                        </a>
                    </li>
                </ul>

            </nav>
            <Modal show={Show} onHide={handleClose} centered>
                <Modal.Header className="px-4" style={{ backgroundColor: "#3f4961", color: "#c3c7d3" }}>
                    <Modal.Title>
                        <h3 >Profile</h3>
                        <div className="profile_mdl_hdr" style={{ alignItems: "center" }}>
                            <svg className='pt-4' width="150px" height="150px" viewBox="-2.28 0 66.3577 66.3577" xmlns="http://www.w3.org/2000/svg" >

                                <defs>

                                    <clipPath id="clip-path">

                                        <path clip-rule="evenodd" d="M53.456 52.022A30.766 30.766 0 0 1 30.9 61.829a31.163 31.163 0 0 1-3.833-.237 34.01 34.01 0 0 1-11.15-3.644 31.007 31.007 0 0 1-7.849-6.225l1.282-3.1 13.91-6.212c.625 3.723 7.806 8.175 7.806 8.175s7.213-3.412 8.087-8.211l12.777 6.281z" fill="none" />

                                    </clipPath>

                                    <clipPath id="clip-path-2">

                                        <path clip-rule="evenodd" d="M14.112 46.496l6.814-3.042 10.209 13.978 10.328-13.938 5.949 2.831v20.033h-33.3V46.496z" fill="none" />

                                    </clipPath>

                                </defs>

                                <title />

                                <g data-name="Layer 2" id="Layer_2">

                                    <g data-name="—ÎÓÈ 1" id="_ÎÓÈ_1">

                                        <circle cx="30.8999" cy="30.8999" fill="#3dbc93" r="30.8999" />

                                        <path d="M23.255 38.68l15.907.121v12.918l-15.907-.121V38.68z" fill="#f9dca4" fill-rule="evenodd" />

                                        <path d="M39.165 38.778v3.58a7.783 7.783 0 0 1-.098 1.18 6.527 6.527 0 0 1-.395 1.405c-5.374 4.164-13.939.748-15.306-6.365z" fill-rule="evenodd" opacity="0.11" />

                                        <path d="M31.129 8.432c21.281 0 12.987 35.266 0 35.266-12.266 0-21.281-35.266 0-35.266z" fill="#ffe8be" fill-rule="evenodd" />

                                        <path d="M18.365 24.046c-3.07 1.339-.46 7.686 1.472 7.658a31.972 31.972 0 0 1-1.472-7.659z" fill="#f9dca4" fill-rule="evenodd" />

                                        <path d="M44.135 24.046c3.07 1.339.465 7.686-1.466 7.657a31.978 31.978 0 0 0 1.466-7.657z" fill="#f9dca4" fill-rule="evenodd" />

                                        <path d="M44.123 24.17s7.96-11.785-2.636-16.334a11.881 11.881 0 0 0-12.87-5.22C22.775 3.805 20.604 6.7 20.604 6.7s-5.53 5.014-10.44 5.117a9.774 9.774 0 0 0 6.28 1.758c-.672 1.68-1.965 7.21 1.989 10.854 4.368-2.868 8.012-8.477 8.012-8.477s.982 3.257.207 4.86a18.879 18.879 0 0 0 7.922-3.531c2.542-2.036 3.893-4.297 5.31-4.326 3.256-.069 4.213 9.74 4.24 11.216z" fill="#ecbe6a" fill-rule="evenodd" />

                                        <path d="M53.456 52.022A30.766 30.766 0 0 1 30.9 61.829a31.163 31.163 0 0 1-3.833-.237 34.01 34.01 0 0 1-11.15-3.644 31.007 31.007 0 0 1-7.849-6.225l1.282-3.1 13.91-6.212c.625 3.723 7.806 8.175 7.806 8.175s7.213-3.412 8.087-8.211l12.777 6.281z" fill="#498bd9" fill-rule="evenodd" />

                                        <g clip-path="url(#clip-path)">

                                            <path d="M14.112 46.496l6.814-3.042 10.209 13.978 10.328-13.938 5.949 2.831v20.033h-33.3V46.496z" fill="#545f69" fill-rule="evenodd" />

                                            <g clip-path="url(#clip-path-2)">

                                                <path d="M37.79 42.881h.732v21.382h-.732V42.881zm-14.775 0h.731v21.382h-.73V42.881zm-2.981 0h.731v21.382h-.731V42.881zm-2.944 0h.731v21.382h-.73V42.881zm-2.981 0h.731v21.382h-.731V42.881zm20.708 0h.731v21.382h-.731V42.881zm-2.981 0h.731v21.382h-.731V42.881zm-2.944 0h.731v21.382h-.731V42.881zm-2.981 0h.731v21.382h-.731V42.881zm20.785 0h.732v21.382h-.732V42.881zm-2.98 0h.73v21.382h-.73V42.881zm-2.944 0h.73v21.382h-.73z" fill="#434955" fill-rule="evenodd" />

                                            </g>

                                        </g>

                                        <path d="M23.265 41.27l7.802 9.316-6.305 3.553-4.823-10.591 3.326-2.278z" fill="#58b0e0" fill-rule="evenodd" />

                                        <path d="M39.155 41.45l-8.088 9.136 6.518 3.553 4.777-10.719-3.207-1.97z" fill="#58b0e0" fill-rule="evenodd" />

                                        <path d="M21.637 23.157h6.416a1.58 1.58 0 0 1 1.119.464v.002a1.579 1.579 0 0 1 .464 1.117v2.893a1.585 1.585 0 0 1-1.583 1.583h-6.416a1.578 1.578 0 0 1-1.116-.465h-.002a1.58 1.58 0 0 1-.464-1.118V24.74a1.579 1.579 0 0 1 .464-1.117l.002-.002a1.578 1.578 0 0 1 1.116-.464zm6.416.85h-6.416a.735.735 0 0 0-.517.214l-.001.002a.735.735 0 0 0-.214.517v2.893a.73.73 0 0 0 .215.517.735.735 0 0 0 .517.215h6.416a.735.735 0 0 0 .732-.732V24.74a.734.734 0 0 0-.214-.518.731.731 0 0 0-.518-.215z" fill="#464449" fill-rule="evenodd" />

                                        <path d="M34.548 23.157h6.416a1.58 1.58 0 0 1 1.118.464v.002a1.579 1.579 0 0 1 .465 1.117v2.893a1.585 1.585 0 0 1-1.583 1.583h-6.416a1.58 1.58 0 0 1-1.117-.465l-.001-.002a1.58 1.58 0 0 1-.465-1.116V24.74a1.58 1.58 0 0 1 .465-1.117l.002-.001a1.58 1.58 0 0 1 1.116-.465zm6.416.85h-6.416a.73.73 0 0 0-.517.214l-.001.002a.729.729 0 0 0-.214.517v2.893a.73.73 0 0 0 .214.517l.001.001a.73.73 0 0 0 .517.214h6.416a.735.735 0 0 0 .732-.732V24.74a.734.734 0 0 0-.214-.518h-.001a.731.731 0 0 0-.517-.215z" fill="#464449" fill-rule="evenodd" />

                                        <path d="M29.415 24.506h3.845v.876h-3.845z" fill="#464449" />

                                    </g>

                                </g>

                            </svg>
                            <h2 className='px-4 pt-4' align="center">{adminName}</h2>
                        </div>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className="px-5">
                    <Form.Floating controlId="formname" className="mb-3">
                        <Form.Control
                            className=" profile_input"
                            type="text"
                            disabled={isedit}
                            placeholder="Enter Name"
                            value={adminName}
                            onChange={(e) => setAdminName(e.target.value)}
                            required
                        />
                        <Form.Label style={{ fontWeight: "bold", fontSize: "17px" }}><svg width="17px" height="23px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.95442 10.166C4.04608 9.76202 3.79293 9.36025 3.38898 9.26859C2.98504 9.17693 2.58327 9.43009 2.49161 9.83403L3.95442 10.166ZM5.49981 4.73283C5.19117 5.00907 5.1649 5.48322 5.44115 5.79187C5.71739 6.10051 6.19154 6.12678 6.50019 5.85053L5.49981 4.73283ZM15 14.25C14.5858 14.25 14.25 14.5858 14.25 15C14.25 15.4142 14.5858 15.75 15 15.75L15 14.25ZM17.25 18.7083C17.25 19.1225 17.5858 19.4583 18 19.4583C18.4142 19.4583 18.75 19.1225 18.75 18.7083H17.25ZM5.25 18.7083C5.25 19.1225 5.58579 19.4583 6 19.4583C6.41421 19.4583 6.75 19.1225 6.75 18.7083H5.25ZM9 15L8.99998 15.75H9V15ZM11 15.75C11.4142 15.75 11.75 15.4142 11.75 15C11.75 14.5858 11.4142 14.25 11 14.25V15.75ZM12 3.75C16.5563 3.75 20.25 7.44365 20.25 12H21.75C21.75 6.61522 17.3848 2.25 12 2.25V3.75ZM12 20.25C7.44365 20.25 3.75 16.5563 3.75 12H2.25C2.25 17.3848 6.61522 21.75 12 21.75V20.25ZM20.25 12C20.25 16.5563 16.5563 20.25 12 20.25V21.75C17.3848 21.75 21.75 17.3848 21.75 12H20.25ZM3.75 12C3.75 11.3688 3.82074 10.7551 3.95442 10.166L2.49161 9.83403C2.33338 10.5313 2.25 11.2564 2.25 12H3.75ZM6.50019 5.85053C7.96026 4.54373 9.88655 3.75 12 3.75V2.25C9.50333 2.25 7.22428 3.1894 5.49981 4.73283L6.50019 5.85053ZM14.25 9C14.25 10.2426 13.2426 11.25 12 11.25V12.75C14.0711 12.75 15.75 11.0711 15.75 9H14.25ZM12 11.25C10.7574 11.25 9.75 10.2426 9.75 9H8.25C8.25 11.0711 9.92893 12.75 12 12.75V11.25ZM9.75 9C9.75 7.75736 10.7574 6.75 12 6.75V5.25C9.92893 5.25 8.25 6.92893 8.25 9H9.75ZM12 6.75C13.2426 6.75 14.25 7.75736 14.25 9H15.75C15.75 6.92893 14.0711 5.25 12 5.25V6.75ZM15 15.75C15.6008 15.75 16.1482 16.0891 16.5769 16.6848C17.0089 17.2852 17.25 18.0598 17.25 18.7083H18.75C18.75 17.7371 18.4052 16.6575 17.7944 15.8086C17.1801 14.9551 16.2275 14.25 15 14.25L15 15.75ZM6.75 18.7083C6.75 18.0598 6.99109 17.2852 7.42315 16.6848C7.85183 16.0891 8.39919 15.75 8.99998 15.75L9.00002 14.25C7.77253 14.25 6.81989 14.9551 6.20564 15.8086C5.59477 16.6575 5.25 17.7371 5.25 18.7083H6.75ZM9 15.75H11V14.25H9V15.75Z" fill="#000000" /></svg>Name</Form.Label>
                    </Form.Floating>
                    <Form.Floating controlId="formEmail" className="mb-3">
                        <Form.Control
                            className="profile_input"
                            type="text"
                            disabled={isedit}
                            placeholder="Enter Your Mail ID"
                            value={adminEmail}
                            onChange={(e) => setAdminEmail(e.target.value)}
                            required
                        />
                        <Form.Label className="form-label"> <svg xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m440.72-509.72-317.13-200v386.85h392.82v91H123.59q-37.79 0-64.39-26.61-26.61-26.61-26.61-64.39v-474.26q0-37.78 26.61-64.39 26.6-26.61 64.39-26.61h634.26q37.78 0 64.39 26.61t26.61 64.39v200h-91v-112.59l-317.13 200Zm0-87.41 317.13-200H123.59l317.13 200ZM761.91-69.48q-68.39 0-116.94-48.55-48.56-48.56-48.56-116.95v-180q0-43.5 30.03-73.54 30.02-30.05 73.51-30.05 43.48 0 73.56 30.05 30.08 30.04 30.08 73.54v180H720v-180q0-8-6-14t-14-6q-8 0-14 6t-6 14v180q0 33.96 23.98 57.94 23.98 23.97 57.93 23.97 33.96 0 57.82-23.97 23.86-23.98 23.86-57.94v-161.67h83.82v161.67q0 68.39-48.55 116.95-48.56 48.55-116.95 48.55ZM123.59-709.72v-87.41 474.26-386.85Z" /></svg> Email</Form.Label>

                    </Form.Floating>

                    <div class="row align-items-center">
                        <div class="col">
                            <hr />
                        </div>
                        <div class="col-auto">
                            thank you
                        </div>
                        <div class="col">
                            <hr />
                        </div>
                    </div>

                    {/* <Form.Group controlId="formPhone" className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                disabled={isedit}
                                placeholder="Enter Your Mobile number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </Form.Group> */}
                </Modal.Body>

                <Modal.Footer className="modal-footer"
                    style={{ justifyContent: "space-evenly", backgroundColor: "#c3c7d3" }}
                >
                    <Button
                        variant="secondary"
                        onClick={handleEdit}
                    >
                        Edit
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#292D32" />
                            <path opacity="0.4" d="M12.0002 14.5C6.99018 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill="#292D32" />
                            <path d="M21.4291 14.7401C20.5291 13.8401 19.8191 14.1301 19.2091 14.7401L15.669 18.2801C15.529 18.4201 15.3991 18.6801 15.3691 18.8701L15.1791 20.2201C15.1091 20.7101 15.4491 21.0501 15.9391 20.9801L17.289 20.7901C17.479 20.7601 17.7491 20.6301 17.8791 20.4901L21.419 16.9501C22.039 16.3501 22.3291 15.6401 21.4291 14.7401Z" fill="#292D32" />
                        </svg>
                    </Button>
                    <button onClick={handleClose}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditInfoModal} onHide={() => setShowEditInfoModal(false)} centered>
                <Modal.Header closeButton className="bg-warning text-dark">
                    <Modal.Title>Notice</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <p>Please note that you can temporarily edit your details here. Changes will not be saved permanently.</p>
                    <div className="d-flex justify-content-center">
                        <Button variant="primary" onClick={() => setShowEditInfoModal(false)}>
                            Okay
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={showAccessModal} onHide={() => navigate("/")} centered>
                <Modal.Header closeButton className="bg-danger text-white">
                    <Modal.Title>Access Restricted</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <p>You must be logged in as a Lecturer to access this page.</p>
                    <div className="d-flex justify-content-center">
                        <Button variant="danger" onClick={() => navigate("/")}>
                            Go to Home
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Logout Confirmation Modal */}
            <Modal show={showLogout} onHide={handleCloseLogout} centered>
                <Modal.Header closeButton className="bg-danger text-white">
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <p>Are you sure you want to LogOut?</p>
                    <div className="d-flex justify-content-center">
                        <Button variant="danger" onClick={confirmLogout} className="me-3">
                            {logoutLoading ? (
                                <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                            ) : (
                                "Yes!"
                            )}
                        </Button>
                        <Button variant="secondary" onClick={handleCloseLogout}>
                            No
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default NavBar;
