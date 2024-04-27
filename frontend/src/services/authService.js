import { toast } from "react-toastify";
import { emailVerify, userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";

export const handleLogin = (e, email, password, role) => {
  e.preventDefault();

  try {
    if (!role || !email || !password) {
      return alert("Please Provide All Fields");
    }

    store.dispatch(userLogin({ role, email, password })).then((action) => {
      // Handle the action or its payload as needed
      if (userLogin.fulfilled.match(action)) {
        // Handle successful login
        // console.log("Login successful");
      } else if (userLogin.rejected.match(action)) {
       toast.warning(action.payload.message)
      }
    });
  } catch (error) {
    console.error(error);
  }
};




export const registerHandle = (
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
) => {
  e.preventDefault();
  try {
    const userData = {
      password,
      role,
      fullName,
      email,
      organisationName,
      hospitalName,
      website,
      address,
      phone,
    };

    store.dispatch(userRegister(userData)).then((action) => {
      // Handle the action or its payload as needed
      if (userLogin.fulfilled.match(action)) {
        // Handle successful login
        // console.log("Login successful");
      } else if (userLogin.rejected.match(action)) {
        // Handle login failure
        console.error("Login failed:", action.payload.message);
      }
    });
  } catch (error) {
    console.log(error);
  }
};


