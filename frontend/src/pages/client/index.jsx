import React, { useEffect } from "react";
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import serviceProvider from "../../services/redux/reducer/serviceProvider";
//.....................................
//const { order_price, eventDate, place, status }
const Client = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [status, setStatus] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [services, setServices] = useState([]);
  const [orderData, setOrderData] = useState({
    order_price: 0,
    eventDate: '',
    place: '',
   
  });
  //......................
  // const handleServiceChange = (e) => {
  //   const { value } = e.target;
  //   setOrderData({ ...orderData, service_ids: [...orderData.service_ids, value] });
  // };
//...........................
  useEffect(() => {
    axios
      .get(`http://localhost:5000/service`, {
        
      })
      .then((result) => {
        console.log("services", result.data);
        setServices(result.data.services);
        
        
      })
      .catch((err) => {
        
        console.log(err);

      });
  }, []);
//...............................
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };
//.............................................
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/orders/create`,orderData,{
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };
//.............................................

  return (
    <div>
      <h1>
        {" "}
        plan your event By <a>services</a> or choose from our <a>packges</a>
      </h1>
      <form onSubmit={handleSubmit}>
      <MDBInput
        label="Event Date"
        type="date"
        id="eventDate"
        name="eventDate"
        value={orderData.eventDate}
        onChange={handleInputChange}
      />
      <MDBInput
        label="Place"
        type="text"
        id="place"
        name="place"
        value={orderData.place}
        onChange={handleInputChange}
      />
  
      {/* <label htmlFor="service_ids">Select Services:</label>
      <select
        id="service_ids"
        name="service_ids"
        onChange={handleServiceChange}
        multiple
      >
        {services.map(service => (
          <option key={service.service_id} value={service.service_id}>
            {service.service_name} - ${service.price}
          </option>
        ))}
      </select> */}
      {/* <p>Total Price: ${orderPrice}</p> */}
      <MDBBtn type="submit">Create Order</MDBBtn>
    </form>
      
    </div>
  );
};

export default Client;
