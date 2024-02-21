import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Form,
  Modal,
} from "react-bootstrap";
import { setServices, updateServiceById } from "../../services/redux/reducer/serviceProvider";

const ServiceProvider = () => {
  const dispatch = useDispatch();
  const serviceProvider = useSelector(
    (state) => state.serviceProvider.services
  );
  const [showModal, setShowModal] = useState(false);
  const [serviceId, setServiceId] = useState("");
  const [service_name, setService_name] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handeUpdateClick = (serviceId) => {
    setServiceId(serviceId);
    handleShow();
  };

  const updateService = () => {
    axios
      .put(
        `http://localhost:5000/service/provider/update/${serviceId}`,
        {
          service_name,
          details,
          price,
          image
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        handleClose();
        dispatch(updateServiceById({service_name, details, price, image, service_id: serviceId}))
        // getServiceProvider();
      })
      .catch((error) => {
        console.error("Error updating service:", error);
      });
      
  };

  const getServiceProvider = () => {
    axios
      .get("http://localhost:5000/service/provider", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        console.log("serveice",result.data.services);
        dispatch(setServices(result.data.services));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getServiceProvider();
    console.log(serviceProvider);
  }, []);

  return (
    <>
      {serviceProvider.map((service, index) => (
        <Container
          key={index}
          className="bg-white text-center py-3 mt-5 col-lg-8 mb-5"
        >
          <Row>
            <Col lg={7}>
              <div className="left-images">
                <Image
                  src={service.image}
                  alt={service.service_name}
                  fluid
                  width={"70%"}
                  height={"50%"}
                />
              </div>
            </Col>
            <Col lg={4} className="mt-5" style={{ fontSize: "1.2rem" }}>
              <div className="right-content mt-3">
                <h4 className="right-content mb-3 fw-bolder">
                  {service.service_name}
                </h4>
                <p>{service.details}</p>
                <div className="total">
                  <h4>status: {service.status}</h4>
                  <h4>price: $ {service.price}</h4>
                  <div className="main-border-button">
                    <Button
                      variant="dark"
                      className="mt-3 mx-1 "
                      onClick={() => handeUpdateClick(service.service_id)}
                    >
                      UPDATE
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      ))}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="service_name">
              <Form.Label>Service Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter service name"
                value={service_name}
                onChange={(e) => setService_name(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="details">
              <Form.Label>Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file" 
                onChange={(e)=> setImage(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateService}>
            Save Changes
          </Button>
          <Button variant="primary" onClick={updateService}>
            Delete Service
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ServiceProvider;
