import moment from "moment";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { doc, deleteDoc, query, getDocs, where } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../utils/firebase";
import { deleteMessage, updateMessage } from "../../services/messageService";
const Message = ({ message }) => {
  const [style, setStyle] = useState({ display: "none" });
  const [styleBubble, setstyleBubble] = useState({ display: "none" });
  const ref = useRef();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { data } = useContext(ChatContext);
  let fromTo = userData.id + "_" + data.idTo;
  let toFrom = data.idTo + "_" + userData.id;
  const { dispatch } = useContext(ChatContext);
  const idDB = message.idDB;
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  const handleDelete = async () => {
    let deteletId;
    
    // xoa firestore
    const d = query(
      collection(db, "Chat", fromTo, "messages"),
      where("_id", "==", message._id)
    );
    const docSnap = await getDocs(d);

    docSnap.forEach(async (doc) => {
      deteletId = doc.id;
    });
    await deleteDoc(doc(db, "Chat", fromTo, "messages", deteletId));

    let x = await updateMessage({
      id: idDB,
    });
    // dispatch({ type: "LOAD_DB"});
  };
  const handleDeletePermament = async () => {
    let deteletId;
    let d = query(
      collection(db, "Chat", fromTo, "messages"),
      where("_id", "==", message._id)
    );
    let docSnap = await getDocs(d);

    docSnap.forEach(async (doc) => {
      deteletId = doc.id;
    });
    await deleteDoc(doc(db, "Chat", fromTo, "messages", deteletId));
    console.log("toFrom " +toFrom);


    d = query(
      collection(db, "Chat", toFrom, "messages"),
      where("_id", "==", message._id)
    );
    docSnap = await getDocs(d);

    docSnap.forEach(async (doc) => {
      
      deteletId = doc.id;
    });
    await deleteDoc(doc(db, "Chat", toFrom, "messages", deteletId));


    await deleteMessagee(idDB);
  };
  const deleteMessagee = async (id) => {
    try {
      let res = await deleteMessage(id);
      res = res.data;
      if (res && res.errCode !== 0) {
       
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div
      onMouseEnter={(e) => {
        setStyle({ display: "block" });
      }}
      onMouseLeave={(e) => {
        setStyle({ display: "none" });
      }}
      ref={ref}
      className={`message ${message?.from === userData.id && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src="https://images.pexels.com/photos/837306/pexels-photo-837306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
        />
      </div>
      <div className="messageContent">
        <p>{message?.text}</p>
        <span>{moment(message?.createdAt).format("DD/MM/YYYY HH:mm")}</span>
      </div>
      <div class="dropdown">
        <div class="dropbtn" style={style}></div>
        <div class="dropdown-content">
          <a href="#" onClick={handleDelete}>
            Xóa
          </a>
          {message?.from === userData.id && (
            <a href="#" onClick={handleDeletePermament}>
              Thu hồi
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
