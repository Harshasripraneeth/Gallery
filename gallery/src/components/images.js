import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Image from './image'
import '../styles/imagesStyle.css'
import Modal from './modal/Modal'
import ImageModal from './modal/ImageModal'

function Photos({user}){

    //used to maintain state for images.
    //const [items,setItems] = useState(null)

    const [restResults,setRestResults] = useState({
      items: null,
      categories: null
    })

    //used to maintain state for categories
    const [category, setCategory] = useState("ALL")

    //used to maintain state for displaying insert button modal.
    const [showModal,setShowModal] = useState(false)

    //used to maintain state for displaying imageClick modal.
    const [showImageModal,setShowImageModal] = useState(false)

    //used to maintain state for displaying selected image details.
    const [selectedImage,setSelectedImage] = useState(null)

    //used to maintain state for delete
    const [isDelete,setIsDeleted] = useState(false)

    //used to maintain error state of JWT token
    const [jwtError,setJWTERROR] = useState(null)

    //operation for displaying image modal.
    const ImageModalClose = ()=>{ console.log("Close Clicked")
    setShowImageModal(false)}
    const ImageModalOpen = ()=>{setShowImageModal(true)}

    //operations for displaying insert modal
    const modalOpen = ()=>{setShowModal(true)}
    const modalClose = ()=>{setShowModal(false)}



    useEffect(()=>{
        
        if(!showModal){
          //const url = `http://localhost:80/api/get1.php`
          //const url = `http://localhost/CodeIgniter/index.php/api/images/get`;
          const url = `http://localhost/CodeIgniter/index.php/api/gallery`;
          const formdata = new FormData()
          formdata.append('category',category)
          formdata.append('username',user.username);

          //post request for retreiving images from database
          axios.post(url,formdata
            ,{
            headers: {
              Authorization: user.authToken //the token is a variable which helps for authorizing a user.
            }
           }
           )
          .then(response => {
            console.log("images loading...")
            console.log(response.data)
            
            //check whether there is any error in processing the request in api.
            if(response.data.message == "success")
            {
             
              setRestResults({
                    items:response.data.data,
                    categories:response.data.categories
                  })
              
            setJWTERROR(null)
            }
            else if(response.data.message =="Expired token"){

              setJWTERROR(response.data.message)
            }
            else if(response.data.message == "no results found"){

              setRestResults({
                items: null,
                categories: null
              })

            }

          })
          .catch((err)=>{
              if(err.response.status === 401){
                setJWTERROR("Expired token")
              }
          } )
        }

        if(isDelete){
          setIsDeleted(false)
        }
        
     },[category,showModal,user,isDelete])


     //function triggered when image is selected.
     const imageClicked = (dataClicked)=>{
       setSelectedImage(dataClicked)
       ImageModalOpen()
     }

     //function triggered when delete button in Image modal is clicked and perform the operation
     //of deleting the image.
     const deleteButtonClicked = (image)=>{
   
       //const url = `http://localhost:80/api/delete.php`

        const url = `http://localhost/CodeIgniter/index.php/api/gallery/imageDelete`
        const formdata = new FormData()
        formdata.append('location',image.location)
        formdata.append('id',image.id)
       //post request for retreiving images from database
        axios.post(url,formdata,
          {
            headers: {
              Authorization: user.authToken //the token is a variable which helps for authorizing a user.
            }
           }
           )
       .then(response => {
         console.log("delete image function")
         console.log(response.data)
         if(response.data.message == "success"){
           console.log("got deleted")
           setIsDeleted(true)
         }
       })
       .catch((err)=> console.log(err))

     }
          


    return   <> {
        user.username !== "" && jwtError === null ?
        <div className= "box mg-8">
        <p> Welcome to {user.username}</p>
        <button className ="btn btn-primary" onClick = {modalOpen}>Insert</button >
        <Modal user={user} show = {showModal} handleClose ={modalClose}/>
        
        <h1> Photos List</h1>

         <select onChange = {(e)=>{setCategory(e.target.value)}}>
            <option>ALL</option>
            {
              restResults.categories? restResults.categories.map(item => (<option key = {item.category}>{item.category} </option>)) : null
            }
          </select>
          {

            restResults.items  ?   <div className ="display mg-8"> 
                    {
                    restResults.items.map((item)=>{
                  
                     return <Image key={item.id} show = {showImageModal} onSelect = {imageClicked}data= {item} />
                     })}
                    </div> : <p> list is empty, let's save some memories</p>
            }
            <ImageModal image ={selectedImage} onDelete = {deleteButtonClicked} onSelect ={ImageModalClose} show ={showImageModal}/>
           
        </div>
       : <h1> Please Log in {jwtError}</h1>  }</>
    
}

export default Photos