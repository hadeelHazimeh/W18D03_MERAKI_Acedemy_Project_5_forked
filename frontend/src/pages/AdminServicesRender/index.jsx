import React, { useEffect } from "react";
import { MDBInput, MDBBtn,MDBRow,MDBCard, MDBCardBody, MDBCardTitle, MDBCardText,MDBCardImage, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem  } from 'mdb-react-ui-kit';
import { useSelector ,useDispatch} from "react-redux";
import axios from "axios";
import { useState } from "react";
import { setPackages,setPackagesName } from "../../services/redux/reducer/packages";

function AdminServicesRender() {
  const dispatch=useDispatch()
    const { isLoggedIn,token } = useSelector((state) => state.auth);
   
    const { packages ,packagesName } = useSelector((state) => state.packages);
    const [services, setServices] = useState([]);
  
    //-----------------------------
  
const callPackages=()=>{
  axios
  .get(`http://localhost:5000/package/servicePackage`, {
    
  })
  .then((result) => {
   console.log("services", result.data.result);
    
    dispatch(setPackages(result.data.result))
    dispatch(setPackagesName(result.data.result))


  })
  .catch((err) => {
    
    console.log(err)

  });
}

const callServices=()=>{
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
}
    useEffect(() => {
      callServices()
      callPackages()
      }, []);
    //...............................
  return (
    <> <div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
    {packages.map((ele,i) => (
      <MDBCard key={i} style={{ maxWidth: '20rem' }}>
       
        <MDBCardBody>
        <MDBCardImage
            src={ele.image}
            alt="..."
            position="top"
          />
          <MDBCardTitle>{ele.
package_name}</MDBCardTitle>
      {/*     
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
      </MDBDropdown> */}
     
        </MDBCardBody> 
      </MDBCard>
    ))}
    </div>
<div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
 
    {services.map((service,i) => (
      <MDBCard key={i} style={{ maxWidth: '20rem' }}>
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