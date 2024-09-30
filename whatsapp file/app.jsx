import React, { useState, useEffect } from "react";
import LoginPage from "./Loginpage";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdminDashboard from "./Admin/Components/Dashboard";
import DoctorDashboard from "./Doctor/Components/Dashboard";
import PatientDashboard from "./Patient/Components/Dashboard";
import Doctors from "./Admin/Components/Doctors";
import Appointments from "./Admin/Components/Appointments";
import Patients from "./Admin/Components/Patients";
import DoctorAppointments from "./Doctor/Components/Appointments";
import DoctorPatients from "./Doctor/Components/Patients";
import PatientAppointments from "./Patient/Components/Appointments";
import PatientDoctors from "./Patient/Components/Doctors";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [userType, setUserType] = useState("Admin");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleUsertype = (type) => {
    setUserType(type);
  };

  const handleLogin = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem("accessToken", token);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("accessToken")
  };

  return (
    <>
      {!isAuthenticated ? (
        <LoginPage onLogin={handleLogin} usertype={handleUsertype} />
      ) : (
        <Router>
          <Routes>
            <Route path="/*" element={<Navigate to="/dashboard" />} />

            {userType === "Admin" && (
              <>
                <Route
                  path="/dashboard"
                  element={<AdminDashboard onLogout={handleLogout} />}
                />
                <Route
                  path="/dashboard/Doctors"
                  element={<Doctors onLogout={handleLogout} />}
                />
                <Route
                  path="/dashboard/Patients"
                  element={<Patients onLogout={handleLogout} />}
                />
                <Route
                  path="/dashboard/Appointments"
                  element={<Appointments onLogout={handleLogout} />}
                />
              </>
            )}

            {userType === "Doctor" && (
              <>
                <Route
                  path="/dashboard"
                  element={<DoctorDashboard onLogout={handleLogout} />}
                />
                <Route
                  path="/dashboard/Appointments"
                  element={<DoctorAppointments onLogout={handleLogout} />}
                />
                <Route
                  path="/dashboard/Patients"
                  element={<DoctorPatients onLogout={handleLogout} />}
                />
              </>
            )}

            {userType === "Patient" && (
              <>
                <Route
                  path="/dashboard"
                  element={<PatientDashboard onLogout={handleLogout} />}
                />
                <Route
                  path="/dashboard/Doctors"
                  element={<PatientDoctors onLogout={handleLogout} />}
                />
                <Route
                  path="/dashboard/Appointments"
                  element={<PatientAppointments onLogout={handleLogout} />}
                />
                \
              </>
            )}
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;