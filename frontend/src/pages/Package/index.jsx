import React, { useEffect,useState } from "react";
import { MDBInput, MDBBtn,MDBRow,MDBCard, MDBCardBody, MDBCardTitle, MDBCardText,MDBCardImage, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem  } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setPackages,setPackagesName } from "../../services/redux/reducer/packages";
const Packages= () => {
  const [filterElement, setFilterElement] = useState({index:0})
  const { packages, packagesName} = useSelector((state) => state.packages);

  const { isLoggedIn,token } = useSelector((state) => state.auth);
const dispatch=useDispatch()
  //-----------------------------
  const filterPackages=()=>{

  }
  //-----------------------------

  useEffect(() => {
      axios
        .get(`http://localhost:5000/package/servicePackage`, {
          
        })
        .then((result) => {
        
          
          dispatch(setPackages(result.data.result))
          dispatch(setPackagesName(result.data.result))
        })
        .catch((err) => {
          
          console.log(err)
  
        });
    }, []);

  return (
    <div>
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
{packagesName.map((name,i)=>{
  if(ele.package_name===name){
    return(<div key={i}>
      {ele.service_name}
    

    </div>)
  }
})}
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
    </div>
  )
}

export default Packages