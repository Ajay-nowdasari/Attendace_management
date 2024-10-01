
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
const StudentDashboard = () => {
  const [darkMode, setDarkMode] = useState(false); // State to manage dark mode

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <Modal show={true} scrollable className={`std_Attendance_modal ${darkMode ? 'dark-mode' : 'light-mode'}`} centered>
        <Modal.Header className='std_mdl_hdr'>
          <Modal.Title>
            <h1>Student Attendance</h1>
            <p>
                Welcome to {}
            </p>
          </Modal.Title>
          <button 
            onClick={toggleDarkMode} 
            className="btn btn-outline-secondary ml-3"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </Modal.Header>
        <Modal.Body>
          
            <table className="table table-hover p-0">

              <thead className="thead-dark table-warning">
                <tr>
                  <th>S.no</th>
                  <th>Month</th>
                  <th>No. Of Presents</th>
                  <th>No. Of Absents</th>
                  <th>Total Percentage</th>
                </tr>
              </thead>

              <tbody className='table-secondary'>
                <tr>
                  <td>1</td>
                  <td>January</td>
                  <td>20</td>
                  <td>5</td>
                  <td>80%</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>January</td>
                  <td>22</td>
                  <td>3</td>
                  <td>88%</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>January</td>
                  <td>20</td>
                  <td>5</td>
                  <td>80%</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>January</td>
                  <td>22</td>
                  <td>3</td>
                  <td>88%</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>January</td>
                  <td>20</td>
                  <td>5</td>
                  <td>80%</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>January</td>
                  <td>20</td>
                  <td>5</td>
                  <td>80%</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>January</td>
                  <td>22</td>
                  <td>3</td>
                  <td>88%</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>January</td>
                  <td>20</td>
                  <td>5</td>
                  <td>80%</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>January</td>
                  <td>22</td>
                  <td>3</td>
                  <td>88%</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>January</td>
                  <td>20</td>
                  <td>5</td>
                  <td>80%</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>January</td>
                  <td>20</td>
                  <td>5</td>
                  <td>80%</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>January</td>
                  <td>22</td>
                  <td>3</td>
                  <td>88%</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>January</td>
                  <td>20</td>
                  <td>5</td>
                  <td>80%</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>January</td>
                  <td>22</td>
                  <td>3</td>
                  <td>88%</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>January</td>
                  <td>20</td>
                  <td>5</td>
                  <td>80%</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>January</td>
                  <td>20</td>
                  <td>5</td>
                  <td>80%</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>January</td>
                  <td>22</td>
                  <td>3</td>
                  <td>88%</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>January</td>
                  <td>20</td>
                  <td>5</td>
                  <td>80%</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>January</td>
                  <td>22</td>
                  <td>3</td>
                  <td>88%</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>January</td>
                  <td>20</td>
                  <td>5</td>
                  <td>80%</td>
                </tr>
              </tbody>

            </table>
          
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StudentDashboard;
