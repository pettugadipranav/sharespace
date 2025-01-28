//import { useState } from "react";

const Input = ({
  socket,
  username,
  user2,
  setMessage,
  message,
  handleClick,
}) => {
  return (
    <div className="input">
      <input
        type="text"
        className="input-text"
        placeholder="Say Hi"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleClick();
          }
        }}
      />
      <a className="rounded-button ps-2" href="/chat" onClick={handleClick} style={{width:"20px"}}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQejTOFJWkkmZqHEddTpDx4SY6hnU1lnaFbDQ&usqp=CAU" alt="send"
        style={{height:"30px"}} />
        {/* <i class="fas fa-paper-plane btn-light" style={{width:"50px"}}></i> */}
      </a>
    </div>
  );
};

export default Input;
