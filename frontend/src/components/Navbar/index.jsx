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
    
    <div>

    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <div style={{display:'flex',justifyContent: 'space-between'}}>
      <MDBNavbarBrand href='/'>
            <img
              src='https://res.cloudinary.com/dycpjbdto/image/upload/v1708504176/2-removebg-preview-less_uolwak.png'
              height='50'
              width='90%'
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
            <MDBNavbarLink href='/letstalk'>Lets Talk!</MDBNavbarLink>
            <MDBNavbarLink href='/AboutUs'>About Us</MDBNavbarLink>
            <MDBNavbarLink href='/login' >
                Are You Vendor?
              </MDBNavbarLink>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
Login As:                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem  href='/login' link>Event Planner</MDBDropdownItem>
                  <MDBDropdownItem href='/login' link>Client</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
          </MDBNavbarNav>
        </MDBCollapse>
        </div>
      </MDBContainer>
    </MDBNavbar>




    </div>
    )
    }
    export default Navbar;
{/* <div> */}

      {/* <MDBNavbar light bgColor='light'>
        <MDBContainer>
          <MDBNavbarBrand href='/'>
            <img
              src='https://res.cloudinary.com/dycpjbdto/image/upload/v1708504176/2-removebg-preview-less_uolwak.png'
              height='50'
              width='90%'
              alt=''
              loading='lazy'
            />
          </MDBNavbarBrand>
        
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
            <MDBNavbarLink active aria-current='page' href='/Client'>
              Plan Your Event
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
                  <MDBDropdownItem  href='/login' link>Admin</MDBDropdownItem>
                  <MDBDropdownItem href='/login' link>Client</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>

      </MDBContainer>
          <MDBNavbarLink href='/login' >
                Are You Vendor?
              </MDBNavbarLink>
            
        </MDBContainer>
        
      </MDBNavbar>
    
</div> */}

{/* <div>
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
            <MDBNavbarLink active aria-current='page' href='/Client'>
              Plan Your Event
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
                  <MDBDropdownItem  href='/login' link>Admin</MDBDropdownItem>
                  <MDBDropdownItem href='/login' link>Client</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>

      </MDBContainer>
    </MDBNavbar>
    
</div> */}

    


     


