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
          setLogout : (state, action) => {
         
           state.isLoggedIn=false
           state.token=null
           state.userId=null
           localStorage.clear()
          
          },
    },
  });
  









 export const {
    setLogin,
    setUserId,
    setLogout
  } = authSlice.actions; 
  
  export default authSlice.reducer;