import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AddDept from "./Admin/Components/AddDept";
import AllStudents from "./Admin/Components/AllStudents";
import Attendance from "./Admin/Components/Attendance";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './User/Components/login';
import AdminDashboard from './Admin/Components/adminDashboard';
import OtpVerification from './User/Components/stdOtp_verification';
import StudentDashboard from './User/Components/StudentDashboard';
import { useState } from 'react';
import ForgotPassword from './Admin/Components/password_reset';
import PasswordResetForm from './Admin/Components/new_password';
import PasswordResetRequest from './Admin/Components/password_reset';
function Routing() {
        const [isAuthenticated,setIsAuthenticated] = useState(false);
  return (
    <div>

    {/* {!isAuthenticated ? ( */}
        <Router>
          <Routes>
            <Route path='/*' element={<Navigate to="/student_login"/>}/>
            <Route path='/' element={<Login/>}/>
          {/* </Routes> */}
        {/* </Router> */}
    {/* ):( */}
        {/* <Router> */}
            {/* <Routes> */}
            <Route path="/Add_dept" element={<AddDept />} />
            <Route path="/All_students" element={<AllStudents />} />
            <Route path="/Attendance" element={<Attendance />} />
            <Route path="/Admin_Dashboard" element={<AdminDashboard/>}/>

            <Route path="/" element={<PasswordResetRequest />} />
            <Route path="/reset-password" element={<PasswordResetForm />} />
            {/* student */}
            <Route path="/OTP" element={<OtpVerification/>}/>
            <Route path="/StudentDashboard" element={<StudentDashboard/>}/>
          </Routes>

        </Router>
        {/* )} */}
    </div>
  );
}

export default Routing;
