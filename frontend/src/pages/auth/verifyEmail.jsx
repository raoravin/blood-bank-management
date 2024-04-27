import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { emailVerify, getCurrentUser } from '../../redux/features/auth/authActions';



const VerifyOTP = () => {
    // const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { user } = useSelector((state) => state.auth);
    const [refresh,setRefresh] =useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const email = user?.email;
    console.log(email,otp);

    const handleVerifyOtp = async (e) => {
        e.preventDefault();

      try{

        const data = {
           email : user?.email,
           otp
        }

        const config = {
            withCredentials: true, // Include this option to send credentials with the request
          };
          const response = await axios.post("http://localhost:8080/api/v1/auth/verify-email",data,config);
          console.log(response);
          if(response?.data?.success == true){
            navigate("/home")
            console.log(hello);
          }
          

        } catch (error) {
          console.log(error);
        //   setLoading(false); // Set loading to false when data is not fetched
        }
      };


    //   useEffect(() => {
    //     // Dispatch the thunk action when the component mounts
    //     dispatch(getCurrentUser());
    //   }, [refresh]);


    return (
        <div>
            <h1>Verify OTP</h1>
            <form onSubmit={handleVerifyOtp}>
                {/* <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /> */}
                <label>OTP:</label>
                <input className=' border' type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                <button className=' border ms-5' type="submit">Verify OTP</button>
            </form>
            {error && <div className="error">{error}</div>}
            {successMessage && <div className="success">{successMessage}</div>}
        </div>
    );
}

export default VerifyOTP