import React, { useEffect } from "react";
import { MDBInput, MDBBtn,MDBRow,MDBCard, MDBCardBody, MDBCardTitle, MDBCardText,MDBCardImage, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem  } from 'mdb-react-ui-kit';
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";


function AdminServicesRender() {
    const { isLoggedIn,token } = useSelector((state) => state.auth);
   
    const [services, setServices] = useState([]);
   
    //-----------------------------
    useEffect(() => {
        axios
          .get(`http://localhost:5000/service`, {
            
          })
          .then((result) => {
           // console.log("services", result.data.services);
            setServices(result.data.services);
            
            
          })
          .catch((err) => {
            
            console.log(err);
    
          });
      }, []);
    //...............................
  return (
    <> <div>
    
<div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
    {services.map((service) => (
      <MDBCard key={service.id} style={{ maxWidth: '20rem' }}>
        <MDBCardBody>
        <MDBCardImage
            src={service.image}
            alt="..."
            position="top"
          />
          <MDBCardTitle>{service.name}</MDBCardTitle>
          <MDBCardText>
            Price: ${service.price}
            <br />
            {service.description}
          </MDBCardText>
          <MDBDropdown group>
        <MDBDropdownToggle color='primary'>Action</MDBDropdownToggle>
        <MDBDropdownMenu>
          <MDBDropdownItem link>Action</MDBDropdownItem>
          <MDBDropdownItem link>Another action</MDBDropdownItem>
          <MDBDropdownItem link>Something else here</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
     
        </MDBCardBody>
      </MDBCard>
    ))}
  </div>
  <MDBRow className='mb-4'>
    
   </MDBRow>

  
    
  </div></>
  )
}

export default AdminServicesRender