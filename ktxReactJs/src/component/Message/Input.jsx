import React, { useContext, useState } from "react";

import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../utils/firebase";
import { createNewMessage } from "../../services/messageService";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { data } = useContext(ChatContext);
  const userData = JSON.parse(localStorage.getItem("userData"));
  let fromTo = userData.id + "_" + data.idTo;
  let toFrom = data.idTo + "_" + userData.id;
  const { dispatch } = useContext(ChatContext);
  let createMessage = async (message) => {
    try {
      let res = await createNewMessage({
        fromId: userData.id,
        toId: data.idTo,
        groupId: data.groupId,
        message: message,
      });

      if (res && res.errCode !== 0) {
        console.log(res.errMessage);
      } else {
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSend = async () => {
    let newMessage2 = await createMessage(text); // db
 
    const myMsg = {
      _id: newMessage2.dataFrom.id,
      text: text,
      from: userData.id,
      to: data.idTo,
      createdAt: Date.parse(new Date()),
      idDB: newMessage2.dataFrom.id,
      user: {
        _id: userData.id,
      },
    };
    const myMsgTo = {
      _id: newMessage2.dataFrom.id,
      text: text,
      from: userData.id,
      to: data.idTo,
      createdAt: Date.parse(new Date()),
      idDB: newMessage2.dataTo.id,
      user: {
        _id: userData.id,
      },
    };
    let docRef = await addDoc(
      collection(db, "Chat", fromTo, "messages"),
      myMsg
    );
     docRef = await addDoc(
      collection(db, "Chat", toFrom, "messages"),
      myMsgTo
    );
    setText("")
    
   
    // dispatch({ type: "LOAD_DB"});
   

  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
