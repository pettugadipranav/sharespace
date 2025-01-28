import React from 'react'
import './User.css';
import { Avatar } from '@mui/material';
import { db } from '../auth/firebase';
//import {useState,useEffect} from 'react';

function User({ userID ,origuser, orgiuserdp, username, userId, imageUrl ,otheruserid}) {

    //const [friends,setfriends] = useState([]);
    //const [bool,setbool] = useState(0);
    //const bool = 0;

     const addfriend = ()=>{
        db.collection('users').doc(userId).collection('myfriendsreqsent').doc(otheruserid).set({
          uid : otheruserid,
          username : username
        })
        db.collection('users').doc(otheruserid).collection('myfriendsreqrec').doc(userId).set({
            uid : userId ,
            username : origuser
        })
       }

       
    
       if((otheruserid !== userId) /*|| bool=== 1)*/)
        {
        
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
            <div className='row'>
                <div className='container d-flex justify-content-center pt-3'>
            
            <div className='card' style={{width:"400px",height:"125px"}}>
                <div className='row g-0'>
                    <div className='col-md-4'>
        <div className="user pt-2 ps-2">
                <Avatar
                    className="user__avatar"
                    alt=""
                    src={imageUrl}
                    style={{width:"100px",height:"100px",borderRadius:"50px"}}
                />
                </div>
                </div>
                <div className='col-md-8'>
                <h3 style={{marginTop:"20px",marginLeft:"10px"}}>{username}</h3>
                <button className="btn btn-primary me-1 mt-1"  type="Submit" onClick={(e)=>{addfriend()}}>
                                                Add friend
                                            </button>
                </div>
        
        
        
        </div>
        </div>
        </div>
        
        </div>
        )
    }
}

export default User