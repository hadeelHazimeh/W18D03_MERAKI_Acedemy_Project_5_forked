import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import axios from 'axios';
import './style.css'; // Import your CSS file for custom styling

export default function ServiceProviderOrders() {
    const [products, setProducts] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:5000/service/orders/all", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                setProducts(response.data.orders); 
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

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
        <div className="card col-10 m-5">
            <DataTable
                value={products}
                paginator
                rows={8}
            
                emptyMessage="No orders found."
                className=" custom-datatable" // Add your custom class for table styling
            >
                <Column className="text-center" header="Image" body={imageBodyTemplate} style={{width:"100px"}}></Column>
                <Column field="service_name" header="Service Name"></Column>
                <Column field="price" header="Price" body={priceBodyTemplate}></Column>
                <Column field="eventdate" header="Event Date" body={eventDateBodyTemplate}></Column>
                <Column field="place" header="Place"></Column>
            </DataTable>
        </div>
    );
}
