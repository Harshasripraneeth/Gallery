import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Photos from './Photos'
import Login from './Login'
import Registration from './Registration'
import NavBar from './NavBar'


function App(){

   const [username, setUserName] = useState("")

   const loggedIn = (name) =>{
     setUserName(name)
   }

   useEffect(()=>{
     const tmpUserName = localStorage.getItem("username",username)
     if(tmpUserName !== null){

      if(tmpUserName != username && username === ""){
        setUserName(tmpUserName)
     }
     else
     localStorage.setItem("username",username)
    }
     else{         
       localStorage.setItem("username",username)
     }
   },[username])

 return <div>  
   <NavBar/>
   
   <Router>

      <Switch>

          <Route exact path="/" render = {(props)=>{

           return  <Photos {...props} username = {username}/>

          }}/>

          <Route path="/login" render = { (props)=>{
             return <Login {...props}  onSuccess = {loggedIn}/>
          }
          }/>

          <Route path="/register" render = {(props) => {
            return <Registration {...props} username = {username} onSuccess = {loggedIn}/>
          }}/>
  
      </Switch>
  
  </Router>
  </div>

}

export default App;