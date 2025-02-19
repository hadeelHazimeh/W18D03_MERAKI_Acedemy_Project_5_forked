import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from 'cdbreact';
import { useDispatch, useSelector } from "react-redux";
import {MDBIcon} from "mdb-react-ui-kit"
import { setLogout } from '../../services/redux/reducer/auth';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
const AdminSideBar = () => {
  const name = useSelector(
    (state) => state.auth.userName
  );
  const dispatch=useDispatch()
  const navigate =useNavigate()
    return (
        <CDBSidebar style={{ backgroundColor: "#302B2B" }}>
          
          <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>Hello {name}</CDBSidebarHeader>
          <CDBSidebarContent>
            <CDBSidebarMenu>
              <NavLink to="pending/Services"><CDBSidebarMenuItem icon="lock-open">Pending Services</CDBSidebarMenuItem></NavLink>
             <NavLink to={"packages"}> <CDBSidebarMenuItem icon="th-large">Packages</CDBSidebarMenuItem></NavLink>
             <NavLink to={"Services"}> <CDBSidebarMenuItem icon="plus-square" iconType="solid">
                Create Package
              </CDBSidebarMenuItem></NavLink>
              <NavLink to={"orders"}> <CDBSidebarMenuItem icon="shopping-bag" iconType="solid">
                All Orders
              </CDBSidebarMenuItem></NavLink>
              <NavLink to={""}> <CDBSidebarMenuItem icon="sign-out-alt" iconType="solid" onClick={()=>{
                dispatch(setLogout())
                navigate("/login")
              }} >
                Log Out
              </CDBSidebarMenuItem></NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
         
          <CDBSidebarFooter style={{ textAlign: 'center' }}>
            <div
              className="sidebar-btn-wrapper"
              style={{padding: '20px 5px'}}
            >
              
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
    );
  };
  
  export default AdminSideBar;