import React ,{useState,useEffect} from 'react'
import OneFriendReq from './OneFriendReq.js'
import {useNavigate} from 'react-router-dom'
import {db} from '../auth/firebase.js'
import HomeHeader from '../home/HomeHeader.js';

function Friendreq({user}) {

    const history = useNavigate("");
    const [friends, setfriends] = useState([]);

    console.log(user)

    if (user === undefined) {
        history("/")
    }

    


    useEffect(() => {
        db.collection('users').doc(user.uid).collection('myfriendsreqrec').onSnapshot(snapshot => {
            setfriends(snapshot.docs.map(doc => ({
                id: doc.id,
                useR: doc.data(),
            })));
        })
    }, [user]);

  return (
    <>
    <div className='side sticky-top '>
        <div className="d-xxl-block fixed-start.overflow-hidden h-100" style={{paddingTop:"80px"}}>
     <div className='card me-3 '>
        
    <div className="users mb-3 ">
    <div className="imageupload__firstSection d-flex justify-content-center">
                        <h4 className='pt-1'>Friend Requests</h4>
                    </div>
        
    {
        
        friends.map(({ id, useR }) => (
            <OneFriendReq orgiuser ={user.displayName} userId={user.uid} otheruserid={useR.uid} userName={useR.username}/>
        ))
    }
    </div>
</div>
</div>
</div>
    </>
  )
}

export default Friendreq