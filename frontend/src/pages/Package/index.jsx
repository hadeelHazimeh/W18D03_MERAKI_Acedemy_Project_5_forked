import React, { useEffect } from "react";
import { MDBInput, MDBBtn,MDBRow,MDBCard, MDBCardBody, MDBCardTitle, MDBCardText,MDBCardImage, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem  } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { setPackages } from "../../services/redux/reducer/packages";
const Packages= () => {
  const { isLoggedIn,token } = useSelector((state) => state.auth);
const dispatch=useDispatch()
  //-----------------------------
  useEffect(() => {
      axios
        .get(`http://localhost:5000/package/servicePackage`, {
          
        })
        .then((result) => {
         console.log("services", result.data.result);
          
          dispatch(setPackages(result.data.result))
        })
        .catch((err) => {
          
          console.log(err)
  
        });
    }, []);

  return (
    <div>index</div>
  )
}

export default Packages