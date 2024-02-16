import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Home() {
  const { user } = useContext(AuthContext);
  const [photos, setPhotos] = useState([]);
  const fetchPhotos = () => {
    fetch(`${process.env.REACT_APP_Backend_API_URL}/photos`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setPhotos(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    fetchPhotos();
  }, []);
  const handleDelete = (uuid) => {
    fetch(`${process.env.REACT_APP_Backend_API_URL}/photos/${uuid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((res) => {
        fetchPhotos();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
<div>
  {photos.map((photo, index) => (
    <div key={index + photo.name} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
      <img style={{ width: '100px', height: '100px', marginRight: '10px' }} src={photo.slug} alt={photo.name} />
      <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{photo.name}</span>
      {user.email&&<>
      <Link to={`/edit/${photo.uuid}`} style={{ marginLeft: '10px', marginRight: '10px', color: 'blue' }}>Edit</Link>
      <button
        onClick={() => {
          handleDelete(photo.uuid);
        }}
        style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
        >
        Delete
      </button>
        </>}
    </div>
  ))}
</div>
  );
}

export default Home;
