import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userRegister } from "./authActions";


const initialState = {
    loading:false,
    user:null,
    error:null
}

const authSlice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{},
    extraReducers: (builder) => {
        //login
        builder.addCase(userLogin.pending, (state) => {
            state.loading=true;
            state.error = null;
        })
        builder.addCase(userLogin.fulfilled,(state, {payload}) => {
            state.loading = false;
            state.user = payload.user;
        })
        builder.addCase(userLogin.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload.error;
        })
        //registeruser
        builder.addCase(userRegister.pending, (state) => {
            state.loading=true;
            state.error = null;
        })
        builder.addCase(userRegister.fulfilled,(state, {payload}) => {
            state.loading = false;
            state.user = payload.user;
        })
        builder.addCase(userRegister.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload.error;
        })
    },

})


export default authSlice;