import React from "react";
import bloodImage from "../../assets/images/hospital.jpg";
import Form from "../../components/shared/form/Form";
import Spinner from "../../components/shared/Spinner";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const {loading} = useSelector((state) => state.auth);

  return (
   <>
   {loading ? <Spinner /> : (
     <div className="row g-0">
     <div className=" login-img col-md-8">
       <img src={bloodImage} alt="" />
     </div>
     <div className="col-md-4 form-container">
       <Form formTitle={"LoginPage"} submitBtn={"Login"} formType={'login'} />
     </div>
   </div>
   )}
   </>
  );
};

export default Login;
