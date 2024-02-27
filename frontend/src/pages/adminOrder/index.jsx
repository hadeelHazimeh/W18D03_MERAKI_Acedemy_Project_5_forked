
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import axios from 'axios';
import './style.css'; 
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

export default function OrdersTable() {
    
    const [orders, setOrders] = useState([])
    const getAllOrders=()=>{
        //http://localhost:5000/orders/allOrders axios
          axios.get(`http://localhost:5000/orders/allOrders`)
          .then((result) => {
           console.log(result.data.result);
          setOrders(result.data.result)
          })
          .catch((err) => {
            console.log(err);
          });
    }
useEffect(() => {
getAllOrders()
}, [])
const formatCurrency = (value) => {
  return value.toLocaleString("en-JO", {
      style: "currency",
      currency: "JOD",
  });
};

const imageBodyTemplate = (rowData) => {
  return (
      <img
      width={100}
          src={rowData.image}
          alt={rowData.service_name}
          className="w-6rem shadow-2 border-round"
      />
  );
};

const priceBodyTemplate = (rowData) => {
  return formatCurrency(rowData.price);
};

const eventDateBodyTemplate = (rowData) => {
  return <span>{rowData.eventdate}</span>;
};
const eventNameBodyTemplate = (rowData) => {
  return <span>{rowData.event_name}</span>;
};
const UserBodyTemplate = (rowData) => {
  return <span>{rowData.username}<br/><span>{rowData.email}</span></span>;
};
const getSeverity = (status) => {
  switch (status) {
      case 'unqualified':
          return 'danger';
      case 'qualified':
          return 'success';
      case 'new':
          return 'info';
      case 'negotiation':
          return 'warning';
      case 'renewal':
          return null;
      default:
          return null;
  }
};

const statusBodyTemplate = (rowData) => {
  return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
};


  return (
    <div  style={{margin:"10px", marginRight:"60px", height:"90vh"}}>
      <div className="mx-auto card col-10 m-5">
            <DataTable
                value={orders}
                paginator
                rows={8}
            
                emptyMessage="No orders found."
                className=" custom-datatable" // Add your custom class for table styling
            >
                <Column className="text-center" header="Image" body={imageBodyTemplate} style={{width:"100px"}}></Column>
                <Column className="text-center" header="user" body={UserBodyTemplate} style={{width:"200px"}}></Column>
                <Column style={{width:"150px"}} field="service_name" header="Service Name"></Column>
                <Column style={{width:"150px"}} field="price" header="Price" body={priceBodyTemplate}></Column>
                <Column style={{width:"200px"}} field="eventName" header="Event Name" body={eventNameBodyTemplate}></Column>
                <Column style={{width:"150px"}} field="eventdate" header="Event Date" body={eventDateBodyTemplate}></Column>

                <Column style={{width:"100px"}} field="place" header="Place"></Column>
            </DataTable>
        </div>
   
    </div>
  );
}
