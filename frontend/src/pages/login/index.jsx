import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

// i want to import logo(3).png from assests
import Logo from "../../assets/logo (3).png"

import Navbar from "../../components/Navbar"



import { useNavigate } from "react-router-dom";


import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import {
  setLogin,
  setUserId,
  setLogout,
  seRole
} from "../../services/redux/reducer/auth";
//==================================
const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);
  const navigate =useNavigate();
  //================handlelogin
  const login = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      console.log("result", result.data);
      if (result.data) {
        setStatus(true);
        setMessage(result.data.message);
        dispatch(setLogin(result.data.token));

        dispatch(setUserId(result.data.userId));
        dispatch(seRole(result.data.role))
        if(result.data.role===1){
          navigate("/admin/dashboard/pending/Services")
        }
        else if(result.data.role===2){
          navigate("/service/provider")
         }
         else if(result.data.role===3)
         {navigate("/client")}
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setErrorMessage(error.response.data.message);
      }
      setErrorMessage("Error happened while Login, please try again");
    }
  };

  return (

    <>
    {/* <Navbar/> */}
      <MDBContainer className="my-5 pt-4">
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6" className="log-img" >
              <MDBCardImage
                src={Logo}
                alt="login form"
                style={{ height: "560px" }}
                className="rounded-start w-100"
              />
            </MDBCol>

    <div>
      {/* login form */}
      <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow>
          <MDBCol col="10" md="6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              class="img-fluid"
              alt="Sample image"
            />
          </MDBCol>

          <MDBCol col="4" md="6">
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="formControlLg"
              type="email"
              size="lg"
              onChange={(e) => setEmail(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="formControlLg"
              type="password"
              size="lg"
              onChange={(e) => setPassword(e.target.value)}
            />


            <div className="text-center text-md-start mt-4 pt-2">
              <MDBBtn
                className="mb-0 px-5"
                size="lg"
                onClick={(e) => {
                  login(e);
                }}
              >
                Login
              </MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Don't have an account?
                <span
                  className="link-danger"
                  onClick={() => navigate("/register")} // Navigate to register page
                  style={{ cursor: "pointer" }}
                >
                  Register
                </span>
              </p>
            </div>
          </MDBCol>

          {status ? <p>{message}</p> : <p>{errorMessage}</p>}
        </MDBRow>

        <div
          className="d-flex flex-column flex-md-row text-center text-md-start 
      justify-content-between py-4 px-4 px-xl-5 bg-primary"
        >
          <div className="text-white mb-3 mb-md-0">
            Copyright © 2024. All rights reserved.
          </div>
        </div>
      </MDBContainer>
    </div>
  );
};

export default Login;
