import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddDept from "./Admin/Components/AddDept";
import AllStudents from "./Admin/Components/AllStudents";
import Attendance from "./Admin/Components/Attendance";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './User/Components/login';
import AdminDashboard from './Admin/Components/adminDashboard';
import OtpVerification from './User/Components/stdOtp_verification';
import StudentDashboard from './User/Components/StudentDashboard';
import PasswordResetForm from './Admin/Components/new_password';
import PasswordResetRequest from './Admin/Components/password_reset';
import PrivateRoute from './PrivateRouting';
import About from './User/Components/About';
function Routing() {

  return (
    <>
      <Routes>
        {/* Unauthenticated Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/OTP" element={<OtpVerification />} />

        {/* Authenticated Routes */}
        {/* Admin Route */}
        <Route path="/Admin_dashboard" element={<PrivateRoute element={<AdminDashboard />} />} />
        <Route path="/Add_dept" element={<PrivateRoute element={< AddDept />} />} />
        <Route path="/All_students" element={<PrivateRoute element={<AllStudents />} />} />
        <Route path="/Attendance" element={<PrivateRoute element={<Attendance />} />} />
        <Route path="/reset-password" element={<PrivateRoute element={<PasswordResetForm />} />} />
        <Route path="/password-reset-request" element={<PrivateRoute element={<PasswordResetRequest />} />} />

        {/* Student_dashboard */}
        <Route path="/Student_dashboard" element={<PrivateRoute element={<StudentDashboard />} />} />
        <Route path="/Student_about" element={<PrivateRoute element={<About />} />} />
      </Routes>
    </>
  );
}

export default Routing;
