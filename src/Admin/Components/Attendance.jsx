import { Row } from "react-bootstrap";
import NavBar from "./admin_nav";
import Footer from "./footer";

const Attendance = ()=> {
    return(
        <div className="for_ftr">
    <div className="cnt">
            <div style={{position: "sticky", top: "0" , zIndex:"1"}}>
                <NavBar/>
            </div>                
            <p>Attendance</p>
    </div>
            <Footer/>       
        </div>
    );
}
export default Attendance