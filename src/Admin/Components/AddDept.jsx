import { Row ,Col,Form,Modal,Button} from "react-bootstrap";
import React, { useState } from 'react';
import NavBar from "./admin_nav";
import Footer from "./footer";


const AddDept = ()=> {
    const [darkMode, setDarkMode] = useState(false); // State to manage dark mode
    const [show , setShow ] = useState(false)
    const [deptId , setDeptId] = useState("");
    const [deptName, setDeptName] = useState("");

    // Toggle dark mode
    const toggleDarkMode = () => {
      setDarkMode(!darkMode);
    };

    const handleclose = () =>{
      setShow(false);
    }


    const Add_Dept = () => {

    }
    return(
        <div className="for_ftr">
          <div className="cnt">
              <div style={{position: "sticky", top: "0" , zIndex:"1"}}>
                  <NavBar/>
              </div>
              
              <div className="Add_dept_div">
                  <label>
                    Add a Department :
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
                      <path d="M500-482q29-32 44.5-73t15.5-85q0-44-15.5-85T500-798q60 8 100 53t40 105q0 60-40 105t-100 53Zm220 322v-120q0-36-16-68.5T662-406q51 18 94.5 46.5T800-280v120h-80Zm80-280v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Zm-480-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM0-160v-112q0-34 17.5-62.5T64-378q62-31 126-46.5T320-440q66 0 130 15.5T576-378q29 15 46.5 43.5T640-272v112H0Zm320-400q33 0 56.5-23.5T400-640q0-33-23.5-56.5T320-720q-33 0-56.5 23.5T240-640q0 33 23.5 56.5T320-560ZM80-240h480v-32q0-11-5.5-20T540-306q-54-27-109-40.5T320-360q-56 0-111 13.5T100-306q-9 5-14.5 14T80-272v32Zm240-400Zm0 400Z"/>
                    </svg>
                  </Button>
              </div> 

              <div className="mx-3 p-2 border rounded-sm">
                <div className="table-responsive scrollable-content" style={{ maxHeight: '410px', overflowY: 'auto' }}>
                  <table className="table table-hover table-bordered Add_dept_tbl ">

                      <thead className="thead-dark table-warning" style={{zIndex:"0"}}>
                        <tr>
                          <th>S.no</th>
                          <th>Department ID</th>
                          <th>Department Name</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody className='table-secondary '>
                        <tr>
                          <td>1</td>
                          <td>sfgbhovnj jwfi</td>
                          <td>ws gfw vtwcf qe</td>
                          <td>sroifivnk owfiekv n</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>6</td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>7</td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>8</td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>9</td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>0</td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>

                  </table>
                </div>
              </div>

              <Modal show={show} onHide={handleclose} centered>
                        <Modal.Header closeButton className="px-4">
                            <Modal.Title>
                                Add Departments
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body className="px-5">
                    <Form onSubmit={Add_Dept}>
                    <Form.Group controlId="formDeptId" className="mb-3">
                      <Form.Label>Department ID</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter ID"
                        value={deptId}
                        onChange={(e) => setDeptId(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formName" className="mb-3">
                      <Form.Label>Department Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter New Department Name"
                        value={deptName}
                        onChange={(e) => setDeptName(e.target.value)}
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
                        Add
                      </Button>
                    </Form.Group>
                  </Form>
                        </Modal.Body>

                        <Modal.Footer className="modal-footer"
                            style={{ justifyContent: "space-between" }}
                            >
                            <p>Only authenticated Admins are allowed</p>     
                            <button onClick={handleclose}>
                                Close
                            </button>
                        </Modal.Footer>
              </Modal>
          </div>
            <Footer/>
        </div>
    );
}
export default AddDept