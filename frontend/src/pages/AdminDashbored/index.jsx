import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,

  MDBCardImage
} from 'mdb-react-ui-kit';
import {
  Button,
  Modal,
  Nav,
  Image,
  CardLink,
  CardText,
  CardTitle,
} from "react-bootstrap";
import AdminSideBar from '../../components/AdminSideBar'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Container, NavLink } from 'react-bootstrap';
import Login from '../login';

const AdminDashboard = () => {
  const { isLoggedIn,token,role } = useSelector((state) => state.auth);
const [roleLocal, setRoleLocal] = useState(localStorage.getItem("role"))
  const navigate=useNavigate()
  const navHome=()=>{
    navigate("/login")
  }
  return (
    <> 
 {isLoggedIn?<> { roleLocal==="1" ?<><div style={{height:"100vh",display:"grid",gridTemplateColumns:"0.2fr 4fr"}}>
    <AdminSideBar/>
    <div> <Outlet/></div>
       
    
    </div></>:<Container style={{display:"flex",justifyContent:"center" ,backgroundColor:"",}} className=" text-center" ><MDBCard  style={{maxWidth:"63rem" ,justifyContent:"center",marginTop:"30px" ,backgroundColor:"#212526",}} >
        <MDBCardImage position='top' src='https://freefrontend.com/assets/img/403-forbidden-html-templates/403-Forbidden-CSS-Hover.gif' alt='...' />
        <MDBCardBody>
          <MDBCardTitle style={{textAlign:"center",fontWeight:"bold",fontFamily:"Raleway",color:"whitesmoke"}}>access to this page is restricted</MDBCardTitle>
      
        </MDBCardBody>
      </MDBCard></Container> 

    
   }</>: <> 
   
   
   <Modal show={!isLoggedIn} /* onHide={() => } */>
        <Modal.Header style={{ backgroundColor: "#302B2B" ,textAlign:"center"}} closeButton>
          <Modal.Title
            style={{
              textAlign: "center",
              fontFamily: "Raleway",
              borderBottom: "1px  ",
              color: "white"
            }}
          >
            You Must login first 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#f3f1ec" }}>
          <Image src="https://res.cloudinary.com/dycpjbdto/image/upload/v1708778225/new-removebg-preview_xdfemo.png" fluid />

          
          <p
            style={{
              textAlign: "center",
              paddingBottom: "10px",
              fontFamily: "Merriweather",
              borderBottom: "none",
              marginTop:"10px"
            }}
          >
            <strong>Have an Account</strong>{" "}
            
          </p>
          <Button
            style={{textAlign: "center", fontWeight: "bold",margin:"auto",display:"block",width:"50%"  }}
            variant="dark"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>  
          <p
            style={{
              textAlign: "center",
              paddingBottom: "10px",
              fontFamily: "Merriweather",
              borderBottom: "none"
            }}
          >  
            <strong>Or <br/> Register</strong>{" "}
            
          </p>
          <Button
            style={{ fontWeight: "bold",display:"block",margin:"auto",width:"50%" }}
            variant="dark"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#f3f1ec" }}>
        
        </Modal.Footer>
      </Modal>
   
   
   
   
   
   
   
    </> }
   

    </>
  );
};

export default AdminDashboard;
