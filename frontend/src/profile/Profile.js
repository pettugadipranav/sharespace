import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth, upload, upload2 } from "../auth/firebase";
import { db } from '../auth/firebase.js'
import HomeHeader from '../home/HomeHeader.js'
//import ProfileData from './ProfileData.js';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Post from '../post/Post.js';
import Friend from '../friend/Friend.js';


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



export default function Profile({ user }) {
  const history = useNavigate('');
  if (user === false) {
    history("/")
  }
  const currentUser = useAuth();
  // const [users, setusers] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photo2, setPhoto2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
  const [coverdp, setcoverdp] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
  const [posts, setPosts] = useState([]);

  const [name, setName] = useState('');
  const [lastname, setlastname] = useState('');
  const [dob, setdob] = useState();
  const [gen, setgen] = useState('');
  const [place, setplace] = useState('');
  const [edu, setedu] = useState('');
  const [phone, setphone] = useState('');
  const [bio, setbio] = useState('');
  const [friends, setfriends] = useState([]);




  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }

  function handleChange2(e) {
    if (e.target.files[0]) {
      setPhoto2(e.target.files[0])
    }
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleOpen2 = () => {
    setOpen2(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleClose2 = () => {
    setOpen2(false)
  }

  function handleClick() {
    upload(photo, currentUser, setLoading);
    history('/profile');
    history('/home');
    history(0)
  }

  function handleClick2() {
    upload2(photo2, currentUser, setLoading2);
    history('/profile');
    history('/home');
    history(0)
  }



  useEffect(() => {
    console.log(user + 2)
    if (user === false) {
      // history("/");
    } else {
      // console.log("adfgawefaerf");
      // if (currentUser?.photoURL) 
      // {
      //   setPhotoURL(currentUser.photoURL);
      // }

      db.collection('users').doc(user.uid).get().then((snapshot) => {
        setcoverdp(snapshot.data().coverdp)
        setName(snapshot.data().FirstName)
        setlastname(snapshot.data().LastName)
        setdob(snapshot.data().date)
        //setedu(snapshot.data().)
        setgen(snapshot.data().gen)
        setphone(snapshot.data().phonenum)
        setbio(snapshot.data().bio)
        setedu(snapshot.data().edu)
        setplace(snapshot.data().place)
        //const current = new Date();
        //if(current.getUTCDate-dob > 567648000){
        //console.log()
        //}
      })


      db.collection('users').doc(user.uid).collection('myposts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(doc => ({
          id: doc.id,
          post: doc.data(),
        })));
      })

      db.collection('users').doc(user.uid).collection('myfriends').onSnapshot(snapshot => {
        setfriends(snapshot.docs.map(doc1 => ({
          id1: doc1.id,
          useR1: doc1.data(),
        })));
      })

    }

  }, [currentUser, user])

  return (
    <>
      <HomeHeader user={user} />

      <div className="container justify-content-center d-flex">
        <div className="card" style={{ marginTop: "50px", height: "530px" }}>
          <div className="container justify-content-center d-flex">
            <div className="text-center" style={{ height: "300px", width: "1000px", border: "0px", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px" }}>
              <div className="card mt-4" style={{ width: "1000px", height: "300px", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px", borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}>
                <img className="mx-0" src={coverdp} alt="Add Your Cover" style={{ width: "1000px", height: "360px", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px", borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }} onClick={handleOpen2} />
              </div>
            </div>
          </div>

          <div className="cardbody mt-1" >
            <div className='row justify-content-center' style={{ width: "1263px", height: "170px" }}>
              <div className="col-9 col-lg-2 pt-4">
                <img className='image-fluid rounded-circle border border-rounded border-5 border-light'
                  alt=""
                  src={user.photoURL}
                  style={{ width: "175px", height: "175px", borderRadius: "87.5px", position: 'absolute' }}
                  onClick={handleOpen}
                />
              </div>

              <div className="col-9 col-lg-4" style={{ paddingTop: "100px", paddingLeft: '0px' }}>
                <div className="m-2 mt-0">
                  <h1>{user.displayName}</h1>
                </div>
              </div>

              <div className="col-9 col-lg-3 pt-5">
                <Link to='/home/findfriends'><button className="btn btn-primary btn-rounded mt-5" ><i className="fas fa-user-plus"></i>Add Friend</button></Link>
                <Link to='/editprofile'><button className="btn btn-primary btn-rounded ms-2 mt-5" > <i className="fas fa-edit"></i>Edit profile</button>
                </Link>
              </div>

              <div className="sticky-lg-top" style={{ paddingTop: '80px' }}>
                <ul className="nav nav-tabs mb-3 d-flex justify-content-center sticky-top" id="myTab0" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="home-tab0"
                      data-mdb-toggle="tab"
                      data-mdb-target="#home0"
                      type="button"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      About
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="profile-tab0"
                      data-mdb-toggle="tab"
                      data-mdb-target="#profile0"
                      type="button"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      Posts
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="contact-tab0"
                      data-mdb-toggle="tab"
                      data-mdb-target="#contact0"
                      type="button"
                      role="tab"
                      aria-controls="contact"
                      aria-selected="false"
                    >
                      Friends
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: "#f0f2f5", marginTop: '150px' }}>
            <div className="tab-content" id="myTabContent0">
              <div className="tab-pane fade show active"
                id="home0"
                role="tabpanel"
                aria-labelledby="home-tab0"
              >
                <div className='container d-flex justify-content-center'>
                  <div className="card d-flex justify-content-center mt-5" style={{ width: "70%" }}>
                    <div className='col-md-12'>
                      <div className='card-body pt-1'>
                        <div className='row'>
                          <div className=' col-sm-3 pt-3'>
                            <h6>First Name</h6>
                          </div>
                          <div className=' col-sm-9 pt-3'>{name}</div>
                        </div>
                        <hr className='horizontal-divider mt-0' />

                        <div className='row'>
                          <div className=' col-sm-3 pt-1'><h6>Last Name</h6></div>
                          <div className=' col-sm-9 pt-1'>{lastname}</div>
                        </div>
                        <hr className='horizontal-divider mt-0' />

                        <div className='row'>
                          <div className=' col-sm-3 pt-1'><h6>Date of Birth</h6></div>
                          <div className=' col-sm-9 pt-1'>{dob}</div>
                        </div>
                        <hr className='horizontal-divider mt-0' />

                        <div className='row'>
                          <div className=' col-sm-3 pt-1'><h6>Gender</h6></div>
                          <div className=' col-sm-9 pt-1'>{gen}</div>
                        </div>
                        <hr className='horizontal-divider mt-0' />

                        <div className='row'>
                          <div className=' col-sm-3 pt-1'><h6>Place</h6></div>
                          <div className=' col-sm-9 pt-1'>{place}</div>
                        </div>
                        <hr className='horizontal-divider mt-0' />

                        <div className='row'>
                          <div className=' col-sm-3 pt-1'><h6>Education</h6></div>
                          <div className=' col-sm-9 pt-1'>{edu}</div>
                        </div>
                        <hr className='horizontal-divider mt-0' />

                        <div className='row'>
                          <div className=' col-sm-3 pt-1'><h6>Email</h6></div>
                          <div className=' col-sm-9 pt-1'>{user.email}</div>
                        </div>
                        <hr className='horizontal-divider mt-0' />

                        <div className='row'>
                          <div className=' col-sm-3 pt-1'><h6>Phone Number</h6></div>
                          <div className=' col-sm-9 pt-1'>{phone}</div>
                        </div>
                        <hr className='horizontal-divider mt-0' />

                        <div className='row'>
                          <div className=' col-sm-3 pt-1'><h6>Bio</h6></div>
                          <div className=' col-sm-9 pt-1'>{bio}</div>
                        </div>
                        <hr className='horizontal-divider mt-0' />

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tab-pane fade" id="profile0" role="tabpanel" aria-labelledby="profile-tab0">
                <div className="row d-flex justify-content-center pb-5" style={{ marginLeft: "130px", width: "1000px" }}>

                  {
                    posts.map(({ id, post }) => (
                      <Post key={id} postId={id} origuser={user?.displayName} orgiuserdp={user?.photoURL} username={post.username} userId={user.uid} caption={post.caption} imageUrl={post.imageUrl} noLikes={post.noLikes} personURL={post.personurl} />
                    ))
                  }

                </div>
              </div>

              <div className="tab-pane fade" id="contact0" role="tabpanel" aria-labelledby="contact-tab0">
                <div className='container d-flex justify-content-center'>
                  <div className="card d-flex justify-content-center mt-2" style={{ width: "1000px" }}>
                    <div className='card-body'>
                      <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <form className="d-flex input-group w-auto">
                              <input
                                type="search"
                                className="form-control rounded"
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="search-addon"
                              />
                              <span className="input-group-text border-0" id="search-addon">
                                <i className="fas fa-search"></i>
                              </span>
                            </form>
                          </div>
                        </div>
                      </nav>
                      <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                          <button
                            className="navbar-toggler"
                            type="button"
                            data-mdb-toggle="collapse"
                            data-mdb-target="#navbarNavAltMarkup"
                            aria-controls="navbarNavAltMarkup"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                          >
                            <i className="fas fa-bars"></i>
                          </button>
                        </div>
                      </nav>
                      <div className="row row-cols-1 row-cols-md-2 g-4">
                      </div>
                    </div>
                    <div className="row d-flex justify-content-start pt-1">
                      {
                        friends.map(({ id, useR1 }) => (
                          <Friend friendId={useR1.uid} userID={user.uid} />
                        ))
                      }


                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <Modal open={open} onClose={handleClose}>
          <Box sx={{ ...style, width: 600 }}>
            <div className="fields">
              <input type="file" onChange={handleChange} />
              <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
              <img style={{ width: "150px", height: "150px", borderRadius: "75px" }} src={photoURL} alt="Avatar" className="avatar" />
            </div>
          </Box>
        </Modal>

        <Modal open={open2} onClose={handleClose2}>
          <Box sx={{ ...style, width: 600 }}>
            <div className="fields">
              <input type="file" onChange={handleChange2} />
              <button disabled={loading2 || !photo2} onClick={handleClick2}>Upload</button>
              <img style={{ width: "150px", height: "150px", borderRadius: "75px" }} src={coverdp} alt="Avatar" className="avatar" />
            </div>
          </Box>
        </Modal>

      </div>
    </>
  );
}
