import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addService } from "../../services/redux/reducer/serviceProvider";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'; 

const CreateService = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  const [service_name, setService_name] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [Image, setImage] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const createService = () => {
    axios
      .post(
        "http://localhost:5000/service",
        { service_name, details, price, Image },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Create Service</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="service_name" className="form-label">
                Service Name
              </label>
              <input
                type="text"
                className="form-control"
                id="service_name"
                placeholder="Enter service name"
                value={service_name}
                onChange={(e) => setService_name(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="details" className="form-label">
                Details
              </label>
              <textarea
                className="form-control"
                id="details"
                rows="3"
                placeholder="Enter details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={createService}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateService;
