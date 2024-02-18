import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        { role, email, password }
      );
      if (data.success) {
        toast.success(data.message);
      }
      // You should return the data from the successful request as the fulfilled action payload
      return data;
    } catch (error) {
      // Use rejectWithValue to return an object with a payload property
      if (error.response && error.response.data.message) {
        return rejectWithValue({ message: error.response.data.message });
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    {
      password,
      role,
      fullName,
      email,
      organisationName,
      hospitalName,
      website,
      address,
      phone,
    },
    { rejectWithValue }
  ) => {
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
        
      const { data } = await axios.post("http://localhost:8080/api/v1/auth/register", userData);
      if (data.success) {
        toast.success(data.message);
      }
      // You should return the data from the successful request as the fulfilled action payload
      return data;
    } catch (error) {
      // Use rejectWithValue to return an object with a payload property
  if (error.response && error.response.data.message) {
    const errorMessage = error.response.data.message;
    toast.error(errorMessage);
    return rejectWithValue({ message: errorMessage });
  } else {
    const errorMessage = error.message;
    toast.error(errorMessage);
    return rejectWithValue({ message: errorMessage });
  }
    }
  }
);
