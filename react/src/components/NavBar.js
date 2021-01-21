import {Nav,Navbar} from 'react-bootstrap'



import { useHistory } from "react-router-dom";

 const CustomNavBar = ()=>{

     let history = new useHistory()

    return <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
      </Nav>
      <Nav>
        <Nav.Link href="/login" name = "signin" >Sign In</Nav.Link>
        <Nav.Link name = "register" eventKey={2} href="/register">
          Register
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>

}

export default CustomNavBar