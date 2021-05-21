import React,{useState,useEffect} from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import UnSplashImage from './UnSplashImage'
import '../../styles/browse.css'
const UnSplashImages = ({user}) =>{

    const [images,setImages] = useState([])
    const baseURL = "https://api.unsplash.com"
    const ACCESS_KEY = "YOUR_ACCESSKEY"
   
   useEffect(() =>{
      getImages()
   },[])

   const getImages = ()=>{
      
      axios.get(`${baseURL}/photos/random?client_id=${ACCESS_KEY}&count=20`)
      .then(res =>{
          const data = res.data
          setImages([...images,...data])
       
      })
      
   }

   const postData = (data) =>{

      
      const url = `http://localhost:80/api/post-unsplash.php`
      const formData = new FormData()
      formData.append("username",user.username)
      formData.append("upload",data.urls.small)
      formData.append("category","unsplash")
      formData.append("description",data.alt_description)
      formData.append("title",data.description)
      axios.post(url,formData,{
         headers: {
           Authorization: user.authToken //the token is a variable which helps for authorizing a user.
         }
        })
       .then(response => {
         console.log(response)
         //check whether there is any error in processing the request in api.
         if(response.data.message == "success")
         {
         
         alert("inserted successfully");
         }
         else
         console.log(response)

       })
       .catch((err)=> console.log(err))
   }

  
   return (<>
   {user.username !== "" ?
   <InfiniteScroll
   dataLength = {images.length}
   next = {getImages}
   hasMore = {true}
   loader = {<h4>Loading...</h4>}
   >

  <div className = "unsplash-images">
   {
      images.length >1 ?
       images.map((image) => (<UnSplashImage onClick = {postData} image = {image} key = {image.id}/>)) 
       : <h3>Loading...</h3>
   }
   </div>
   </InfiniteScroll>
   : <p>Please Log in</p>
   }
   </>)

}
export default UnSplashImages
