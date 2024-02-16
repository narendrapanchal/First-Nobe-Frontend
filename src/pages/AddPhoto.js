import React, { useContext, useEffect, useState } from 'react'
import { json, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function AddPhoto() {
    const {user}=useContext(AuthContext);

const [photo,setPhoto]=useState({name:"",slug:"",creator_user_uuid:user.uuid});
const handleSubmit=(e)=>{
    e.preventDefault();
    fetch(`${process.env.REACT_APP_Backend_API_URL}/photos`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(photo)
    }).then(res=>res.json()).then(res=>{
        alert("Photo Added Successfully");
        setPhoto(res);

    }).catch((err)=>{
        console.log(err.message);
    })
}
const handleChange=(e)=>{
    const {name,value}=e.target;
    setPhoto({...photo,[name]:value});
}
  return (
    <div>
        <img alt={photo.name} src={photo.slug} height={50} width={50}/>
      <form onSubmit={handleSubmit}>
        <label>Slug Url</label>
        <input type="text" name="slug" value={photo.slug} onChange={handleChange}/>
        <br/>
        <label>Name </label>
        <input type="text" name="name" value={photo.name} onChange={handleChange}/>
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}

export default AddPhoto
