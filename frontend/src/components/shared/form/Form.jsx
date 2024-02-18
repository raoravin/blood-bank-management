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
    <div className="col-md-4 form-container">
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
        <h1 className="text-center">{formTitle}</h1>
        <hr />
        <div className="d-flex mb-3">
          <div className="form-check d-flex gap-2 me-2">
            <input
              type="radio"
              className="from-check-input"
              name="role"
              id="donarRadio"
              value={"donar"}
              onChange={(e) => setRole(e.target.value)}
              defaultChecked
            />
            <label htmlFor="donarRadio" className=" form-check-label">
              donar
            </label>
          </div>
          <div className="form-check d-flex gap-2 me-2">
            <input
              type="radio"
              className="from-check-input"
              name="role"
              id="adminRadio"
              value={"admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="adminRadio" className=" form-check-label">
              Admin
            </label>
          </div>
          <div className="form-check d-flex gap-2 me-2">
            <input
              type="radio"
              className="from-check-input"
              name="role"
              id="hosapitalRadio"
              value={"hospital"}
              onChange={(e) => setRole(e.target.value)}
            />  
            <label htmlFor="donarRadio" className=" form-check-label">
              Hospital
            </label>
          </div>
          <div className="form-check d-flex gap-2 me-2">
            <input
              type="radio"
              className="from-check-input"
              name="role"
              id="organisationRadio"
              value={"organisation"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="donarRadio" className=" form-check-label">
              Organisation
            </label>
          </div>
        </div>

        {(() => {
          // eslint-disable-next-line
          switch (true) {
            case formType === "login": {
              return (
                <>
                  <InputType
                    labelText={"Email"}
                    htmlfor={"email"}
                    inpuType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={"Password"}
                    htmlfor={"password"}
                    inpuType={"password"}
                    name={"password"}
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
                      labelText={"Name"}
                      htmlfor={"name"}
                      inpuType={"text"}
                      name={"name"}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  )}
                  {role === "organisation" && (
                    <InputType
                      labelText={"Organisation Name"}
                      htmlfor={"org"}
                      inpuType={"text"}
                      name={"org"}
                      value={organisationName}
                      onChange={(e) => setOrganisationName(e.target.value)}
                    />
                  )}

                  {role === "hospital" && (
                    <InputType
                      labelText={"Hospital Name"}
                      htmlfor={"hospital"}
                      inpuType={"text"}
                      name={"hospital"}
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                    />
                  )}
                  <InputType
                    labelText={"Email"}
                    htmlfor={"email"}
                    inpuType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={"Password"}
                    htmlfor={"password"}
                    inpuType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputType
                    labelText={"Website"}
                    htmlfor={"website"}
                    inpuType={"text"}
                    name={"website"}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                  <InputType
                    labelText={"Address"}
                    htmlfor={"address"}
                    inpuType={"text"}
                    name={"address"}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <InputType
                    labelText={"PhoneNo"}
                    htmlfor={"phone"}
                    inpuType={"text"}
                    name={"phone"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </>
              );
            }
          }
        })()}

        <div className="d-flex flex-row justify-content-between">
          {formType === "login" ? (
            <p>
              Not Register Yet ?<Link to="/register"> Register !</Link>
            </p>
          ) : (
            <p>
              {" "}
              Have account ?<Link to="/login"> Login !</Link>
            </p>
          )}
           <button type="submit" className="btn btn-primary">{submitBtn}</button>
        </div>

       
      </form>
    </div>
  );
};

export default Form;
