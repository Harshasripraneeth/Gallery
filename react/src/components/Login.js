import React from 'react'
import {Redirect,Link} from 'react-router-dom'

function Login({onSuccess,history}){
    
    function verify(){
        console.log("clicked");
        onSuccess("praneeth") ;
        history.push("/")
 
    }
    return <div>
            <p> Welcome to Login Page</p>
            <button onClick = {verify}>Redirect</button>
            <Link to ="/">Home</Link> 
        </div>
}

export default Login