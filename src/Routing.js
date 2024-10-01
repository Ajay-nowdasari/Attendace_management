import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from './Admin/Components/admin_nav';
import AddDept from "./Admin/Components/AddDept";
import AllStudents from "./Admin/Components/AllStudents";
import Attendance from "./Admin/Components/Attendance";
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentLogin from './User/Components/student_login';
import App from './App';
import OtpVerification from './User/Components/stdOtp_verification';
import StudentDashboard from './User/Components/StudentDashboard';
import { useState } from 'react';

function Routing() {
        const [isAuthenticated,setIsAuthenticated] = useState(false);
  return (
    <div>

    {/* {!isAuthenticated ? ( */}
        <Router>
          <Routes>
            <Route path='/*' element={<Navigate to="/student_login"/>}/>
            <Route path='/student_login' element={<StudentLogin/>}/>
          {/* </Routes> */}
        {/* </Router> */}
    {/* ):( */}
        {/* <Router> */}
            {/* <Routes> */}
            <Route path="/Add_dept" element={<AddDept />} />
            <Route path="/All_students" element={<AllStudents />} />
            <Route path="/Attendance" element={<Attendance />} />
            
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

