import React,{useState} from 'react'
import AddPhoto from '@material-ui/icons/AddAPhoto';
import {
    Link
  } from "react-router-dom";

export default function ProfileData() {

  return (
    <>
    <div className="card" style={{marginTop:"80px",width:"1263px",height:"520px"}}>
        <div className="text-center" style={{height:"300px",width:"1000px",marginLeft:"130px",border:"0px",borderBottomLeftRadius:"20px",borderBottomRightRadius:"20px"}}>
            <div className="card" style={{width:"1000px",height:"300px",borderBottomLeftRadius:"20px",borderBottomRightRadius:"20px"}}>           
                <img className="mx-0"src="" alt="Add Your Cover Photo" style={{width:"1000px",height:"300px",borderBottomLeftRadius:"20px",borderBottomRightRadius:"20px"}}/>
            </div>
        </div>
  
        <div className="cardbody">
            <div className='row justify-content-center'style={{width:"1263px",height:"170px"}}>
                <div className="col-9 col-lg-2">
                    <button className="border rounded-circle border-dark p-0 border-0" style={{width:"150px",height:"150px",borderRadius:"75px"}}>
                    <img className='image-fluid rounded-circle ' 
                        src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-image-icon-default-avatar-profile-icon-social-media-user-vector-image-209162840.jpg"
                        style={{width:"150px",height:"150px",borderRadius:"75px"}}/>
                    <span  style={{marginBottom:"100%",marginLeft:"80%"}}><AddPhoto/></span>
                     </button>
                </div>
        
                <div className="col-9 col-lg-4">
                    <div className="m-2">
                        <h1>Ram</h1>
                    </div>
                </div>

                <div className="col-9 col-lg-3 ">
                    <button className="btn btn-primary btn-rounded mt-5" ><i className="fas fa-user-plus"></i>Add Friend</button>
                    <button className="btn btn-primary btn-rounded mt-5" > <i className="fas fa-edit"></i>Edit profile</button>
                </div>
            </div>
        </div>

        <div class="sticky-lg-top">
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


    </>
  )
}
