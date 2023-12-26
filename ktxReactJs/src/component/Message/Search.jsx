import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useEffect } from "react";
import { getAllUserToText, seenMessage } from "../../services/messageService";
import { async } from "q";
import { ChatContext } from "../../context/ChatContext";

const Search = ({ people }) => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  // const [people, setPeople] = useState(null);

  const [usersSearch, setUsersSearch] = useState();
  const { data, dispatch } = useContext(ChatContext);
  const { result, setResult } = useState([]);
  const [array, setArray] = useState([]);
  const handleSearch = async () => {
    if (username === "") {
      setArray();
    } else {
      let arr = people.filter(
        (obj) => obj.code.includes(username) || obj.fullName.includes(username)
      );
      if (arr.length == 0) {
        setErr(true);
      } else setArray(arr);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async (u) => {

    if (u.countNew > 0) {
      let res = await seenMessage(u.lastMessage.groupId);
    }
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Tìm kiếm theo mã hoặc tên"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>

      {err && <span>Không tìm thấy kết quả!</span>}
      {array?.map((user) => (
        <div className="height-10">
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
        </div>
      ))}
    </div>
  );
};

export default Search;
