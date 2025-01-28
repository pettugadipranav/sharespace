import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

export default function Editft() {

  const [myData, setmyData] = useState([]);
  const [myPost, setmyPost] = useState(["python", "c", "java"]);
  // const [Item, setItem] = useState({
  //   p_id: 0
  // });

  //   useEffect(() => {
  //     axios.get("")
  //       .then((response) => {
  //         setmyData(...response.data)
  //       setmyPost(...response.data)
  //     }
  //       )
  //       // .catch((Error) => setError(Error.message));
  //   }, []);

  const handleSubmit = e => {
    e.preventDefault()
    console.log("abcdefghijkl")
    axios.post("http://localhost:5000/tpp", myPost)
      .then(response => {
        console.log(response.data)
        setmyData(response.data);
      })
  }

  // let saveData = (val) =>{
  //   localStorage.setItem('p_id',val);
  // }



  return (
    <>

      <div className='col-sm-4'>
      <button type="button" class="btn btn-primary" onClick={handleSubmit}>Click me!</button>
      </div>



      {
        myData.map((index) => (
            
        <a href="/" className="btn btn-primary" onClick={() => { 
          localStorage.setItem("p_id",index.post_title)
          }}>{index.post_id}</a>
       
          )
        )
      }

    </>
  )
}




// {() => { 
//   localStorage.setItem("p_id","123")
//   }}