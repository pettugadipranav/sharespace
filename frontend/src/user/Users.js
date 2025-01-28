import React ,{useState,useEffect} from 'react'
import User from './User.js'
import {useNavigate} from 'react-router-dom'
import {db} from '../auth/firebase.js'
import HomeHeader from '../home/HomeHeader.js';

function Users({user}) {

    const history = useNavigate("");
    const [users, setusers] = useState([]);

    console.log(user)

    if (user === undefined) {
        history("/")
    }

    


    useEffect(() => {
        db.collection('users').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setusers(snapshot.docs.map(doc => ({
                id: doc.id,
                useR: doc.data(),
            })));
        })
    }, []);

    

  return (
    <>
    <HomeHeader user={user}/>
    <div className="users">
    {
        users.map(({ id, useR }) => 
            
                (
                
                    
                        <User key={id} userID={id} origuser={user?.displayName} orgiuserdp={user?.photoURL} username={useR.USER_Name} userId={user.uid}  imageUrl={useR.dp} otheruserid={useR.uid}/>
                    
                 )
            
        
    )
    }
    </div>
    </>
  )
}

export default Users