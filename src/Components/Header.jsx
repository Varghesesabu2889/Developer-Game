import React from 'react'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand
  } from 'mdb-react-ui-kit';
  
function Header() {
  return (
    <>
    <MDBNavbar light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>
            <img
              src='https://miro.medium.com/v2/resize:fit:1400/1*KN7zbaWkbm5E71zZWfTf7A.gif'
              height='30'
              width={'150'}
              alt=''
              loading='lazy'
            />
           <h1 className='text-primary'> Developer to <span className='text-danger'> React  Developer <span className='text-success'> Game </span> </span> </h1>
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
  
    
    </>
  )
}

export default Header