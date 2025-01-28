import React from 'react'
import {Link} from 'react-router-dom';

function Sidebar({ user }) {


    return (
        <>
        <div className='side sticky-top'>
        <div className="d-xxl-block fixed-start.overflow-hidden h-100"
        style={{maxWidth:"360px",width:"100%"}}>
        <ul className="navbar-nav mt-4 ms-0 d-flex flex-coloumn pb-5 mb-5 ms-5"
        style={{paddingTop:"80px",paddingLeft:"0px"}}>
        <li className=' dropdown-item p-1 rounded'>
          
        <Link to="/profile"   style={{textDecoration:"none"}}>
          <div className='text-dark d-flex align-items-center btn-light-rounded eld'>
        <div className='p-2'>
        
        <img className="rounded-circle me-2"src={user.photoURL}
         alt="" style={{width:"35px",height:"35px"}}/>
        
        </div>
        <div>
          <h5 className='m-0'>{user.displayName}
        
          </h5>
        </div>
          </div>
          </Link>
        
        </li>
        
        <li className=' dropdown-item p-1 rounded' >
        <Link to="/profile"   style={{textDecoration:"none"}}>
          <div className='text-dark d-flex align-items-center'style={{borderRadius:"10px"}}>
        <div className='p-2'>
        <img  src="https://static.xx.fbcdn.net/rsrc.php/v3/yx/r/-XF4FQcre_i.png"alt="avatar"className="rounded-circle me-2"style={{width:"35px",height:"35px",objectFit:"cover"}}/>
        </div>
        <div>
          <h5 className='m-0'>Friends</h5>
        </div>
          </div>
          </Link>
        </li>
        
        <li className=' dropdown-item p-1 rounded'>
        <Link to="/chat"   style={{textDecoration:"none"}}>
          <div className='text-dark d-flex align-items-center' style={{borderRadius:"10px"}}>
        <div className='p-2'>
        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/4Y9Xi2D3hJv.png"className=" rounded-circle me-2"style={{width:"35px",height:"35px"}}/>
        
        </div>
        <div>
          <h5 className='m-0'>Messenger</h5>
        </div>
          </div>
          </Link>
        </li>
        
        </ul>
        </div>
        </div>
        </>
        
    )
}

export default Sidebar
