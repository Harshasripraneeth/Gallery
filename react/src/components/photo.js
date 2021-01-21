import React from 'react';

const customStyle ={
    width: 300,
    height:300 
}

export default function photo({loc}){

     return <img style = {customStyle} src= {`pictures/${loc}`} alt = "not uplaoded"/>
}