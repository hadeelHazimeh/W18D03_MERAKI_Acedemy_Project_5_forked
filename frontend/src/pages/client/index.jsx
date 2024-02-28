import { useEffect } from "react";
import {
  MDBInput,
  MDBBtn,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCheckbox,

  MDBCardImage
} from "mdb-react-ui-kit";
import {Button,Modal,Nav} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";
 import { Container } from "react-bootstrap";
import "./style.css"
import Loading from "../../components/loader";
//.....................................

const Client = () => {
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [showPrice, setShowPrice] = useState(false);
  const navigate = useNavigate();
  const [ClickedPrice, setClickedPrice] = useState(false);
   
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState(false);
  const [checkedServices, setCheckedServices] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { isLoggedIn, token, role } = useSelector((state) => state.auth);
  const [roleLocal, setRoleLocal] = useState(localStorage.getItem("role"));
  const [orderDetails, setOrderDetails] = useState(null);
  const [SelectedServices, setSelectedServices] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState({
    order_price: 0,
    event_name: "",
    eventDate: "",
    place: "",
    phone:""
  });

  //...................................................................................
  useEffect(() => {
    axios
      .get(`http://localhost:5000/service`)
      .then((services) => {
        console.log("services", services.data);
        setServices(services.data.services);
        setLoadingStatus(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      console.log(orderResult.data);
      setOrderId(orderResult.data.result[0].order_id);
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
      setShowPreview(true);
    } catch (error) {
      
      console.error("Error creating order:", error);
    }
  };
  //.......................................................................................
  const handleOrderPrice = (e) => {
    e.preventDefault();
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
      const order = await axios.get(
        `http://localhost:5000/orders/search_1/${orderId}`
      );
      console.log("Detailsorder", order);
      console.log("phone", order.data.result[0].phone);

      setOrderDetails(order.data.result[0]);
      setLoadingStatus(false)
      setSelectedServices(order.data.result);
      console.log("SelectedServices", order.data.result);

      // setModalShow(true);
    } catch (error) {
      console.error("Error getting order details:", error);
    }
  };

  //..........................................................................................

  return (
    
    <div className="formContainer">
      {loadingStatus?<> <Loading/></>:<>
      {isLoggedIn?<>
      
        {roleLocal === "3"?<>
        
        
        {/* code */}
        
        
       
      <div >
      <h2>
        Plan your event using these services or choose from our{" "}
        <span>
          <Nav.Link href="CreatePackage">Packages</Nav.Link>
        </span>
      </h2></div>
<h6 style={{marginTop: "1rem", borderTop: "1px solid #00a3af", padding: "1rem 0 0 0"}}> Fill the information please </h6>

      <form>
        <MDBRow className="formInput">
          <MDBInput
            label="Event name"
            type="text"
            id="event_name"
            name="event_name"
            value={orderData.event_name}
            onChange={handleInputChange}
          />
        </MDBRow>
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
        <MDBRow className="formInput">
          <MDBInput
            label="phone"
            type="text"
            id="phone"
            name="phone"
            value={orderData.phone}
            onChange={handleInputChange}
          />
            </MDBRow>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {services.map((service) => (
            <MDBCard   style={{ width: 'calc(50% - 20px)', marginBottom: '20px',backgroundColor:"#f3f1ec" }}>
              <MDBCardBody>
                <MDBCardTitle>
                  <p
                    style={{
                      textAlign: "center",
                      fontFamily: "Raleway",
                      borderBottom: "1px solid #00A3AF",
                    }}
                  >
                    {" "}
                    {service.service_name}
                  </p>
                </MDBCardTitle>
               
                <MDBCardImage
                  src={service.image}
                  alt="..."
                  position="top"
                  
                />

                <MDBCardText>
                  <p
                    style={{
                      textAlign: "justify",
                      borderBottom: "1px solid #00A3AF ",
                      fontFamily: "Raleway",
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
                    <span >{service.details}</span>
                  </p>
                </MDBCardText>
<div className="checkBox"
style={{
  fontFamily:"Raleway",
  fontWeight:"bold",
    position: "absolute",
    bottom: "15px", 
    left: "20px",
    }}

>

  
                <MDBCheckbox
                  label="Select"
                  checked={checkedServices.includes(service.service_id)}
                  onChange={() => handleCheckboxChange(service.service_id)}
                  
                /></div>
              </MDBCardBody>
            </MDBCard>
          ))}
        </div>

        {}
      </form>

      {showPreview ? (
        <div className="price">
          <MDBBtn
            onClick={() => {
              setModalShow(true);
              console.log("orderData", orderData);
              getOrderDetails(orderId);
              setLoadingStatus(false)
            }}
            // className="totalPriceButton"
            style={{fontWeight:"bold"}}
            color="dark"
          >
            Preview the Order
          </MDBBtn>
        </div>
      ) : (
        <>
          <div className="price">
            {showPrice ? (
              <>
                <MDBBtn
                  // className="totalPriceButton"
                  color="dark"
                  style={{fontWeight:"bold",width:"30%"}}
                  onClick={handleOrderPrice}
                >
                  {ClickedPrice ? (
                    <p> Total Price :{orderData.order_price}</p>
                  ) : (
                    "calculate the total Price"
                  )}
                </MDBBtn>
                <MDBBtn
                  onClick={handleSubmitOrder}
                  // className="totalPriceButton"
                  style={{width:"30%",fontWeight:"bold"}}
                  color="dark"
                >
                  Submit your plan
                </MDBBtn>
              </>
            ) : (
              <></>
            )}

          </div>
        </>
      )}

      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Your EVENT is now planned</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalshowing">
          {orderDetails && (
            <div>
              
              <p>
                {" "}
                <strong> Event: </strong> {orderDetails.event_name}
              </p>
              <p>
                {" "}
                <strong> Phone number: </strong> {orderDetails.phone}
              </p>
              <p>
                {" "}
                <strong> Event Planner: </strong> {orderDetails.username}
              </p>
              <p>
                {" "}
                <strong> Event Date: </strong> {orderDetails.eventdate}
              </p>
              
              <p>
                {" "}
                <strong>Place:</strong> {orderDetails.place}{" "}
              </p>

              <p>
                {" "}
                <strong>Total Price: </strong> {orderDetails.order_price} JD
              </p>

              <p style={{ borderBottom: "none" }}>
                {" "}
                <strong>Selected Services:</strong>
              </p>
              <ul>
                {SelectedServices.map((service) => (
                  <li>
                    <strong>Name: {service.service_name}</strong>
                    <p>
                      <strong>Details</strong>: {service.details}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" 
          style={{width:"20%",fontWeight:"bold"}}
          onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </>:<>

      <Container
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "",
              }}
              className=" text-center"
            >
              <MDBCard
                style={{
                  maxWidth: "63rem",
                  justifyContent: "center",
                  marginTop: "30px",
                  backgroundColor: "#212526",
                }}
              >
                <MDBCardImage
                  position="top"
                  src="https://freefrontend.com/assets/img/403-forbidden-html-templates/403-Forbidden-CSS-Hover.gif"
                  alt="..."
                />
                <MDBCardBody>
                  <MDBCardTitle
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontFamily: "Raleway",
                      color: "whitesmoke",
                    }}
                  >
                    access to this page is restricted
                  </MDBCardTitle>
                </MDBCardBody>
              </MDBCard>
            </Container>
      </>}




</>:<>
{<Button></Button>}
</>}
</>}
    </div>
  );
};

export default Client;