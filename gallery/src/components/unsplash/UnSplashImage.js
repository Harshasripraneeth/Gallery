import React from 'react';
import '../../styles/browse.css';
const UnSplashImage = ({image, onClick})=>{
    return <div className="unsplash-img">
        <img style = {{margin:3}}src ={image.urls.small} alt = "loading"/>
        <button onClick = {()=>{onClick(image)}}>Add to favourites</button>
        </div>
        
}
export default UnSplashImage