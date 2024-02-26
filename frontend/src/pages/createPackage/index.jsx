import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  MDBInput,
  MDBBtn,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCheckbox,
  MDBRipple ,
  MDBCardHeader,MDBListGroup,
  MDBListGroupItem
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { setPackages,setPackagesName } from "../../services/redux/reducer/packages";
import Swal from "sweetalert2";
import { Button, Modal, Nav } from "react-bootstrap";
//import { setPackagesName } from "../../services/redux/reducer/packages";
const CreatePackage = () => {
  //const [packages, setPackages] = useState([]);
  


  const [showSubmit,setShowSubmit]=useState(false)
  const { packages, packagesName} = useSelector((state) => state.packages);
  const [checkedPackages, setCheckedPackages] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const [modalShow, setModalShow] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [status, setStatus] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState({
    order_price: 0,
    eventDate: "",
    place: "",
  });
  const dispatch=useDispatch()
const [serviceInfo, setServiceInfo] = useState({service_name:"",
price:0,
description:"",
image:""
})
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
  //getPackages()
    axios
      .get(`http://localhost:5000/package/servicePackage`, {
        
      })
      .then((result) => {
        getPackages()
        console.log("result.data",result.data.result)
        dispatch(setPackages(result.data.result))
        

      })
      .catch((err) => {
        
        console.log(err)

      });
  }, []);
  //......................................................................................
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };
//..........................................................................

  const getOrderDetails = async (orderId) => {
    try {
      const order = await axios.get(
        `http://localhost:5000/orders/search_1/${orderId}`
      );
      console.log("order", order);
      setOrderDetails(order.data.result[0]);
      // setSelectedServices(order.data.result);
      // console.log("SelectedServices", order.data.result);

      // setModalShow(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response.data.message
      });
      console.error("Error getting order details:", error);
    }
  };
  //.........................................................................................
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    //loader
    try {
      const orderResult = await axios.post(
        `http://localhost:5000/orders/create`,
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("orderResult",orderResult.data.result[0]);
      setOrderId(orderResult.data.result[0].order_id);
     
      //finding the selected packages to set the price 
      const selectedPackage = packages.find(
        (elem)=> elem.package_id === checkedPackages
      )
      console.log("selectedPackage",selectedPackage)

       
      const updateOrderPrice= {
        ...orderData,
        order_price: selectedPackage.price, //  order price = package price
      }
    
  
      setOrderData(updateOrderPrice);
     console.log("orderData",orderData,selectedPackage.price)

      //selected packages with the created order
      const orderPackageResult = await axios.post(
        `http://localhost:5000/orders/orderService/${orderResult.data.result[0].order_id}`,
        { service_package_id: checkedPackages },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("orderPackageResult",orderPackageResult.data);
      // setStatus(true);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: orderPackageResult.data.message,
      });
      setShowPreview(true);
    } catch (error) {
      //setStatus(false);
      Swal.fire({
        icon: "error",
        text: error.response.data.message
      });
      console.error("Error creating order:", error);
    }
  };
  //........................................................................................

  const handleCheckboxChange = (packageId) => {
    console.log("checkedPackages", checkedPackages, "packageId", packageId);
    if (checkedPackages === packageId) {
      // If packageId is already checked, uncheck it
      setCheckedPackages(null);
    } else {
      setCheckedPackages(packageId);

    }
    setShowSubmit(true)
  };

  //......................................................................
  return (
    <div className="formContainer">
      
      <h6 style={{marginTop: "1rem", borderTop: "1px solid #00a3af", padding: "1rem 0 0 0"}}> Fill the information please </h6>
      <div>
      <MDBRow className="formInput">
          <MDBInput
            label="Event Date"
            type="date"
            id="eventDate"
            className="formInput"
            name="eventDate"
            value={orderData.eventDate}
            onChange={handleInputChange}
          />
        </MDBRow>
        <MDBRow className="formInput">
          <MDBInput
            label="Place"
            type="text"
            id="place"
            name="place"
            value={orderData.place}
            onChange={handleInputChange}
          />
        </MDBRow>
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
          setServiceInfo(pac)}} style={{cursor: "pointer"}}
           href='#' action noBorders  aria-current='false' className='px-3'>
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


      </div>
      <form>
        
      





        
        {showSubmit? <><div>
        <MDBBtn
                  onClick={handleSubmitOrder}
                  className="totalPriceButton"
                  style={{marginLeft: "35%"}}
                  color="dark"
                >
                  Submit your plan
                </MDBBtn></div></>:<></>}
        </form>

        <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{serviceInfo.service_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalshowing">
         <img src={serviceInfo.image} fluid /> 
        <h5><span style={{fontWeight:"bold"}}>Price: </span> {serviceInfo.price}</h5>
        <p>{serviceInfo.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    

      {showPreview ? (
        <div className="d-flex justify-content-end">
        <MDBBtn
          onClick={() => {
            setModalShow(true);
            console.log("orderData", orderData);
            getOrderDetails(orderId);
          }}
          className="totalPriceButton"
        >
          Preview the Order
        </MDBBtn>
      </div>
      ) : (
        <></>
      )}

      {/* <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Your EVENT is now planned</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orderDetails && (
            <div>
              <p>Event Date: {orderDetails.eventdate}</p>
              <p>Place: {orderDetails.place}</p>
              <p>Total Price: JD {orderDetails.order_price}</p>
              <p>Package Name :{orderDetails.package_name}</p>
              <p> Package details: {orderDetails.description}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal> */}
      
    </div>
  );
};

export default CreatePackage;
