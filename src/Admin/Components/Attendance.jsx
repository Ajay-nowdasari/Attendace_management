import { Row } from "react-bootstrap";
import NavBar from "./admin_nav";
import Footer from "./footer";
import { useState } from "react";

const Attendance = ()=> {
    // for filter 
    const [filYear,setFilYear] = useState("");
    const [filDept,setFilDept] = useState("");
    const [filSec,setFilSec] = useState("");
    const [filMon, setFilMon] = useState("");

    const handleChange = (e) => {
        setFilYear(e.target.value);
        setFilDept(e.target.value);
        setFilSec(e.target.value);
        setFilMon(e.target.value);
      };
    return(
        <div className="for_ftr">
                <div className="cnt">
                    <div style={{position: "sticky", top: "0" , zIndex:"1"}}>
                        <NavBar/>
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
                            <option value="All_dept" selected>All</option>
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
                            <option value="All_year" selected>All</option>
                            <option value="first">1st Year</option>
                            <option value="second">2nd Year</option>
                            <option value="third">3rd Year</option>
                            <option value="final">Final Year</option>
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
                            <option value="All_year" selected>All</option>
                            <option value="A">A Section</option>
                            <option value="B">B Section</option>
                            <option value="C">C Section</option>
                            <option value="D">D Section</option>
                        </select>
                        </div>

                        <div>
                        <label for="filMon">Choose a Month:</label>
                        <select
                            id="filMon"
                            name="filMon"
                            value={filMon}
                            onChange={handleChange}
                            >
                                <option value="All_Months" selected>All</option>
                                <option value="jan">January</option>
                                <option value="feb">February</option>
                                <option value="mar">March</option>
                                <option value="apr">April</option>
                                <option value="may">May</option>
                                <option value="jun">June</option>
                                <option value="jul">July</option>
                                <option value="aug">August</option>
                                <option value="sep">September</option>
                                <option value="oct">October</option>
                                <option value="nov">November</option>
                                <option value="dec">December</option>
                        </select>
                        </div>
                    </div>

                    <div className="mx-3 p-2 border rounded-sm">
                    <div className="table-responsive scrollable-content" style={{ maxHeight: '410px'}}>
                        <table className="table table-hover table-success table-striped table-bordered">

                            <thead className="thead-dark table-warning" style={{zIndex:"0"}}>
                            <tr>
                                <th>S.no</th>
                                <th>Name</th>
                                <th>Day 1</th>
                                <th>Day 2</th>
                                <th>Day 3</th>
                                <th>Day 4</th>
                                <th>Day 5</th>
                                <th>Day 6</th>
                                <th>Day 7</th>
                                <th>Day 8</th>
                                <th>Day 9</th>
                                <th>Day 10</th>
                                <th>Day 11</th>
                                <th>Day 12</th>
                                <th>Day 13</th>
                                <th>Day 14</th>
                                <th>Day 15</th>
                                <th>Day 16</th>
                                <th>Day 17</th>
                                <th>Day 18</th>
                                <th>Day 19</th>
                                <th>Day 20</th>
                                <th>Day 21</th>
                                <th>Day 22</th>
                                <th>Day 23</th>
                                <th>Day 24</th>
                                <th>Day 25</th>
                                <th>Day 26</th>
                                <th>Day 27</th>
                                <th>Day 28</th>
                                <th>Day 29</th>
                                <th>Day 30</th>
                                <th>Day 31</th>
                                <th>Working days</th>
                                <th>Total</th>
                            </tr>
                            </thead>

                            <tbody className='table-secondary '>
                                <tr>
                                    <td>num</td>
                                    <td>name</td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td>27</td>
                                    <td>100</td>
                                </tr>
                                <tr>
                                    <td>num</td>
                                    <td>name</td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td>27</td>
                                    <td>100</td>
                                </tr>
                                <tr>
                                    <td>num</td>
                                    <td>name</td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td>27</td>
                                    <td>100</td>
                                </tr>
                                <tr>
                                    <td>num</td>
                                    <td>name</td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td><input type="checkbox" /></td>
                                    <td>27</td>
                                    <td>100</td>
                                </tr>
                                
                            </tbody>


                        </table>
                    </div>
                    </div>
                </div>
            <Footer/>       
        </div>
    );
}
export default Attendance