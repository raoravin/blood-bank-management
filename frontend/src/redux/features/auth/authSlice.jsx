import { createSlice } from "@reduxjs/toolkit";
import { emailVerify, getCurrentUser, logoutUser, userLogin, userRegister } from "./authActions";


const initialState = {
    loading:false,
    user:null,
    error:null,
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
            state.error = payload?.message;
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
            state.error = payload?.message;
        })

        //verify-email
        builder.addCase(emailVerify.pending, (state) => {
            state.loading=true;
            state.error = null;
        })
        builder.addCase(emailVerify.fulfilled,(state, {payload}) => {
            state.loading = false;
            state.user = payload.user;
        })
        builder.addCase(emailVerify.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload?.message;
        })
        //get user
        builder.addCase(getCurrentUser.pending, (state) => {
            state.loading=true;
            state.error = null;
        })
        builder.addCase(getCurrentUser.fulfilled,(state, {payload}) => {
            state.loading = false;
            state.user = payload.user;
        })
        builder.addCase(getCurrentUser.rejected, (state, {payload}) => {
            state.loading = false;
            state.user = null;

            
        })
        //logout
        builder.addCase(logoutUser.pending, (state) => {
            state.loading=true;
            state.error = null;
        })
        builder.addCase(logoutUser.fulfilled,(state, {payload}) => {
            state.loading = false;
            state.user = null;
        })
        builder.addCase(logoutUser.rejected, (state, {payload}) => {
            state.loading = false;
        })
    },

})


export default authSlice;