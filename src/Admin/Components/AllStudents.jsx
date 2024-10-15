import {Button ,Modal,Form} from "react-bootstrap";
import NavBar from "./admin_nav";
import Footer from "./footer";
import { useState ,useEffect} from "react";
import axios from "axios";
import { fetchStudents,deleteStudent, updateStudent } from "../../api";
import { useNavigate } from "react-router-dom";
import PasswordResetRequest from "./password_reset";

const AllStudents = ()=> {
  const admin_base_url = "http://127.0.0.1:8000/api/";
    
  const [registerErrors, setRegisterErrors] = useState({});
// for filter
    const [filYear,setFilYear] = useState("");
    const [filDept,setFilDept] = useState("");
    const [filSec,setFilSec] = useState("");
    const [showRegister, setShowRegister] = useState(false);
    const [data,setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const handleCloseRegister = () => setShowRegister(false);
    const handleCloseEdit = () => setShowEdit(false);
    const [edit,setEdit]=useState(null);
    const [showEdit,setShowEdit] = useState(false);
    const [showResetRequest, setShowResetRequest] = useState(false);
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      dept: "",
      year: "",
      section: "",
  });

  const validatePassword = (password) => {
      // Regex pattern for password validation
      const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
      return passwordPattern.test(password);
  };
  const handleChangeRegister = (event) => {
      const { name, value } = event.target;
      setFormData({
          ...formData,
          [name]: value,
      });

        // Password validation
      if (name === "password") {
          if (!validatePassword(value)) {
              setRegisterErrors((prev) => ({
                  ...prev,
                  password: "Password must be 8-16 characters long, include at least one letter, one number, and one special character.",
              }));
          } else {
              setRegisterErrors((prev) => ({
                  ...prev,
                  password: "",
              }));
          }
      }

      // Confirm password validation
      if (name === "confirm_password") {
          if (value !== formData.password) {
              setRegisterErrors((prev) => ({
                  ...prev,
                  confirm_password: "Passwords do not match.",
              }));
          } else {
              setRegisterErrors((prev) => ({
                  ...prev,
                  confirm_password: "",
              }));
          }
      }
  };

      const reset_password = () => {
        setShowResetRequest(true); 
    };
    
  const registerUser = async (e) => {
      e.preventDefault();
      setRegisterErrors("");
      handleCloseEdit();

      if (registerErrors.password || registerErrors.confirm_password) {
        return;
    }
      if (edit){
        updateStudent( edit,formData );
      }
      else{
     
      try {
          const response = await axios.post(admin_base_url + "Register_user/", formData);
          console.log("Response data:", response.data);
          setTimeout(() => {
              handleCloseRegister();
              alert("You can login Now as a student");
          }, 500);
      } catch (error) {
          if (error.response && error.response.data) {
              console.log("Registraion:", error.response.data);
              setRegisterErrors(error.response.data); // Set validation errors received from the backend
          } else {
              setRegisterErrors({ general: "Something went wrong. Please try again." });
          }
      }}
  };

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const students = await fetchStudents();
        setData(students);
        setFilteredData(students); // Set filtered data to all students initially
      } catch (error) {
        console.error("Error fetching products:", error);
        // Consider showing an error message to the user
      }
    };
    loadStudents();
  }, []);

  useEffect(() => {
    const filtered = data.filter((entry) => {
        const matchesYear = filYear === "" || entry.year === filYear;
        const matchesDept = filDept === "" || entry.dept === filDept;
        const matchesSec = filSec === "" || entry.section === filSec;
        return matchesYear && matchesDept && matchesSec;
    });

    setFilteredData(filtered);
}, [filYear, filDept, filSec, data]); // Depend on filter states and data


  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      setData(data.filter((product) => product.id !== id));
      setFilteredData(filteredData.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
      // You might want to show a notification or alert to the user
    }
  };

  const handleUpdate = (id, index) => {
    setFormData({
          name: data[index].name,
          email: data[index].email,
          password: data[index].password,
          confirm_password: data[index].confirm_password,
          dept: data[index].dept,
          year: data[index].year,
          section: data[index].section,
      });
    setShowEdit(true);
    setEdit(id)
  };
  
  const handleShowRegister = () =>{
      setShowRegister(true);
      setEdit(null);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        dept: "",
        year: "",
        section: ""
      });
  }

  const handleChange = (event) => {
        const { name, value } = event.target;

        // Set filter states
      if (name === "filYear") setFilYear(value);
      if (name === "filDept") setFilDept(value);
      if (name === "filSec") setFilSec(value);

        // Filter data based on selected values
      const filtered = data.filter((entry) => {
          const matchesYear = filYear ? entry.year === filYear : true;
          const matchesDept = filDept ? entry.dept === filDept : true;
          const matchesSec = filSec ? entry.section === filSec : true;
          return matchesYear && matchesDept && matchesSec;
      });

      setFilteredData(filtered); // Update filtered data state
  };



    return(
        <div className="for_ftr">
            <div className="cnt">
                {/* ṇav bar */}
                <div style={{position: "sticky", top: "0" , zIndex:"1"}}>
                    <NavBar/>
                </div>
                 {/* ADD student button */}
                <div className="Add_dept_div">
                    <PasswordResetRequest show={showResetRequest} onHide={() => setShowResetRequest(false)} />

                    <label>
                        change student password:
                    </label> <Button 
                    style={{ backgroundColor: "#3f4961", color: "#c3c7d3", paddingTop:"3px", paddingBottom:"3px" }}
                    onClick={reset_password}>
                    <svg fill="#c3c7d3" height="20px" width="20px" version="1.1" id="Icon"  
                        viewBox="0 0 24 24" enable-background="new 0 0 24 24" >
                    <path d="M24,19v-2h-2.14c-0.09-0.36-0.24-0.7-0.42-1.02l1.52-1.52l-1.41-1.41l-1.52,1.52c-0.32-0.19-0.66-0.33-1.02-0.42V12h-2v2.14
                        c-0.36,0.09-0.7,0.24-1.02,0.42l-1.52-1.52l-1.41,1.41l1.52,1.52c-0.19,0.32-0.33,0.66-0.42,1.02H12v2h2.14
                        c0.09,0.36,0.24,0.7,0.42,1.02l-1.52,1.52l1.41,1.41l1.52-1.52c0.32,0.19,0.66,0.33,1.02,0.42V24h2v-2.14
                        c0.36-0.09,0.7-0.24,1.02-0.42l1.52,1.52l1.41-1.41l-1.52-1.52c0.19-0.32,0.33-0.66,0.42-1.02H24z M18,20c-1.1,0-2-0.9-2-2
                        s0.9-2,2-2s2,0.9,2,2S19.1,20,18,20z M11,7.41l3.29,3.29l1.41-1.41L12.41,6L13,5.41l2.29,2.29l1.41-1.41L14.41,4L15,3.41l3.29,3.29
                        l1.41-1.41L16.41,2l0.29-0.29l-1.41-1.41L6.89,8.7C6.19,8.26,5.38,8,4.5,8C2.02,8,0,10.02,0,12.5S2.02,17,4.5,17S9,14.98,9,12.5
                        c0-0.88-0.26-1.69-0.7-2.39L11,7.41z M4.5,15C3.12,15,2,13.88,2,12.5S3.12,10,4.5,10S7,11.12,7,12.5S5.88,15,4.5,15z"/>
                    </svg>Change
                    </Button>

                    <label>
                        Add a Student :
                    </label>
                    <Button 
                    variant="success"
                    onClick={handleShowRegister}
                    style={{ backgroundColor: "#3f4961", color: "#c3c7d3", paddingTop:"3px", paddingBottom:"3px" }}
                    >
                        Add
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#c3c7d3">
                            <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z"/>
                        </svg>
                    </Button>
                </div> 

                {/* filters */}
                <div className="all_std_nav">
                    <div>
                      <label for="filYear">Choose a Year:</label>
                      <select
                        id="filYear"
                        name="filYear"
                        value={filYear} 
                        onChange={handleChange} 
                      >
                      <option value="" selected>All</option>
                        <option value="1st">1st Year</option>
                        <option value="2nd">2nd Year</option>
                        <option value="3rd">3rd Year</option>
                        <option value="4th">Final Year</option>
                      </select>
                    </div>

                    <div>
                    <label for="filDept">Choose a Department:</label>
                      <select
                        id="filDept"
                        name="filDept"
                        value={filDept}
                        onChange={handleChange}
                      >
                        
                      <option value="">All</option>
                      <option value="IT">IT</option>
                      <option value="HR">HR</option>
                      <option value="Finance">Finance</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Operations">Operations</option>
                      </select>
                    </div>

                    <div>
                    <label for="filSec">Choose a Section:</label>
                      <select
                          id="filSec"
                          name="filSec"
                          value={filSec}
                          onChange={handleChange}
                        >
                          <option value="" selected>All</option>
                          <option value="A">A Section</option>
                          <option value="B">B Section</option>
                          <option value="C">C Section</option>
                          <option value="D">D Section</option>
                      </select>
                    </div>
                </div>

                {/* table */}
                <div className="mx-3 p-2 border rounded-sm">
                  <div className="table-responsive scrollable-content" style={{ maxHeight: '410px', overflowY: 'auto' }}>
                    <table className="table table-hover table-success table-striped table-bordered">

                        <thead className="thead-dark table-warning" style={{zIndex:"0"}}>
                          <tr>
                            <th>S.no</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Year</th>
                            <th>Section</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                         <tbody className='table-secondary '>
                        {filteredData.map((entry, index) => (
                          <tr key={entry.id}> 
                            <td>{index + 1}</td>
                            <td>{entry.name}</td>
                            <td>{entry.dept}</td>
                            <td>{entry.year}</td>
                            <td>{entry.section}</td>
                            <td style={{justifyContent:"space-evenly",alignItems:"center",display:"flex"}}>
                              <Button
                                variant="secondary"
                                onClick={() => handleUpdate(entry.id,index)}
                              >
                                Edit
                              </Button>                           
                              <Button
                                variant="danger"
                                onClick={() => handleDelete(entry.id)}
                              >
                                Delete
                              </Button>                            
                            </td>
                          </tr>
                        ))} 
                        </tbody>

                    </table>
                  </div>
                </div>
                
            </div>
 
                    {/* register modal */}
            <Modal show={showRegister} onHide={handleCloseRegister} centered>
                    <Modal.Header closeButton className="px-4">
                        <Modal.Title>Student Registration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="px-5">
                        {registerErrors.general && (
                            <div className="alert alert-danger">{registerErrors.general}</div>
                        )}
                        <Form onSubmit={registerUser}>
                            <Form.Group controlId="formname" className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChangeRegister}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formDept" className="mb-3">
                                <Form.Label>Department</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="dept"
                                    value={formData.dept}
                                    onChange={handleChangeRegister}
                                    required
                                >
                                    <option value="">--Select Department--</option>
                                    <option value="IT">IT</option>
                                    <option value="HR">HR</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Operations">Operations</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formYear" className="mb-3">
                                <Form.Label>Select a Year</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChangeRegister}
                                    required
                                >
                                    <option value="">--Select Year--</option>
                                    <option value="1st">1st year</option>
                                    <option value="2nd">2nd year</option>
                                    <option value="3rd">3rd year</option>
                                    <option value="4th">Final year</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formSection" className="mb-3">
                                <Form.Label>Section</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="section"
                                    value={formData.section}
                                    onChange={handleChangeRegister}
                                    required
                                >
                                    <option value="">--Select Section--</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChangeRegister}
                                    required
                                />
                                {/* Display email error */}
                                {registerErrors.email && <span className="text-danger">{registerErrors.email}</span>}
                            </Form.Group>

                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChangeRegister}
                                    required
                                />
                                {/* Display password error */}
                                {registerErrors.password && <span className="text-danger">{registerErrors.password}</span>}
                            </Form.Group>

                            <Form.Group controlId="formConfirmPassword" className="mb-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm password"
                                    name="confirm_password"
                                    value={formData.confirm_password}
                                    onChange={handleChangeRegister}
                                    required
                                />
                                {/* Display confirm password error */}
                                {registerErrors.confirm_password && <span className="text-danger">{registerErrors.confirm_password}</span>}
                            </Form.Group>

                            <hr className="mx-5" />
                            <Form.Group className="mb-3">
                                <Button type="submit" variant="success" style={{ width: "100%", border: "none" }}>
                                  {edit ? "Edit" : "Register"}
                                </Button>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="modal-footer" style={{ justifyContent: "space-between" }}>
                        <button onClick={handleCloseRegister}>Cancel</button>
                    </Modal.Footer>


            </Modal>

                    {/* edit modal */}
            <Modal show={showEdit} onHide={handleCloseEdit} centered>
                    <Modal.Header closeButton className="px-4">
                        <Modal.Title>Student Registration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="px-5">
                        {registerErrors.general && (
                            <div className="alert alert-danger">{registerErrors.general}</div>
                        )}
                        <Form onSubmit={registerUser}>
                            <Form.Group controlId="formname" className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChangeRegister}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formDept" className="mb-3">
                                <Form.Label>Department</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="dept"
                                    value={formData.dept}
                                    onChange={handleChangeRegister}
                                    required
                                >
                                    <option value="">--Select Department--</option>
                                    <option value="IT">IT</option>
                                    <option value="HR">HR</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Operations">Operations</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formYear" className="mb-3">
                                <Form.Label>Select a Year</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChangeRegister}
                                    required
                                >
                                    <option value="">--Select Year--</option>
                                    <option value="1st">1st year</option>
                                    <option value="2nd">2nd year</option>
                                    <option value="3rd">3rd year</option>
                                    <option value="4th">Final year</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formSection" className="mb-3">
                                <Form.Label>Section</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="section"
                                    value={formData.section}
                                    onChange={handleChangeRegister}
                                    required
                                >
                                    <option value="">--Select Section--</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChangeRegister}
                                    required
                                />
                                {/* Display email error */}
                                {registerErrors.email && <span className="text-danger">{registerErrors.email}</span>}
                            </Form.Group>

                            <hr className="mx-5" />
                            <Form.Group className="mb-3">
                                <Button type="submit" variant="success" style={{ width: "100%", border: "none" }}>
                                  Edit
                                </Button>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="modal-footer d-flex">
                        <Button variant="secondary" align="right" onClick={handleCloseEdit}>Close</Button>
                    </Modal.Footer>
            </Modal>
            <Footer/>
        </div>
    );
}
export default AllStudents;