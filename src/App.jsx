// import logo from './logo.svg';
// import './App.css';
// import React, { useState, useEffect } from "react";
// import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";  
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Routing from './Routing';

// import NavBar from './Admin/Components/admin_nav';
// import AddDept from './Admin/Components/AddDept';
// import StudentLogin from './User/Components/login';
// import AllStudents from './Admin/Components/AllStudents';
// import Attendance from './Admin/Components/Attendance';


// function App() {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
  
//     const [userType, setUserType] = useState("Admin");
  
//     // useEffect(() => {
//     //   const token = localStorage.getItem("accessToken");
//     //   if (token) {
//     //     setIsAuthenticated(true);
//     //   }
//     // }, []);
  
//     const handleUsertype = (type) => {
//       setUserType(type);
//     };
  
//     const handleLogin = (token) => {
//       setIsAuthenticated(true);
//     //   localStorage.setItem("accessToken", token);
//     };
  
//     const handleLogout = () => {
//       setIsAuthenticated(false);
//     //   localStorage.removeItem("accessToken")
//     };
  
//     return (
//       <>
//         {!isAuthenticated ? (
//           <StudentLogin onLogin={handleLogin} usertype={handleUsertype} />
//         ) : (
//         <Router>
//             <Routes>
//               <Route path="/*" element={<Navigate to="/dashboard" />} />

//               {userType === "Admin" && (
//                 <>
//                   <Route
//                     path="/adminDashboard"
//                     element={<AddDept onLogout={handleLogout} />}
//                   />
//                   <Route
//                     path="/adminDashboard/AddDept"
//                     element={<AddDept onLogout={handleLogout} />}
//                   />
//                   <Route
//                     path="/adminDashboard/Doctors"
//                     element={<AllStudents onLogout={handleLogout} />}
//                   />
//                   <Route
//                     path="/adminDashboard/Patients"
//                     element={<Attendance onLogout={handleLogout} />}
//                   />
//                 </>
//               )}
  
//               {/* {userType === "Student" && (
//                 <>
//                   <Route
//                     path="/StudentDashboard"
//                     element={<DoctorDashboard onLogout={handleLogout} />}
//                   />
//                   <Route
//                     path="/dashboard/Appointments"
//                     element={<DoctorAppointments onLogout={handleLogout} />}
//                   />
//                   <Route
//                     path="/dashboard/Patients"
//                     element={<DoctorPatients onLogout={handleLogout} />}
//                   />
//                 </>
//               )} */}
//             </Routes>
//         </Router>
//     )}
//     </>
//     )};
// export default App;
