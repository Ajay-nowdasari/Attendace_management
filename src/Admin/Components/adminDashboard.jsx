import { Row ,Card} from "react-bootstrap";
import NavBar from "./admin_nav";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";
import img1 from "C:/Users/Harit/Desktop/project/frontend/src/assets/images/img-1_carrousel.png";
import img2 from "C:/Users/Harit/Desktop/project/frontend/src/assets/images/img-2_carrousel.jpg";
import img3 from "C:/Users/Harit/Desktop/project/frontend/src/assets/images/img-3_carrousel.jpg"
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const AdminDashboard = ()=> {
    const navigate = useNavigate();
     
    const gotoAdd_dept = () => {
        navigate('/Add_dept')
    }
    const gotoAllstudents = () => {
        navigate('/All_students')
    }
    const gotoAttendance = () => {
        navigate('/Attendance')
    }
    const CarouselContainer = styled.div`
        max-width: 100%;
        margin: 20px auto; /* Centered with margin */
        `;

        const CarouselImage = styled.img`
        height: 400px; /* Carousel image height */
        object-fit: cover; /* Maintain aspect ratio */
        transition: transform 0.5s ease; /* Smooth zoom transition */

        &:hover {
            transform: scale(1.05); /* Zoom effect on hover */
        }
        `;

        const CustomCaption = styled(Carousel.Caption)`
        background-color: rgba(0, 0, 0, 0.6); /* Darker translucent background for captions */
        padding: 15px;
        border-radius: 5px; /* Rounded corners */
        transition: background-color 0.3s ease; /* Smooth background transition */

        &:hover {
            background-color: rgba(0, 0, 0, 0.8); /* Darker on hover */
        }
        `;
    return(
    <div className="for_ftr">
        <div className="cnt">

            <div style={{position: "sticky", top: "0" , zIndex:"1"}}>
                <NavBar/>
            </div>
            
            <div className="admin_body">
                <div className="container mt-4">
                    <div className="card">
                        <div className="content py-4" onClick={gotoAllstudents}>
                            <div className="title">
                                <svg height="80px" width="80px" version="1.1" id="_x32_"
                                    viewBox="0 0 512 512" >
                                <g>
                                    <path class="st0" d="M366.042,378.266c-26.458-9.72-49.309-18.113-51.793-42.026c-1.149-11.024-0.214-23.982,2.702-37.507
                                        c9.144-9.798,16.72-23.936,24.484-45.691c15.458-5.955,25.31-19.192,30.109-40.442c2.461-10.885-1.058-22.073-9.655-30.807
                                        c0.773-13.206,0.095-13.928-0.402-14.456l-0.542-0.536H151.497v14.914c-9.897,9.115-13.61,19.503-11.038,30.885
                                        c4.794,21.242,14.648,34.48,30.12,40.442c7.762,21.754,15.332,35.885,24.464,45.675c2.06,9.518,4.158,23.61,2.71,37.523
                                        c-2.484,23.913-25.336,32.306-51.795,42.026c-36.32,13.338-77.484,28.462-77.484,88.641C68.474,485.634,126.653,512,256,512
                                        c129.347,0,187.526-26.366,187.526-45.093C443.526,406.729,402.362,391.605,366.042,378.266z M233.908,484.578L203.021,359.12
                                        l37.47,15.598l-2.302,20.66l6.572-0.148L233.908,484.578z M277.101,395.378l-2.302-20.66l37.47-15.598l-30.887,125.458
                                        l-10.854-89.348L277.101,395.378z"/>
                                    <path class="st0" d="M91.083,82.779l54.864,24.13v36.397h222.66v-36.397l22.395-9.852v51.234c-4.75,0.753-8.389,4.728-8.389,9.495
                                        c0,4.146,2.741,7.74,6.704,9.053l-6.378,40.217c-0.421,2.663,0.34,5.357,2.081,7.392c1.739,2.042,4.28,3.214,6.972,3.214h16.792
                                        c2.692,0,5.233-1.172,6.968-3.214c1.745-2.034,2.506-4.728,2.085-7.392l-6.374-40.217c3.969-1.312,6.714-4.907,6.714-9.053
                                        c0-4.767-3.643-8.742-8.397-9.495V88.804l13.686-6.017c2.696-1.172,4.439-3.789,4.439-6.654c0-2.85-1.739-5.458-4.433-6.646
                                        L272.931,3.284C267.987,1.102,262.72,0,257.273,0c-5.446,0-10.712,1.102-15.652,3.284L91.081,69.487
                                        c-2.692,1.188-4.431,3.796-4.431,6.646C86.649,79.006,88.392,81.614,91.083,82.779z"/>
                                </g>
                                </svg>
                            </div>
                            <div className="discription"> 
                                <h1></h1>
                                <h1>
                                    Student
                                </h1>
                                <p>
                                    Administer student affairs here.                                
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="content py-4" onClick={gotoAdd_dept}>
                            <div className="title">
                            <svg fill="#000000" width="110px" height="110px" viewBox="-3 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <title>group</title>
                                <path d="M20.906 20.75c1.313 0.719 2.063 2 1.969 3.281-0.063 0.781-0.094 0.813-1.094 0.938-0.625 0.094-4.563 0.125-8.625 0.125-4.594 0-9.406-0.094-9.75-0.188-1.375-0.344-0.625-2.844 1.188-4.031 1.406-0.906 4.281-2.281 5.063-2.438 1.063-0.219 1.188-0.875 0-3-0.281-0.469-0.594-1.906-0.625-3.406-0.031-2.438 0.438-4.094 2.563-4.906 0.438-0.156 0.875-0.219 1.281-0.219 1.406 0 2.719 0.781 3.25 1.938 0.781 1.531 0.469 5.625-0.344 7.094-0.938 1.656-0.844 2.188 0.188 2.469 0.688 0.188 2.813 1.188 4.938 2.344zM3.906 19.813c-0.5 0.344-0.969 0.781-1.344 1.219-1.188 0-2.094-0.031-2.188-0.063-0.781-0.188-0.344-1.625 0.688-2.25 0.781-0.5 2.375-1.281 2.813-1.375 0.563-0.125 0.688-0.469 0-1.656-0.156-0.25-0.344-1.063-0.344-1.906-0.031-1.375 0.25-2.313 1.438-2.719 1-0.375 2.125 0.094 2.531 0.938 0.406 0.875 0.188 3.125-0.25 3.938-0.5 0.969-0.406 1.219 0.156 1.375 0.125 0.031 0.375 0.156 0.719 0.313-1.375 0.563-3.25 1.594-4.219 2.188zM24.469 18.625c0.75 0.406 1.156 1.094 1.094 1.813-0.031 0.438-0.031 0.469-0.594 0.531-0.156 0.031-0.875 0.063-1.813 0.063-0.406-0.531-0.969-1.031-1.656-1.375-1.281-0.75-2.844-1.563-4-2.063 0.313-0.125 0.594-0.219 0.719-0.25 0.594-0.125 0.688-0.469 0-1.656-0.125-0.25-0.344-1.063-0.344-1.906-0.031-1.375 0.219-2.313 1.406-2.719 1.031-0.375 2.156 0.094 2.531 0.938 0.406 0.875 0.25 3.125-0.188 3.938-0.5 0.969-0.438 1.219 0.094 1.375 0.375 0.125 1.563 0.688 2.75 1.313z"></path>
                            </svg>
                            </div>
                            <div className="discription">   
                            <h1>
                                Department
                            </h1>
                                <p>
                                    Oversee departmental operations here. 
                                </p> 
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="content py-4" onClick={gotoAttendance}>
                            <div className="title">
                                <svg width="80px" height="80px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" mirror-in-rtl="true">
                                    <path fill="black" d="M7 11c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2s2 .9 2 2v1c0 1.1-.9 2-2 2zm-2 6.993L9 18c.55 0 1-.45 1-1v-2c0-1.65-1.35-3-3-3s-3 1.35-3 3v2c0 .552.448.993 1 .993zM19 18h-6c-.553 0-1-.447-1-1s.447-1 1-1h6c.553 0 1 .447 1 1s-.447 1-1 1zm0-4h-6c-.553 0-1-.448-1-1s.447-1 1-1h6c.553 0 1 .448 1 1s-.447 1-1 1zm0-4h-6c-.553 0-1-.448-1-1s.447-1 1-1h6c.553 0 1 .448 1 1s-.447 1-1 1z"/>
                                    <path fill="black" d="M22 2H2C.9 2 0 2.9 0 4v16c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 17.5c0 .28-.22.5-.5.5h-19c-.28 0-.5-.22-.5-.5v-15c0-.28.22-.5.5-.5h19c.28 0 .5.22.5.5v15z"/>
                                </svg>
                            </div>
                            <div className="discription">
                                <h1>
                                    Attendance
                                </h1>
                                <p>
                                    Administer attendance records here.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{position: "sticky", bottom: "0" , zIndex:"1"}}>
            </div>
            <CarouselContainer>
                <Carousel>
                    <Carousel.Item>
                    <CarouselImage
                        className="d-block w-100"
                            src={img1}
                            alt="First slide"
                        />
                        <CustomCaption>
                                <h3 className="slide-title">Welcome to Attendance</h3>
                                <p className="slide-description">Discover our Site.</p>
                        </CustomCaption>
                        </Carousel.Item>

                        {/* New Carousel Items */}
                        <Carousel.Item>
                        <CarouselImage
                            className="d-block w-100"
                            src={img2}
                            alt="Fourth slide"
                        />
                        <CustomCaption>
                                <h3 className="slide-title">User-Friendly Dashboard</h3>
                                <p className="slide-description">Easily manage attendance with a clean, intuitive dashboard that offers a complete overview at a glance.</p>
                        </CustomCaption>
                        </Carousel.Item>

                        <Carousel.Item>
                        <CarouselImage
                            className="d-block w-100"
                            src={img3}
                            alt="Fifth slide"
                        />
                        <CustomCaption>
                                <h3 className="slide-title">Automated Attendance Logs</h3>
                                <p className="slide-description">Simplify attendance tracking with automated logs that capture clock-ins, clock-outs, and breaks.</p>
                        </CustomCaption>
                        </Carousel.Item>
                </Carousel>
            </CarouselContainer>
        </div>
        <Footer/>

    </div>
    );
}
export default AdminDashboard