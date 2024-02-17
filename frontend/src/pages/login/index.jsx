
import React, {  useState, useEffect } from "react";
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./style.css"
import { setLogin ,setUserId,setLogout} from "../../services/redux/reducer/auth";
//==================================
const Login = () => {
  const dispatch=useDispatch()
const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
const[errorMessage,setErrorMessage]=useState("")
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);
  //handlelogin

  const login = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      console.log("result",result.data)
      if (result.data) {
       setStatus(true);
       setMessage(result.data.message);
        dispatch(setLogin(result.data.token))

        dispatch(setUserId(result.data.userId))
        
      } else throw Error;
    } catch (error) {
      
      if (error.response && error.response.data) {
        return setErrorMessage(error.response.data.message);
      }
      setErrorMessage("Error happened while Login, please try again");
    }
  };

  return (
    <div>


 
    <MDBContainer fluid className="p-3 my-5 h-custom">

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" 
          class="img-fluid" alt="Sample image" />
        </MDBCol>

        <MDBCol col='4' md='6'>

          

          

          <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" 
              onChange={(e) => setEmail(e.target.value)}  
                
                />
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"
          onChange={(e) => setPassword(e.target.value)}
          />

          

          <div className='text-center text-md-start mt-4 pt-2'>
            <MDBBtn className="mb-0 px-5" size='lg' onClick={(e) => {
              login(e);
            }}>Login</MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? 
          
            <a href="#!" className="link-danger">Register</a></p>
          </div>

        </MDBCol>

        {status ?  <p>{message}</p>:  <p>{errorMessage}</p>}

      </MDBRow>

      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

        <div className="text-white mb-3 mb-md-0">
          Copyright © 2024. All rights reserved.
        </div>

       

      </div>


    </MDBContainer>
  

  




    </div>
  )
}

export default Login