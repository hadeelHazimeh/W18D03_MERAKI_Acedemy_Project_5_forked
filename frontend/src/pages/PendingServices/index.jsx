import React,{  useEffect, useState } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { setPendingServices,updateServiceStatusById } from "../../services/redux/reducer/PendingServices";
import {
  MDBCardTitle,
  MDBCardText,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBBtn,
  MDBInput,
  MDBRow,
  MDBTypography,
  MDBBtnGroup 
} from "mdb-react-ui-kit";

//http://localhost:5000/service/byStatus?status=pending



const PendingServices = () => {
    const dispatch = useDispatch();
      const { isLoggedIn,token } = useSelector(
    (state) =>
      
      state.auth
  );
    const getPendingService = () => {
        axios
          .get("http://localhost:5000/service/byStatus?status=pending")
          .then((result) => {
           console.log(result.data.result);
           dispatch(setPendingServices(result.data.result));
          })
          .catch((err) => {
            console.log(err);
          });
      };
      useEffect(() => {
      getPendingService()
      }, []);
  //---------------------------handel confirm /reject btn
      const handelStatus = (status,id) => {
         axios
          .put(`http://localhost:5000/service/${id}`,
          {status},
          {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((result) => {
           console.log(result.data.result);
          dispatch(updateServiceStatusById(id))
          })
          .catch((err) => {
            console.log(err);
          });
      };

        const {pendingServices} = useSelector((state)=> 
        state.pendingServices

    )   
    return (
        <>
<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' ,margin:"30px"}}>
          {pendingServices.map((service,i) => (
            <MDBCard key={i} style={{ width: 'calc(30.33% - 20px)', marginBottom: '30px',backgroundColor:"#f3f1ec",margin:"10px",  }}>
              <MDBCardBody>
              <MDBCardTitle>
                  <p
                    style={{
                      textAlign: "start",
                      fontFamily: "Raleway",
                      borderBottom: "1px solid #302B2B",paddingBottom:"10px",
                    }}
                  >
                    {" "}
                    {service.service_name}
                  </p>
                </MDBCardTitle>
                <MDBCardImage
                  src={service.image}
                  alt="..."
                  position="top"
                  className="cardImg"
                />

                <br />
                <MDBCardText>
                  <p
                    style={{
                      textAlign: "justify",
                      borderBottom: "1px  #00A3AF ",
                      fontFamily: "Raleway",
                      fontSize:"20px",
                     
                    }}
                  >
                    <strong>Price:</strong>{" "}
                    <span style={{ display: "inline" }}>
                      JD {service.price}
                    </span>
                  </p>
                  <p
                    style={{
                      textAlign: "justify",
                     paddingBottom:"10px",
                      fontFamily: "Merriweather",
                    }}
                  >
                    <strong>Description:</strong>{" "}
                    <span style={{ display: "inline" }}>{service.details}</span>
                  </p>
                </MDBCardText>
                <div style={{
  fontFamily:"Raleway",
  
    position: "absolute",
    bottom: "1px", 
    left: "20px",
    }}>
                <MDBBtn style={{backgroundColor:"#302B2B",paddingBottom:"10px",margin:"8px",fontWeight:"bold",}} onClick={()=>{
        handelStatus("confirmed",service.service_id)
      }} color='white' outline>
        Confirm
      </MDBBtn>
      
      <MDBBtn style={{backgroundColor:"#302B2B",paddingBottom:"10px",margin:"8px",fontWeight:"bold",}} onClick={()=>{
        handelStatus("Rejected",service.service_id)
      }} color='white' outline>
        Reject
      </MDBBtn>
      </div>
              </MDBCardBody>
            </MDBCard>
          ))}
        </div>
         
          
          
          </>
        );
}

export default PendingServices
