import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
import { onAuthStateChanged ,sendPasswordResetEmail,updateProfile} from 'firebase/auth';
import { useState,useEffect } from 'react';
import {getDownloadURL,uploadBytes,ref} from 'firebase/storage';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY ,
  authDomain: process.env.REACT_APP_DOMAIN,
  databaseURL: process.env.REACT_APP_URL,
  projectId: process.env.REACT_APP_ID,
  storageBucket: process.env.REACT_APP_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSID,
  appId: process.env.REACT_APP_APPID

    //measurementId: "G-LW02TZG3N4"
  //   apiKey: "AIzaSyCgFAxdq1vMwZqqn9da8J8EuKUY_c6QDeE",
  // authDomain: "facebook-448b8.firebaseapp.com",
  // databaseURL: "https://facebook-448b8-default-rtdb.firebaseio.com",
  // projectId: "facebook-448b8",
  // storageBucket: "facebook-448b8.appspot.com",
  // messagingSenderId: "710925516596",
  // appId: "1:710925516596:web:053b92a19205c879cdaf61"

    // apiKey: "AIzaSyBfhcZNJSJKYx62lKoWNXPkK5J81c1Aof4",
    // authDomain: "fb-clone-547a6.firebaseapp.com",
    // projectId: "fb-clone-547a6",
    // storageBucket: "fb-clone-547a6.appspot.com",
    // messagingSenderId: "63561143572",
    // appId: "1:63561143572:web:7a904691305946daa39e01",
    // databaseURL: "https://fb-clone-547a6-default-rtdb.firebasio.com",


};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebaseApp.firestore();
const storage = firebase.storage();

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}

export function changepasswordmail(email){
  sendPasswordResetEmail(auth ,email);
  alert("A password reset email has been sent!");
}

export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);
  
  const snapshot = await uploadBytes(fileRef, file);
  console.log(snapshot);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL});
  
  setLoading(false);
  alert("Uploaded file . Please Reload the site");
  db.collection('users').doc(currentUser.uid).update({dp: photoURL})
  // db.collection('users').doc(currentUser.uid).collection('myposts').get().then((snapshot)=>{
  //   snapshot.docs.forEach(doc =>{
  //     console.log(doc.data())
  //   })
  // })
}

export async function upload2(file, currentUser, setLoading2) {
  const fileRef = ref(storage, currentUser.uid + '39.png');

  setLoading2(true);
  
  const snapshot = await uploadBytes(fileRef, file);
  console.log(snapshot);
  const photoURL = await getDownloadURL(fileRef);

  //updateProfile(currentUser, {photoURL});
  
  setLoading2(false);
  alert("Uploaded file . Please Reload the site");
  db.collection('users').doc(currentUser.uid).update({coverdp: photoURL})
}


export { auth, db, storage };
