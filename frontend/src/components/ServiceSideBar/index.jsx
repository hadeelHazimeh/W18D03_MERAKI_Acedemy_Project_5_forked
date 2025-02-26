import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ServiceSideBar = () => {
  const navigate = useNavigate();
  const serviceProviderName = useSelector(
    (state) => state.auth.userName
  );

  const handleMyServicesClick = () => {
    navigate('/service/provider');
  };

  const handleMyOrdersClick = () => {
    navigate('/service/provider/orders');
  };

  const handleCreateServiceClick = () => {
    navigate('/service/provider/create');
  };

  return (
    <CDBSidebar style={{ backgroundColor: "#302B2B" }} >
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>Hello {serviceProviderName}</CDBSidebarHeader>
      <CDBSidebarContent>
        <CDBSidebarMenu>
          <NavLink to="" onClick={handleMyServicesClick}><CDBSidebarMenuItem icon="cogs">My Services</CDBSidebarMenuItem></NavLink>
          <NavLink to="#" onClick={handleMyOrdersClick}><CDBSidebarMenuItem icon="shopping-cart">My Orders</CDBSidebarMenuItem></NavLink>
          <NavLink to="#" onClick={handleCreateServiceClick}><CDBSidebarMenuItem icon="plus">Create Service</CDBSidebarMenuItem></NavLink>
          <CDBSidebarMenuItem icon="sign-out-alt">Logout</CDBSidebarMenuItem>

        </CDBSidebarMenu>
      </CDBSidebarContent>
    </CDBSidebar>
  );
};

export default ServiceSideBar;
