import React, { useState,useEffect } from 'react'
import './User.css';
import { Avatar, Button } from '@mui/material';
import { db } from '../auth/firebase';

function OneFriendReq({ orgiuser,userId ,otheruserid ,userName}) {

    const [imageUrl,setdp] = useState('');
    const [username ,setName] = useState('')

     const Acceptfriend = ()=>{
        db.collection('users').doc(userId).collection('myfriendsreqrec').doc(otheruserid).delete();
        db.collection('users').doc(otheruserid).collection('myfriendsreqsent').doc(userId).delete();
     
        db.collection('users').doc(userId).collection('myfriends').doc(otheruserid).set({
            uid : otheruserid ,
            username : userName
        })
        db.collection('users').doc(otheruserid).collection('myfriends').doc(userId).set({
            uid: userId,
            username : orgiuser
        })
     
        alert("Added as your Friend");

       }

       const Rejectfriend = ()=>{
        db.collection('users').doc(userId).collection('myfriendsreqrec').doc(otheruserid).delete()
        db.collection('users').doc(otheruserid).collection('myfriendsreqsent').doc(userId).delete()
            alert("Rejected");

       }

       useEffect(() => {
       
        db.collection('users').doc(otheruserid).get().then((snapshot)=>{
            setdp(snapshot.data().dp)
            setName(snapshot.data().USER_Name)
        })
   
     
   }, [otheruserid])
       

  return (
<div className='container d-flex justify-content-center'>
    <div className='row '>
        <div className='container d-flex justify-content-center pt-3'>
     
    <div className='card' style={{width:"300px",height:"100px"}}>
        <div className='row  g-0'>
            <div className='col-md-3'>
   <div className="user pt-4 ps-2">
        <Avatar
            className="user__avatar"
            alt=""
            src={imageUrl}
            style={{width:"50px",height:"50px",borderRadius:"25px"}}
        />
        </div>
        </div>
        <div className='col-md-9'>
            
        <h4  className="pt-1 mt-2"style={{marginTop:"40px",marginLeft:"10px"}}>{username}</h4>
        <button className="btn btn-primary me-1 mt-1" style={{height:"30px"}} type="Submit" onClick={(e)=>{Acceptfriend()}}>
                                        <h6>Accept</h6>
                                    </button>
        <button className="btn btn-primary mt-1" style={{height:"30px"}} type="Submit" onClick={(e)=>{Rejectfriend()}}>
                                        <h6>Reject</h6>
                                 </button>
        </div>

   </div>
   </div>
   </div>
 
   </div>
   </div>
  )
}

export default OneFriendReq