import React, { useEffect,useState } from "react";
import { MDBInput, MDBBtn,MDBRow,MDBCard, MDBCardBody, MDBCardTitle, MDBCardText,MDBCardImage, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem ,MDBBadge, MDBListGroup, MDBListGroupItem,MDBCardHeader, MDBRipple ,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter} from 'mdb-react-ui-kit';
import { Button, Modal, Nav ,Image, CardLink, CardText, CardTitle} from "react-bootstrap";

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
      {/* <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' ,margin:"30px"}}>
          {Packages.map((service) => (
            <MDBCard  style={{ width: 'calc(30.33% - 20px)', marginBottom: '30px',backgroundColor:"#f3f1ec",margin:"10px",  }}>
              <MDBCardBody>

                <MDBCardImage
                  src={service.image}
                  alt="..."
                  position="top"
                  className="cardImg"
                />
                <MDBCardTitle>
                  <p
                    style={{
                      textAlign: "",
                      fontFamily: "Raleway",
                      borderBottom: "1px solid #302B2B",
                    }}
                  >
                    {" "}
                    {service.service_name}
                  </p>
                </MDBCardTitle>
                <br />
                <MDBCardText>
                  <p
                    style={{
                      textAlign: "justify",
                      borderBottom: "1px  #00A3AF ",
                      fontFamily: "Raleway",
                      fontSize:"20px"
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
                <MDBBtn style={{backgroundColor:"#302B2B"}} onClick={()=>{
        handelStatus("confirmed",service.service_id)
      }} color='white' outline>
        Confirm
      </MDBBtn>
      
      <MDBBtn style={{backgroundColor:"#302B2B"}} onClick={()=>{
        handelStatus("Rejected",service.service_id)
      }} color='white' outline>
        Reject
      </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          ))}
        </div> */}
         
          
      <div  style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' ,margin:"30px"}}>
   
    {packagesName.map((ele,i) => (
      <MDBCard key={i} style={{  width: 'calc(36.33% - 20px)', marginBottom: '30px',backgroundColor:"#f3f1ec",margin:"10px" }}>
       
        <MDBCardBody>
        <MDBCardImage
            src={ele.image}
            alt="..."
            position="top"
          />
          <MDBCardTitle style={{
                      textAlign: "",
                      fontFamily: "Raleway",
                      borderBottom: "1px solid #302B2B",
                    }}>{ele.
package_name}</MDBCardTitle>
<MDBCardText>
            
<p
                    style={{
                      textAlign: "justify",
                      borderBottom: "1px  #00A3AF ",
                      fontFamily: "Raleway",
                      fontSize:"20px"
                    }}
                  >
                    <strong>Price:</strong>{" "}
                    <span style={{ display: "inline" }}>
                      {ele.price} JD 
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
                    <span style={{ display: "inline" }}> {ele.description}</span>
                  </p>
           
           
          
          </MDBCardText>
        
            {packages.map((pac,i)=>{
              if(ele.package_name===pac.package_name){
                return(<div className="service-name" style={{
                  fontFamily:"Raleway",
                  fontWeight:"bold",
                    position: "",
                    backgroundColor:"white",margin:"0"
                    }} key={i}>
                      
                      
                      <div>
                     
<p onClick={()=>{setModalShow(true)
           setServiceInfo(pac)}} style={{cursor: "pointer",
                        fontWeight:"normal",
           
             border:"1px solid grey",
           
            height:"50px",
            textAlign:"center",
            marginTop:"3px",
            marginBottom:"8px",
            paddingTop:"10px"
            ,  fontFamily: "Raleway"
             
              }} > {pac.service_name}</p>
              
              </div>



   {/*    <MDBListGroup style={{ minWidth: 'fit-content' }} light>
      <MDBRipple>
        <MDBListGroupItem onClick={()=>{setModalShow(true)
           setServiceInfo(pac)}} style={{cursor: "pointer",
            fontFamily:"Raleway",
            fontWeight:"normal",
            backgroundColor:"",
             border:"1px solid grey",
            
             
              }} href='#' action  aria-current='false' className='px-3'>
        {pac.service_name}
        </MDBListGroupItem>
       
      </MDBRipple>

      </MDBListGroup> */}

   </div>)
              }
            })}
   
        </MDBCardBody> 
      </MDBCard>
    ))}
    </div>
   
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header style={{  backgroundColor:"#302B2B"}} closeButton>
          <Modal.Title style={{
                      textAlign: "",
                      fontFamily: "Raleway",
                      borderBottom: "1px  ",
                      color:"white"
                    
                    }}>{serviceInfo.service_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body  >
        <Image src={serviceInfo.image} fluid />

        <p
                    style={{
                      textAlign: "justify",
                      borderBottom: "1px  #00A3AF ",
                      fontFamily: "Raleway",
                      fontSize:"20px",
                      margin:"3px",
                     
                    }}
                  >
                    <strong>Price:</strong>{" "}
                    <span style={{ display: "inline" }}>
                      {serviceInfo.price} JD 
                    </span>
                  </p>
                  <p
                    style={{
                      textAlign: "justify",
                     paddingBottom:"10px",
                      fontFamily: "Raleway",
                      borderBottom:"none"
                    }}
                  >
                    <strong>Description:</strong>{" "}
                    <span style={{ display: "inline" }}> {serviceInfo.description}</span>
                  </p>
           
       
        </Modal.Body>
        <Modal.Footer >
          <Button variant="dark" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    
  )
}

export default Packages