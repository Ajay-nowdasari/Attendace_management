import { Row } from "react-bootstrap";
import NavBar from "./admin_nav";
import Footer from "./footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { fetchStudents } from "../../api";
import checkboxSound from "../../assets/sounds/checkbox.mp3"
import clickSound from "../../assets/sounds/mouse-click-153941.mp3";
import DropdownSound from "../../assets/sounds/dropdown.mp3";
import typingSound from "../../assets/sounds/typing.mp3";
import { Spinner } from "react-bootstrap";
const Attendance = () => {

    const [workingDays, setWorkingDays] = useState(25);
    const [month, setMonth] = useState('');
    const [yearFilter, setYearFilter] = useState('');
    const [departments, setDepartments] = useState([]);
    const [selectedYear, setselectedYear] = useState("");
    const [selectedDepartment, setselectedDepartment] = useState("");
    const [selectedSection, setselectedSection] = useState("");
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saveLoading, setSaveLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const inputRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleLegend = () => {
        setIsOpen(!isOpen);
    };
    const handleIconClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    const playDropDown = () => {
        const audio = new Audio(DropdownSound);
        audio.play();
    }

    const playTyping = () => {
        const audio = new Audio(typingSound);
        audio.play();
    }
    useEffect(() => {
        setTimeout(() => setLoading(false), 1000); // Change duration as needed
    }, []);
    const playClick = () => {
        const audio = new Audio(clickSound);
        audio.play();
    };

    const playcheckbox = () => {
        const audio = new Audio(checkboxSound);
        audio.play();
    }

    useEffect(() => {
        loadStudents();
        fetchDepartments();
    }, []);
    const fetchDepartments = () => {

        axios.get("http://127.0.0.1:8000/api/departments/")
            .then(response => {
                setDepartments(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the departments!", error);
            });
    };

    const loadStudents = async () => {
        try {
            const students = await fetchStudents();
            setStudents(students);
            setFilteredStudents(students); // Initialize filteredStudents with all students
            console.log("students data", students);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };
    useEffect(() => {
        const filtered = students.filter(student => {
            const matchesYear = selectedYear ? student.year === selectedYear : true;
            const matchesDepartment = selectedDepartment ? student.dept_name === selectedDepartment : true;
            const matchesSection = selectedSection ? student.section === selectedSection : true;
            return matchesYear && matchesDepartment && matchesSection;
        });
        setFilteredStudents(filtered);
    }, [selectedDepartment, selectedYear, selectedSection, students]);

    useEffect(() => {
        if (month && yearFilter) {
            loadStudents(); // Re-fetch students if month or year is selected
        }
    }, [month, yearFilter]);

    const calculatePercentage = (presentDays, totalDays) => {
        return totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(2) : 0;
    };

    const handleCheckboxChange = (index, day, event) => {
        playcheckbox();
        const updatedStudents = [...filteredStudents];

        if (!updatedStudents[index].attendance) {
            updatedStudents[index].attendance = {};
        }

        const presentDays = Object.values(updatedStudents[index].attendance).filter((isPresent) => isPresent).length;

        // If the checkbox is being checked (i.e., student is marked present for the day)
        // and the present days have already reached the working days limit, show the alert
        if (!updatedStudents[index].attendance[day] && presentDays >= workingDays) {
            toast.warn('Present days cannot exceed working days!');
            event.preventDefault();  // Prevent checkbox from toggling its state
            return;  // Exit the function to prevent further actions
        }

        // If no limit is reached, toggle the checkbox normally
        updatedStudents[index].attendance[day] = !updatedStudents[index].attendance[day];
        setFilteredStudents(updatedStudents);
    };

    const handleSubmitAttendance = async () => {
        playClick();
        setSaveLoading(false);
        let success = true; // Track success status
        for (const student of filteredStudents) {
            const presentDays = Object.values(student.attendance || {}).filter((isPresent) => isPresent).length;
            const absentDays = workingDays - presentDays;

            const attendanceRecord = {
                student: student.id,  // Use student ID
                working_days: workingDays,
                present_days: presentDays,
                absent_days: absentDays,
                month: month,
                year: yearFilter,
            };

            // Log the attendance data for debugging
            console.log("Sending Attendance Data:", attendanceRecord);

            try {
                // Save attendance data for the student
                const response = await axios.post('http://127.0.0.1:8000/api/updateAttendance/', attendanceRecord, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status !== 201 && response.status !== 200) {
                    success = false; // Mark as failed if the response is not successful
                }
            } catch (error) {
                console.error('Error saving attendance:', error.response.data);
                success = false; // Mark as failed on error
            } finally {
                setSaveLoading(true);
            }
        }
        // Show alert message once after processing all students
        if (success) {
            toast.success('Attendance saved/updated successfully for all students!');
        } else {
            toast.error('Failed to save attendance for some students. Please check the console for details.');
        }
    };


    // Function to get the number of days in a month
    const getDaysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate();
    };

    const daysInMonth = month && yearFilter ? getDaysInMonth(month, yearFilter) : 0;

    const CustomCheckbox = ({ checked, onChange }) => {
        return (
            <label className="custom-checkbox">
                <input type="checkbox" checked={checked} onChange={onChange} />
                <span className="checkmark"></span>
            </label>
        );
    };

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchQuery(value);
        // Filter your data here
        const filtered = students.filter(entry =>
            entry.name.toLowerCase().includes(value) ||
            entry.dept_name.toLowerCase().includes(value) ||
            entry.year.toString().includes(value) ||
            entry.section.toLowerCase().includes(value)
        );
        setFilteredStudents(filtered);
    };

    return (
        <div className="for_ftr">
            <ToastContainer />
            <div className="cnt">

                <>
                    <div style={{ position: "sticky", top: "0", zIndex: "1" }}>
                        <NavBar />
                    </div>
                    {/* Filters */}
                    <div>
                        <fieldset>
                            <div className="all_std_nav border" >
                                <legend class="custom-legend">Filters</legend>
                                <div>
                                    <Form.Group controlId="formDepartmentSelect" style={{ width: "150px", flexDirection: "column", alignItems: "start" }}>
                                        <Form.Label className="ps-2">Choose a Department:</Form.Label>
                                        <Form.Select
                                            style={{ backgroundColor: "#c3c7d3", color: "#3f4961" }}
                                            className="custom-input"
                                            id="selectedDepartment"
                                            name="selectedDepartment"
                                            value={selectedDepartment}
                                            onChange={(e) => {
                                                setselectedDepartment(e.target.value);
                                                playDropDown();
                                                setLoading(true)
                                                setTimeout(() => setLoading(false), 1000);
                                            }}
                                        >
                                            <option value="">All</option>
                                            {departments.map((department) => (
                                                <option key={department.id} value={department.dept_name}>
                                                    {department.dept_name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <div className="py-0">
                                    <Form.Group controlId="formSectionSelect" className="" style={{ width: "150px", flexDirection: "column", alignItems: "start" }}>
                                        <Form.Label>Choose a Section:</Form.Label>
                                        <Form.Select
                                            style={{ backgroundColor: "#c3c7d3", color: "#3f4961" }}
                                            className="custom-input"
                                            id="selectedSection"
                                            name="selectedSection"
                                            value={selectedSection}
                                            onChange={(e) => {
                                                setselectedSection(e.target.value);
                                                playDropDown();
                                                setLoading(true);
                                                setTimeout(() => setLoading(false), 1000);
                                            }}
                                        >
                                            <option value="">All</option>
                                            <option value="A">A Section</option>
                                            <option value="B">B Section</option>
                                            <option value="C">C Section</option>
                                            <option value="D">D Section</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <div>
                                    <Form.Group controlId="formYearSelect" style={{ width: "150px", flexDirection: "column", alignItems: "start" }}>
                                        <Form.Label className="ps-2">Choose Academic Year:</Form.Label>
                                        <Form.Select
                                            style={{ backgroundColor: "#c3c7d3", color: "#3f4961" }}
                                            className="custom-input"
                                            id="selectedYear"
                                            name="selectedYear"
                                            value={selectedYear}
                                            onChange={(e) => {
                                                setselectedYear(e.target.value);
                                                playDropDown();
                                                setLoading(true);
                                                setTimeout(() => setLoading(false), 1000);
                                            }}
                                        >
                                            <option value="">All</option>
                                            <option value="1st">1st Year</option>
                                            <option value="2nd">2nd Year</option>
                                            <option value="3rd">3rd Year</option>
                                            <option value="4th">Final Year</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                            </div>
                        </fieldset>
                        {/* year filter */}
                        <fieldset>
                            <legend className="custom-legend" onClick={toggleLegend}>
                                {isOpen ? 'Hide Steps' : 'Show Steps'}
                            </legend>
                            <div className={`steps-content ${isOpen ? 'open' : 'closed'}`}>
                                <dl>
                                    <dt>Step 1:</dt>
                                    <dd>Specify the year.</dd>

                                    <dt>Step 2:</dt>
                                    <dd>Select the desired month.</dd>

                                    <dt>Step 3:</dt>
                                    <dd>Adjust the number of working days (default is 25 days).</dd>
                                </dl>
                            </div>
                            <div className="all_std_nav border">
                                <div>
                                    <Form.Group controlId="formYear" style={{ width: "150px", flexDirection: "column", alignItems: "start" }}>
                                        <Form.Label className="ps-2">Enter Year</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Year"
                                            style={{ backgroundColor: "#c3c7d3", color: "#3f4961" }}
                                            value={yearFilter}
                                            className="custom-input"
                                            onChange={(e) => {
                                                playTyping();
                                                setYearFilter(e.target.value);
                                                setFilteredStudents([]);
                                                setLoading(true)
                                                setTimeout(() => setLoading(false), 1000);
                                            }}
                                            required
                                        />
                                    </Form.Group>
                                </div>
                                <div className="py-0">
                                    <Form.Group controlId="formMonthSelect" style={{ width: "150px", flexDirection: "column", alignItems: "start" }}>
                                        <Form.Label className="ps-2">Choose a Month:</Form.Label>
                                        <Form.Select
                                            value={month}
                                            style={{ backgroundColor: "#c3c7d3", color: "#3f4961" }}
                                            className="custom-input"
                                            onChange={(e) => {
                                                playDropDown();
                                                setMonth(e.target.value);
                                                setFilteredStudents([]);
                                                setLoading(true)
                                                setTimeout(() => setLoading(false), 1000);
                                            }}
                                        >
                                            <option value="">None</option>
                                            {Array.from({ length: 12 }, (_, i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    {new Date(0, i).toLocaleString('default', { month: 'long' })}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <div>
                                    <Form.Group controlId="formname" style={{ width: "150px", flexDirection: "column", alignItems: "start" }}>
                                        <Form.Label className="ps-2">Enter no.of working days</Form.Label>
                                        <Form.Control
                                            style={{ backgroundColor: "#c3c7d3", color: "#3f4961" }}
                                            className="custom-input"
                                            type="number"
                                            placeholder="Working days"
                                            value={workingDays}
                                            onChange={(e) => {
                                                playTyping();
                                                setLoading(true)
                                                setTimeout(() => setLoading(false), 1000);
                                                setWorkingDays(e.target.value)
                                            }}
                                            required
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                        </fieldset>
                    </div>

                    {/* Attendance Table */}
                    <div className="attendance-tbl m-3  p-2 border rounded-sm">
                        <div className="justify-content-end align-item-right d-flex me-4 mb-2">

                            <button onClick={handleSubmitAttendance} className="successbtn mt-3" style={{ height: "50px" }}  >
                                {!saveLoading ? (
                                    <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                                ) : (
                                    "Save Attendance"
                                )}
                            </button>
                        </div>
                        <div className="table-responsive scrollable-content" style={{ maxHeight: '410px' }}>
                            <div class="search-container">
                                <input
                                    type="text"
                                    placeholder="Search Students..."
                                    value={searchQuery}
                                    ref={inputRef}
                                    onChange={handleSearch}
                                    className="search-input-slide" />
                                <svg onClick={handleIconClick} style={{ cursor: "pointer" }} width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#c3c7d3" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#7b42f5" stroke-width="2" />
                                    <path d="M14 14L16 16" stroke="#3f4961" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M15 11.5C15 13.433 13.433 15 11.5 15C9.567 15 8 13.433 8 11.5C8 9.567 9.567 8 11.5 8C13.433 8 15 9.567 15 11.5Z" stroke="#3f4961" stroke-width="2" />
                                </svg>
                            </div>
                            <table className="table table-hover table-dark table-striped table-bordered">
                                <thead className="table-warning" style={{ zIndex: "0" }}>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Student ID</th>
                                        <th>Student Name</th>
                                        <th>Department</th> {/* Added Department */}
                                        <th>Year</th> {/* Added Year */}
                                        <th>Section</th> {/* Added Section */}
                                        {Array.from({ length: daysInMonth }, (_, i) => (
                                            <th key={i + 1}>{i + 1}</th>
                                        ))}
                                        <th>Present Days</th>
                                        <th>Absent Days</th>
                                        <th>Percentage</th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <div class="table-spinner" role="status">
                                        <div class="dot"></div>
                                        <div class="dot"></div>
                                        <div class="dot"></div>
                                        <div class="dot"></div>
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    <tbody className='table-secondary'>
                                        {filteredStudents.length === 0 ? (
                                            <tr>
                                                <td colSpan={9} className="text-center">
                                                    No Students found
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredStudents.map((student, index) => {
                                                const presentDays = Object.values(student.attendance || {}).filter((isPresent) => isPresent).length;
                                                const absentDays = workingDays - presentDays;
                                                const attendancePercentage = calculatePercentage(presentDays, workingDays);

                                                return (
                                                    <tr key={student.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{student.id}</td>
                                                        <td>{student.name}</td>
                                                        <td>{student.dept_name}</td>
                                                        <td>{student.year}</td>
                                                        <td>{student.section}</td>
                                                        {Array.from({ length: daysInMonth }, (_, dayIndex) => (
                                                            <td key={dayIndex + 1}>
                                                                <CustomCheckbox
                                                                    checked={student.attendance && student.attendance[dayIndex + 1]}
                                                                    onChange={(event) => handleCheckboxChange(index, dayIndex + 1, event)}  // Pass the event here
                                                                />
                                                            </td>
                                                        ))}
                                                        <td>{presentDays}</td>
                                                        <td>{absentDays}</td>
                                                        <td>{attendancePercentage}%</td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                )}

                            </table>
                        </div>
                    </div>
                    <Footer />
                </>
            </div>
        </div>
    );
};
export default Attendance;