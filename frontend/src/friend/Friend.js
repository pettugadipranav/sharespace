import React, { useState ,useEffect} from 'react'
import './User.css';
import { Avatar } from '@mui/material';
import { db } from '../auth/firebase';
import {Button} from '@mui/material';

function Friend({ friendId ,userID}) {

    const [imageUrl1,setimageurl]= useState('');
    const [username1,setusername] = useState('');

    const removefriend = ()=>{
        db.collection('users').doc(userID).collection('myfriends').doc(friendId).delete()
        db.collection('users').doc(friendId).collection('myfriendsreqrec').doc(userID).delete()

        alert("Removed from friends!")
      }

    //useEffect(() => {
        
    //}, [])
    
    


  return (
    /*
    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db.collection("users").doc(userID).collection("comments").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }
        return () => {
            unsubscribe();
        }
    }, [userID]);*/
    db.collection("users").doc(friendId).get().then((snapshot)=>{
        setusername(snapshot.data().USER_Name)
        setimageurl(snapshot.data().dp)
        //console.log(snapshot.data())
        //const current = new Date();
        //if(current.getUTCDate-dob > 567648000){
        //console.log()
        //}
      }),
    <div className='row pt-0'>
        <div className='container d-flex justify-content-center pt-3'>
     
        <div className="card my-3 mx-3" style={{width:"450px",height:"120px"}}>
            <div className='row g-0'>
                <div className='col-md-4'>
                    <div className="user pt-2 ps-2">
                            <Avatar
                                className="user__avatar"
                                alt=""
                                src={imageUrl1}
                                style={{width:"100px",height:"100px",borderRadius:"50px"}}
                            />
                    </div>
                </div>
                <div className='col-md-8'>
                <h3 style={{marginTop:"20px",marginLeft:"10px"}}>{username1}</h3>
                    <button className="btn btn-primary me-1 mt-1"  type="Submit" onClick={(e)=>{removefriend()}}>
                                                Remove friend
                                            </button>
                </div>
            </div>
        </div>
        </div>
 
    </div>
  )
}

export default Friend