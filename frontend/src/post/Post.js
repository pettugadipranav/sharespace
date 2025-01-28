import React, { useState, useEffect } from 'react'
import './Post.css';
import { Avatar } from '@mui/material';
import { db } from '../auth/firebase';
//import {storage} from './firebase';
import { serverTimestamp} from "firebase/firestore";

function Post({ postId, origuser, orgiuserdp, username, userId, caption, imageUrl, noLikes ,personURL }) {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [show, setShow] = useState('like2');
    const [show2, setShow2] = useState('textforlike');

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db.collection("posts").doc(postId).collection("comments").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }
        return () => {
            unsubscribe();
        }

        
    }, [postId]);

    //For color of like button
    useEffect(() => {
        db.collection("posts")
            .doc(postId)
            .collection("likes")
            .doc(userId)
            .get()
            .then(doc2 => {
                if (doc2.data()) {
                    if (show === 'like2') {
                        setShow('like2 blue');
                        setShow2('textforlike bluetextforlike')
                    } else {
                        setShow('like2');
                        setShow2('textforlike')
                    }
                }
            })
    }, [postId, userId,show]);


    const likeHandle = (event) => {
        event.preventDefault();
        if (show === 'like2') {
            setShow('like2 blue');
            setShow2('textforlike bluetextforlike')
        } else {
            setShow('like2');
            setShow2('textforlike')
        }

        db.collection('posts')
            .doc(postId)
            .get()
            .then(docc => {
                const data = docc.data()
                console.log(show)
                if (show === 'like2') {
                    db.collection("posts")
                        .doc(postId)
                        .collection("likes")
                        .doc(userId)
                        .get()
                        .then(doc2 => {
                            if (doc2.data()) {
                                //console.log(doc2.data())
                            } else {
                                db.collection("posts").doc(postId).collection("likes").doc(userId).set({
                                    likes: 1
                                });
                                db.collection('posts').doc(postId).update({
                                    noLikes: data.noLikes + 1
                                });
                            }
                        })

                } else {
                    db.collection('posts').doc(postId).collection('likes').doc(userId).delete().then(function () {
                        db.collection('posts').doc(postId).update({
                            noLikes: data.noLikes - 1
                        });
                    })
                }
            })

    }


    const postComment = (event) => {
        event.preventDefault();

        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: origuser,
            personurl: orgiuserdp,
            timestamp: serverTimestamp()
        });
        setComment('');
    }

    return (
        <div className='container d-flex justify-content-center mt-3 pt-0'>
        <div className='card d-flex justify-content-center'>
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt=""
                    src={personURL}
                />
                <h3>{username}</h3>
                <i className="post__verified" />
            </div>

            <h4 className="post__text">{caption}</h4>

            <img src={imageUrl} alt="" className="post__image" />

            <div className="post__likeandlove">
                <i className="post__like" />
                <i className="post__heart" />
                <p>{noLikes} Likes</p>
            </div>

            <hr />

            <div className="post__likeoptions">
                <div className="like" onClick={likeHandle}>
                    <i className={show} />
                    <h3 className={show2}>Like</h3>
                </div>
                <div className="comment">
                    <i className="comment2" />
                    <h3 className="dope">Comment</h3>
                </div>
                <div className="share">
                    <i className="share2" />
                    <h3>Share</h3>
                </div>
            </div>
            <form onSubmit={postComment}>
                <div className="commentBox">
                    <Avatar
                        className="post__avatar2"
                        alt=""
                        src={orgiuserdp}
                    />
                    <input className="commentInputBox" type="text" placeholder="Write a comment ... " onChange={(e) => setComment(e.target.value)} />
                    <input type="submit" disabled={!comment} className="transparent__submit" />
                </div>
                <p className="pressEnterToPost">Press Enter to post</p>
            </form>

            {
                comments.map((comment) => (
                    <div className={`comments__show myself`}>
                        <Avatar
                            className="post__avatar2"
                            alt=""
                            src={comment.personurl}
                        />
                        <div className="container__comments">
                            <p><span>{comment.username}</span><i className="post__verified"></i>&nbsp; {comment.text}</p>
                        </div>
                    </div>
                ))
            }
        </div>
        </div>
        </div>
    )
}

export default Post
