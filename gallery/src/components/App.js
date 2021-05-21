import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Images from './images'
import Login from './authentication/Login'
import Registration from './authentication/Registration'
import NavBar from './NavBar'
import UnSplashImages from './unsplash/UnSplashImages'

function App(){

   //const [username, setUserName] = useState("")
   //const [authToken,setAuthToken] = useState(null);

   const [user,setUser] = useState({
     username: "",
     authToken: null
   })
   
   const loggedIn = (data) =>{
     setUser({
       username : data.username,
       authToken : data.token
     })
     //setAuthToken(data.token)
     //setUserName(data.username)
   }

   useEffect(()=>{
     console.log("App " + user.authToken)
     console.log("Local" + localStorage.getItem("token"))
     const tmpUserName = localStorage.getItem("username",user.username)
     const tmpToken = localStorage.getItem("token",user.authToken)
     if(tmpUserName !== null && tmpToken !== null){

      if(tmpUserName !== user.username && user.username === "" ){
        //setUserName(tmpUserName)
        //setAuthToken(tmpToken)
        setUser({
          username: tmpUserName,
          authToken: tmpToken
        })
     }
     else{
     localStorage.setItem("username",user.username)
     localStorage.setItem("token",user.authToken)
     }
    }
     else{         
       localStorage.setItem("username",user.username)
       localStorage.setItem("token",user.authToken)
     }
     console.log(user.username)
     console.log(localStorage.getItem('username'))
   },[user])


 return <div>  
   
   
   <Router>
      
       <NavBar user= {user} setUser = {setUser}/>

      <Switch>

          <Route exact path="/" render = {(props)=>{

           return  <Images {...props} user = {user}/>

          }}/>

          <Route path="/login" render = { (props)=>{
             return <Login {...props}  user = {user} onSuccess = {loggedIn}/>
          }
          }/>

          <Route path="/register" render = {(props) => {
            return <Registration {...props} username = {user.username} onSuccess = {loggedIn}/>
          }}/>

          <Route path="/browse" user = {user} render = {(props) => {
            return <UnSplashImages {...props} user = {user} onSuccess = {loggedIn}/>
          }}
          />
  
      </Switch>
  
  </Router>
  </div>

}

export default App;