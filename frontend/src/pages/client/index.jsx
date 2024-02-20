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

//.....................................
//const { order_price, eventDate, place, status }
const Client = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [status, setStatus] = useState(false);
  //const [checkedServices, setCheckedServices] = useState([]);
  const [orderId, setOrderId] = useState("");
  const token = useSelector((state) => state.auth.token);
  const [services, setServices] = useState([]);
  const [checked, setChecked] = useState(false);
  const [checkedServices, setCheckedServices] = useState([]);
  const [orderData, setOrderData] = useState({
    order_price: 0,
    eventDate: "",
    place: "",
  });

  //......................
  useEffect(() => {
    ShowServices();
  }, []);
  //...............................
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
    // // e.preventDefault();
    // //loader
    // try {
    //   const result = await axios.post(
    //     `http://localhost:5000/orders/create`,
    //     orderData,
    //     {
    //       headers: { Authorization: `Bearer ${token}` },
    //     }
    //   );
    //   console.log(result.data);
    //   setOrderId(result.data.order_id);
    // } catch (error) {
    //   console.error("Error creating order:", error);
    // }
    e.preventDefault();
    try {
      // Create the order (date and place)
      const orderResult = await axios.post(
        `http://localhost:5000/orders/create`,
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(orderResult.data.result[0]);
      //setOrderId(orderResult.data.order_id);
      
       //selected services with the created order
      const orderServiceResult = await axios.post(
        `http://localhost:5000/orders/orderService/${orderResult.data.result[0].order_id}`,

        { service_ids: checkedServices },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(orderServiceResult.data);
     } catch (error) {
       console.error("Error creating order:", error);
     }
  };

  //................................................

  const handleCheckboxChange = (serviceId) => {
    console.log("checkedServices", checkedServices, "serviceId", serviceId);
    if (checkedServices.includes(serviceId)) {
      // Remove serviceId if already checked
      setCheckedServices(checkedServices.filter((id) => id !== serviceId));
    } else {
      // Add serviceId if not checked
      setCheckedServices([...checkedServices, serviceId]);
    }
  };
  //....................................................

  return (
    <div>
      <h1>
        Plan your event by <a>services</a> or choose from our <a>packages</a>
      </h1>
      <form onSubmit={handleSubmitOrder}>
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

        {/* <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            console.log("handle");
            handleSubmitOrder();
            ShowServices();
          }}
        >
          Choose the services
        </a> */}

        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {services.map((service) => (
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>name: {service.service_name}</MDBCardTitle>

                <MDBCardText>
                  {service.image}
                  Price: ${service.price}
                  <br />
                  description: {service.details}
                </MDBCardText>

                <MDBCheckbox
                  label="Select"
                  checked={checkedServices.includes(service.service_id)}
                  onChange={() => handleCheckboxChange(service.service_id)}
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
