import React, { useEffect,useState } from "react";
import { MDBInput, MDBBtn,MDBRow,MDBCard, MDBCardBody, MDBCardTitle, MDBCardText,MDBCardImage, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem ,MDBBadge, MDBListGroup, MDBListGroupItem,MDBCardHeader } from 'mdb-react-ui-kit';

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setPackages,setPackagesName } from "../../services/redux/reducer/packages";
const Packages= () => {

  const { packages, packagesName} = useSelector((state) => state.packages);

  const { isLoggedIn,token } = useSelector((state) => state.auth);
const dispatch=useDispatch()
  //-----------------------------
  const getPackages=()=>{
    axios
    .get(`http://localhost:5000/package`)
    .then((result) => {
    
      console.log('first', result.data.result)

      dispatch(setPackagesName(result.data.result))

    })
    .catch((err) => {
      
      console.log(err)

    });
  }
  //-----------------------------

  useEffect(() => {
    getPackages()
      axios
        .get(`http://localhost:5000/package/servicePackage`, {
          
        })
        .then((result) => {
        
          
          dispatch(setPackages(result.data.result))
          

        })
        .catch((err) => {
          
          console.log(err)
  
        });
    }, []);

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', margin:"20px"}}>
   
    {packagesName.map((ele,i) => (
      <MDBCard key={i} style={{ maxWidth: '20rem' }}>
       
        <MDBCardBody>
        <MDBCardImage
            src={ele.image}
            alt="..."
            position="top"
          />
          <MDBCardTitle>{ele.
package_name}</MDBCardTitle>
<MDBCardText>
            
            
            {ele.description}
            <br />
            Price: ${ele.price}
          </MDBCardText>
          <MDBCard>
          <MDBCardHeader>services</MDBCardHeader>
            {packages.map((pac,i)=>{
              if(ele.package_name===pac.package_name){
                return(<div key={i}>
                   
      <MDBListGroup flush>
        <MDBListGroupItem>{pac.service_name}</MDBListGroupItem>
     
      </MDBListGroup>
   </div>)
              }
            })}
      </MDBCard>
        </MDBCardBody> 
      </MDBCard>
    ))}
    </div>
      
    </div>
    
  )
}

export default Packages