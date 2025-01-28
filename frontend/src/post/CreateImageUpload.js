import React, { useState ,useEffect} from 'react'
import './ImageUpload.css';
import { Avatar } from '@mui/material';
//import  makeStyles  from '@emotion/styled';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button";
import { storage, db } from "../auth/firebase.js";
//import { useNavigate} from "react-router-dom";
import './ImageUpload.css';
import {serverTimestamp} from "firebase/firestore";
//import { getAuth } from 'firebase/auth';

/*
function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
*/
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };



function CreateImageUpload(props) {
    //const classes = useStyles();
    //const user = getAuth();
    const username = props.username;
    const personurl = props.pic;
   // const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(props.state);
    //const [comment, setComment] = useState('');
    const noLikes = 0;
    const [image, setImage] = useState('');
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);

    const uploadFileWithClick = () => {
        document.getElementsByClassName('imageFile')[0].click()
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleUpload = (event) => {
        event.preventDefault()

        if (image === '') {
            db.collection("posts").add({
                timestamp: serverTimestamp(),
                caption: caption,
                imageUrl: image,
                noLikes: noLikes,
                username: username,
                personurl: personurl
            })
            db.collection("users").doc(props.uid).collection("myposts").add({
                timestamp: serverTimestamp(),
                caption: caption,
                imageUrl: image,
                noLikes: noLikes,
                username: username,
                personurl: personurl
            })
            handleClose();
            setCaption("")
        } else {
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                (error) => {
                    console.log(error);
                    alert(error.message);
                },
                () => {
                    storage
                        .ref("images")
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            db.collection("posts").add({
                                timestamp: serverTimestamp(),
                                caption: caption,
                                imageUrl: url,
                                noLikes: noLikes,
                                username: username,
                                personurl: personurl
                            });
                            db.collection("users").doc(props.uid).collection("myposts").add({
                                timestamp: serverTimestamp(),
                                caption: caption,
                                imageUrl: url,
                                noLikes: noLikes,
                                username: username,
                                personurl: personurl
                            });
                            handleClose();
                            setProgress(0);
                            setCaption("")
                            setImage(null);
                        })
                }
            )
        }
    }

    useEffect(() => {
    
            if(props.state === true){
            setOpen(true)
        }
    
      
    }, [props.state])
    
    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    return (
        <>
        
    <div className="container d-flex justify-content-center me-0" style={{width:'550px'}}>
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ ...style, width: 600 }}>
                
                    <div className="imageupload__firstSectionModal d-flex justify-content-center">
                        <h2>Create Post</h2>
                    </div>
                    <div className="imageupload__secondSectionModal">
                        <Avatar
                            className="imageupload__avatar"
                            alt=""
                            src={props.pic}
                        />
                        <input type="text" onChange={(e) => setCaption(e.target.value)} onClick={handleOpen} placeholder={`What's on your mind ${username} ?`} />
                    </div>
                    <hr />
                    <div className="imageupload__imageuploadModal" onClick={uploadFileWithClick}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png" className="imageupload__gallery" alt=""></img>
                        <input type="file" className="imageFile" onChange={handleChange} />
                        <h3>Photo</h3>
                        <h3 className="homeHeader__dash1"> | </h3>
                        <img src="https://i.gifer.com/P0Hl.gif" className="imageupload__gallery" alt=""></img>
                        <input type="file" className="imageFile" onChange={handleChange} />
                        <h3>Gifs</h3>
                        <h3 className="homeHeader__dash1"> | </h3>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvlnBKIPiC3TV-IZJvtby7ywkJ_Pdw0kYRmQ&usqp=CAU" className="imageupload__gallery" alt=""></img>
                        <input type="file" className="imageFile" onChange={handleChange} />
                        <h3>Videos</h3>
                    </div>

                    <br />
                    <div className="imageupload__feedModal">
                        <br />
                        <h2 className={`imageText ${image && 'show'}`}>File is added and will be posted after clicking the Post button</h2>
                        <Button type="submit" onClick={handleUpload} className="imageupload__submitButton">Post</Button>
                    </div>
               
            </Box>
        </Modal>
        <div className='container d-flex justify-content-center px-0'>
        <div className='card d-flex justify-content-center' style={{width:"1000px"}}>
        <div className="imageupload__container">
            <div className="imageupload__firstSection d-flex justify-content-center">
                <h2>Create Post</h2>
            </div>

            <div className="imageupload__secondSection">
                <Avatar
                    className="imageupload__avatar"
                    alt=""
                    src={props.pic}
                />
                <input type="text" onClick={handleOpen} placeholder={`What's on your mind ${username} ?`} />
            </div>
            <hr />
            <div className="uploadimage__options" onClick={setOpen}>
                <div className="imageupload__imageupload">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png" className="imageupload__gallery" alt=""></img>
                    <h3>Photo</h3>
                    <h3 className="homeHeader__dash1"> | </h3>
                        <img src="https://i.gifer.com/P0Hl.gif" className="imageupload__gallery" alt=""></img>
                        <h3>Gifs</h3>
                        <h3 className="homeHeader__dash1"> | </h3>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvlnBKIPiC3TV-IZJvtby7ywkJ_Pdw0kYRmQ&usqp=CAU" className="imageupload__gallery" alt=""></img>
                        <h3>Videos</h3>

                </div>
            </div>
            <progress value={progress} max="100" className={`progress ${progress && 'show'}`} />
        </div>
        </div>
        </div>
     </div>
     
</>
     
)
}

export default CreateImageUpload
