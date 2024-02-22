import React, { useEffect } from "react";
import { MDBInput, MDBBtn,MDBRow,MDBCard, MDBCardBody, MDBCardTitle, MDBCardText,MDBCardImage, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem  } from 'mdb-react-ui-kit';
import { useSelector ,useDispatch} from "react-redux";
import axios from "axios";
import { useState } from "react";
import { setPackages,setPackagesName } from "../../services/redux/reducer/packages";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
function AdminServicesRender() {
  const dispatch=useDispatch()
    const { isLoggedIn,token } = useSelector((state) => state.auth);
   
    const { packages  } = useSelector((state) => state.packages);
    const [services, setServices] = useState([]);
    const [packageNameAdd, setPackageNameAdd] = useState("");

  
    //-----------------------------
  
const callPackages=()=>{
  axios
  .get(`http://localhost:5000/package/servicePackage`, {
    
  })
  .then((result) => {
   //console.log("services", result.data.result);
    
    dispatch(setPackages(result.data.result))
    dispatch(setPackagesName(result.data.result))


  })
  .catch((err) => {
    
    console.log(err)

  });
}
    //-----------------------------

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
    //-----------------------------

const AddServiceToPackage=(package_id,service_id)=>{
//console.log('hi', packageId,"  ",serviceId)
axios
      .post(
        "http://localhost:5000/service",
        { package_id,service_id} ,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
}

    //-----------------------------


    useEffect(() => {
      callServices()
      callPackages()
      }, []);
    //...............................
  return (
    <> <div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', margin:"20px"}}>
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
<div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' , margin:"20px"}}>
 
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
          <Dropdown as={ButtonGroup}>
      <Button variant="primary"  id="dropdown-split-variants-primary">Add</Button>

      <Dropdown.Toggle split variant="primary" id="dropdown-split-variants-primary" />

      <Dropdown.Menu>
      {packages.map((name,i)=>{
             return(
              <Dropdown.Item key={i} href="#/action-1" onClick={()=>{
              AddServiceToPackage(name.package_id,service.service_id)

              }}>{name.package_name }</Dropdown.Item>
             ) 
            })}
      </Dropdown.Menu>
    </Dropdown>

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