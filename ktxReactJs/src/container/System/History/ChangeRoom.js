import React from "react";
import { useEffect, useState } from "react";
import CommonUtils from "../../../utils/CommonUtils";
import moment from "moment";
import { toast } from "react-toastify";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from "reactstrap";

import Select from "react-select";
import { getAllBedAvailableByIdService } from "../../../services/roomBedService";
import { getAllRoomByTypeRoomAreaAvailable } from "../../../services/roomService";
import { getAllTypeRoomActive } from "../../../services/typeRoomService";
import { getAllAreaByGender } from "../../../services/areaService";
const AddImageModal = (props) => {
  const [dataArea, setdataArea] = useState([]);
  const [dataTypeRoom, setdataTypeRoom] = useState([]);
  const [dataRoom, setdataRoom] = useState([]);
  const [dataBed, setdataBed] = useState([]);

  const [inputValues, setInputValues] = useState({
    userId: "",
    gender: "",
    areaId: "",
    typeRoomId: "",
    roomId: "",
    bedId: "",
    roomBedId: "",
  });

  useEffect(() => {
    if (props.isOpenModal) {
      fetchTypeRoom();

      fetchAreaByGender(props.itemRoomBed.studentData.gender); //  không set được theo hồi chọn trong đăng ký

      fetchRoom(
        props.itemRoomBed.roomData.typeRoomId,
        props.itemRoomBed.roomData.areaId
      );
      fetchBed(props.itemRoomBed.roomData.id);
      setInputValues({
        ...inputValues,
        ["userId"]: props.itemRoomBed.userId,
        ["gender"]: props.itemRoomBed.studentData.gender,
        ["areaId"]: props.itemRoomBed.roomData.areaId,
        ["typeRoomId"]: props.itemRoomBed.roomData.typeRoomId,
        ["roomId"]: props.itemRoomBed.roomData.id,
        ["bedId"]: props.itemRoomBed.id,
        ["typeRoomName"]: props.itemRoomBed.roomData.typeroomData.typeRoomName,

        ["roomBedId"]: props.itemRoomBed.id,
      });
    }
  }, [props.isOpenModal]);

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setInputValues({ ...inputValues, [name]: value });
  };
  let HandleSendDataFromModal = () => {
    if (!inputValues.bedId) {
      toast.error(`Yêu cầu chọn đầy đủ thông tin`);
    } else if (parseInt(inputValues.bedId) == props.itemRoomBed.id) {
      toast.error(`Thông tin phòng mới không thay đổi`);
    } else {
      // update

      props.sendDataRealFromModal({
        oldRoomBedId: props.itemRoomBed.id,
        newRoomBedId: inputValues.bedId,
      });

      setInputValues({
        ...inputValues,
        ["userId"]: "",
        ["gender"]: "",
        ["areaId"]: "",
        ["typeRoomId"]: "",
        ["roomId"]: "",
        ["bedId"]: "",
        ["typeRoomName"]: "",

        ["roomBedId"]: "",
      });
    }
  };

  let handleCloseModal = () => {
    props.closeModal();
    setInputValues({
      ...inputValues,
      ["userId"]: "",
      ["gender"]: "",
      ["areaId"]: "",
      ["typeRoomId"]: "",
      ["roomId"]: "",
      ["bedId"]: "",
      ["typeRoomName"]: "",

      ["roomBedId"]: "",
    });
  };

  const handleOnChangeArea = (event) => {
    const { name, value } = event.target;

    let areaId = event.target.value;
    if (areaId) {
      fetchRoom(inputValues.typeRoomId, areaId);
      setInputValues({ ...inputValues, [name]: value });
    } else {
      setdataRoom([]);
      setdataBed([]);
      setInputValues({
        ...inputValues,

        ["areaId"]: "",

        ["roomId"]: "",
        ["bedId"]: "",

        ["roomBedId"]: "",
      });
    }
  };

  const handleOnChangeRoom = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    let roomId = event.target.value;

    fetchBed(roomId);
  };

  let fetchTypeRoom = async () => {
    let user = await getAllTypeRoomActive();
    if (user && user.errCode === 0) {
      setdataTypeRoom(user.data);
    }
  };
  let fetchRoom = async (typeRoomId, areaId) => {
    let user = await getAllRoomByTypeRoomAreaAvailable({
      typeRoomId: typeRoomId,
      areaId: areaId,
    });
    if (user && user.errCode === 0) {
      if (user.count == 0) {
        toast.error(
          `Không có phòng tương ứng hoặc tất cả phòng đã đầy đối với khu và loại phòng bạn chọn`
        );
        setdataRoom([]);
        setdataBed([]);
        // setInputValues({
        //   ...inputValues,
        //   ["bedId"]: "",
        // });
      } else {
        setdataRoom(user.data);
      }
    }
  };
  let fetchBed = async (roomId) => {
    let res = await getAllBedAvailableByIdService(roomId);
    if (res && res.errCode === 0) {
      if (roomId == props.itemRoomBed.roomData.id) {
        let item = {
          id: props.itemRoomBed.id,
          bedData: {
            value: props.itemRoomBed.bedData.value,
          },
        };
        res.data.push(item);
        setdataBed(res.data);
      } else {
        setdataBed(res.data);
      }
    }
  };
  let fetchAreaByGender = async (gender) => {
    let user = await getAllAreaByGender(gender);
    if (user && user.errCode === 0) {
      setdataArea(user.data);
    }
  };
  return (
    <div className="">
      <Modal
        isOpen={props.isOpenModal}
        className={"booking-modal-container"}
        size="md"
        centered
      >
        <div className="modal-header">
          <h5 className="modal-title">Thêm sinh viên vào phòng mới</h5>
          <button
            onClick={handleCloseModal}
            type="button"
            className="btn btn-time"
            aria-label="Close"
          >
            X
          </button>
        </div>
        <ModalBody>
          <div className="form">
            <div className="form-row mb-4">
              <label htmlFor="inputAddress">
                Khu dành cho {inputValues.gender === "F" ? " nữ" : " nam"}
              </label>
              <select
                className=" form-select  "
                onChange={handleOnChangeArea}
                name="areaId"
                value={inputValues.areaId}
              >
                <option value={""} selected>
                  Chọn khu
                </option>
                {dataArea &&
                  dataArea.length > 0 &&
                  dataArea.map((item, index) => {
                    return <option value={item.id}>{item.areaName}</option>;
                  })}
              </select>
            </div>
            <div className="form-row  mb-4">
              <label htmlFor="inputEmail4">Loại phòng</label>

              <input
                readOnly="readOnly"
                type="text"
                value={inputValues.typeRoomName}
                name="gender"
                onChange={(event) => handleOnChange(event)}
                className="form-control"
                id="inputEmail4"
              />
            </div>
            <div className="form-row  mb-4">
              <label htmlFor="inputEmail4">Phòng còn trống </label>
              <select
                className=" form-select "
                onChange={handleOnChangeRoom}
                name="roomId"
                value={inputValues.roomId}
              >
                <option value={""} selected>
                  Chọn phòng
                </option>
                {dataRoom &&
                  dataRoom.length > 0 &&
                  dataRoom.map((item, index) => {
                    return <option value={item.id}>{item.roomName}</option>;
                  })}
              </select>
            </div>
            <div className="form-row  ">
              <label htmlFor="inputEmail4">Giường</label>
              <select
                className=" form-select "
                onChange={handleOnChange}
                name="bedId"
                value={inputValues.bedId}
              >
                <option value={""} selected>
                  Chọn giường
                </option>
                {dataBed &&
                  dataBed.length > 0 &&
                  dataBed.map((item, index) => {
                    return (
                      <option value={item.id}>{item.bedData.value}</option>
                    );
                  })}
              </select>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={HandleSendDataFromModal}>
            Lưu thông tin
          </Button>{" "}
          <Button onClick={handleCloseModal}>Hủy</Button>
        </ModalFooter>
      </Modal>
      {inputValues.isOpen === true && (
        <Lightbox
          mainSrc={inputValues.imageReview}
          onCloseRequest={() =>
            setInputValues({ ...inputValues, ["isOpen"]: false })
          }
        />
      )}
    </div>
  );
};
export default AddImageModal;
