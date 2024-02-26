import React, { useEffect,useState } from "react";
import { MDBInput, MDBBtn,MDBRow,MDBCard, MDBCardBody, MDBCardTitle, MDBCardText,MDBCardImage, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem ,MDBBadge, MDBListGroup, MDBListGroupItem,MDBCardHeader, MDBRipple ,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter} from 'mdb-react-ui-kit';
import { Button, Modal, Nav ,Image} from "react-bootstrap";

import"./style.css"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setPackages,setPackagesName } from "../../services/redux/reducer/packages";
const Packages= () => {
  const [basicModal, setBasicModal] = useState(false);
  const toggleOpen = () => setBasicModal(!basicModal);
  const { packages, packagesName} = useSelector((state) => state.packages);
  const [modalShow, setModalShow] = useState(false);
const [serviceInfo, setServiceInfo] = useState({service_name:"",
price:0,
description:"",
image:""
})
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
   
      axios
        .get(`http://localhost:5000/package/servicePackage`, {
          
        })
        .then((result) => {
          getPackages()
          
          dispatch(setPackages(result.data.result))
         

        })
        .catch((err) => {
          
          console.log(err)
  
        });
    }, []);

  return (
    <div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap' ,alignContent:"center", gap: '20px', margin:"20px"}}>
   
    {packagesName.map((ele,i) => (
      <MDBCard key={i} style={{ maxWidth: '25rem' }}>
       
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
           
          <MDBCardHeader style={{fontSize:"20px"}}>services</MDBCardHeader>
            {packages.map((pac,i)=>{
              if(ele.package_name===pac.package_name){
                return(<div key={i}>
                   

      <MDBListGroup style={{ minWidth: '22rem' }} light>
      <MDBRipple>
        <MDBListGroupItem onClick={()=>{setModalShow(true)
           setServiceInfo(pac)}} style={{cursor: "pointer"}} href='#' action noBorders  aria-current='false' className='px-3'>
        {pac.service_name}
        </MDBListGroupItem>
       
      </MDBRipple>

      </MDBListGroup>

   </div>)
              }
            })}
      </MDBCard>
        </MDBCardBody> 
      </MDBCard>
    ))}
    </div>
   
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{serviceInfo.service_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalshowing">
        <Image src={serviceInfo.image} fluid />
        <h5><span style={{fontWeight:"bold"}}>Price: </span> {serviceInfo.price}</h5>
        <p>{serviceInfo.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    
  )
}

export default Packages