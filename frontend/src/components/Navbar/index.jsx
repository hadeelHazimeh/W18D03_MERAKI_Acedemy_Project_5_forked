import{ useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarLink,
  MDBIcon,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from 'mdb-react-ui-kit';
import {
 seRole,
 setLogout,
 setLogin
} from "../../services/redux/reducer/auth";
import {isLoggedIn} from "../../services/redux/reducer/auth/index";
import { useSelector,useDispatch } from 'react-redux';

const Navbar = () => {
  
  const [openNavSecond, setOpenNavSecond] = useState(false);
  const [hideLogin,setHideLogin]=useState(false)
  const role = useSelector((state) => state.auth.role);
  // const isloggedIn=useSelector((state) => state.auth.isloggedIn)
    const { isLoggedIn } = useSelector(
    (state) =>

      state.auth
  );
  // console.log(isLoggedIn)
   const dispatch=useDispatch();

  return (
    
    <div>

    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid  style={{display:'flex',justifyContent: 'space-around',gap:"1rem"}}>
        <div style={{display:'flex',justifyContent: 'space-evenly'}}>
      <MDBNavbarBrand href='/' style={{marginBlock:'10'}}>
            <img
              src='https://res.cloudinary.com/dycpjbdto/image/upload/v1708778225/new-removebg-preview_xdfemo.png'
              height='90'
              width='700%'
              alt=''
              loading='lazy'
            />
          </MDBNavbarBrand>
          </div>
        <MDBNavbarToggler
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenNavSecond(!openNavSecond)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <div style={{display:"flex", justifyContent:'space-around' }}>
        <MDBCollapse navbar open={openNavSecond}>
          <MDBNavbarNav>
            <MDBNavbarLink active aria-current='page' href='/'>
              Home
            </MDBNavbarLink>
            <MDBNavbarToggler
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenNavSecond(!openNavSecond)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
            <MDBNavbarLink href='/client'>Plan Your Event</MDBNavbarLink>
            <MDBNavbarLink href='/portfolio'>PortFolio</MDBNavbarLink>
           
            <MDBNavbarLink href='/AboutUs'>About Us</MDBNavbarLink>
             {isLoggedIn?<><MDBNavbarLink href='/letstalk'>Lets Talk!</MDBNavbarLink></>:<></>}

            {isLoggedIn?<><MDBNavbarLink href='/' onClick={()=>{dispatch(setLogout())}}>Log Out
            </MDBNavbarLink></>:<>
            <MDBNavbarLink href='/login' style={{color:'#469da3'}}>
          
                <strong>Are You Vendor?</strong>
              </MDBNavbarLink>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button' style={{color:'#469da3'}}>
              <strong>Login As: </strong>               </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem  href='/login' link>Event Planner</MDBDropdownItem>
                  <MDBDropdownItem href='/login' link>Client</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </>}

          </MDBNavbarNav>
        </MDBCollapse>
        
        </div>
      
          
      </MDBContainer>
    </MDBNavbar>




    </div>
    )
    }
    export default Navbar;
