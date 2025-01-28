

const MessageContainer = ({ socket, username, username2, messageList, setMessageList}) => {



  return (
    <div className="message-container" style={{backgroundColor:'gray'}}>
      {messageList.map((msg) => {
        return (
          <div className="message" key={msg.id}>
            {msg.firstuser === username && (
              <>
                <p className= "small p-2 mb-1 rounded-3 bg-secondary text-white" style={{marginInlineStart:'300px'}}>
                  <div className="author fw-bold  text-white" >You</div>
                  {msg.message}
                </p>
                <p className="small me-2 mb-3 rounded-3  d-flex justify-content-end">
                  {msg.time}
                </p>
              </>
            )}
            {msg.firstuser !== username && (
              <>
                <p
                  className="small p-2 mb-1 text-black rounded-3 bg-light" 
                  style={{ backgroundColor: "#E0E0E0" ,marginInlineEnd:'300px'}}
                >
                  <div className="not-me fw-bold">{username2}</div>
                  {msg.message}
                </p>
                <p className="small me-2 mb-3 rounded-3  text-black d-flex justify-content-start">
                  {msg.time}
                </p>
              </>
            )}

          </div>
        );
      })}
    </div>
  );
};

export default MessageContainer;
