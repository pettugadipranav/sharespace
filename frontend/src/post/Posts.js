import React, { useState, useEffect } from 'react'
import ImageUpload from './ImageUpload';
import { db } from '../auth/firebase.js';
import Post from './Post.js';
import { useNavigate } from 'react-router-dom';
import CreateImageUpload from './CreateImageUpload.js';

function Posts({ user ,state}) {
    const history = useNavigate("");
    const [posts, setPosts] = useState([]);

    console.log(user)

    if (user === undefined) {
        history("/")
    }

   

    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data(),
            })));
        })

    //     db.collection("posts").orderBy('timestamp', 'desc').onSnapshot(function(snapshot) {
    //         if (snapshot.docs.length > 0) {
    //             snapshot.docs.forEach(doc => {

    //                 db.collection('users').doc(user.uid).collection("myfriends").onSnapshot(function(snapshot1){
    //                     if(snapshot1.docs.length > 0) {
    //                         snapshot1.docs.forEach(doc1 => {

    //                             if(doc.data().username == doc1.data().username)
    //                             {
    //                                 console.log("df")
    //                                 // posts.push({
    //                                 //     id: doc.id,
    //                                 //     post: doc.data()
    //                                 // })

    //                                 if(posts.indexOf({
    //                                     id: doc.id,
    //                                     post: doc.data()
    //                                                     }) === -1) {
    //                                     posts.push({
    //                                         id: doc.id,
    //                                         post: doc.data()
    //                                     });
    //                                 }
    //                             }
    //                         }

    //                         )
    //                     }
    //                 }

    //                 )



    //             })
    //         }
    //     });
    //    console.log(posts[0])
    }, []);

    if(state===false){
    return (
        <>
        <div className="posts">
            <ImageUpload username={user?.displayName} pic={user?.photoURL} state={state} uid={user.uid}/>
            {
                posts.map(({ id, post }) => (
                    <Post key={id} postId={id} origuser={user?.displayName} orgiuserdp={user?.photoURL} username={post.username} userId={user.uid} caption={post.caption} imageUrl={post.imageUrl} noLikes={post.noLikes} personURL={post.personurl} />
                ))
            }
        </div>
        
        </>
    )
        }
        if(state===true){
            return (
                <>
                
                <div className="posts">
                    <CreateImageUpload username={user?.displayName} pic={user?.photoURL} state={state}/>
                    {
                        posts.map(({ id, post }) => (
                            <Post key={id} postId={id} origuser={user?.displayName} orgiuserdp={user?.photoURL} username={post.username} userId={user.uid} caption={post.caption} imageUrl={post.imageUrl} noLikes={post.noLikes} personURL={post.personurl} />
                        ))
                    }
                </div>
                </>
            )
        }
}

export default Posts

