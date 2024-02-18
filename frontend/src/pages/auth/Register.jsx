import React from 'react'
import Form from '../../components/shared/form/Form';
import bloodImage from "../../assets/images/hospital.jpg";


const Register = () => {
  return (
    <div className="row g-0">
      <div className=" login-img col-md-8">
        <img src={bloodImage} alt="" />
      </div>
      <div className="col-md-4 form-container">
        <Form formTitle={"RegisterPage"} formType={"register"} submitBtn={"Register"} />
      </div>
    </div>
  )
}

export default Register