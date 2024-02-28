import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import Logo from "../../assets/logo (3).png"; // Importing logo from assets
import "./style.css";
import Navbar from "../../components/Navbar";
import { useDispatch } from "react-redux";

import { setLogin, setUserId, seRole, setUserName } from "../../services/redux/reducer/auth";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginClick = async () => {
    try {
      const result = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      console.log("result", result.data);
      if (result.data) {
        dispatch(setLogin(result.data.token));
        dispatch(setUserId(result.data.userId));
        dispatch(seRole(result.data.role));

        dispatch(setUserName(result.data.username));

        if (result.data.role === 1) {
          navigate("/admin/dashboard/pending/Services");
        } else if (result.data.role === 2) {
          navigate("/service/provider");
        } else if (result.data.role === 3) {
          navigate("/client");
        }
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error occurred while logging in. Please try again.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <MDBCol md="10" className="my-4 mx-auto">
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6" className="log-img">
              <MDBCardImage
                src={Logo}
                alt="login form"
                style={{ height: "560px" }}
                className="rounded-start w-100"
              />
            </MDBCol>

            <MDBCol md="6" className="mt-5">
              <MDBCardBody className="d-flex flex-column">
                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Sign into your account
                </h5>

                <MDBInput
                  wrapperClass="mb-4"
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  size="lg"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />

                <MDBBtn
                  className="mb-4 px-5"
                  color="dark"
                  size="lg"
                  onClick={handleLoginClick}
                >
                  Login
                </MDBBtn>
                <p className="text-danger">{errorMessage}</p>
                <a className="small text-muted" href="#!">
                  Forgot password?
                </a>
                <p className="mb-5 pb-lg-2 pt-3" style={{ color: "#393f81" }}>
                  Don't have an account?{" "}
                  <a href="register" style={{ color: "#393f81" }}>
                    Register here
                  </a>
                </p>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBCol>
    </>
  );
}

export default Login;