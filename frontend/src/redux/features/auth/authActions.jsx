import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";




export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true, // Include this option to send credentials with the request
      };
      
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        { role, email, password },config
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

      const config = {
        withCredentials: true, // Include this option to send credentials with the request
      };
      


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
        
      const { data } = await axios.post("http://localhost:8080/api/v1/auth/register", userData,config);
      if (data.success) {
        toast.success(data.message);
      }
      // You should return the data from the successful request as the fulfilled action payload
      return data;
    } catch (error) {
      // Use rejectWithValue to return an object with a payload property
        if (error.response && error.response.data.message) {
            const errorMessage = error.response.data.message;
            return rejectWithValue({ message: errorMessage });
        } else {
            const errorMessage = error.message;
            return rejectWithValue({ message: errorMessage });
        }
    }
  }
);




//current user

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };

      const { data } = await axios.get(
        'http://localhost:8080/api/v1/auth/current-user',
        config
      );
      
      // You should return the data from the successful request as the fulfilled action payload
      return data;
    } catch (error) {
      
      if (error.response && error.response.data.message) {
        const errorMessage = error.response.data.message;
        
        return rejectWithValue({ message: errorMessage });
      } else {
        const errorMessage = error.message;
        
        return rejectWithValue({ message: errorMessage });
      }
    }
  }
);

export const logoutUser= createAsyncThunk(
  "auth/logoutUser",
  async(_, {dispatch, rejectWithValue} ) => {
    try {
      const config = {
        withCredentials: true,
      };

       await axios.get("http://localhost:8080/api/v1/auth/logout", config)

      return null;

      
    } catch (error) {
      if (error.response && error.response.data.message) {
        const errorMessage = error.response.data.message;
        
        return rejectWithValue({ message: errorMessage });
      } else {
        const errorMessage = error.message;
        
        return rejectWithValue({ message: errorMessage });
      }
    }
  }
)