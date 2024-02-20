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

const Client = () => {
  // const { isLoggedIn } = useSelector((state) => state.auth);
  const [status, setStatus] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [services, setServices] = useState([]);
   const [checkedServices, setCheckedServices] = useState([]);
  const [orderData, setOrderData] = useState({
    order_price: 0,
    eventDate: "",
    place: "",
  });

  //...................................................................................
  useEffect(() => {
    axios
      .get(`http://localhost:5000/service`)
      .then((services) => {
        console.log("services", services.data);
        setServices(services.data.services);
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
      //reduce HOF to calculate the total order price as summation of checked services
      const totalOrderPrice = checkedServices.reduce((total, serviceId) => {
        const selectedService = services.find(
          (service) => service.service_id === serviceId
        );

        return total + selectedService.price;
      }, 0);
      console.log("total price", totalOrderPrice);
      setOrderData({ ...orderData, order_price: totalOrderPrice });
      const orderResult = await axios.post(
        `http://localhost:5000/orders/create`,
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(orderResult.data.result[0]);

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

  //.........................................................................................

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
  //..........................................................................................

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


        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {services.map((service) => (
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>name: {service.service_name}</MDBCardTitle>

                <MDBCardText>
                  {service.image}
                  Price: JD {service.price}
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
          <p>Total Price: JD {orderData.order_price}</p>
        </MDBRow>
        
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
