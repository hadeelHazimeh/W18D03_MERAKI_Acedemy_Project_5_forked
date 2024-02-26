

        
import React, { useState, useEffect } from 'react';

import axios from 'axios';

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

  return (
    <div  style={{margin:"10px", marginRight:"60px"}}>
    <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col'>User</th>
          <th scope='col'>Event Name</th>
          <th scope='col'>Event Date</th>
          <th scope='col'>Place</th>
          <th scope='col'>Price</th>
          <th scope='col'>Service Name</th>

        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {orders.map((order,i)=>{
  return (          
 <tr>
 <td>
   <div className='d-flex align-items-center'>
     <img
       src={order.image}
       alt=''
       style={{ width: '45px', height: '45px' }}
       className='rounded-circle'
     />
     <div className='ms-3'>
       <p className='fw-bold mb-1'>{order.username}</p>
       <p className='text-muted mb-0'>{order.email}</p>
     </div>
   </div>
 </td>
 <td>
   <p className='fw-normal mb-1'>{order.event_name}</p>
   
 </td>
 <td>
 <p className='fw-normal mb-1'>{order.eventdate}</p>
 </td>
 <td>
    
 <p className='fw-normal mb-1'>{order.place}</p>
 </td>
 <td>
 <p className='fw-normal mb-1'>{order.price}</p>

 </td>
 <td>
 <p className='fw-normal mb-1'>{order.service_name}</p>

 </td>


</tr>)
        })}
       
   
      </MDBTableBody>
    </MDBTable>
    </div>
  );
}
