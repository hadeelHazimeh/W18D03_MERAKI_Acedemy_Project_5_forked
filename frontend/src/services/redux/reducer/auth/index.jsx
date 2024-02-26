//slice 
import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

export const authSlice = createSlice({
    
    name: "auth",
    initialState: {
        token: localStorage.getItem("token")||null,
        userId: localStorage.getItem("userId")||null,
        isLoggedIn: localStorage.getItem("token")?true:false,
        role: localStorage.getItem("role") || null,
        userName:localStorage.getItem('userName') || "",
    },
    reducers: {
        setLogin: (state, action) => {
            console.log(action.payload);
            state.token=action.payload
            state.isLoggedIn=true
            localStorage.setItem("token", action.payload);
          },
          setUserId : (state, action) => {
            console.log(action.payload);
            state.userId=action.payload
        localStorage.setItem("userId", action.payload);
          },
          setUserName : (state, action) => {
            console.log(action.payload);
            state.userName=action.payload
        localStorage.setItem("userName", action.payload);
          },
          setLogout : (state, action) => {
           state.isLoggedIn=false
           state.token=null
           state.userId=null
           state.userName=""
           localStorage.clear()
          },
          seRole:(state, action)=>{
           state.role=action.payload
           localStorage.setItem("role", action.payload);
          }
    },
  });
  









 export const {
    setLogin,
    setUserId,
    setLogout,
    setUserName,
    seRole

  } = authSlice.actions; 
  
  export default authSlice.reducer;