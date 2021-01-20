import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Photos from './Photos'
import Login from './Login'
import Registration from './Registration'

function App(){

   const [username, setUserName] = useState("")

 return <div>  <Router>

      <Switch>

          <Route exact path="/" render = {(props)=>{

           return  <Photos {...props} username = {username}/>

          }}/>

          <Route path="/login" render = { (props)=>{
             return <Login {...props} onSuccess = {setUserName}/>
          }
          }/>

          <Route path="/register" render = {(props) => {
            return <Registration {...props} onSuccess = {setUserName}/>
          }}/>
  
      </Switch>
  
  </Router>
  </div>

}

export default App;