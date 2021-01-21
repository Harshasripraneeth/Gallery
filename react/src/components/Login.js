import React,{useState,useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {Form,Button} from 'react-bootstrap'
import axios from 'axios'

function Login({onSuccess,history}){
    const [details,setDetails] =useState({
        username:"",
        password:""
    })
    const [data,setData] = useState(null)

    useEffect(() => {
        console.log("useEffect")
        if(data){
            if(data.status === 'success'){
                onSuccess(data.username)
                history.push("/")
            }
        }
    }, [data])
        

    function handleChange(event){
     
        setDetails({
            ...details,
            [event.target.name] : event.target.value 
        })

    }
    
    function verify(event){
        event.preventDefault();
        axios.post(`http://localhost:8005/login`,details)
        .then(response => setData(response.data))
    }

   
    
    return <div className ="container">

        {localStorage.getItem("username") === ""? <Form onSubmit={verify}>
            <Form.Group controlId="formBasicUserName">
            <Form.Label>UserName</Form.Label>
            <Form.Control name ="username" type="text" value ={details.username} placeholder="Enter Username" onChange={handleChange} />
            </Form.Group>
        
            <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name ="password" type="password" value ={details.password} placeholder="Password" onChange={handleChange}/>
            </Form.Group>
            
            <Button variant="primary" type="submit">
            Submit
            </Button>
        </Form>
        :
        <h1> you are already logged in</h1>
        
        }

            
     </div>
}

export default Login