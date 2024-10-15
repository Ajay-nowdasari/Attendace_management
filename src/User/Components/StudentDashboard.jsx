
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import img1 from "C:/Users/Harit/Desktop/project/frontend/src/assets/images/img-1_carrousel.png";
import img2 from "C:/Users/Harit/Desktop/project/frontend/src/assets/images/img-2_carrousel.jpg";
import img3 from "C:/Users/Harit/Desktop/project/frontend/src/assets/images/img-3_carrousel.jpg"
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import {Button,Form} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Footer from '../../Admin/Components/footer';
import { useEffect } from 'react';
import axios from 'axios';
const StudentDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate=useNavigate();
  const [Show, setShow] = useState(false);
  const [isedit,setIsEdit] = useState(true); 
  const [loading, setLoading] = useState(true); // Added loading state



  const API_BASE_URL = "http://127.0.0.1:8000/api/";

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const CarouselContainer = styled.div`
  min-width: 100%;
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

const [user, setUser] = useState({
  name: "",
  email: "",
  dept: "",
  year: "",
  section: ""
});

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setUser({ ...user, [name]: value });
};
  useEffect(() => {
  const fectchUser = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(`${API_BASE_URL}user_profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = Array.isArray(response.data) ? response.data[0] : response.data;

        setUser(userData);        console.log("saradha",response.data);
        console.log("dgde",user.name)
        setLoading(false);

      } catch (error) {
        setLoading(false);

        throw new Error("Error fetching user. Please try again later.");
      }
    };
    fectchUser();
  },[]);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const gotohome = () => {
    localStorage.clear();
    navigate('/');
}
  const handleEdit = () => {
    setIsEdit(!isedit);
    if (isedit){
      alert("Please note that you can temporarily edit your details here. Changes will not be saved permanently.")
    }
  }

  if (loading) {
    return <p>Loading...</p>; // Show loading message while fetching data
  }
  return (
    <div>
      <Modal show={true} scrollable className={`std_Attendance_modal ${darkMode ? 'dark-mode' : 'light-mode'}`} centered>
        <Modal.Header className='std_mdl_hdr' >
          
          <Modal.Title>
            <div>
              <h1>
                <span>A</span>
                <span>t</span>
                <span>t</span>
                <span>e</span>
                <span>n</span>
                <span>d</span>
                <span>a</span>
                <span>n</span>
                <span>c</span>
                <span>e</span>
              </h1>
            </div>          
            <p>
                Welcome to {user.name}
            </p>
          </Modal.Title>
          <div className='justify-content-center align-items-center d-flex'>
          <button
          onClick={handleShow} 
          className="btn me-3">
          <svg xmlns="http://www.w3.org/2000/svg" height="21px" viewBox="0 -960 960 960" width="25px" fill="black">
              <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
          </svg>
            Profile
          </button>
          <button 
            onClick={toggleDarkMode} 
            className="btn me-3"
          >
            {darkMode ? (
              <>
              <svg  className="pe-1" width="28px" height="24px" viewBox="0 0 1024 1024" class="icon"  version="1.1">
              <path d="M711.94535 678.007647c21.938791-41.869743 34.412786-89.855152 34.412786-140.875358 0-151.723423-110.21204-276.698866-252.05497-293.416865-141.853168 16.718-252.065209 141.693442-252.065209 293.417889 0 51.020206 12.476043 99.005615 34.412786 140.875358h435.294607z" fill="#FDD72C" />
              <path d="M746.358136 537.133313c0 51.020206-12.473995 99.005615-34.412786 140.875358h64.908186c21.933671-41.872814 34.392308-89.863343 34.392308-140.875358 0-163.111076-127.376454-295.34177-284.500871-295.34177-2.655959 0-5.300654 0.045051-7.941255 0.118771-0.462796 0.015358-0.920473 0.038908-1.37815 0.05529-2.260739 0.081911-4.517382 0.170989-6.767882 0.305118a294.187851 294.187851 0 0 0-8.235109 0.607164c-0.089078 0.008191-0.173037 0.016382-0.263139 0.021501-2.629338 0.241637-5.248436 0.506823-7.856272 0.818085 141.84293 16.715952 252.05497 141.691395 252.05497 293.415841z" fill="#F87C22" />
              <path d="M502.422577 242.876862zM510.657686 242.269698zM494.303166 243.716448zM518.803718 241.910314z" fill="#FDD72C" />
              <path d="M168.032892 166.444846a8.078455 8.078455 0 0 1-8.077431 8.077432 8.076407 8.076407 0 0 1-8.077431-8.077432 8.076407 8.076407 0 0 1 8.077431-8.077431 8.080503 8.080503 0 0 1 8.077431 8.077431zM843.001648 242.876862a8.080503 8.080503 0 0 1-8.077432 8.077431 8.076407 8.076407 0 0 1-8.077431-8.077431 8.076407 8.076407 0 0 1 8.077431-8.077432 8.080503 8.080503 0 0 1 8.077432 8.077432zM951.299023 433.935911a8.078455 8.078455 0 0 1-8.077432 8.077432 8.076407 8.076407 0 0 1-8.077431-8.077432 8.076407 8.076407 0 0 1 8.077431-8.077431 8.078455 8.078455 0 0 1 8.077432 8.077431z" fill="#FD5C1E" />
              <path d="M260.696562 198.372662c-13.149759 0-23.848337-10.698578-23.848337-23.850384s10.698578-23.850385 23.848337-23.850385c13.149759 0 23.848337 10.698578 23.848337 23.850385s-10.699602 23.850385-23.848337 23.850384z m0-36.931543c-7.212248 0-13.078087 5.868911-13.078087 13.081159s5.865839 13.081159 13.078087 13.081158 13.078087-5.868911 13.078087-13.081158-5.865839-13.081159-13.078087-13.081159zM112.374486 349.750012a4.163118 4.163118 0 0 1-4.165165-4.162094v-4.165165a4.540931 4.540931 0 1 0-9.081863 0v4.165165a4.163118 4.163118 0 0 1-4.165166 4.162094h-4.165165a4.545027 4.545027 0 0 0 0 9.088006h4.165165a4.164142 4.164142 0 0 1 4.165166 4.162094v4.165165a4.540931 4.540931 0 0 0 9.081863 0v-4.165165a4.163118 4.163118 0 0 1 4.165165-4.162094h4.165166a4.545027 4.545027 0 0 0 0-9.088006h-4.165166zM791.209433 182.415409a5.293487 5.293487 0 0 1-5.295535-5.298606v-5.298607a5.778809 5.778809 0 0 0-5.779833-5.776761 5.778809 5.778809 0 0 0-5.779833 5.776761v5.298607a5.295535 5.295535 0 0 1-5.300654 5.298606h-5.295535a5.779833 5.779833 0 1 0 0 11.56069h5.295535a5.296559 5.296559 0 0 1 5.300654 5.300654v5.298607a5.778809 5.778809 0 0 0 5.779833 5.776761 5.779833 5.779833 0 0 0 5.779833-5.776761v-5.298607a5.295535 5.295535 0 0 1 5.295535-5.300654h5.300654a5.780857 5.780857 0 0 0 0-11.56069h-5.300654z" fill="#2BA9FC" />
              <path d="M99.804246 218.94559a5.55765 5.55765 0 0 1-5.555602-5.555602v-5.555601a6.060377 6.060377 0 1 0-12.120754 0v5.555601a5.55765 5.55765 0 0 1-5.555602 5.555602h-5.555602a6.061401 6.061401 0 1 0 0 12.120755h5.555602a5.55765 5.55765 0 0 1 5.555602 5.555601v5.555602a6.060377 6.060377 0 1 0 12.120754 0v-5.555602a5.55765 5.55765 0 0 1 5.555602-5.555601h5.555602a6.061401 6.061401 0 1 0 0-12.120755h-5.555602z" fill="#FD5C1E" />
              <path d="M188.373398 257.720127a4.526597 4.526597 0 0 1-4.527621-4.530692v-4.532741a4.943318 4.943318 0 0 0-9.886636 0v4.532741a4.530693 4.530693 0 0 1-4.532741 4.530692h-4.527621a4.939223 4.939223 0 0 0-4.943318 4.943319 4.939223 4.939223 0 0 0 4.943318 4.943318h4.527621a4.530693 4.530693 0 0 1 4.532741 4.530693v4.53274a4.943318 4.943318 0 0 0 9.886636 0v-4.53274a4.526597 4.526597 0 0 1 4.527621-4.530693h4.532741a4.942294 4.942294 0 1 0 0-9.886637h-4.532741zM945.288816 257.720127a4.526597 4.526597 0 0 1-4.527621-4.530692v-4.532741a4.943318 4.943318 0 0 0-9.886637 0v4.532741a4.530693 4.530693 0 0 1-4.53274 4.530692h-4.527621a4.939223 4.939223 0 0 0-4.943319 4.943319 4.939223 4.939223 0 0 0 4.943319 4.943318h4.527621a4.530693 4.530693 0 0 1 4.53274 4.530693v4.53274a4.943318 4.943318 0 0 0 9.886637 0v-4.53274a4.526597 4.526597 0 0 1 4.527621-4.530693h4.53274a4.942294 4.942294 0 1 0 0-9.886637h-4.53274z" fill="#FED62C" />
              <path d="M872.619579 330.757963a3.61022 3.61022 0 0 0-3.613292 3.615339l-0.005119 15.891724a3.624554 3.624554 0 0 0 3.618411 3.618411 3.622506 3.622506 0 0 0 3.612267-3.618411V334.373302a3.616363 3.616363 0 0 0-3.612267-3.615339zM872.613435 385.672005a3.614315 3.614315 0 0 0-3.612267 3.610219l0.005119 15.899916a3.606124 3.606124 0 0 0 3.613292 3.607148 3.609196 3.609196 0 0 0 3.612267-3.607148v-15.899916a3.613291 3.613291 0 0 0-3.618411-3.610219zM856.270178 358.536996a3.606124 3.606124 0 0 0 5.106116-0.003072 3.6051 3.6051 0 0 0 0-5.109188l-11.238165-11.238165a3.613291 3.613291 0 0 0-5.111236 5.106116l11.243285 11.244309zM888.962836 381.015374a3.607148 3.607148 0 0 0-5.106116 0 3.618411 3.618411 0 0 0 0 5.111236l11.243285 11.238165a3.611244 3.611244 0 1 0 5.106116-5.109188l-11.243285-11.240213zM856.721711 369.775161a3.612267 3.612267 0 0 0-3.612267-3.610219h-15.891724a3.613291 3.613291 0 1 0 0 7.225558h15.891724a3.612267 3.612267 0 0 0 3.612267-3.615339zM908.020414 366.164942h-15.896844a3.6051 3.6051 0 0 0-3.607148 3.612267 3.604076 3.604076 0 0 0 3.612268 3.612267h15.891724c1.998624 0 3.612267-1.619787 3.612267-3.615339s-1.613643-3.617387-3.612267-3.609195zM856.270178 381.015374l-11.243285 11.240213a3.616363 3.616363 0 0 0 0 5.109188c1.41501 1.406818 3.702369 1.417057 5.111236 0l11.238165-11.238165a3.608172 3.608172 0 0 0 0-5.111236 3.607148 3.607148 0 0 0-5.106116 0zM888.968979 358.536996l11.238166-11.243285a3.612267 3.612267 0 0 0 0-5.106116 3.607148 3.607148 0 0 0-5.106116 0l-11.243285 11.240213a3.616363 3.616363 0 0 0 0 5.109188 3.608172 3.608172 0 0 0 5.111235 0z" fill="#FED62C" />
              <path d="M442.37887 517.443998m-14.358968 0a14.358968 14.358968 0 1 0 28.717935 0 14.358968 14.358968 0 1 0-28.717935 0Z" fill="" />
              <path d="M419.043499 559.62705m-19.480442 0a19.480442 19.480442 0 1 0 38.960884 0 19.480442 19.480442 0 1 0-38.960884 0Z" fill="#FEBB29" />
              <path d="M614.616859 559.62705c0 10.756939-8.724527 19.481466-19.478395 19.481466-10.758987 0-19.483514-8.724527-19.483513-19.481466s8.724527-19.480442 19.483513-19.480442c10.753868-0.001024 19.478394 8.723503 19.478395 19.480442z" fill="#FEBB29" />
              <path d="M584.632377 517.443998c0 7.92692-6.431024 14.358968-14.361015 14.358968-7.924872 0-14.35692-6.431024-14.35692-14.358968s6.431024-14.358968 14.35692-14.358968c7.928968 0 14.361016 6.432048 14.361015 14.358968zM544.149999 549.943142c1.30443-5.124546-3.107492-9.48425-8.403027-9.484249h-57.498328c-5.295535 0-9.710528 4.359704-8.400979 9.484249 4.217384 16.585918 19.260307 28.852065 37.149631 28.852065 17.895468 0 32.9302-12.266146 37.152703-28.852065z" fill="" />
              <path d="M525.192762 565.55637c0 5.151167-8.146032 9.328619-18.195466 9.328619-10.044315 0-18.195466-4.178476-18.195466-9.328619 0-5.151167 8.151151-9.328619 18.195466-9.32862 10.049434-0.001024 18.195466 4.177452 18.195466 9.32862z" fill="#F27E38" />
              <path d="M200.747052 605.769466c-5.724543 0-10.814277-4.073016-11.897547-9.901995-3.581551-19.243925-5.395876-39.003888-5.395876-58.734158 0-175.927048 143.12893-319.055978 319.058026-319.055978 73.056266 0 141.797879 24.029565 198.791431 69.488026 5.232054 4.170285 6.09007 11.795159 1.916713 17.025165-4.165166 5.232054-11.79004 6.092118-17.025165 1.916713-52.658422-41.998752-116.175148-64.198634-183.684003-64.198634-162.567392 0-294.825732 132.256291-294.825732 294.823684 0 18.247684 1.677124 36.515846 4.985298 54.301758 1.225591 6.578463-3.115683 12.905051-9.694146 14.12757-0.74846 0.139248-1.494873 0.207849-2.228999 0.207849zM228.084791 686.871422a12.113587 12.113587 0 0 1-10.837827-6.680851 318.733454 318.733454 0 0 1-14.835074-34.471148c-2.277121-6.291775 0.97781-13.238837 7.27061-15.515958 6.294847-2.26893 13.238837 0.97781 15.515958 7.27061a294.2114 294.2114 0 0 0 13.703681 31.84181c3.003056 5.97949 0.591806 13.260339-5.389732 16.265442a12.082871 12.082871 0 0 1-5.427616 1.290095zM776.280161 688.162542c-1.846065 0-3.720799-0.422865-5.479835-1.317741-5.96618-3.034796-8.342618-10.327931-5.310893-16.291039 21.131969-41.569744 31.846929-86.457901 31.846929-133.420449 0-50.546147-13.00232-100.407314-37.602188-144.187627-3.278481-5.832051-1.207161-13.220407 4.627961-16.49684 5.832051-3.273361 13.223479-1.204089 16.496841 4.627961 26.632281 47.396676 40.709681 101.361576 40.70968 156.056506 0 50.814405-11.600621 99.399811-34.476266 144.401619a12.115635 12.115635 0 0 1-10.812229 6.62761zM749.081671 366.40965a12.098229 12.098229 0 0 1-9.952166-5.190075c-6.045019-8.676404-9.368551-12.620411-14.984561-18.702289-4.53786-4.916697-4.233766-12.581503 0.683955-17.122434 4.91465-4.53786 12.578431-4.235814 17.122434 0.683955 6.157646 6.673685 10.283904 11.558641 17.062026 21.289648 3.825236 5.490073 2.474731 13.041227-3.015343 16.867487a12.066489 12.066489 0 0 1-6.916345 2.173708zM884.840674 690.042395H849.83813c-6.692114 0-12.115635-5.424544-12.115635-12.115635s5.424544-12.115635 12.115635-12.115635h35.00152c6.692114 0 12.115635 5.424544 12.115635 12.115635s-5.423521 12.115635-12.114611 12.115635z" fill="" />
              <path d="M809.451997 690.042395H478.277313c-6.692114 0-12.115635-5.424544-12.115635-12.115635s5.424544-12.115635 12.115635-12.115635h331.17366c6.692114 0 12.115635 5.424544 12.115636 12.115635s-5.423521 12.115635-12.114612 12.115635zM435.198362 690.042395H134.542627c-6.692114 0-12.115635-5.424544-12.115635-12.115635s5.424544-12.115635 12.115635-12.115635h300.655735c6.692114 0 12.115635 5.424544 12.115635 12.115635s-5.423521 12.115635-12.115635 12.115635zM723.293071 747.480314H623.672101c-6.692114 0-12.115635-5.424544-12.115635-12.115635s5.424544-12.115635 12.115635-12.115635h99.62097c6.692114 0 12.115635 5.424544 12.115635 12.115635s-5.423521 12.115635-12.115635 12.115635zM576.775081 747.480314H203.792087c-6.692114 0-12.115635-5.424544-12.115635-12.115635s5.424544-12.115635 12.115635-12.115635h372.982994c6.692114 0 12.115635 5.424544 12.115635 12.115635s-5.423521 12.115635-12.115635 12.115635zM647.231702 812.995664H359.809685c-6.692114 0-12.115635-5.424544-12.115635-12.115635s5.424544-12.115635 12.115635-12.115635H647.231702c6.692114 0 12.115635 5.424544 12.115635 12.115635s-5.424544 12.115635-12.115635 12.115635zM317.911274 812.995664h-36.18206c-6.692114 0-12.115635-5.424544-12.115635-12.115635s5.424544-12.115635 12.115635-12.115635h36.18206c6.692114 0 12.115635 5.424544 12.115635 12.115635s-5.424544 12.115635-12.115635 12.115635zM555.909322 865.948966H428.46734c-6.692114 0-12.115635-5.424544-12.115635-12.115635s5.424544-12.115635 12.115635-12.115635h127.441982c6.692114 0 12.115635 5.424544 12.115635 12.115635s-5.424544 12.115635-12.115635 12.115635z" fill="" />
              </svg> 
              light mode</> ) 
              : 
              (
              <>
              <svg class="pe-2" width="32px" height="24px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" id="flat" version="1.1">
                <path d="M234.689,246.815c0-105.871,66.348-196.23,159.726-231.81C375.598,10.438,355.949,8,335.726,8  c-136.967,0-248,111.033-248,248s111.033,248,248,248c31.096,0,60.847-5.74,88.274-16.19  C315.364,461.445,234.689,363.559,234.689,246.815z" fill="#FFD572"/>
                <path d="M490.489,190.575c-4.311-8.303-15.394-13.525-25.26-11.903l0,0c-9.208,1.514-18.79,1.997-28.503,1.464  c-6.255-0.344-11.517-5.326-10.89-10.239l2.502-19.589l-9.848,3.133c-6.934,2.206-15.775-0.947-19.748-7.043l-5.643-8.658  l-10.458,16.75c-2.649,4.243-9.928,4.682-15.033,0.949c-7.81-5.711-14.883-12.118-21.022-19.081l0,0  c-6.613-7.5-18.499-10.47-27.091-6.769l-26.93,11.6l0,0c17.516,6.247,27.861,22.12,23.105,35.452l-1.913,5.365l3.524,1.257  c11.677,4.165,18.574,14.746,15.404,23.635l0,0l21.144,7.541c15.57,5.553,24.765,19.662,20.538,31.513  c4.227-11.851,20.275-16.957,35.845-11.404l21.144,7.541l0,0c3.17-8.889,15.206-12.718,26.884-8.553l3.524,1.257l1.913-5.365  c4.755-13.333,22.809-19.077,40.325-12.83h0L490.489,190.575z" fill="#4D5166"/>
                <path d="M184.069,334.029c-8.886-2.925-20.463,1.086-26.385,9.143l0,0c-5.527,7.519-12.042,14.562-19.361,20.969  c-4.714,4.126-11.959,4.241-14.945,0.288l-11.902-15.758l-4.853,9.124c-3.417,6.424-11.944,10.349-19.046,8.766l-10.087-2.248  l4.228,19.289c1.071,4.886-3.828,10.288-10.088,11.187c-9.577,1.375-19.113,1.736-28.371,1.047h0  c-9.971-0.742-20.548,5.442-24.106,14.095L8,437.048h0c16.893-7.775,35.386-3.654,41.304,9.205l2.381,5.174l3.399-1.564  c11.262-5.183,23.59-2.436,27.536,6.137l0,0l20.392-9.385c15.016-6.911,31.454-3.248,36.715,8.182  c-5.261-11.43,2.648-26.299,17.664-33.21l20.392-9.385l0,0c-3.945-8.573,1.986-19.724,13.248-24.907l3.399-1.564l-2.381-5.174  c-5.918-12.859,2.979-29.586,19.872-37.361l0,0L184.069,334.029z" fill="#4D5166"/>
                <path d="M432,304L432,304c17.673,0,32,14.327,32,32v0c0,0,0,0,0,0c0-17.673,14.327-32,32-32c0,0,0,0,0,0h0  c-17.673,0-32-14.327-32-32c0,0,0,0,0,0v0C464,289.673,449.673,304,432,304C432,304,432,304,432,304z" fill="#E65C64"/>
                <path d="M272,296L272,296c17.673,0,32,14.327,32,32v0c0,0,0,0,0,0c0-17.673,14.327-32,32-32c0,0,0,0,0,0h0  c-17.673,0-32-14.327-32-32c0,0,0,0,0,0v0C304,281.673,289.673,296,272,296C272,296,272,296,272,296z" fill="#E65C64"/>
                <path d="M16,56L16,56c17.673,0,32,14.327,32,32v0c0,0,0,0,0,0c0-17.673,14.327-32,32-32c0,0,0,0,0,0h0  c-17.673,0-32-14.327-32-32c0,0,0,0,0,0v0C48,41.673,33.673,56,16,56C16,56,16,56,16,56z" fill="#E65C64"/>
                <polygon fill="#E6C067" points="464,52.792 473.889,72.828 496,76.041 480,91.637 483.777,113.659 464,103.262 444.223,113.659   448,91.637 432,76.041 454.111,72.828 "/>
                <polygon fill="#CDAB5C" points="84.529,120 103.233,157.899 145.057,163.977 114.793,193.477 121.937,235.132 84.529,215.465   47.12,235.132 54.264,193.477 24,163.977 65.824,157.899 "/>
                <polygon fill="#CDAB5C" points="411.471,328 430.176,365.899 472,371.977 441.736,401.477 448.88,443.132 411.471,423.465   374.063,443.132 381.207,401.477 350.943,371.977 392.767,365.899 "/>
              </svg>
              dark mode
              </>)}
          </button>
          <button
          className="btn"
          onClick={gotohome}
          >
          <svg width="20px" height="20px" viewBox="0 -1.29 512 512" xmlns="http://www.w3.org/2000/svg">

            <defs>
            </defs>

            <g data-name="Layer 2" id="Layer_2">

            <g data-name="E430, Logout, multimedia, Ui" id="E430_Logout_multimedia_Ui">

            <line class="cls-1" x1="291.14" x2="502" y1="234.62" y2="234.62"/>

            <polyline class="cls-1" points="437.83 181.15 502 234.62 437.83 288.1"/>

            <polyline class="cls-1" points="10 459.25 10 10 331.31 10 331.31 459.25 230.9 459.25"/>

            <polygon class="cls-1" points="230.9 499.41 10 459.25 10 10 230.9 50.16 230.9 499.41"/>

            <polygon class="cls-1" points="180.69 178.1 60.2 158.02 60.2 107.82 180.69 127.9 180.69 178.1"/>

            </g>

            </g>

          </svg>
          </button>
          </div>

        </Modal.Header>
        
        <Modal.Body className='pt-0' style={{height:"60%"}}>
            <table className="table table-hover table-bordered">

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

        <Modal.Footer className='std_mdl_ftr' >
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
                
            <Footer/>
        </Modal.Footer>
  
      </Modal> 

      <Modal show={Show} onHide={handleClose} centered>
                    <Modal.Header  className="px-4"  style={{ backgroundColor: "#3f4961", color:"#c3c7d3" }}>
                        <Modal.Title>
                             <h3 >Profile</h3>
                            <div className="d-flex" style={{gap:"40px",alignItems:"center"}}>
                            <svg width="150px" height="200px" viewBox="0 0 61.7998 61.7998" xmlns="http://www.w3.org/2000/svg">

                              <title/>

                              <g data-name="Layer 2" id="Layer_2">

                              <g data-name="—ÎÓÈ 1" id="_ÎÓÈ_1">

                              <circle cx="30.8999" cy="30.8999" fill="#485a69" r="30.8999"/>

                              <path d="M23.242 38.592l15.92.209v12.918l-15.907-.121-.013-13.006z" fill="#f9dca4" fill-rule="evenodd"/>

                              <path d="M53.478 51.993A30.814 30.814 0 0 1 30.9 61.8a31.225 31.225 0 0 1-3.837-.237A30.699 30.699 0 0 1 15.9 57.919a31.033 31.033 0 0 1-7.857-6.225l1.284-3.1 13.925-6.212c0 4.535 1.84 6.152 7.97 6.244 7.57.113 7.94-1.606 7.94-6.28l12.79 6.281z" fill="#d5e1ed" fill-rule="evenodd"/>

                              <path d="M39.165 38.778v3.404c-2.75 4.914-14 4.998-15.923-3.59z" fill-rule="evenodd" opacity="0.11"/>

                              <path d="M31.129 8.432c21.281 0 12.987 35.266 0 35.266-12.267 0-21.281-35.266 0-35.266z" fill="#ffe8be" fill-rule="evenodd"/>

                              <path d="M18.365 24.045c-3.07 1.34-.46 7.687 1.472 7.658a31.973 31.973 0 0 1-1.472-7.658z" fill="#f9dca4" fill-rule="evenodd"/>

                              <path d="M44.14 24.045c3.07 1.339.46 7.687-1.471 7.658a31.992 31.992 0 0 0 1.471-7.658z" fill="#f9dca4" fill-rule="evenodd"/>

                              <path d="M43.409 29.584s1.066-8.716-2.015-11.752c-1.34 3.528-7.502 4.733-7.502 4.733a16.62 16.62 0 0 0 3.215-2.947c-1.652.715-6.876 2.858-11.61 1.161a23.715 23.715 0 0 0 3.617-2.679s-4.287 2.322-8.44 1.742c-2.991 2.232-1.66 9.162-1.66 9.162C15 18.417 18.697 6.296 31.39 6.226c12.358-.069 16.17 11.847 12.018 23.358z" fill="#ecbe6a" fill-rule="evenodd"/>

                              <path d="M23.255 42.179a17.39 17.39 0 0 0 7.958 6.446l-5.182 5.349L19.44 43.87z" fill="#ffffff" fill-rule="evenodd"/>

                              <path d="M39.16 42.179a17.391 17.391 0 0 1-7.958 6.446l5.181 5.349 6.592-10.103z" fill="#ffffff" fill-rule="evenodd"/>

                              <path d="M33.366 61.7q-1.239.097-2.504.098-.954 0-1.895-.056l1.031-8.757h2.41z" fill="#3dbc93" fill-rule="evenodd"/>

                              <path d="M28.472 51.456l2.737-2.817 2.736 2.817-2.736 2.817-2.737-2.817z" fill="#3dbc93" fill-rule="evenodd"/>

                              </g>

                              </g>

                            </svg>
                                <h2>{user.name}</h2>
                            </div>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="px-5">
                        <Form.Group controlId="formname" className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                className=" profile_input"
                                type="text"
                                name="name"
                                disabled={isedit}
                                placeholder="Enter Name"
                                value={user.name}
                                onChange={handleInputChange}
                                required
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                                className="profile_input"
                                type="text"
                                name="email"
                                disabled={isedit}
                                placeholder="Enter Your Mail ID"
                                value={user.email}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                         <div class="row align-items-center">
                            <div class="col">
                                <hr/>
                            </div>
                            <div class="col-auto">
                                Additional information
                            </div>
                            <div class="col">
                                <hr/>
                            </div>
                        </div>


                        <Form.Group controlId="formDept" className="mb-3">
                                <Form.Label>Department</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="dept"
                                    disabled={isedit}
                                    value={user.dept}
                                    onChange={handleInputChange}
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
                                    disabled={isedit}
                                    value={user.year}
                                    onChange={handleInputChange}
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
                                    disabled={isedit}
                                    value={user.section}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">--Select Section--</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </Form.Control>
                            </Form.Group>
                    </Modal.Body>

                    <Modal.Footer className="modal-footer" 
                        style={{ justifyContent: "space-evenly", backgroundColor: "#c3c7d3" }}
                        >
                        <Button
                        variant="secondary"
                        onClick={handleEdit}
                        >
                            Edit 
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#292D32"/>
                                <path opacity="0.4" d="M12.0002 14.5C6.99018 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill="#292D32"/>
                                <path d="M21.4291 14.7401C20.5291 13.8401 19.8191 14.1301 19.2091 14.7401L15.669 18.2801C15.529 18.4201 15.3991 18.6801 15.3691 18.8701L15.1791 20.2201C15.1091 20.7101 15.4491 21.0501 15.9391 20.9801L17.289 20.7901C17.479 20.7601 17.7491 20.6301 17.8791 20.4901L21.419 16.9501C22.039 16.3501 22.3291 15.6401 21.4291 14.7401Z" fill="#292D32"/>
                            </svg>
                        </Button>
                        <button onClick={handleClose}>
                            Close
                        </button>
                    </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StudentDashboard;