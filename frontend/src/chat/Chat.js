import "./App.css";
//import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import Profile from "../components/Profile";
import Input from "../components/Input";
import MessageContainer from "../components/MessageContainer";
import HomeHeader from "../home/HomeHeader";


const serverurl = "http://localhost:4000";
const socket = io(serverurl, {autoConnect: false});

function Chat({user}) {
  const [room, setRoom] = useState('');
  const [hasEntered, setHasEntered] = useState(false);


  const firstuser = user.displayName;  //original user
  const [seconduser, set2Username] = useState("");  //2nd user who they want to talk to


  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("msg-sent", (msg) => {
      setMessageList((list) => [...list, msg]);
    });
    return () => {socket.off('msg-sent')};
  },[socket]);


  const handleClick =  (e) => {
    const time =
      new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();
    if (message !== "") {
      const messageData = {
        id: message + firstuser + time + room,
        message,
        firstuser,
        seconduser,
        time: time,
      };
      socket.emit("msg-sent", messageData);
      
      setMessageList((list) => [...list, messageData]);
    }
    setMessage("");
  };


  const handleSubmit = (e) => {  
    socket.connect();
    socket.emit("join-room", {firstuser});
    setHasEntered(true);
};


  return (
    <>
    <HomeHeader user={user}/>
      {hasEntered && (
        <div className="container d-flex justify-content-center">
        <div className="card mt-5" style={{width:"700px",height:"700px"}}>
          <Profile socket={socket} username={seconduser} />
          <MessageContainer
            socket={socket}
            username={firstuser}
            username2={seconduser}
            messageList={messageList}
            setMessageList = {setMessageList}
          />
          <Input
            socket={socket}
            username={firstuser}
            setMessage={setMessage}
            message={message}
            handleClick={handleClick}
          />
        </div>
        </div>
      )}

      {!hasEntered && (

        <div className="container d-flex justify-content-center">
        <div className="card mt-5" style={{width:"800px"}}>
        <div className="enter form-container d-flex justify-content-center">
          <form onSubmit={handleSubmit}>
            <div className="form-border mb-4 ">
              <label htmlFor="username" className="form-label">
                <h4>Username</h4>
              </label>
              <input
                className="form-control border border-dark"
                type="text"
                value={seconduser}
                id="username"
                style={{width:"300px"}}
                required
                onChange={(e) => {
                  set2Username(e.target.value);
                }}
              />
            </div>
            <button className="btn btn-primary btn-block mb-4">Submit</button>
          </form>
        </div>
        </div>
        </div>


      )}
    </>
  );
}

export default Chat;
