import React, { useEffect } from "react";
import { MDBInput, MDBBtn,MDBRow,MDBCard, MDBCardBody, MDBCardTitle, MDBCardText,MDBCardImage, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem ,MDBCheckbox} from 'mdb-react-ui-kit';
import { useSelector ,useDispatch} from "react-redux";
import axios from "axios";
import { useState } from "react";
import { setPackages,setPackagesName } from "../../services/redux/reducer/packages";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Swal from 'sweetalert2';
import Modal from "react-bootstrap/Modal";

function AdminServicesRender() {
  const [modalShow, setModalShow] = useState(false);

  const dispatch=useDispatch()
    const { isLoggedIn,token } = useSelector((state) => state.auth);
   
    const { packages,packagesName  } = useSelector((state) => state.packages);
    const [services, setServices] = useState([]);
    const [messageForAddService, setMessageForAddService] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    //-----------------------------

  //..................................................................................
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };
  //...................................................................................
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
      console.log(orderResult.data.result[0]);
     setOrderId(orderResult.data.result[0].order_id)
      //selected services with the created order
      const orderServiceResult = await axios.post(
        
        `http://localhost:5000/orders/orderService/${orderResult.data.result[0].order_id}`,
        { service_ids: checkedServices },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(orderServiceResult.data);
      setStatus(true);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: orderServiceResult.data.message,
      });
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleOrderPrice = () => {
    const totalOrderPrice = checkedServices.reduce((total, serviceId) => {
      const selectedService = services.find(
        (service) => service.service_id === serviceId
      );

      return total + selectedService.price;
    }, 0);
    console.log("total price", totalOrderPrice);
    setOrderData({ ...orderData, order_price: totalOrderPrice });
    setClickedPrice(true);
  };

  //.........................................................................................

  const handleCheckboxChange = (serviceId) => {
    //reduce HOF to calculate the total order price as summation of checked services

    console.log("checkedServices", checkedServices, "serviceId", serviceId);
    if (checkedServices.includes(serviceId)) {
      // Remove serviceId if already checked
      setCheckedServices(checkedServices.filter((id) => id !== serviceId));
    } else {
      // Add serviceId if not checked
      setCheckedServices([...checkedServices, serviceId]);
      setShowPrice(true);
    }
  };
  //..........................................................................................


  const getOrderDetails = async (orderId) => {
    try {
      const order = await axios.get(`http://localhost:5000/orders/search_1/${orderId}`);
      console.log("Detailsorder",order)
      setOrderDetails(order.data.result[0]);

      // setModalShow(true);
    } catch (error) {
      console.error("Error getting order details:", error);
    }
  };




  //..........................................................................................
    //-----------------------------

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
    
  
const AddServiceToPackage=async (package_id,service_id)=>{

    try {
      const result = await axios
      .post(
        "http://localhost:5000/package/create/servicePackage",
        { package_id,service_id} ,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      console.log("registerResult",result)
      if (result.data.success) {
        console.log(result.data);
        setMessageForAddService(true)

        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: "Service Added Successfully",
          confirmButtonText: 'Hide'
        });
        
      } else throw Error;
    } catch (error) {
      setMessageForAddService(false)

      console.log(err);
      Swal.fire({
        icon: "error",
        text: error.response.data.message,
      });

    }
}

    //-----------------------------


    useEffect(() => {
      callServices()
      }, []);
    //...............................
  return (
    <> <div className="formContainer">
    <h1>
      create  <a>package</a> 
    </h1>
    {/* onSubmit={handleSubmitOrder} */}
    <form >
    <MDBRow className="formInput">
        <MDBInput
          label="Package Name"
          type="text"
          id="Package Name"
          name="Package Name"
          //value={orderData.place}
          //onChange={handleInputChange}
        />
      </MDBRow>
      <MDBRow className="formInput">
        <MDBInput
          label="Place"
          type="text"
          id="place"
          name="place"
          // value={orderData.place}
          // onChange={handleInputChange}
        />
      </MDBRow>
      <MDBRow rows={4} className="formInput">
      <MDBInput wrapperClass='mb-4' textarea id='form4Example3' rows={4} label='Details' />
      </MDBRow>
      <MDBRow  className="formInput">
      <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
      </MDBRow>

      <div className="cardContainer">
        {services.map((service) => (
          <MDBCard className="serviceCard">
            <MDBCardBody>
            <MDBCardImage
            src={service.image}
            alt="..."
            position="top"
          />
              <MDBCardTitle>name: {service.service_name}</MDBCardTitle>

              <MDBCardText>
              
                Price: JD {service.price}
                <br />
                description: {service.details}
              </MDBCardText>

              <MDBCheckbox
                label="Select"
               // checked={checkedServices.includes(service.service_id)}
                // onChange={() => handleCheckboxChange(service.service_id)}
              />
            </MDBCardBody>
          </MDBCard>
        ))}
      </div>

      {true ? (
        <>
          <MDBBtn className="totalPriceButton" //onClick={handleOrderPrice}
          >
            calculate the total Price
          </MDBBtn>
        </>
      ) : (
        <></>
      )}

      {true ? (
        <>
          <MDBRow className="mb-4">
            <p>Total Price: JD{/*  {orderData.order_price} */}</p>
          </MDBRow>
        </>
      ) : (
        <></>
      )}

      <MDBBtn type="submit"   className="totalPriceButton">Submit your plan</MDBBtn>
    </form>
    
    <MDBBtn onClick={() => {setModalShow(true)
    console.log("orderData.order_id",orderData)
    //getOrderDetails(orderId)
  
  
  }
    
  
  
  
  } 
     
      
      className="totalPriceButton">
        Preview the Order
      </MDBBtn>

      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Your EVENT is now planned</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {true && (
    <div>
{/*               <p>Event Date: {orderDetails.eventDate}</p>
      <p>Place: {orderDetails.place}</p>
      <p>Total Price: JD {orderDetails.order_price}</p>
      <p>Services:</p> */}
      
    </div>
  )}

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    
  </div></>
  )
}

export default AdminServicesRender