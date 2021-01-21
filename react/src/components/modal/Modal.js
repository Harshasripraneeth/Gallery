import axios from 'axios'
import React,{useState} from 'react'
import { Button,Modal,Form} from 'react-bootstrap'

const CustomModal = ({username,show,handleClose})=>{

    const [data,setData] = useState({
        imageFile: null,
        category: null,
        description: null
    })

    const fileHandler = (event)=>{
        setData({
            ...data,
            [event.target.name]:event.target.files[0]
        })
    }

    const keyHandler = (event) =>{
        setData({
            ...data,
            [event.target.name] : event.target.value
        })
    }

    const submitHandler = (event) =>{
        event.preventDefault()
        const formData = new FormData()
        formData.append("username",username)
        formData.append("uploadFile",data.imageFile)
        formData.append("category",data.category)
        formData.append("description",data.description)
        postHandler(formData)

        console.log("still here")

    }

    const postHandler = async (formData)=>{
        const results = await axios.post("http://localhost:80/api/post.php",formData)
        console.log(results.data.status)
        const result = results.data.status

        console.log("yahallo")
        if(result.status == "success")
        {
        console.log("got here")
        }
        handleClose()
    }

   return  <div>
       {show ? <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Modal heading</Modal.Title>
    </Modal.Header>
    <Modal.Body>

    <h3> Insert your file and whoosh..</h3>
    <Form onSubmit ={submitHandler}>

        <Form.Group controlId="formImageFile">
        <Form.Label>UserName</Form.Label>
        <Form.Control name ="imageFile" type="file" onChange={fileHandler}  required/>
        </Form.Group>

        <Form.Group controlId="formCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control name ="category" type="text"  
        onChange={keyHandler} placeholder="Enter category" required/>
        </Form.Group>
            
        <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control name ="description" type="text" onChange={keyHandler} 
        placeholder="Enter description" required/>
        </Form.Group>

        <Button variant="primary" type="submit">
        Submit
        </Button>
    </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
    </Modal.Footer>
  </Modal> : null}
       
       </div>
}

export default CustomModal