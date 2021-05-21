import axios from 'axios'
import React,{useState} from 'react'
import { Button,Modal,Form} from 'react-bootstrap'

const CustomModal = ({user,show,handleClose})=>{

    const [data,setData] = useState({
        imageFile: null,
        category: null,
        description: null,
        title: null
    })

    const [error, setError] = useState(null);

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
    const ModalClose = ()=>{
        handleClose();
        setError(null);
    }
    const submitHandler =  (event) =>{
        event.preventDefault()
        const formData = new FormData()
        formData.append("uploadFile",data.imageFile)
        formData.append("category",data.category)
        formData.append("description",data.description)
        formData.append("title",data.title)
        postHandler(formData)

    }

    const postHandler = async (formData)=>{
        console.log("submitting...")
        const results = await axios.post("http://localhost/CodeIgniter/index.php/api/gallery/image",formData,{
            headers: {
                'content-type': 'multipart/form-data',
                 Authorization: user.authToken //the token is a variable which holds the token
                
            }
        })
        console.log(results.data)
        if(results.data.message){
          const result = results.data.message
          if(result == "success")
           {
               setError(null)
               handleClose()
           }
           else{
               setError(result);
           }

        }
        
       
    }

   return  <div>
       {show ? <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Upload Your Image</Modal.Title>
    </Modal.Header>
    <Modal.Body>

    <h3> {error}</h3>
    <Form onSubmit ={submitHandler}>

        <Form.Group controlId="formImageFile">
        <Form.Label>File</Form.Label>
        <Form.Control name ="imageFile" type="file" onChange={fileHandler}  required/>
        </Form.Group>

        <Form.Group controlId="formCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control name ="category" type="text"  
        onChange={keyHandler} placeholder="Enter category" required/>
        </Form.Group>
            
        <Form.Group controlId="formDescription">
        <Form.Label>Title</Form.Label>
        <Form.Control name ="title" type="text" onChange={keyHandler} 
        placeholder="Enter title" required/>
        </Form.Group>
    
        <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control name ="description" type="text" onChange={keyHandler} 
        placeholder="Enter description" required/>
        </Form.Group>

        <Modal.Footer>
            <Button variant="primary" type="submit">
            Submit
            </Button>
            <Button variant="secondary" onClick={ModalClose}>
                Cancel
            </Button>
        </Modal.Footer>
    </Form>
    </Modal.Body>
    
  </Modal> : null}
       
       </div>
}

export default CustomModal