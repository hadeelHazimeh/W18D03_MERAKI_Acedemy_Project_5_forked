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
  MDBRipple,
  MDBCardHeader,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import {
  setPackages,
  setPackagesName,
} from "../../services/redux/reducer/packages";
import Swal from "sweetalert2";
import { Button, Modal, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
//import { setPackagesName } from "../../services/redux/reducer/packages";
const CreatePackage = () => {
  //const [packages, setPackages] = useState([]);

  const [showSubmit, setShowSubmit] = useState(false);
  const [ModalPreview, setModalPreview] = useState(false);
  const { packages, packagesName } = useSelector((state) => state.packages);
  const [checkedPackages, setCheckedPackages] = useState(null);
    const [modalShow, setModalShow] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn, token, role } = useSelector((state) => state.auth);
 const [roleLocal, setRoleLocal] = useState(localStorage.getItem("role"));
  
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState({
    order_price: 0,
    event_name: "",
    eventDate: "",
    place: "",
    phone:""
  });
  const dispatch = useDispatch();
  const [serviceInfo, setServiceInfo] = useState({
    service_name: "",
    price: 0,
    description: "",
    image: "",
  });
  const getPackages = () => {
    axios
      .get(`http://localhost:5000/package`)
      .then((result) => {
        console.log("first", result.data.result);

        dispatch(setPackagesName(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //-----------------------------

  useEffect(() => {
    //getPackages()
    axios
      .get(`http://localhost:5000/package/servicePackage`, {})
      .then((result) => {
        getPackages();
        console.log("result.data", result.data.result);
        dispatch(setPackages(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //......................................................................................
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };
  //..........................................................................

  const getOrderDetails = async (orderId) => {
    // setShowSubmit(false)
    try {
      const order = await axios.get(
        `http://localhost:5000/orders/search_1/${orderId}`
      );
      console.log("order", order);
      setOrderDetails(order.data.result[0]);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response.data.message,
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
      console.log("orderResult", orderResult.data.result[0]);
      setOrderId(orderResult.data.result[0].order_id);

      //finding the selected packages to set the price
      const selectedPackage = packages.find(
        (elem) => elem.package_id === checkedPackages
      );
      console.log("selectedPackage", selectedPackage);

      const updateOrderPrice = {
        ...orderData,
        order_price: selectedPackage.price, //  order price = package price
      };

      setOrderData(updateOrderPrice);
      console.log("orderData", orderData, selectedPackage.price);
      setShowSubmit(false);

      //selected packages with the created order
      const orderPackageResult = await axios.post(
        `http://localhost:5000/orders/orderService/${orderResult.data.result[0].order_id}`,
        { service_package_id: checkedPackages },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("orderPackageResult", orderPackageResult.data);
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
        text: error.response.data.message,
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
    setShowSubmit(true);
  };

  //......................................................................
  return (
    <div className="formContainer">

{isLoggedIn?<>
      
      {roleLocal === "3"?<>
      
      
      {/* code */}
      <h6
        style={{
          marginTop: "1rem",
          borderTop: "1px solid #00a3af",
          padding: "1rem 0 0 0",
        }}
      >
        {" "}
        Fill the information please{" "}
      </h6>
      <div>
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

        {/* cards */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
          
        >
          {packagesName.map((ele, i) => (
            <MDBCard
              key={i}
              // style={{ maxWidth: "29rem" }}
              style={{
                width: "calc(50% - 20px)",
                 marginBottom: "50px",
                backgroundColor: "#f3f1ec",
              }}
            >
              <MDBCardBody>
                <MDBCardTitle>
                  <p
                    style={{
                      textAlign: "center",
                      fontFamily: "Raleway",
                      borderBottom: "1px solid #00A3AF",
                    }}
                  >
                    {ele.package_name}
                  </p>
                </MDBCardTitle>
                <MDBCardImage
                  src={ele.image}
                  alt="..."
                  position="top"
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
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
                    <span style={{ display: "inline" }}>JD {ele.price}</span>
                  </p>
                  <p
                     style={{
                      textAlign: "justify",
                     paddingBottom: "10px",
                    // fontFamily: "Merriweather",
                     }}
                  >
                    <strong >Description:</strong>{" "}
                        {ele.description}
                  </p>
                </MDBCardText>
                {/* services  */}

                <MDBCard style={{ width: "50%", alignItems:"center"}}>
                  <MDBCardHeader style={{ textAlign: "center",
                      fontFamily: "Raleway",
                      fontSize:"larger",
                      fontWeight:"bold",
                      borderBottom: "1px solid #00A3AF"}}>
                    services
                  </MDBCardHeader>
                  {packages.map((pac, i) => {
                    if (ele.package_name === pac.package_name) {
                      return (
                        <div key={i}>
                          <MDBListGroup light>
                            <MDBRipple>
                              <MDBListGroupItem
                                onClick={() => {
                                  setModalShow(true);
                                  setServiceInfo(pac);
                                }}
                                style={{ cursor: "pointer" }}
                                href="#"
                                action
                                noBorders
                                aria-current="false"
                                className="px-3"
                              >
                                {pac.service_name}
                              </MDBListGroupItem>
                            </MDBRipple>
                          </MDBListGroup>
                        </div>
                      );
                    }
                  })}
                </MDBCard>
              </MDBCardBody>
              <div
                className="checkBox"
                style={{
                  fontFamily: "Raleway",
                  fontWeight: "bold",
                  // paddingTop:"1rem",
                  marginLeft: "1.5rem",
                  // position: "absolute",
                  // bottom: "0",
                  // left: "20px",
                }}
              >
                <MDBCheckbox
                  label="Select"
                  checked={checkedPackages === ele.package_id}
                  onChange={() => handleCheckboxChange(ele.package_id)}
                />
              </div> 
            </MDBCard>
          ))}
        </div>
      </div>
      <form>

        {showSubmit ? (
          <>
            <div>
              <MDBBtn
                onClick={handleSubmitOrder}
                className="totalPriceButton"
                style={{ marginLeft: "35%" }}
                color="dark"
              >
                Submit your plan
              </MDBBtn>
            </div>
          </>
        ) : (
          <></>
        )}
      </form>

      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{serviceInfo.service_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalshowing">
          <img src={serviceInfo.image} fluid />
          
          <p style={{textAlign:"justify"}}>{serviceInfo.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {showPreview ? (
        <div>
          <MDBBtn
            onClick={() => {
              setModalPreview(true);

              console.log("orderData", orderData);
              getOrderDetails(orderId);
            }}
            className="totalPriceButton"
            color="dark"
          >
            Preview the Order
          </MDBBtn>
        </div>
      ) : (
        <></>
      )}

      <Modal show={ModalPreview} onHide={() => ModalPreview(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Your EVENT is now planned</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* {orderDetails && (
            <div>
              <p>Event Date: {orderDetails.eventdate}</p>
              <p>Place: {orderDetails.place}</p>
              <p>Total Price: JD {orderDetails.order_price}</p>
              <p>Package Name :{orderDetails.package_name}</p>
              <p> Package details: {orderDetails.description}</p>
            </div>
          )} */}
          {orderDetails && (
            <div>
              <p>
                {" "}
                <strong> Event: </strong> {orderDetails.event_name}
              </p>
              <p>
                {" "}
                <strong> Event Planner: </strong> {orderDetails.username}
              </p>
              <p>
                {" "}
                <strong> Phone number: </strong> {orderDetails.phone}
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
                <strong>Total Price: </strong> {orderDetails.package_price} JD
              </p>

              <ul style={{ borderBottom: "none" }}>
                {" "}
                <strong>Selected Package:</strong>
                <li>
                  {" "}
                  <strong>Package Name </strong>:{orderDetails.package_name}
                </li>
                <br />
                <li>
                  {" "}
                  <strong>Package details:</strong> {orderDetails.description}
                </li>
              </ul>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => setModalPreview(false)}>
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
{/* {navigate("/login")} */}
</>}


    </div>
  );
};

export default CreatePackage;
