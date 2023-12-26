import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
function MessageDisscution(props) {
  const [dataRoom, setdataRoom] = useState([]);
  const [textSearch, settextSearch] = useState("");
  var count;
  useEffect(() => {
    if (props.data) {
      //loadRoom(props.data);
      setdataRoom(props.data);
    }
  }, [props.data]);
  let handleClickRoom = (toId) => {
    props.handleClickRoom(toId);
  };

  let handleOnchangeSearch = (e) => {
    settextSearch(e.target.value);
  };
  // let handleSearchRoom = () => {
  //   dataRoom.forEach((item) => {
  //     let name = "";
  //     if (props.isAdmin === true) {
  //       name = item.userOneData.firstName + " " + item.userOneData.lastName;
  //     } else {
  //       name = item.userTwoData.firstName + " " + item.userTwoData.lastName;
  //     }

  //     if (name.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1) {
  //     }
  //   });
  // };

  // handleSearchRoom();
  return (
    <div className="ks-discussions">
      <div className="ks-search">
        <div className="input-icon icon-right icon icon-lg icon-color-primary">
          <input
            onChange={(e) => handleOnchangeSearch(e)}
            value={textSearch}
            id="input-group-icon-text"
            type="text"
            className="form-control"
            placeholder="Tìm kiếm theo tên"
          />
          <span className="icon-addon">
            <span className="la la-search" />
          </span>
        </div>
      </div>
      <div
        className="ks-body ks-scrollable jspScrollable"
        data-auto-height
        style={{
          height: "400px",
          overflowY: "auto",
          padding: "0px",
          width: "339px",
        }}
        tabIndex={0}
      >
        <div
          className="jspContainer"
          style={{ width: "339px", height: "550px" }}
        >
          <div
            className="jspPane"
            style={{ padding: "0px", top: "0px", width: "329px" }}
          >
            <ul className="ks-items">
              {dataRoom &&
                dataRoom.length > 0 &&
                dataRoom.map((item, index) => {
                  return (
                    <li
                      style={{
                        marginBottom: "15px",
                      }}
                      onClick={() => handleClickRoom(item.id)}
                      key={index}
                      className="ks-item"
                    >
                      <a href="#">
                        <span className="ks-avatar">
                          {/* <img src={userData.image} width={36} height={36} /> */}

                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
                            width={36}
                            height={36}
                          />
                          <span className="badge badge-pill badge-danger ks-badge ks-notify">
                            {item.countNew > 0 && item.countNew > 0}
                          </span>
                        </span>
                        <div className="ks-body">
                          <div className="ks-name">
                            {item.fullName}
                            <span className="ks-datetime">
                              {item.lastMessage &&
                                moment(item.lastMessage.createdAt).fromNow()}
                            </span>
                          </div>
                          <div className="ks-message">
                            {item.lastMessage && item.lastMessage.message}
                          </div>
                        </div>
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="jspVerticalBar">
            <div className="jspCap jspCapTop" />
            <div className="jspTrack" style={{ height: "550px" }}>
              <div className="jspDrag" style={{ height: "261px" }}>
                <div className="jspDragTop" />
                <div className="jspDragBottom" />
              </div>
            </div>
            <div className="jspCap jspCapBottom" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageDisscution;
