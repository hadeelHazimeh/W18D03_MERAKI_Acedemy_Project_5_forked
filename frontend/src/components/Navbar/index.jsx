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
} from 'mdb-react-ui-kit';

const Navbar = () => {
  const [openNavSecond, setOpenNavSecond] = useState(false);
  return (
    <>
<div>

      <MDBNavbar light bgColor='light'>
        <MDBContainer>
          <MDBNavbarBrand href='#'>
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
        <MDBNavbarBrand href='#'>
         
            </MDBNavbarBrand>
        <MDBNavbarToggler
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenNavSecond(!openNavSecond)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar open={openNavSecond}>
          <MDBNavbarNav>
            <MDBNavbarLink active aria-current='page' href=''>
              home
            </MDBNavbarLink>
           
            <MDBNavbarLink href='/login'>Login</MDBNavbarLink>
            <MDBNavbarLink href='#'>Lets Talk!</MDBNavbarLink>
            <MDBNavbarLink href='#'>About us</MDBNavbarLink>

          </MDBNavbarNav>
        </MDBCollapse> 
      
      </MDBContainer>
    </MDBNavbar>
    
</div>
</>
     )

  }

export default Navbar;
