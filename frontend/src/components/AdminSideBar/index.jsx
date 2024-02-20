import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
const AdminSideBar = () => {
    return (
        <CDBSidebar /*  style={{backgroundColor:"white",color:"#ACDAD1"}} */ >
          <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>Contrast</CDBSidebarHeader>
          <CDBSidebarContent>
            <CDBSidebarMenu>
              <NavLink to="pending/Services"><CDBSidebarMenuItem icon="th-large">Dashboard</CDBSidebarMenuItem></NavLink>
              <CDBSidebarMenuItem icon="sticky-note">Components</CDBSidebarMenuItem>
              <CDBSidebarMenuItem icon="credit-card" iconType="solid">
                Metrics
              </CDBSidebarMenuItem>
            </CDBSidebarMenu>
          </CDBSidebarContent>
  
          <CDBSidebarFooter style={{ textAlign: 'center' }}>
            <div
              className="sidebar-btn-wrapper"
              style={{padding: '20px 5px'}}
            >
              Sidebar Footer
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
    );
  };
  
  export default AdminSideBar;