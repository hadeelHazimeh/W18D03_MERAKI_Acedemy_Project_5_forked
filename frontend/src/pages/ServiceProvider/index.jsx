import { useEffect, useState } from "react";
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
import {
  setServices,
  updateServiceById,
  deleteServiceByID,
} from "../../services/redux/reducer/serviceProvider";
import Swal from "sweetalert2";
import './style.css';

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
  const [image, setImage] = useState("");

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const uploadImage = (image) => {
    const formData = new FormData();
    console.log(formData);
    formData.append("file", image[0]); // Assuming only one file is selected
    formData.append("upload_preset", "amalhawwari"); // Your Cloudinary upload preset name
    formData.append("cloud_name", "dhgpwshhe"); // Your Cloudinary cloud name
  
    axios
      .post("https://api.cloudinary.com/v1_1/dhgpwshhe/image/upload", formData)
      .then((response) => {
        console.log(response.data);
        // Handle the response as needed, e.g., set image URL state
        setImage(response.data.url);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };
  const handeUpdateClick = (serviceId) => {
  const serviceToUpdate = serviceProvider.find(service => service.service_id === serviceId);

  setServiceId(serviceId);
  setService_name(serviceToUpdate.service_name);
  setDetails(serviceToUpdate.details);
  setPrice(serviceToUpdate.price);
  setImage(serviceToUpdate.image);

  handleShow();
  };

  // delete a service by id
  const deleteService = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this service?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/service/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((result) => {
            dispatch(deleteServiceByID(id));
            Swal.fire({
              title: "Deleted!",
              text: "The service has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };


  const updateService = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save the changes?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        axios
          .put(
            `http://localhost:5000/service/provider/update/${serviceId}`,
            {
              service_name,
              details,
              price,
              image,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            handleClose();
            dispatch(
              updateServiceById({
                service_name,
                details,
                price,
                image,
                service_id: serviceId,
              })
            );
            Swal.fire({
              title: "Saved!",
              text: "The changes have been saved.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error updating service:", error);
          });
      }
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
        console.log("serveice", result.data.services);
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
          className=" text-center py-3 mt-5 col-lg-8 mb-1 service-container"
        >
          <Row>
            <Col lg={7} className="d-flex justify-content-center align-items-center">
              <div className="left-images">
                <Image
                  src={service.image}
                  alt={service.service_name}
                  fluid
                  width={"90%"}
                  height={"50%"}
                  className="service-image"
                />
              </div>
            </Col>
            <Col lg={4} className="mt-3 ms-5 service-details">
              <div className="right-content mt-3">
                <h4 className="right-content mb-3 fw-bolder" style={{fontFamily: "Merriweather"}}>
                  {service.service_name}
                </h4>
                <p style={{textAlign: "justify"}}>{service.details}</p>
                </div>
                <div className="total">
                  <h5>status: {service.status}</h5>
                  <h6 className="service-price">price: JOD {service.price}</h6>
                  <div className="main-border-button service-buttons">
                    <Button
                      variant="dark"
                      className="mt-3 mx-1"
                    
                      onClick={() =>{handeUpdateClick(service.service_id)
                      console.log(service.service_id);} }
                    >
                      UPDATE
                    </Button>
                    <Button
                      variant="dark"
                      className="mt-3 ms-3 "
                      onClick={() => deleteService(service.service_id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
            </Col>
          </Row>
        </Container>
      ))}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton style={{background: "#302B2B"}}>
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
              <div>
                <input
                  type="file"
                  onChange={(e) => uploadImage(e.target.files)}
                />
                <img src={image} alt="uploaded image" />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={updateService} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ServiceProvider;