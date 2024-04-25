import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, registerHandle } from "../../../services/authService";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [fullName, setFullName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  
  return (
    <div className="col-md-4 w-96 ">
      <form
        onSubmit={(e) => {
          if (formType === "login")
            return handleLogin(e, email, password, role);
          else if (formType === "register")
            return registerHandle(
              e,
              fullName,
              password,
              role,
              email,
              organisationName,
              hospitalName,
              website,
              address,
              phone
            );
        }}
      >
        <h1 className="text-center text-3xl font-medium mb-3">{formTitle}</h1>
        <hr />
        <div className="flex items-center my-3">
          <div className="flex items-center w-40 gap-10 mr-2">
            <div className=" flex gap-2">
            <input
              type="radio"
              className="form-radio"
              name="role"
              id="donarRadio"
              value="donar"
              onChange={(e) => setRole(e.target.value)}
              defaultChecked
            />
            <label htmlFor="donarRadio" className="text-sm">
              Donar
            </label>
            </div>
            <div className="flex gap-2">
            <input
              type="radio"
              className="form-radio"
              name="role"
              id="hospitalRadio"
              value="hospital"
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="hospitalRadio" className="text-sm">
              Hospital
            </label>
            </div>
           <div className="flex gap-2">
           <input
              type="radio"
              className="form-radio"
              name="role"
              id="organisationRadio"
              value="organisation"
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="organisationRadio" className="text-sm">
              Organisation
            </label>
          </div>
           </div>
          {/* <div className="flex items-center space-x-2 mr-2">
            <input
              type="radio"
              className="form-radio"
              name="role"
              id="adminRadio"
              value="admin"
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="adminRadio" className="text-sm">
              Admin
            </label>
          </div> */}
          
        </div>

        {(() => {
          switch (true) {
            case formType === "login": {
              return (
                <>
                  <InputType
                    labelText="Email"
                    htmlfor="email"
                    inpuType="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText="Password"
                    htmlfor="password"
                    inpuType="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              );
            }
            case formType === "register": {
              return (
                <>
                  {(role === "admin" || role === "donar") && (
                    <InputType
                      labelText="Name"
                      htmlfor="name"
                      inpuType="text"
                      name="name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  )}
                  {role === "organisation" && (
                    <InputType
                      labelText="Organisation Name"
                      htmlfor="org"
                      inpuType="text"
                      name="org"
                      value={organisationName}
                      onChange={(e) => setOrganisationName(e.target.value)}
                    />
                  )}

                  {role === "hospital" && (
                    <InputType
                      labelText="Hospital Name"
                      htmlfor="hospital"
                      inpuType="text"
                      name="hospital"
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                    />
                  )}
                  <InputType
                    labelText="Email"
                    htmlfor="email"
                    inpuType="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText="Password"
                    htmlfor="password"
                    inpuType="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputType
                    labelText="Website"
                    htmlfor="website"
                    inpuType="text"
                    name="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                  <InputType
                    labelText="Address"
                    htmlfor="address"
                    inpuType="text"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <InputType
                    labelText="PhoneNo"
                    htmlfor="phone"
                    inpuType="text"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </>
              );
            }
          }
        })()}

        <div className="flex justify-between items-center">
          {formType === "login" ? (
            <p className="text-sm">
              Not registered yet? <Link to="/register"><span className=" ms-1 text-base underline text-blue-700">Register!</span></Link>
            </p>
          ) : (
            <p className="text-sm">
              Already have an account? <Link to="/login"><span className=" ms-1 text-base underline text-blue-700">Login!</span></Link>
            </p>
          )}
          <button
            type="submit" 
            className="bg-blue-500 mt-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
