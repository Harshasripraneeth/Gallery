import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Photo from './photo'
import './photos.css'
import Modal from './modal/Modal'
function Photos({username}){

    const [items,setItems] = useState(null)
    const [showModal,setShowModal] = useState(false)

    const modalOpen = ()=>{setShowModal(true)}
    const modalClose = ()=>{setShowModal(false)}

    const url = `http://localhost:80/api/get.php`
    useEffect(()=>{
        if(!showModal){
        axios.get(url)
       .then(response => setItems(response.data.data))
       .catch((err)=> console.log(err))
        }
     },[showModal])
   

    return <div className ="box">
        {username === "" ? <h1> Please Log in</h1> :<>
        <p> Welcome to {username}</p>
        <button className ="btn btn-primary" onClick = {modalOpen}>Insert</button >
        <Modal username = {username} show = {showModal} handleClose ={modalClose}/>
        <h1> Photos List</h1>
        {

            items  ?    items.map((item,index)=>{
                    console.log(item.location)        
                    return <Photo key={index}loc= {item.location}/>
                            
                        }) : <p> list is empty, let's save some memories</p>
            }
        </>}
    </div>
}

export default Photos