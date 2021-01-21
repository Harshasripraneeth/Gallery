import React,{useState,useEffect} from 'react'
import {Form,Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import axios from 'axios'


function Registration({username,onSuccess}){

    const [user,setUser] = useState({

        username:"",
        email:"",
        password:"",
        confirmPassword:"",
        action:"register"
    })

    const [data,setData] = useState(null)

    useEffect(() => {
        if(data){
            if(data.status === "success"){
                onSuccess(data.username)
                return <Redirect to ="/"/>
            }
        }
    }, [data])

    const keyHandler = (event) =>{
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const submitHandler = (event) =>{
        event.preventDefault()
        axios.post(`http://localhost:8005/register`,user)
        .then(response=> setData(response.data))
        
    }



    return <div className ="container">
    
    <Form onSubmit ={submitHandler}>

    <Form.Group controlId="formUserName">
    <Form.Label>UserName</Form.Label>
    <Form.Control name ="username" type="text" onChange={keyHandler} value ={user.username}placeholder="Enter Username" required/>
    </Form.Group>

    <Form.Group controlId="formUserEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control name ="email" type="email" value ={user.email} onChange={keyHandler} placeholder="Enter email" required/>
    </Form.Group>

        
    <Form.Group controlId="formUserPassWord">
    <Form.Label>Password</Form.Label>
    <Form.Control name ="password" type="password" onChange={keyHandler} value ={user.password} placeholder="Enter password" required/>
    </Form.Group>

    <Form.Group controlId="formUserConfirmPassword">
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control name="confirmPassword" type="password" onChange={keyHandler} value ={user.confirmPassword} placeholder="enter Confirm Password" required/>
    </Form.Group>
    
    <Button variant="primary" type="submit">
    Submit
    </Button>
</Form>
</div> 
}

export default Registration