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
// i want to import logo(3).png from assests
import Logo from "../../assets/logo (3).png"
import "./style.css"


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
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


        dispatch(setUserId(result.data.userId));
        dispatch(seRole(result.data.role))
        if(result.data.role===1){
          navigate("/admin/dashboard/pending/Services")
        }
        
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setErrorMessage(error.response.data.message);
      }
      setErrorMessage("Error happened while Login, please try again");
    }

  const handleLoginClick = () => {
    axios
      .post("http://localhost:5000/users/login", { email, password })
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });

  };

  return (
    <>
      <MDBContainer className="my-4">
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6">
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
      </MDBContainer>
    </>
  );
}

export default Login;
