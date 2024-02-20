import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Image, Form, Modal } from "react-bootstrap";
import { setServices } from "../../services/redux/reducer/serviceProvider";

const ServiceProvider = () => {
  const dispatch = useDispatch();
  const serviceProvider = useSelector((state) =>
    state.serviceProvider.services
  );

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handeUpdateClick = () => {
    handleShow(); 
  }

  // this function to update the service
  const updateService = () =>{
    axios.put
  }
  const getServiceProvider = () => {
    axios
      .get("http://localhost:5000/service/provider", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        console.log(result.data.services);
        dispatch(setServices(result.data.services));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getServiceProvider();
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
                  <h4>status:  {service.status}</h4>
                  <h4>price: $ {service.price}</h4>
                  <div className="main-border-button">
                    <Button
                      variant="dark"
                      className="mt-3 mx-1 "
                      onClick={handeUpdateClick}
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
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ServiceProvider;