import React, { useEffect } from "react";
import {
  MDBInput,
  MDBBtn,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import serviceProvider from "../../services/redux/reducer/serviceProvider";
//.....................................
//const { order_price, eventDate, place, status }
const Client = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [status, setStatus] = useState(false);
  const [orderId, setOrderId] = useState("");
  const token = useSelector((state) => state.auth.token);
  const [services, setServices] = useState([]);
  const [checked, setChecked] = useState(false);

  const [orderData, setOrderData] = useState({
    order_price: 0,
    eventDate: "",
    place: "",
  });
  //......................

  const ShowServices = async (e) => {
   
    axios
      .get(`http://localhost:5000/service`)
      .then((result) => {
        console.log("services", result.data);
        setServices(result.data.services);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //...............................
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };
  //.............................................

  const handleSubmitOrder = async (e) => {
    // e.preventDefault();
    //loader
    try {
      const result = await axios.post(
        `http://localhost:5000/orders/create`,
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(result.data);
      setOrderId(result.data.order_id);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  //................................................

  return (
    <div>
      <h1>
        Plan your event by <a>services</a> or choose from our <a>packages</a>
      </h1>
      <form>
        <MDBRow className="mb-4">
          <MDBInput
            label="Event Date"
            type="date"
            id="eventDate"
            name="eventDate"
            value={orderData.eventDate}
            onChange={handleInputChange}
          />
        </MDBRow>
        <MDBRow className="mb-4">
          <MDBInput
            label="Place"
            type="text"
            id="place"
            name="place"
            value={orderData.place}
            onChange={handleInputChange}
          />
        </MDBRow>
        <MDBBtn type="button"
          onClick={() => {
            console.log("handle");
            handleSubmitOrder();
            ShowServices();
          }}
        >
          Choose the services
        </MDBBtn>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {services.map((service) => (
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>name: {service.service_name}</MDBCardTitle>
                <MDBCardText>
                  Price: ${service.price}
                  <br />
                  description: {service.details}
                </MDBCardText>

                <MDBCheckbox
                  id="controlledCheckbox"
                  label="Select"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
              </MDBCardBody>
            </MDBCard>
          ))}
        </div>
        <MDBRow className="mb-4">
          <MDBBtn className="mb-4" type="submit" block>
            Submit your plan
          </MDBBtn>
        </MDBRow>
      </form>
    </div>
  );
};

export default Client;
