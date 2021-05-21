import React,{useState,useEffect} from 'react'
import {Form,Button} from 'react-bootstrap'
import axios from 'axios'
import '../../styles/loginStyle.css'
function Login({onSuccess,history,user}){
    const [details,setDetails] =useState({
        username:"",
        password:""
    })
    const [data,setData] = useState(null)
    const [error,setError] = useState(null)
    useEffect(() => {
        console.log("useEffect")
        console.log("login " + user.username)
        if(data){
            if(data.status === 'success'){
                onSuccess(data)
                history.push("/")
            }
            else{
                console.log(data.error)
                setError([data.error])
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
        // const url = `http://localhost:8005/login`
        const url = `http://localhost:8080/v1/user/login`
        axios.post(url,details)
        .then(response => {
             console.log(response.data)
            setData(response.data)
        }
        )
    }

   
    
    return <div style = {{maxWidth: 500}} className ="container">

        {error ? <p> {error}</p> : null}

        {
        user.username === ""? <Form onSubmit={verify}>
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
        <h1> you are already logged in as {user.username}</h1>
        
        }

            
     </div>
}

export default Login

