import React, { useEffect } from "react";
import { MDBInput, MDBBtn,MDBRow,MDBCard, MDBCardBody, MDBCardTitle, MDBCardText,MDBCardImage, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem ,MDBCheckbox} from 'mdb-react-ui-kit';
import { useSelector ,useDispatch} from "react-redux";
import axios from "axios";
import { useState } from "react";
import { setPackages,setPackagesName } from "../../services/redux/reducer/packages";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Swal from 'sweetalert2';
import Modal from "react-bootstrap/Modal";

function AdminServicesRender() {
  const [image, setImage] = useState("");

const [ url, setUrl ] = useState("");
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
  const [packageDetails, setPackageDetails] = useState(null);
  const [showPrice, setShowPrice] = useState(false);

  const [modalShow, setModalShow] = useState(false);
const [package_id, setPackageId] = useState(null)
  const dispatch=useDispatch()
    const { isLoggedIn,token } = useSelector((state) => state.auth);
  
   
    const { packages,packagesName  } = useSelector((state) => state.packages);
    const [services, setServices] = useState([]);
    const [messageForAddService, setMessageForAddService] = useState(false);
    const [packageInfo, setPackageInfo] = useState({price:0,
      package_Name:"",
      Description:"",
      image:"",
    });
    const [checkedServices, setCheckedServices] = useState([]);
    const [ClickedPrice, setClickedPrice] = useState(false);

    //-----------------------------

  //..................................................................................
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPackageInfo({ ...packageInfo, [name]: value });
  };
  //...................................................................................
  const handleSubmitPackage = async (e) => {
    e.preventDefault();
    //loader
    try {
      const imageUrl = await uploadImage(image);
      const packageResult = await axios.post(
        `http://localhost:5000/package/create`,
       {...packageInfo,image:imageUrl},
      );


      console.log(packageResult.data.result);
      console.log(1111,packageResult.data.result.package_id);

     setPackageId(packageResult.data.result.package_id)
      //selected services with the created order
      //""
      const packageServiceResult = await axios.post(
        
        `http://localhost:5000/package/create/servicePackage/${packageResult.data.result.package_id}`,
        { service_ids: checkedServices },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(packageServiceResult.data);
      //setStatus(true);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: packageServiceResult.data.message,
      });  
    } catch (error) {
      console.error("Error creating order:", error);
      console.log(package_id,1212);
    }
  };

  const handlePackagePrice = (e) => {
    e.preventDefault();

    const totalOrderPrice = checkedServices.reduce((total, serviceId) => {
      const selectedService = services.find(
        (service) => service.service_id === serviceId
      );

      return total + selectedService.price;
    }, 0);
    console.log("total price", totalOrderPrice);
    setPackageInfo({ ...packageInfo, price: totalOrderPrice });
    setClickedPrice(true);
  };

  //.........................................................................................

  const handleCheckboxChange = (serviceId) => {
    //reduce HOF to calculate the total order price as summation of checked services

    console.log("checkedServices", checkedServices, "serviceId", serviceId);
    if (checkedServices.includes(serviceId)) {
      // Remove serviceId if already checked
      setCheckedServices(checkedServices.filter((id) => id !== serviceId));
    } else {
      // Add serviceId if not checked
      setCheckedServices([...checkedServices, serviceId]);
      setShowPrice(true);
    }
  };
  //..........................................................................................


  const getPackageDetails = async (package_id) => {
    try {
      const packageService = await axios.get(`http://localhost:5000/package/${package_id}`);
      console.log("Detailsorder",packageService.data.result)
      setPackageDetails(packageService.data.result[0]);

      setModalShow(true);
    } catch (error) {
      console.error("Error getting package details:", error);
    }
  };




  //..........................................................................................
    //-----------------------------

    //-----------------------------

const callServices=()=>{
  axios
  .get(`http://localhost:5000/service`, {
    
  })
  .then((result) => {
   // console.log("services", result.data.services);
    setServices(result.data.services);
    
    
  })
  .catch((err) => {
    
    console.log(err);

  });

}
 


    useEffect(() => {
      callServices()
      }, []);
    //...............................
  return (
    <> <div className="formContainer">
    <h1  style={{marginTop: "1rem", borderBottom: "1px solid #00a3af", padding: "1rem 0 0 0"}}>
      create package
    </h1>
    
    <form >
    <MDBRow className="formInput">
        <MDBInput
          label="Package Name"
          type="text"
          id="package_Name"
          name="package_Name"
          value={packageInfo.package_Name}
          onChange={handleInputChange}
        />
      </MDBRow>

      <MDBRow rows={4} className="formInput">
      <MDBInput wrapperClass='mb-4'  label="Description"
          type="text"
          id="Description"
          name="Description"
       value={packageInfo.Description}
        onChange={handleInputChange} />
      </MDBRow>
       <MDBRow  className="formInput">
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
      </MDBRow> 

      <div className="cardContainer">
        {services.map((service,i) => (
          <MDBCard key={i} className="serviceCard">
            <MDBCardBody>
            <MDBCardImage
            src={service.image}
            alt="..."
            position="top"
          />
              <MDBCardTitle>name: {service.service_name}</MDBCardTitle>

              <MDBCardText>
              
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

      {showPrice ? (
        <>
          <MDBBtn className="totalPriceButton" onClick={handlePackagePrice}
          >
            calculate the total Price
          </MDBBtn>
        </>
      ) : (
        <></>
      )}

      {ClickedPrice ? (
        <>
          <MDBRow className="mb-4">
            <p>Total Price: {packageInfo.price} JD</p>
          </MDBRow>
        </>
      ) : (
        <></>
      )}

      <MDBBtn onClick={handleSubmitPackage}   className="totalPriceButton">Submit your Package</MDBBtn>
    </form>
    
    
  </div></>
  )
}

export default AdminServicesRender