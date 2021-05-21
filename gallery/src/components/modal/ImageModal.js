import React,{useRef} from 'react'
import styled from 'styled-components'

const Background = styled.div`
position: fixed;
top:0;
left:0;
width:100%;
height:100vh;
background-color: rgba(0,0,0,0.5);
display:flex;
justify-content:center;
align-items:center;
`
const ModalWrapper = styled.div`
    width: 1000px;
    height:100%;
    box-shadow: 0 5px 16px rgba(0,0,0,0.2);
    background: white;
    color:#000;
    display:grid;
    grid-template-columns: 1fr 1fr;
    position: relative;
    z-index: 10;
    border-radius: 10px;
    margin-top: 2rem; 
    margin-bottom: 2rem;
`
const ModalImg = styled.img`
   marigin-top: 10px;
   width: 800px;
   height: 100%;
   padding:5px;
`
const ModalContent = styled.div`
     display:flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     line-height: 1.8;
     color: #141414;
     padding: 5px;

     p{
         margin-top:2rem;
       margin-bottom: 1rem;
       
     }
     `

const CloseModalButton = styled.button`
     height:20px;
     cursor: pointer;
     border:none;
     position: absolute;
     top:20px;
     right:20px;
     padding:0;
     background:white;
 `
 const DeleteButton = styled.button`
 cursor: pointer;
 border:none;
 padding:2px;
 margin-top:3px;
 color:white;
 background:black;
`

const ImageModal = ({image,show,onSelect,onDelete})=>{

    const modalRef = useRef()

    const deleteButtonClicked = (event)=>{
        onDelete(image)
        onSelect()
    }
    
    return (
        <>
        {show ? 
            <Background ref ={modalRef} onClick = {(e)=>{ if(modalRef.current === e.target) {onSelect()}}}>
            <ModalWrapper showModal = {show}>
            <ModalImg src={image.location} alt = "not uploaded"/>
            <ModalContent>
                <h2>{image.title === "null" ? "No Title" : image.title}</h2>
                <p>{image.description}</p>
                <DeleteButton onClick = {deleteButtonClicked}>Delete</DeleteButton>
            </ModalContent>
            
            <CloseModalButton onClick= {()=> (onSelect())}>X</CloseModalButton>
        </ModalWrapper>
        </Background>
        
        : null}
        </>
    )


}
export default ImageModal