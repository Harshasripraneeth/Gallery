import {Nav,Navbar} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import '../styles/navBarStyle.css'


 const CustomNavBar = ({user,setUser})=>{


     const logOutHandler = (event)=>{
       localStorage.clear()
       setUser({
         username: "",
         authToken: null
       })
     }

    return <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand href="/">Gallery</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
      <Nav.Link href="/browse" name = "browse" >Browse</Nav.Link>
      </Nav>
      <Nav>
        
       { 
       user.username === "" ?
       <>
       <Nav.Link href="/login" name = "signin" >Sign In</Nav.Link>
        <Nav.Link name = "register" href="/register">
          Register
        </Nav.Link>
       </>
       :  <NavLink to="/login" className = "logoutButton" name = "logout" onClick ={logOutHandler}>Log Out</NavLink>
      }
      </Nav>
    </Navbar.Collapse>
  </Navbar>

}

export default CustomNavBar