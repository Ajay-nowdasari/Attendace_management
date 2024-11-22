import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import clickSound from "C:/Users/Harit/Desktop/project/frontend/src/assets/sounds/mouse-click-153941.mp3"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'react-bootstrap';
const OtpVerification = () => {
    const otpLength = 6; // Number of OTP digits
    const [otp, setOtp] = useState(new Array(otpLength).fill(""));
    const [timeleft, setTimeleft] = useState(60); // Timer for 60 seconds
    const [isExpired, setIsExpired] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [loadingResend, setLoadingResend] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { useremail, usertype, access_token, refresh_token } = location.state || {};
    const API_base_url = "http://127.0.0.1:8000/api/";

    // Handle OTP input change
    console.log(access_token, refresh_token)
    const handleChange = (e, index) => {
        const value = e.target.value;

        const lastDigit = value.slice(-1);

        if (/^\d$/.test(lastDigit)) {
            const newOtp = [...otp];
            newOtp[index] = lastDigit;
            setOtp(newOtp);

            if (index < otp.length - 1) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (/^\d$/.test(e.key)) {
            e.preventDefault();

            const newOtp = [...otp];
            newOtp[index] = e.key;
            setOtp(newOtp);

            if (index < otp.length - 1) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        } else if (e.key === "Backspace") {
            e.preventDefault();

            if (otp[index] === "" && index > 0) {
                document.getElementById(`otp-input-${index - 1}`).focus();
            } else {
                const newOtp = [...otp];
                newOtp[index] = "";
                setOtp(newOtp);
            }
        } else if (e.key === "ArrowLeft") {
            if (index > 0) {
                document.getElementById(`otp-input-${index - 1}`).focus();
            }
        } else if (e.key === "ArrowRight") {
            if (index < otp.length - 1) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    const handlePaste = (e) => {
        // Prevent the default paste behavior
        e.preventDefault();

        // Retrieve pasted data from the clipboard
        const pasteData = e.clipboardData.getData('text').trim();

        // Check if the pasted data matches the expected OTP length and contains only digits
        if (pasteData.length === otp.length && !isNaN(pasteData)) {
            const newOtp = pasteData.split('');
            setOtp(newOtp);

            // Automatically focus the last input field
            document.querySelectorAll('input[type="text"]')[otp.length - 1].focus();
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

    const playClick = () => {
        const audio = new Audio(clickSound);
        audio.play();
    };
    // Function to handle OTP submission
    // Function to handle OTP submission
    const handleSubmit = async (e) => {
        playClick();
        e.preventDefault();
        setLoadingSubmit(true);
        if (!useremail || !usertype) {
            toast.error("Invalid session. Please login again.");
            navigate("/login", { replace: true });
            return;
        }
        if (isExpired) {
            toast.error("OTP has expired. Please request a new one.");
            return;
        }
        try {
            const response = await axios.post(
                API_base_url + "verify_otp/",
                {
                    useremail: useremail,
                    otp: otp.join(''),
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            if (response.data.success) {
                localStorage.clear();
                localStorage.setItem("useremail", useremail);
                localStorage.setItem("access_token", access_token);
                localStorage.setItem("refresh_token", refresh_token);
                localStorage.setItem("user_type", usertype);
                if (usertype === "user") {
                    navigate("/Student_dashboard", { replace: true });
                } else if (usertype === "admin") {
                    navigate("/Admin_dashboard", { replace: true });
                }
            } else {
                toast.error("Invalid OTP");
                navigate("/", { replace: true });
            }
        } catch (error) {
            if (error.response) {
                toast.error("Invalid OTP");
            }
        } finally {
            setLoadingSubmit(false);
        }
    };


    const handleResend = async () => {
        playClick();
        setLoadingResend(true);
        try {
            const response = await axios.post(
                API_base_url + "resend_otp/",
                { useremail: useremail },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                toast.success("New OTP has been sent to your email.");
                setTimeleft(60); // Reset the timer to 60 seconds
                setIsExpired(false); // Reset the expired state
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Error resending OTP. Please try again.");
        } finally {
            setLoadingResend(false);
        }
    };

    return (

        <div>
            <ToastContainer />
            <div className="background-image"></div>
            <div className="overlay-content">
                    <h2>OTP Verification</h2>
                    <p>Check your email for the OTP.</p>
                    <p>Enter the {otpLength }-digit code below.</p>

                <form>
                    <div className="otp-area p-4">
                        {otp.map((data, i) => (
                            <input
                                type="text"
                                key={i}
                                id={`otp-input-${i}`}
                                value={data}
                                maxLength={1}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                onChange={(e) => handleChange(e, i)}
                                onPaste={(e) => handlePaste(e)}
                            />
                        ))}
                    </div>

                    <p>Your OTP expires in {timeleft} seconds.</p>

                    <div className='dbl_btns'>
                        <Button
                            className='my-3'
                            variant="success"
                            onClick={handleSubmit}
                            disabled={isExpired || loadingSubmit}
                        >
                            {loadingSubmit ? (
                                <div className="loading">
                                    <div className="spinner"></div>
                                </div>
                            ) : (
                                "Verify OTP"
                            )}
                        </Button>
                        <Button
                            className=''
                            variant="warning"
                            onClick={handleResend}
                            disabled={!isExpired || loadingResend}
                        >
                            {loadingResend ? (
                                <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                            ) : (
                                "Resend OTP"
                            )}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default OtpVerification;
