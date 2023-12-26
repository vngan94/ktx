import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { loadMessage } from "../../services/userService";
import moment from "moment";
import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { db } from "../../utils/firebase";
import { async } from "q";
require("dotenv").config();
const host = process.env.REACT_APP_BACKEND_URL;
function ChatWindow(props) {
  const [mess, setMess] = useState([]);
  const [userData, setuserData] = useState({});
  const [message, setMessage] = useState("");
  const [id, setId] = useState();
  const [user, setUser] = useState({});
  const socketRef = useRef();

  useEffect(async () => {
    let colref = collection(db, "Chat", "1_2", "messages");

    const docSnap = await getDoc(colref);
    console.log("docSnap " + docSnap);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }, [props.roomId]);
  let fetchMessage = async () => {
    let res = await loadMessage(props.roomId, props.userId);
    if (res) {
      setMess(res.data);
      setuserData(res.data.userData);
    }
  };
  let sendMessage = () => {};
  return (
    <div className="ks-messages ks-messenger__messages">
      <div className="ks-header">
        <div className="ks-description">
          <div className="ks-name">Chat name</div>
          <div className="ks-amount">2 members</div>
        </div>
        <div className="ks-controls">
          <div className="dropdown">
            <button
              className="btn btn-primary-outline ks-light ks-no-text ks-no-arrow"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="la la-ellipsis-h ks-icon" />
            </button>
            <div
              className="dropdown-menu dropdown-menu-right ks-simple"
              aria-labelledby="dropdownMenuButton"
            >
              <a className="dropdown-item" href="#">
                <span className="la la-user-plus ks-icon" />
                <span className="ks-text">Add members</span>
              </a>
              <a className="dropdown-item" href="#">
                <span className="la la-eye-slash ks-icon" />
                <span className="ks-text">Mark as unread</span>
              </a>
              <a className="dropdown-item" href="#">
                <span className="la la-bell-slash-o ks-icon" />
                <span className="ks-text">Mute notifications</span>
              </a>
              <a className="dropdown-item" href="#">
                <span className="la la-mail-forward ks-icon" />
                <span className="ks-text">Forward</span>
              </a>
              <a className="dropdown-item" href="#">
                <span className="la la-ban ks-icon" />
                <span className="ks-text">Spam</span>
              </a>
              <a className="dropdown-item" href="#">
                <span className="la la-trash-o ks-icon" />
                <span className="ks-text">Delete</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="ks-body ks-scrollable jspScrollable"
        data-auto-height
        data-reduce-height=".ks-footer"
        data-fix-height={32}
        style={{
          height: "480px",
          overflow: "hidden",
          padding: "0px",
          width: "701px",
        }}
        tabIndex={0}
      >
        <div
          className="jspContainer"
          style={{ width: "701px", height: "481px" }}
        >
          <div
            className="jspPane"
            style={{ padding: "0px", top: "0px", width: "691px" }}
          >
            <ul
              id="box-chat"
              className="ks-items"
              style={{ overflowY: "scroll", maxHeight: "479px" }}
            >
              {mess &&
                mess.length > 0 &&
                mess.map((item, index) => {
                  if (item.userData) {
                    return (
                      <li
                        key={index}
                        className={
                          item.userData.id == user.id
                            ? "ks-item ks-from"
                            : "ks-item ks-self"
                        }
                      >
                        <span className="ks-avatar ks-offline">
                          <img
                            src={item.userData.image}
                            width={36}
                            height={36}
                            className="rounded-circle"
                          />
                        </span>
                        <div className="ks-body">
                          <div className="ks-header">
                            <span className="ks-name">
                              {item.userData.firstName +
                                " " +
                                item.userData.lastName}
                            </span>
                            <span className="ks-datetime">
                              {moment(item.createdAt).fromNow()}
                            </span>
                          </div>
                          <div className="ks-message">{item.text}</div>
                        </div>
                      </li>
                    );
                  }
                })}
            </ul>
          </div>
          <div className="jspVerticalBar">
            <div className="jspCap jspCapTop" />
            <div className="jspTrack" style={{ height: "481px" }}>
              <div className="jspDrag" style={{ height: "206px" }}>
                <div className="jspDragTop" />
                <div className="jspDragBottom" />
              </div>
            </div>
            <div className="jspCap jspCapBottom" />
          </div>
        </div>
      </div>
      <div className="ks-footer">
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="form-control"
          placeholder="Type something..."
          defaultValue={""}
        />
        <div className="ks-controls">
          <button onClick={() => sendMessage()} className="btn btn-primary">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
