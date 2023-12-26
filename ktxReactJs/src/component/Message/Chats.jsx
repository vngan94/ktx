import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { seenMessage } from "../../services/messageService";

const Chats = ({ people }) => {
  const [chats, setChats] = useState([]);
  let currentUser;

  const { data, dispatch } = useContext(ChatContext);
  useEffect(() => {}, []);

  const handleSelect = async (u) => {
    if (u.countNew > 0) {
      let res = await seenMessage(u.lastMessage.groupId);
    }
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <>
      {people?.map((user) => (
        <>
          {user.lastMessage && (
            <div
              className="userChat"
              onClick={() => {
                handleSelect(user);
              }}
            >
              <img src={`${user.image}`} alt="" />
              <div className="userChatInfo">
                <span>{user.fullName}</span>
                {user.lastMessage && (
                <>
                  {user.lastMessage.isRead == 1 ? (
                    <p>
                      {user.lastMessage.message.length < 35
                        ? user.lastMessage.message
                        : user.lastMessage.message.substring(0, 28)+"..."}
                     
                    </p>
                  ) : (
                    <p className="font-weight-bold">
                      {user.lastMessage.message.length < 35
                        ? user.lastMessage.message
                        : user.lastMessage.message.substring(0, 28)+"..."}
                    
                    </p>
                  )}
                </>
              )}
              </div>
            </div>
          )}
        </>
      ))}
    </>
  );
};

export default Chats;
