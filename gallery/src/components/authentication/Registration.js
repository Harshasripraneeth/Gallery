import React,{useState,useEffect} from 'react'
import {Form,Button} from 'react-bootstrap'
import axios from 'axios'


function Registration({username,history,onSuccess}){

    const [user,setUser] = useState({

        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    //for any errors which occured during api request
    const [error,setError] = useState(null)

    //for storing results of api request
    const [data,setData] = useState(null)

    useEffect(() => {
        if(data){
            if(data.status === "success"){
                onSuccess(data)
                history.push("/")
            }
            else{
                setError(data.error)
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
        if(user.password !== user.confirmPassword)
        {
        setError("please enter same password")
        return 
        }
        else if(user.password === user.confirmPassword)
        {
            setError(null)
        }
        if(error === null){
            // const url = `http://localhost:8005/register`
            const url = `http://localhost:8080/v1/user/register`
        axios.post(url,user)
        .then(response=> setData(response.data))
        }
        
    }



    return <div style = {{maxWidth: 500}}className = "container"> 

    {error ? <h4> {error} </h4> : null}
    {username === "" ?   <Form onSubmit ={submitHandler}>

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
    : 
   <h1>you are already logged in as  {username}! Please log out</h1>
    }
  
</div> 
}

export default Registration