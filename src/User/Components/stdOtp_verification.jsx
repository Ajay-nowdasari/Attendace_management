import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';

const OtpVerification = () => {
    const otpLength = 6; // Number of OTP digits
    const [otp, setOtp] = useState(new Array(otpLength).fill(""));
    const [timeleft, setTimeleft] = useState(60); // Timer for 60 seconds
    const [isExpired, setIsExpired] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { username, usertype } = location.state || {};
    const API_base_url = "http://127.0.0.1:8000/api/";

    // Handle OTP input change
    const handleChange = (e, index) => {
        if (isNaN(e.target.value)) return false;

        const newOtp = [...otp];
        newOtp[index] = e.target.value;
        setOtp(newOtp);

        // Automatically focus the next input field
        if (e.target.value && e.target.nextSibling) {
            e.target.nextSibling.focus();
        }
    };

    // Start countdown when the component mounts
    useEffect(() => {
        if (timeleft > 0) {
            const timer = setTimeout(() => setTimeleft(timeleft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setIsExpired(true);
        }
    }, [timeleft]);

    // Function to handle OTP submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !usertype ) {
            alert("Invalid session. Please login again.");
            navigate("/login");
            return;
          }
        if (isExpired) {
            alert("OTP has expired. Please request a new one.");
            return;
        }
        try {
            const response = await axios.post(
              API_base_url + "verify_otp/",
              {
                username: username,
                otp: otp.join(''),
            },
              {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
              }
            );
            if (response.data.success) {
                if (usertype === "user") {
                    navigate("/StudentDashboard");
                } else if (usertype === "admin") {
                    navigate("/Admin_Dashboard");
                } else {
                    navigate("/All_students");
                }
            } else {
                alert("Invalid OTP");
                navigate("/");
            }
        } catch (error) {
            if (error.response) {
              alert("Invalid OTP");
            }
        }
    };
    

    return (
        <div>
            <div  className="background-image"></div>
            <div className="overlay-content">
                <h2>Otp Verification</h2>
                <p>Check your E-mail</p>
                <p>Enter {otpLength}-digit OTP</p>
                
                <form>
                    <div className="otp-area p-4">
                        {otp.map((data, i) => (
                            <input
                                type="text"
                                key={i}
                                value={data}
                                maxLength={1}
                                onChange={(e) => handleChange(e, i)}
                           />
                        ))}
                    </div>

                    <p>Your OTP expires in {timeleft} seconds.</p>

                    <div className='dbl_btns'>
                        <Button
                            className='my-3'
                            variant="success"
                            onClick={handleSubmit}
                            disabled={isExpired} // Disable button if OTP has expired
                        >
                            Verify OTP
                        </Button>
                        <Button
                            className=''
                            variant="warning"
                            onClick={handleSubmit}
                            disabled={!isExpired} // Disable button if OTP has expired
                        >
                            Resend OTP
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default OtpVerification;
