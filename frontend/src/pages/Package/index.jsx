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
          dispatch(setPackagesName(result.data.result))

        })
        .catch((err) => {
          
          console.log(err)
  
        });
    }, []);

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', margin:"20px"}}>
        
      
    </div>
    </div>
  )
}

export default Packages