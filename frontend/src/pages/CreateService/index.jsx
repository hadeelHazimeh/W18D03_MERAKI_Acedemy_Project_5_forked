import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addService } from "../../services/redux/reducer/serviceProvider";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'; 
import './style.css';

const CreateService = () => {
    const [service_name, setService_name] = useState("");
    const [details, setDetails] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    const uploadImage = async (image) => {
        try {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "amalhawwari"); 
            formData.append("cloud_name", "dhgpwshhe");
        
            const response = await axios.post("https://api.cloudinary.com/v1_1/dhgpwshhe/image/upload", formData);
            return response.data.url;
        } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
        }
    };

    const createService = async () => {
        try {
            const imageUrl = await uploadImage(image);
            const result = await axios.post(
                "http://localhost:5000/service",
                { service_name, details, price, image: imageUrl },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            Swal.fire({
                title: "Success!",
                text: "Service created successfully.",
                icon: "success",
            }).then(() => {
                setService_name("");
                setDetails("");
                setPrice("");
                setImage("");
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error!",
                text: "Failed to create service.",
                icon: "error",
            });
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center col-10 mx-auto">
                <div className="col-md-9 pt-5">
                    <h2 className="mb-4 animated fadeIn " style={{fontWeight: "bold", textAlign:"center" }}>Create Service</h2>
                    <div className="form-wrapper mt-5"  style={{ backgroundColor: "#F3F1EC", padding: "20px", border: "1px solid #ddd", borderRadius: "5px", width: "", height: "auto" }}>
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
                                className="btn btn-dark"
                                onClick={createService}
                            >
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}; 

export default CreateService;
