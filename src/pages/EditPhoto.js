import React, { useEffect, useState } from 'react'
import { json, useParams } from 'react-router-dom'

function EditPhoto() {
const {uuid}=useParams();
const [photo,setPhoto]=useState({});
useEffect(()=>{
    console.log("uuid",uuid)
    fetch(`${process.env.REACT_APP_Backend_API_URL}/photo/${uuid}`).then(res=>res.json()).then(res=>{
        console.log(res);
        setPhoto(res);
    }).catch(err=>{
        console.log(err.message);
    })
},[])
const handleSubmit=(e)=>{
    e.preventDefault();
    fetch(`${process.env.REACT_APP_Backend_API_URL}/photos/${uuid}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(photo)
    }).then(res=>res.json()).then(res=>{
        alert("Photo Updated Successfully");
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
        <img alt={photo.name} src={photo.slug} height={200} width={200}/>

      <form onSubmit={handleSubmit}>
        <label>Slug Url</label>
        <input type="text" name="slug" value={photo.slug} onChange={handleChange}/>
        <br/>
        <label>Slug Url</label>
        <input type="text" name="name" value={photo.name} onChange={handleChange}/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default EditPhoto
