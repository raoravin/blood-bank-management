import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const VerifyOTP = ({ numberOfDigits }) => {
  const [otp, setOtp] = useState(Array.from({ length: numberOfDigits }, () => ""));
  const [otpError, setOtpError] = useState(null);
  const otpBoxReference = useRef([]);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const  recipientEmail = user?.email
  const [maskedEmail, setMaskedEmail] = useState('');
  const [timer, setTimer] = useState(60);
  const [timeoutAlert, setTimeoutAlert] = useState(false);
  const [alertShown, setAlertShown] = useState(false); // Flag to track if alert has been shown
  const [isTimerRunning,setIsTimerRunning] = useState(false)
  const [shouldResetTimer, setShouldResetTimer] = useState(false); // New state variable


  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const joinedOtp = otp.join(""); // Convert OTP array to string
      const data = {
        email: user?.email,
        otp: joinedOtp, // Send the OTP as a string
      };

      const config = {
        withCredentials: true,
      };

      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/verify-email",
        data,
        config
      );

      if (response?.data?.success === true) {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleResendOtp = async (e) => {
    e.preventDefault();
    setShouldResetTimer(true); // Set shouldResetTimer to true

    try {
      const data = {
        email: user?.email,
      };

      const config = {
        withCredentials: true,
      };

      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/resend-otp",
        data,
        config
      );
;
      console.log(response?.data?.error);
    } catch (error) {
      console.log(error);
    }
  };

  function handleChange(value, index) {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  function handleBackspaceAndEnter(e, index) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === "Enter" && e.target.value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  function handlePaste(e) {
    e.preventDefault();
    const pastedOTP = e.clipboardData.getData('text/plain').trim();
    if (pastedOTP.length === numberOfDigits && /^[0-9]+$/.test(pastedOTP)) {
      setOtp(pastedOTP.split("").slice(0, numberOfDigits));
    }
  }



    // Timeout alert useEffect
    useEffect(() => {
      // Show timeout alert after 10 minutes
      const timeout = setTimeout(() => {
        setTimeoutAlert(true);
      }, 600000); // 10 minutes in milliseconds
  
      // Clear the timeout when component unmounts
      return () => clearTimeout(timeout);
    }, []);

  useEffect(() => {
    // Create the masked email with stars for privacy
    const splitEmail = recipientEmail.split('@');
    const username = splitEmail[0];
    const maskedUsername = username.slice(0, 3) + '*'.repeat(username.length - 3);
    const maskedEmailString = maskedUsername + '@' + splitEmail[1];
    setMaskedEmail(maskedEmailString);

     // Timer countdown
     let intervalId;
     if (timer > 0 && !shouldResetTimer) {
       intervalId = setInterval(() => {
         setTimer((prevTimer) => prevTimer - 1);
       }, 1000);
     }
 
     // Stop the timer when it reaches 0
     if (timer === 0) {
       clearInterval(intervalId);
     }
 
     // Reset the timer if shouldResetTimer is true
     if (shouldResetTimer) {
       setTimer(60);
       setShouldResetTimer(false); // Reset the flag
     }
 
     // Clear the interval when component unmounts
     return () => clearInterval(intervalId);
  }, [recipientEmail,shouldResetTimer, timer]);

  // Format time in mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };


  const handleOkClick = () => {
    setTimeoutAlert(false);
    // Redirect to registration page
    window.location.href = '/register'; // Change the URL to your registration page
  };

  if (timeoutAlert && !alertShown) {
    alert('Time out! Click OK to register.');
    setAlertShown(true); // Set the flag to true after showing the alert
    handleOkClick(); // Automatically trigger registration after alert
  }




  return (
    <article className=" w-full">
     
      {/* <p className="text-base text-center mt-6 mb-4">One Time Password (OTP)</p> */}
      <div className='flex flex-col items-center gap- justify-center mt-40'>
      <p className="text-base text-center mb-5">OTP send within <span className=' text-blue-600 text-lg'>{formatTime(timer)}</span> to this email {maskedEmail} do not share with anyone</p>


      <div className='flex items-center gap-4'>
        {otp.map((digit, index) => (
          <input
            key={index}
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
            onPaste={(e) => handlePaste(e)}
            ref={(reference) => (otpBoxReference.current[index] = reference)}
            className={`border-2
            ${/^[0-9]+$/.test(digit) ? 'border-green-500' : ''}
              text-center text-xl w-10 h-auto p-2.5 rounded-md block text-black focus:border-2 focus:outline-none appearance-none`}
          />
        ))}
      </div>
      <button onClick={handleResendOtp} type="button" className=' underline'>resendOTP</button>
      <button onClick={handleVerifyOtp} type='button' class="py-2.5 mt-5 px-3 me-2 mb-2 text-sm font-medium border-2 border-gray-400 rounded-lg hover:bg-green-500 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100" >Verify</button>
      <p className={`text-lg text-white mt-4 ${otpError ? 'error-show' : ''}`}>{otpError}</p>
      </div>
    </article>
  );
}

export default VerifyOTP;
