import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './Admin/Components/admin_nav';
import AddDept from "./Admin/Components/AddDept";
import AllStudents from "./Admin/Components/AllStudents";
import Attendance from "./Admin/Components/Attendance";
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentLogin from './User/Components/student_login';
import App from './App';

function Routing() {
  return (
    <div>
      <StudentLogin/>
        {/* <NavBar/> */}
        {/* <App/> */}
        {/* <Routes>
          <Route path='/' element={<StudentLogin/>}/>
          <Route path="/add-dept" element={<AddDept />} />
          <Route path="/all-students" element={<AllStudents />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes> */}
    </div>
  );
}

export default Routing;

