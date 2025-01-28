import React, { useState } from 'react'
//import './Register.css';
import { auth } from '../auth/firebase.js';
import { useNavigate ,Link} from 'react-router-dom';
import { storage, db } from "../auth/firebase.js";
import {serverTimestamp} from "firebase/firestore";
import { sendEmailVerification } from 'firebase/auth';

 
function Register() {
    const history = useNavigate('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setuserName] = useState('');
    const [phone, setphone] = useState('');
    const [date, setdate] = useState();
    const [gen, setgen] = useState('');
    const [password, setPassword] = useState('');
    const photouRL = '';


    const register = (event) => {
        event.preventDefault();
        
        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth.user) {
                    db.collection("users").doc(auth.user.uid).set({
                        timestamp: serverTimestamp(),
                        FirstName: firstName,
                        LastName: lastName,
                        USER_Name: userName,
                        date: date,
                        gen : gen,
                        phonenum: phone,
                        uid: auth.user.uid,
                        dp:'gs://facebook-46dc2.appspot.com/qwert.png',
                        coverdp:'gs://facebook-46dc2.appspot.com/50xmEsuwDQbME7OJK19YPXfQyOq139.png'
                    })
                    }
                if (auth.user) {
                    auth.user.updateProfile({
                        displayName: userName,
                        photoURL: photouRL
                    }).then((s) => {
                        history("/")
                    })
                }
                sendEmailVerification(auth.user).then(()=>{
                  alert("Please check your mail for verification of your email!")
                })
            })
            .catch((e) => {
                alert(e.message);
            });
    }

    return (
        <>
        <div className="container d-flex justify-content-center">
        <div className='card d-flex justify-content-center' style={{width:"600px"}}>
            <div className='card-header d-flex justify-content-center'><h3>Create a New Account</h3></div>
            <div className='card-body d-flex justify-content-center'>
                       
                <form>
                  <div className="row mb-3">
                      <div className="col-sm-6 pt-3">
                        <div className="form-border rounded border-info">
                          <input type="text" value={firstName} onChange={(e) => {setFirstName(e.target.value)}} id="typeText1" className="form-control"/>
                          <label className="form-label" htmlFor="typeText">FirstName</label>
                        </div>
                      </div>
                    <div className="col-sm-6 pt-3">
                      <div className="form-border rounded border-info">
                        <input type="text" onChange={(e) => setLastName(e.target.value)} id="typeText2" className="form-control" />
                        <label className="form-label" htmlFor="typeText">Lastname</label>
                      </div>
                    </div>
                </div>

                    <div className='row mb-3 '>
                    <div className="col-sm-12 pt-3">
                    <div className="form-border rounded border-info">
                    <input type='text' id='typeText3' className='form-control' onChange={(e)=>setuserName(e.target.value)} />
                    <label className="form-label" htmlFor="typeText">Username</label>
                    </div>
                    </div>
                    </div>

                <div className="row mb-3">
                  <div className="col-sm-12 pt-3">
                     <div className="form-border rounded border-info">
                    <input type="email" onChange={(e) => setEmail(e.target.value)} id="typeEmail" className="form-control" />
                    <label className="form-label" htmlFor="typeEmail">Email</label>
                  </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-12 pt-3">
                     <div className="form-border rounded border-info">
                     <input type="password" onChange={(e) => setPassword(e.target.value)} id="typePassword" className="form-control" />
                      <label className="form-label" htmlFor="typePassword">Password</label>
                  </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-12 pt-3">
                     <div className="form-border rounded border-info">
                     <input type="tel" onChange={(e) => setphone(e.target.value)} id="typePhone" className="form-control" />
                       <label className="form-label" htmlFor="typePhone">Phone number</label>
                  </div>
                  </div>
                </div>

                <div className="form-check form-check-inline">
                <h6 className='pt-3'>Gender</h6>
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

            <div className="row mb-3 justify-content-center">
              <h6 className='pt-5'>Date of Birth</h6>
              <div className="col-sm-8 pt-3">
              <input type="date" onChange={(e) => setdate(e.target.value)} id="form10Example1" className="form-control border-info" />     
             </div>
                </div>
                       
            <button onClick={register} type="submit" className="btn btn-primary">SignUp</button>
            
          </form>


            </div>
            </div>
        </div>
  
</>
    )
}



export default Register
