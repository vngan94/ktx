import React, { useContext } from "react";
import Input from "./Input";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../utils/firebase";
import Message from "./Message";
import { collection, doc, onSnapshot, deleteDoc,getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { deleteAllMessage } from "../../services/messageService";

const Chat = ({item}) => {
  const [style, setStyle] = useState({ display: "none" });
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const userData = JSON.parse(localStorage.getItem("userData"));

  let fromTo = userData.id + "_" + data.idTo;
  let toFrom = data.idTo + "_" + userData.id;
  useEffect(async () => {
    let fromTo = userData.id + "_" + data.idTo;

    const unSub = onSnapshot(
      collection(db, "Chat", fromTo, "messages"),
      (doc) => {
        const allmessages = doc.docs.map((item) => {
          return { ...item.data() };
        });
        allmessages.sort(function (a, b) {
          return new Date(a.createdAt) - new Date(b.createdAt);
        });
        setMessages(allmessages);
      }
    );

    return () => {
      unSub();
    };
  }, [data.idTo]);
  const handleDeleteAll = async () => {
    let deteletId
    const querySnapshot = await getDocs(
      collection(db, "Chat", fromTo, "messages")
    );
    querySnapshot.forEach(async (d) => {
      
      deteletId = d.id;
      
      await deleteDoc(doc(db, "Chat", fromTo, "messages", deteletId));
     
   
    });
    
    let res = await deleteAllMessage(data.idLastMessage);
  };
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.userName}</span>
        {data.userName && (
          <div class="dropdown">
            <div class="dropbtn"></div>
            <div class="dropdown-content">
              <a href="#" onClick={handleDeleteAll}>
                Xóa cuộc nói chuyện
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="messages">
        {messages?.map((m) => (
          <Message message={m} key={m.id} />
        ))}
      </div>
      
          <Input />
        
      
    </div>
  );
};

export default Chat;
