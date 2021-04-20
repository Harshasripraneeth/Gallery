import React from 'react';
import { Card } from 'react-bootstrap';
import '../styles/imagesStyle.css'


export default function photo({data,show,onSelect}){

    return <Card  className={show ? null : "imgCard"} onClick = {()=>{onSelect(data)}}>
           <Card.Img className = "img-maxheight" variant="top" src={data.location} />
           <Card.Body>
           <Card.Title>{data.title !== "null" ? data.title : <p></p>}</Card.Title>
              <Card.Text>
                  {data.description}
              </Card.Text>
            </Card.Body>
         </Card>
}