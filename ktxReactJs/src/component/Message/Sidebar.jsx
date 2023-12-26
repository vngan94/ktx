import React, { useContext } from "react";
import Navbar from "./Navbar"
import Search from "./Search"
import Chats from "./Chats"
import { useEffect } from "react";
import { getAllUserToText } from "../../services/messageService";
import { useState } from "react";
import { ChatContext } from "../../context/ChatContext";
const userData = JSON.parse(localStorage.getItem("userData"));
const Sidebar = () => {
  const [people, setPeople] = useState(null)
  const { data } = useContext(ChatContext);
  useEffect(async() => {
    const users = await fetchAllUser()
    setPeople(users)
  }, [data.loadDb]);

  let fetchAllUser = async () => {

    let res = await getAllUserToText({
      keyword: '',
      id: userData.id,
    });
   

    if (res && res.errCode === 0) {
      return res.data
      
    }
  };
  fetchAllUser()
  return (
    <div className="sidebar">
      {/* 
      
      */}
     
      <Navbar />
      <Search people={people}/>
      <Chats people={people}/> 
    </div>
  );
};

export default Sidebar;
