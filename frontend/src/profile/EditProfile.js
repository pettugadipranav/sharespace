
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { db } from '../auth/firebase.js';


function EditProfile({user}) {

  const history = useNavigate('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setphone] = useState('');
  const [bio,setbio] = useState('');
  const [edu,setedu]= useState('');
  const [place ,setplace] = useState('');
  const [gen ,setgen] = useState('');

  function changeprofile(){

    if(firstName !== '')
    {
      db.collection("users").doc(user.uid).update({
        FirstName: firstName})
    }
    if(lastName !== '')
    {
      db.collection("users").doc(user.uid).update({
        LastName: lastName})
    }
    if(gen !== '')
    {
      db.collection("users").doc(user.uid).update({
        gen: gen})
    }
    if(place !== '')
    {
      db.collection("users").doc(user.uid).update({
        place: place})
    }
    if(edu !== '')
    {
      db.collection("users").doc(user.uid).update({
        edu: edu})
    }
    if(phone !== '')
    {
      db.collection("users").doc(user.uid).update({
        phonenum: phone})
    }
    if(bio !== '')
    {
      db.collection("users").doc(user.uid).update({
        bio: bio})
    }

    history('/profile')
  }

  return (
    <>
    <div className='container d-flex justify-content-center pt-2'>
        <div className='card d-flex justify-content-center' style={{width:"800px"}}>
            <div className="card-body d-flex justify-content-center">
            <div className='container'>
                <h3 className='pt-2 d-flex justify-content-center'>EditProfile</h3>
               

                <div className="row mb-3">

                          <div className="col-sm-6 pt-4">
                          <h6>FirstName<span className='text text-danger'>*</span></h6>

                          <div className="form-outline border rounded border-info">
                            {/* <input type="text" id="typeText" className="form-control" /> */}
                            {/* <label className="form-label" htmlFor="typeText">FirstName</label> */}
                            {/* <label for="formGroupExampleInput" className="form-label">Example label</label> */}
                            <input type="text" onChange={(e) => setFirstName(e.target.value)} className="form-control" id="formGroupExampleInput" placeholder="FirstName"/>
                          </div>
                      </div>
                      <div className="col-sm-6 pt-4">
                      <h6>Last Name<span className='text text-danger'>*</span></h6>
                      <div className="form-outline border rounded border-info">
                      {/* <input type="text" id="typeText" className="form-control" /> */}
                      {/* <label className="form-label" htmlFor="typeText">Second Name</label> */}
                      <input type="text" onChange={(e) => setLastName(e.target.value)} className="form-control" id="formGroupExampleInput" placeholder="SecondName"/>
                    </div>
                      </div>
                    </div>

                    <br/>   
                <div className="form-check form-check-inline">
                    <h6>Gender<span className='text text-danger'>*</span></h6>
                  <input className="form-check-input" onChange={(e) => setgen(e.target.value)} type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Male" />
                  <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                </div>

                <div className="form-check form-check-inline">
                  <input className="form-check-input" onChange={(e) => setgen(e.target.value)} type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Female" />
                  <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                </div>

                <div className="form-check form-check-inline">
                  <input className="form-check-input" onChange={(e) => setgen(e.target.value)} type="radio" name="inlineRadioOptions" id="inlineRadio3" value="Other"/>
                  <label className="form-check-label" htmlFor="inlineRadio3">Other</label>
                </div>
                        <br/>
                        <br/>

                        <div className="row mb-3">
                    <h6 className='pt-2'>Place<span className='text text-danger'>*</span></h6>
                        <div className="col-sm-12 pt-0">
                        <div className="form-outline border rounded border-info">
                      {/* <input type="text" id="typeText" className="form-control" /> */}
                      {/* <label className="form-label" htmlFor="typeText">Place</label> */}
                      <input type="text" onChange={(e) => setplace(e.target.value)} className="form-control" id="formGroupExampleInput" placeholder="Place"/>
                        </div>
                        </div>
                         </div>

                        
                        
  <br/>
  <div className='row mb-3'>
    <h6 className="pt-2">Education</h6>
    <div className="col-sm-12 pt-0">
    <div className="form-outline border rounded border-info">
  {/* <input type="text" id="typeText" className="form-control" /> */}
  {/* <label className="form-label" htmlFor="typeText">Education</label> */}
  <input type="text" onChange={(e) => setedu(e.target.value)} className="form-control" id="formGroupExampleInput" placeholder="Education"/>
</div>
    </div>
  </div>

               <div className='row mb-3'>
    <h6 className='pt-2'>PhoneNumber</h6>
    <div className="col-sm-12 pt-0">
    <div className="form-outline border rounded border-info">
  {/* <input type="text" id="typeText" className="form-control" /> */}
  {/* <label className="form-label" htmlFor="typeText">Education</label> */}
  <input type="tel" onChange={(e) => setphone(e.target.value)} className="form-control" id="typePhone" placeholder="PhoneNumber"/>
</div>
    </div>
  </div> 
                    
                    <div className="row mb-3">
                    <h6 className='pt-2'>Bio</h6>
                      <div className="col-sm-12 pt-0">
                        <div className="form-outline border rounded border-info">
                   
                    <input type="text" onChange={(e) => setbio(e.target.value)} className="form-control" id="typeText" placeholder="Bio"></input>
                  </div>
                  </div></div>

                  <div className='row mb-3 px-5 mx-5'>
                    <button onClick={changeprofile} className='btn btn-primary' type="button"> change profile </button>
                  </div>

            </div>
            </div> 
            </div>
            </div> 
            </>
  )
}

export default EditProfile
