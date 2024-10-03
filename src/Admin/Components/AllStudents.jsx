import {Button ,Modal,Form} from "react-bootstrap";
import NavBar from "./admin_nav";
import Footer from "./footer";
import { useState } from "react";

const AllStudents = ()=> {
    const [show,setShow] = useState(false);
// for modal
    const [Name,setName] =useState("");
    const [Dept,setDept] =useState("");
    const [Section,setSection] =useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password,setConfirm_Password] = useState("");
    const [Year,setYear] =useState("");
// for filter
    const [filYear,setFilYear] = useState("");
    const [filDept,setFilDept] = useState("");
    const [filSec,setFilSec] = useState("");

    
    const handleclose = () =>{
        setShow(false);
    }

    const Registeruser  = () => {
    };

    const handleChange = (event) => {
      setFilYear(event.target.value);
      setFilDept(event.target.value);
      setFilSec(event.target.value);
    };
    return(
        <div className="for_ftr">
            <div className="cnt">
                <div style={{position: "sticky", top: "0" , zIndex:"1"}}>
                    <NavBar/>
                </div>

                <div className="Add_dept_div">
                    <label>
                        Add a Student :
                    </label>
                    <Button 
                    variant="success"
                    onClick={() =>{
                        setShow(true);
                    }}
                    style={{ backgroundColor: "#0002", color: "black" }}
                    >
                        Add
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                            <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z"/>
                        </svg>
                    </Button>
                </div> 

                <div className="all_std_nav">
                    <div>
                      <label for="filYear">Choose a Year:</label>
                      <select
                        id="filYear"
                        name="filYear"
                        value={filYear} 
                        onChange={handleChange} 
                      >
                        <option value="All_dept">All</option>
                        <option value="cse">C.S.E</option>
                        <option value="ece">E.C.E</option>
                        <option value="mech">MECH</option>
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
                        <option value="All_year">All</option>
                        <option value="first">1st Year</option>
                        <option value="second">2nd Year</option>
                        <option value="third">3rd Year</option>
                        <option value="final">Final Year</option>
                      </select>
                    </div>

                    <div>
                    <label for="filSec">Choose an Section:</label>
                      <select
                          id="filSec"
                          name="filSec"
                          value={filSec}
                          onChange={handleChange}
                        >
                          <option value="All_year">All</option>
                          <option value="first">1st Year</option>
                          <option value="second">2nd Year</option>
                          <option value="third">3rd Year</option>
                          <option value="final">Final Year</option>
                      </select>
                    </div>
                </div>

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
                          <tr>
                            <td>1</td>
                            <td>sfgbhovnj jwfi</td>
                            <td>ws gfw vtwcf qe</td>
                            <td>sroifivnk owfiekv n</td>
                            <td>sdvk</td>
                            <td>sfcv</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td></td>
                            <td></td>
                            <td>sdvk</td>
                            <td>sfcv</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>sdvk</td>
                            <td>sfcv</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>sdvk</td>
                            <td>sfcv</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>sdvk</td>
                            <td>sfcv</td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td></td>
                            <td></td>
                            <td>sdvk</td>
                            <td>sfcv</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>6</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>sdvk</td>
                            <td>sfcv</td>
                          </tr>
                          <tr>
                            <td>7</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>sdvk</td>
                            <td>sfcv</td>
                          </tr>
                          <tr>
                            <td>8</td>
                            <td></td>
                            <td></td>
                            <td>sdvk</td>
                            <td>sfcv</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>9</td>
                            <td></td>
                            <td>sdvk</td>
                            <td>sfcv</td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>0</td>
                            <td></td>
                            <td>sdvk</td>
                            <td>sfcv</td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>1</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>sdvk</td>
                            <td>sfcv</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>sdvk</td>
                            <td>sfcv</td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>sdvk</td>
                            <td>sfcv</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>sdvk</td>
                            <td>sfcv</td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>

                    </table>
                  </div>
                </div>
                
            </div>
            <Modal show={show}  onHide={handleclose} centered>
                    <Modal.Header closeButton className="px-4">
                        <Modal.Title>
                            Student Registration
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="px-5">
                    <Form onSubmit={Registeruser}>

                    <Form.Group controlId="formname" className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </Form.Group>
                    
                    <Form.Group controlId="formDept" className="mb-3">
                        <Form.Label>Department</Form.Label>
                        <Form.Control
                            as="select"  // Change to 'select' to create a dropdown
                            value={Dept}
                            onChange={(e) => setDept(e.target.value)}
                            required
                        >
                            <option value="">--Select Department--</option>  {/* Default placeholder */}
                            <option value="IT">IT</option>
                            <option value="HR">HR</option>
                            <option value="Finance">Finance</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Operations">Operations</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formDropdown" className="mb-3">
                        <Form.Label>Select a Year</Form.Label>
                        <Form.Control
                            as="select"    // Change to 'select' to create a dropdown
                            value={Year}
                            onChange={(e) => setYear(e.target.value)} // Update the state on selection
                            required
                        >
                            <option value="">--Select Year--</option>  {/* Default option */}
                            <option value="1st">1st year</option>
                            <option value="2nd">2nd year</option>
                            <option value="3rd">3rd year</option>
                            <option value="4th">Final year</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formSection" className="mb-3">
                    <Form.Label>Section</Form.Label>
                    <Form.Control
                        as="select"  // Change 'type="email"' to 'as="select"' to make it a dropdown
                        value={Section}
                        onChange={(e) => setSection(e.target.value)}
                        required
                    >
                        <option value="">--Select Section--</option> {/* Default option */}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formConfirmPassword" className="mb-3">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter confirmation password"
                        value={confirm_password}
                        onChange={(e) => setConfirm_Password(e.target.value)}
                        required
                      />
                    </Form.Group>
                    
                    <hr className="mx-5"></hr>
                    <Form.Group className="mb-3">
                      <Button
                        type="submit"
                        variant="success"
                        style={{width: "100%", border: "none" }}
                      >
                        Register
                      </Button>
                    </Form.Group>
                    </Form>
                    </Modal.Body>
                    
                    <Modal.Footer className="modal-footer"
                        style={{ justifyContent: "flex-end" }}
                        >
                        <button onClick={handleclose}>
                            Cancel
                        </button>
                    </Modal.Footer>

            </Modal>
            <Footer/>
        </div>
    );
}
export default AllStudents;