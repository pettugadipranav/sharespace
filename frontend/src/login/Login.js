import React, { useState } from 'react'
import './Login.css';
import { Link } from 'react-router-dom';
import { auth, changepasswordmail } from '../auth/firebase.js';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from "react-bootstrap";
import { Button, Form } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { Container } from "react-bootstrap";
import { useUserAuth } from "../auth/UserAuthContext.js";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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

function Login() {
    const [email, setEmail] = useState('');
    const history = useNavigate('');
    const [password, setPassword] = useState('');
    const { googleSignIn } = useUserAuth();
    const [opening,setOpening] = useState(false);
    const [resetemail ,setresetemail] = useState('');

    const login = (event) => {
        event.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
            .then((auth) => {
                console.log(auth)
                history("/home");
            })
            .catch((e) => {
                if (
                    e.message ===
                    "The password is invalid or the user does not have a password."
                ) {
                    alert("Please check your credentials again");
                } else if (
                    e.message ===
                    "There is no user record corresponding to this identifier. The user may have been deleted."
                ) {
                    history("/register");
                    window.scrollTo({
                        top: document.body.scrollHeight,
                        left: 0,
                        behavior: "smooth",
                    });
                } else {
                    alert(e.message);
                }
            })
        }

    function changepassword(resetemail){
        if(resetemail == ''){
            //changepasswordmail(resetemail);
            //alert({resetemail});
        }
        else{
            alert('Enter your email in the login box to send a password email link');
        }
    }

    const handleOpen = () => {
        setOpening(true)
    }

    const handleClose = () => {
        setOpening(false)
        changepasswordmail(resetemail)
    }

    const handleGoogleSignIn = async (event) => {
        event.preventDefault();
        try {
            await googleSignIn();
            history("/home");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
        <Modal open={opening} onClose={handleClose}>
            <Box sx={{ ...style, width: 600 }}>

            <Form>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Control
                                type="email"
                                placeholder="Email address"
                                onChange={(event) => setresetemail(event.target.value)}
                        />
                    </Form.Group>
            </Form>
            <Button onClick={handleClose} variant="primary" type="Submit">
                                       Send reset email
            </Button>                


                </Box>
        </Modal>
                <Row>

                    <Col>
                        <div className="col_all" >
                        <div className="title" >sharespace</div>
                        <div className='col1'>
                            <p className='tagline'> sharespace helps you connect and share <br></br>with the people in your life</p>
                        </div>
                        </div>
                    </Col>

                    <Col>
                    <div className='col2'>
                        <div className="p-4 box w-65">
                            <p className='loginbox'>sharespace login</p>
                            <Form onSubmit={login}>
                                <Form.Group className="mb-4" controlId="formBasicEmail">
                                    <Form.Control
                                        type="email"
                                        placeholder="Email address"
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formBasicPassword">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                </Form.Group>

                                <div className="d-grid gap-2">
                                    <Button variant="primary" type="Submit">
                                        Log In
                                    </Button>
                                </div>
                            </Form>

                            <br></br>
                            <div className='container d-flex justify-content-center'>
                                <Button className='fgp' onClick={(e)=>{handleOpen()}}>Forgotten password?</Button>
                           </div>
                            <br></br>
                            <div className='container d-flex justify-content-center'>
                                <GoogleButton
                                    className="g-btn"
                                    type="dark"
                                    onClick={handleGoogleSignIn}
                                />
                            </div>
                            <hr />
                            <div className="p-4 box mt-3 text-center">
                                Don't have an account? <Link to="/register">Sign up</Link>
                            </div>
                            <br></br>
                            <br></br>
                            <p className='CNP'>
                                <a className='CNPlink' href='/'>Create a Page </a>
                                for a celebrity, brand or business.
                            </p>
                        </div>
                        </div>
                    </Col>
                </Row>
        
            </>
    )
}

export default Login
