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

const Navbar = () => {
  const [openNavSecond, setOpenNavSecond] = useState(false);
  return (
    <>
<div>

      <MDBNavbar light bgColor='light'>
        <MDBContainer>
          <MDBNavbarBrand href='/'>
            <img
              src='https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.webp'
              height='30'
              alt=''
              loading='lazy'
            />
          </MDBNavbarBrand>
        
          <MDBNavbarLink href='service/provider' >
                Are You Vendor?
              </MDBNavbarLink>
            
        </MDBContainer>
        
      </MDBNavbar>
    
</div>

<div>
<MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
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
        <MDBCollapse navbar open={openNavSecond}>
          <MDBNavbarNav>
            <MDBNavbarLink active aria-current='page' href='/serviceClient'>
              Services
            </MDBNavbarLink>
           
            <MDBNavbarLink href='/portfolio'>PortFolio</MDBNavbarLink>
            <MDBNavbarLink href='/letstalk'>Lets Talk!</MDBNavbarLink>
            <MDBNavbarLink href='/AboutUs'>About us</MDBNavbarLink>

          </MDBNavbarNav>
        </MDBCollapse> 
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
Login As:                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link>Action</MDBDropdownItem>
                  <MDBDropdownItem link>Another action</MDBDropdownItem>
                  <MDBDropdownItem link>Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>

      </MDBContainer>
    </MDBNavbar>
    
</div>
</>
     )

  }


     

export default Navbar;
