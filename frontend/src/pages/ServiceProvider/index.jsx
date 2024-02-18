import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Image } from "react-bootstrap";

import { setServices } from "../../services/redux/reducer/auth/serviceProvider";

const ServiceProvider = () => {
  const dispatch = useDispatch();
  const serviceProvider = useSelector((state) =>
    state.serviceProvider.services
  );
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
    </>
  );
};

export default ServiceProvider;
