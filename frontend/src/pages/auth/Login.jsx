import React from "react";
import bloodImage from "../../assets/images/hospital.jpg";
import Form from "../../components/shared/form/Form";

const Login = () => {
  return (
    <div className="row g-0">
      <div className=" login-img col-md-8">
        <img src={bloodImage} alt="" />
      </div>
      <div className="col-md-4 form-container">
        <Form formTitle={"LoginPage"} submitBtn={"Login"} formType={'login'} />
      </div>
    </div>
  );
};

export default Login;
