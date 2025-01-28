import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login/Login';
import Register from './register/Register.js';
import { auth } from './auth/firebase.js';
import HomeHeader from './home/HomeHeader.js';
import Sidebar from './home/Sidebar.js';
import Posts from './post/Posts.js';
import Profile from './profile/Profile.js';
import Chat from './chat/Chat.js';
import { UserAuthContextProvider } from "./auth/UserAuthContext";
import Users from './user/Users';
import EditProfile from './profile/EditProfile.js';
import Friendreq from './friend/Friendreq.js';
import Home from './home/home.js';
import Protectedroute from './auth/ProtectedRoute.js'

function App() {

  const [user, setUser] = useState([]);

  auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      setUser(authUser)
    } else {
      setUser(false);
    }
  })

  return (
    <div className="app">
      <Router>
        <UserAuthContextProvider>
        <Routes>
          <Route element={<Protectedroute/>} >
            <Route path="/home" element={<><Home user={user}/></>}/>
            <Route path='/profile' element={<><Profile user={user} /></>}/>
            <Route path='/chat' element={<><Chat user={user}/></>}/> 
            <Route path='/home/findfriends' element={<Users user={user}/>} />
            <Route path='/home/create' element={<>
                      <HomeHeader user={user} />
                      <div className='row justify-content-center d-flex pt-0'>
                          <div className='col-12 col-lg-3 pt-3'>
                                <Sidebar user={user} />
                                </div>
                                <div className='col-12 col-lg-6 pt-3'>
                                <div className="container d-flex justify-content-center">
                                  <Posts user={user} state={true} />
                                </div>
                                </div>
                                <div className='col-12 col-lg-3 pt-3'>
                                <Friendreq user={user}/>
                                </div>
                          
                        </div>
                      </>}
          />
          <Route path='/editprofile' element={<EditProfile user={user}/>}/>
          <Route path='/friendreq' element={<Friendreq user={user}/>}/>
          </Route>
          <Route path="/register" element={<><Register /></>} />
          <Route path="/" element={<><Login /></>} />
        </Routes>
        </UserAuthContextProvider>
      </Router>
    </div>
  ) 
}

export default App
