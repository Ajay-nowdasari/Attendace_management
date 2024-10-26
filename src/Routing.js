import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AddDept from "./Admin/Components/AddDept";
import { useEffect, useState } from 'react';
import AllStudents from "./Admin/Components/AllStudents";
import Attendance from "./Admin/Components/Attendance";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './User/Components/login';
import AdminDashboard from './Admin/Components/adminDashboard';
import OtpVerification from './User/Components/stdOtp_verification';
import StudentDashboard from './User/Components/StudentDashboard';
import PasswordResetForm from './Admin/Components/new_password';
import PasswordResetRequest from './Admin/Components/password_reset';
import { useLocation } from 'react-router-dom';
import PrivateRoute from './PrivateRouting';
import NavBar from './Admin/Components/admin_nav';
function Routing() {
  // const [authenticated, setAuthenticated] = useState(false);
  // const [usertype, setUsertype] = useState(null);
  // const location = useLocation();

  // useEffect(() => {
  //   // Track the last visited path for better redirect experience
  //   if (authenticated) {
  //     localStorage.setItem("lastPath", location.pathname);
  //   }
  // }, [location, authenticated]);

  // useEffect(() => {
  // checkAuthentication();
  // }, []);

  // const checkAuthentication = ()=> {
  //   const storedUsertype = localStorage.getItem("user_type");
  //   const token = localStorage.getItem("access_token");
  //   console.log(storedUsertype,"user type");
  //   console.log(token,"token")
  //   if (storedUsertype && token) {
  //     setAuthenticated(true);
  //     setUsertype(storedUsertype);
  //   }
  // }

  // const lastPath = localStorage.getItem("lastPath") || "/dashboard";

  return (
    <>
    {/* <NavBar/> */}
    <Routes>
          {/* Unauthenticated Routes */}
          <Route path="/"  element={<Login />} />
          <Route path="/OTP"  element={<OtpVerification />} />

          {/* Authenticated Routes */}
              {/* Admin Route */}
              <Route path="/Admin_dashboard" element={<PrivateRoute element={<AdminDashboard />}/>}  />
              <Route path="/Add_dept" element={<PrivateRoute element={< AddDept />} />} />
              <Route path="/All_students" element={<PrivateRoute element={<AllStudents />} />} />
              <Route path="/Attendance" element={<PrivateRoute element={<Attendance />}/>}  />
              <Route path="/reset-password"  element={<PrivateRoute element={<PasswordResetForm />} />}/>
              <Route path="/password-reset-request"  element={<PrivateRoute element={<PasswordResetRequest />}/>} />
              
              {/* Student_dashboard */}
              <Route path="/Student_dashboard"  element={<PrivateRoute element={<StudentDashboard />}/>} />
    </Routes>
        </>
  );
}

export default Routing;
