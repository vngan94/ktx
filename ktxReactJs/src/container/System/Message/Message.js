import React from "react";
import SideBar from "../../../component/Message/Sidebar";
import Chat from "../../../component/Message/Chat";
import "./style.scss";
const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <SideBar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
