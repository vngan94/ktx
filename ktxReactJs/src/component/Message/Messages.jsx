import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";

import Message from "./Message";
import { db } from "../../utils/firebase";
import { ChatContext } from "../../context/ChatContext";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { async } from "q";
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const userData = JSON.parse(localStorage.getItem("userData"));
 
  useEffect(async () => {
    setMessages([])
    let fromTo = userData.id + "_" + data.idTo;
    const unSub = onSnapshot(collection(db, "Chat", fromTo, "messages"), (doc) => {
      doc.forEach(function(d) {
       messages.push(d.data());
    });
    });

    return () => {
      unSub();
    };
  }, [data.idTo]);

  return (
    <div className="messages">
     
      {messages?.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
