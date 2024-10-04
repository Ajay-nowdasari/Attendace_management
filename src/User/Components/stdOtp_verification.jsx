import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const OtpVerification = () => {
    const otpLength = 6; // Number of OTP digits
    const [otp, setOtp] = useState(new Array(otpLength).fill(""));
    const [timeleft, setTimeleft] = useState(6); // Timer for 60 seconds
    const [isExpired, setIsExpired] = useState(false);
    const navigate = useNavigate();

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
    const handleSubmit = async () => {
        if (isExpired) {
            alert("OTP has expired. Please request a new one.");
            return;
        }

        const response = await fetch('http://your-backend-url/verify-otp/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'testuser', // Replace with actual username
                otp: otp.join(''),
            }),
        });

        const data = await response.json();
        if (response.status === 200) {
            alert("OTP verified successfully!");
            // setTimeout(() => {
            //     if(userType === 'Admin'){
            //         navigate('/Add_dept')
            //     }else{
            //         navigate('/StudentDashboard')
            //     }
            // }, 3000);
            
        } else {
            alert(data.error || "Failed to verify OTP");
        }
    };

    const gotonext = () => {
        // navigate('/StudentDashboard');
        navigate('/Admin_Dashboard');
    }
    return (
        <div>
            <div  className="background-image"></div>
            <div className="overlay-content">
                <h2>Otp Verification</h2>
                <p>Enter your {otpLength}-digit OTP</p>
                
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
                            onClick={gotonext}
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
