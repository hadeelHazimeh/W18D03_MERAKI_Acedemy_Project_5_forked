import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { useSelector } from "react-redux";
//import {isLoggedIn} from "../../services/redux/reducer/auth/index";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBRadio,
} from "mdb-react-ui-kit";

//......................................................

const Register = () => {
  const { isLoggedIn } = useSelector(
    (state) =>
      
      state.auth
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  //....................................

  const addNewUser = async () => {
    // e.preventDefault();
    console.log("register")
    try {
      const result = await axios.post("http://localhost:5000/users/register", {
        name,
        email,
        password,
        // role,
      });
      console.log("registerResult",result)
      if (result.data.success) {
        
        setStatus(true);
        setMessage(result.data.message);
      } else throw Error;
    } catch (error) {
      setStatus(false);
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while register, please try again");
    }
  };
  //............................

  return (
    <div>
      <MDBContainer fluid>
        <MDBRow className="justify-content-center align-items-center m-5">
          <MDBCard>
            <MDBCardBody className="px-4">
              <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">
                Registration Form
              </h3>

              <MDBCol md="6">
                <MDBInput
                  wrapperClass="mb-4"
                  label="FullName"
                  size="lg"
                  id="form1"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </MDBCol>

              <MDBCol md="6">
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  size="lg"
                  id="form4"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                
              </MDBCol>

              <MDBCol md="6">
                <MDBInput
                  wrapperClass="mb-4"
                  label="password"
                  size="lg"
                  id="form2"
                  type="password"
                   onChange={(e) => setPassword(e.target.value)}
                />
               
              </MDBCol>

              <MDBRow>
                <MDBCol md="6" className="mb-4">
                  <h6 className="fw-bold">Registed as : </h6>
                  <MDBRadio
                    name="inlineRadio"
                    id="inlineRadio1"
                    value="option1"
                    label="Event Planner"
                    inline
                  />
                  <MDBRadio
                    name="inlineRadio"
                    id="inlineRadio2"
                    value="option2"
                    label="Service Provider"
                    inline
                  />
                  <MDBRadio
                    name="inlineRadio"
                    id="inlineRadio3"
                    value="option3"
                    label="Client"
                    inline
                  />
                </MDBCol>
              </MDBRow>

              <MDBBtn className="mb-4" size="lg" onClick={()=>{ console.log("addNew");
              
              addNewUser()}}>
                Submit
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBRow>
        {status
              ? message && <div className="SuccessMessage">{message}</div>
              : message && <div className="ErrorMessage">{message}</div>}
      </MDBContainer>
    </div>
  );
};

export default Register;
