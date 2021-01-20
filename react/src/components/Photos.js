import React from 'react'
import {Link} from 'react-router-dom'

function Photos({username}){
    return <>
    <p> Welcome to {username}</p>
    <h1> Photos List</h1>
    <Link to="/login">Login</Link>
    </>
}

export default Photos