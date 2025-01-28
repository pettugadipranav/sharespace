import React/*, { useState }*/ ,{useEffect} from 'react'
import './HomeHeader.css';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { auth } from '../auth/firebase.js';
//import {Profile} from './Profile.js'

function HomeHeader({ user }) {
    const history = useNavigate('');

    useEffect(() => {
        if (user === false || user.emailVerified === false) {
            history("/")
        }
    }, [])
    
    

    const logout = (event) => {
        event.preventDefault();
        auth.signOut();
        history("/");
    }
    return (
        <div className="homeHeader">
            <div className="homeHeader__left">
                <Link to="/home" style={{textDecoration:'none'}}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRgo5810D-7EDcbAXBmS_md7WuJq5AIUUdqw&usqp=CAU" alt="Facebook Logo" className="homeHeader__logo" />
                </Link>
            </div>

            <div className="homeHeader__inputSearch">
                <input type="text" placeholder="Search" />
                <SearchIcon className="homeHeader__inputButton" />
            </div>

            <div className="homeHeader__icons">
                <section>
                    <Link to='/home' style={{textDecoration:'none'}}>
                    <h3 className="homeHeader__name">Home</h3>
                    </Link>
                </section>
                
                <h3 className="homeHeader__dash"> | </h3>

                <section>
                    <Link to='/home/findfriends' style={{textDecoration:'none'}}>
                    <h3 className="homeHeader__name">Find Friends</h3>
                    </Link>
                </section>

                <h3 className="homeHeader__dash"> | </h3>

                <section>
                    <Link to='/home/create' style={{textDecoration:'none'}}>
                    <h3 className="homeHeader__name">Create</h3>
                    </Link>
                </section>

             
                

                <h3 className="homeHeader__dash"> | </h3>

                <section>
                    <Link to='/chat' style={{textDecoration: 'none'}}>
                    <TelegramIcon className="homeHeader__inputButton"/>
                    </Link>
                </section>

                <h3 className="homeHeader__dash"> | </h3>

                <Link to='/profile' style={{textDecoration:'none'}}>
                <section>
                    <Avatar className="homeHeader__avatar" alt="" src={user?.photoURL}/>
                    <h3 className="homeHeader__name">{user?.displayName}</h3>
                </section>
                </Link>
                

                <h3 className="homeHeader__dash"> | </h3>
                <section>
                    <div className="dropdown">
                        <ArrowDropDownIcon className="dropdown homeHeader__inputButton" />
                        <div className="dropdown-content">
                            <a onClick={logout} href='/'><h6 >Logout</h6></a>
                        </div>
                    </div>
                </section>

                <h3 className="homeHeader__dash"> | </h3>
            </div>
        </div>
    )
}

export default HomeHeader
