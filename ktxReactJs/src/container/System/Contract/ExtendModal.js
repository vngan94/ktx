import "react-image-lightbox/style.css";
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from "reactstrap";

import React from "react";
import { useEffect, useState } from "react";

import { extendContract } from "../../../services/contractService";

import { getAllRoomByTypeRoomAreaAvailable } from "../../../services/roomService";
import { getAllTypeRoomActive } from "../../../services/typeRoomService";
import { getTypeRoomPriceByTypeRoom } from "../../../services/typeRoomPriceService";
import { getAllAreaByGender } from "../../../services/areaService";
import {
  getAllBedAvailableByIdService,
  getStudentStayingById,
} from "../../../services/roomBedService";

import DatePicker from "../../../component/input/DatePicker";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommonUtils from "../../../utils/CommonUtils";
import moment from "moment";
const ExtendModal = (props) => {
  let handleCloseModal = () => {
    setInputValues({
      ...inputValues,
      ["userId"]: "",
      ["code"]: "",
      ["fullName"]: "",
      ["phonenumber"]: "",
      ["gender"]: "",
      ["areaId"]: "",
      ["typeRoomId"]: "",
      ["roomId"]: "",
      ["priceService"]: "",
      ["priceTypeRoom"]: "",
      ["amount"]: "",
      ["bedId"]: "",
      ["start"]: "",
      ["end"]: "",
    });
    setSateContractEnd("");
    setSateContractStart("");
    props.closeModal();
  };

  const [dataArea, setdataArea] = useState([]);
  const [dataTypeRoom, setdataTypeRoom] = useState([]);
  const [dataRoom, setdataRoom] = useState([]);
  const [dataBed, setdataBed] = useState([]);
  const [contractStart, setSateContractStart] = useState("");
  const [contractEnd, setSateContractEnd] = useState("");

  const [inputValues, setInputValues] = useState({
    userId: "",
    fullName: "",
    phonenumber: "",
    gender: "",
    areaId: "",
    typeRoomId: "",
    roomId: "",
    bedId: "",
    end: "",
    start: "",
    amount: "",
    priceService: "",
    priceTypeRoom: "",
    code: "",
    total: "",
  });

  useEffect(() => {
    if (props.info?.id) {
      fetchNow();
    }
  }, [props.info?.id]);
  let fetchNow = async () => {
    let now = await getStudentStayingById(props.info.userId);
    if (now && now.errCode === 0) {
      let item = {
        id: now.data.id,
        bedData: {
          value: now.data.bedData.value,
        },
      };
      setInputValues({
        ...inputValues,
        ["typeRoomId"]: now.data.roomData.typeRoomId,

        ["userId"]: now.data.userId,
        ["code"]: now.data.studentData.code,
        ["fullName"]: now.data.studentData.fullName,
        ["phonenumber"]: now.data.studentData.phonenumber,
        ["gender"]: now.data.studentData.gender,
        ["areaId"]: now.data.roomData.areaId,
        ["typeRoomId"]: now.data.roomData.typeRoomId,
        ["roomId"]: now.data.roomData.id,
        ["bedId"]: now.data.bedId,
      });
      let res2 = await getTypeRoomPriceByTypeRoom(now.data.roomData.typeRoomId);
      if (res2 && res2.errCode === 0) {
        setInputValues({
          ...inputValues,
          ["typeRoomId"]: res2.data.typeRoomId,
          ["priceService"]: res2.data.priceService,
          ["priceTypeRoom"]: res2.data.priceTypeRoom,
          ["amount"]: res2.data.priceService + res2.data.priceTypeRoom,
          ["userId"]: now.data.userId,
          ["code"]: now.data.studentData.code,
          ["fullName"]: now.data.studentData.fullName,
          ["phonenumber"]: now.data.studentData.phonenumber,
          ["gender"]: now.data.studentData.gender,
          ["areaId"]: now.data.roomData.areaId,
          ["typeRoomId"]: now.data.roomData.typeRoomId,
          ["roomId"]: now.data.roomData.id,
          ["bedId"]: now.data.id,
          ["total"]: res2.data.priceService + res2.data.priceTypeRoom,
        });
      }

      let res = await getAllBedAvailableByIdService(now.data.roomData.id);
      if (res && res.errCode === 0) {
        res.data.push(item);
        setdataBed(res.data);
      }

      fetchTypeRoom();

      fetchAreaByGender(now.data.studentData.gender);

      fetchRoom(now.data.roomData.typeRoomId, now.data.roomData.areaId);
    }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleOnChangeArea = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    let areaId = event.target.value;
    fetchRoom(inputValues.typeRoomId, areaId);
  };

  const handleOnChangeTypeRoom = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    let typeRoomId = event.target.value;
    fetchRoom(typeRoomId, inputValues.areaId);
    fetchPrice(typeRoomId);
  };

  const handleOnChangeRoom = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    let roomId = event.target.value;
    fetchBed(roomId);
  };

  let fetchAreaByGender = async (gender) => {
    let user = await getAllAreaByGender(gender);
    if (user && user.errCode === 0) {
      setdataArea(user.data);
    }
  };

  let fetchPrice = async (typeRoomId) => {
    let res = await getTypeRoomPriceByTypeRoom(typeRoomId);
    if (res && res.errCode === 0) {
      setInputValues({
        ...inputValues,
        ["typeRoomId"]: res.data.typeRoomId,
        ["priceService"]: res.data.priceService,
        ["priceTypeRoom"]: res.data.priceTypeRoom,
        ["amount"]: res.data.priceService + res.data.priceTypeRoom,

        ["total"]: res.data.priceService + res.data.priceTypeRoom,
      });
    }
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
      setdataRoom(user.data);

      if (user.count == 0) {
        toast.error(
          `Không có phòng tương ứng hoặc tất cả phòng đã đầy đối với khu và loại phòng bạn chọn`
        );
        setdataBed([]);
      }
    }
  };
  let fetchBed = async (roomId) => {
    let user = await getAllBedAvailableByIdService(roomId);
    if (user && user.errCode === 0) {
      setdataBed(user.data);
    }
  };

  let handleOnChangeDatePickerStart = (date) => {
    setSateContractStart(date[0]);
  };
  let handleOnChangeDatePickerEnd = (date) => {
    setSateContractEnd(date[0]);
    let months = monthDiff(contractStart, date[0]);
    setInputValues({
      ...inputValues,

      ["total"]: inputValues.amount * months,
    });
  };
  function monthDiff(dateFrom, dateTo) {
    return (
      dateTo.getMonth() -
      dateFrom.getMonth() +
      12 * (dateTo.getFullYear() - dateFrom.getFullYear())
    );
  }
  let handleSaveContract = async () => {
    if (
      !inputValues.bedId ||
      !inputValues.total ||
      !contractStart ||
      !contractEnd
    ) {
      toast.error(`Yêu cầu điền đầy đủ thông tin`);
    } else {
      let res = await extendContract({
        id: props.info.id,

        amount: inputValues.total,
        roomBedId: inputValues.bedId,
        start: new Date(contractStart).getTime(),
        end: new Date(contractEnd).getTime(),
      });

      if (res && res.errCode === 0) {
        toast.success("Gia hạn hợp đồng thành công");
        setInputValues({
          ...inputValues,
          ["userId"]: "",
          ["code"]: "",
          ["fullName"]: "",
          ["phonenumber"]: "",
          ["gender"]: "",
          ["areaId"]: "",
          ["typeRoomId"]: "",
          ["roomId"]: "",
          ["priceService"]: "",
          ["priceTypeRoom"]: "",
          ["amount"]: "",
          ["bedId"]: "",
          ["start"]: "",
          ["end"]: "",
        });
        setSateContractEnd("");
        setSateContractStart("");
        props.closeModal();
      } else {
        toast.error(res.errMessage);
      }
    }
  };

  return (
    <div>
      <Modal
        isOpen={props.isOpenModal}
        className={"booking-modal-container"}
        size="xl"
        centered
      >
        <div className="modal-header">
          <h5 className="modal-title">Gia hạn hợp đồng</h5>
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
          <div className="card-body">
            <form>
              <div className="form-row">
                <div className="form-group col-4">
                  <label htmlFor="inputEmail4">Sinh viên</label>

                  <input
                    readOnly="readOnly"
                    type="text"
                    value={inputValues.code}
                    name="userId"
                    className="form-control"
                    id="inputEmail4"
                  />
                </div>
                <div className="form-group col-3">
                  <label htmlFor="inputEmail4">Họ tên</label>
                  <input
                    readOnly="readOnly"
                    type="text"
                    value={inputValues.fullName}
                    name="fullName"
                    onChange={(event) => handleOnChange(event)}
                    className="form-control"
                    id="inputEmail4"
                  />
                </div>
                <div className="form-group col-3">
                  <label htmlFor="inputEmail4">Số điện thoại</label>
                  <input
                    readOnly="readOnly"
                    type="text"
                    value={inputValues.phonenumber}
                    name="class"
                    onChange={(event) => handleOnChange(event)}
                    className="form-control"
                    id="inputEmail4"
                  />
                </div>
                <div className="form-group col-2">
                  <label htmlFor="inputEmail4">Giới tính</label>
                  <input
                    readOnly="readOnly"
                    type="text"
                    value={inputValues.gender === "M" ? "Nam" : "Nữ"}
                    name="gender"
                    onChange={(event) => handleOnChange(event)}
                    className="form-control"
                    id="inputEmail4"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-2">
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
                <div className="form-group col-4">
                  <label htmlFor="inputEmail4">Loại phòng</label>
                  <select
                    className=" form-select  "
                    onChange={handleOnChangeTypeRoom}
                    name="typeRoomId"
                    value={inputValues.typeRoomId}
                  >
                    <option value={""} selected>
                      Chọn loại phòng
                    </option>
                    {dataTypeRoom &&
                      dataTypeRoom.length > 0 &&
                      dataTypeRoom.map((item, index) => {
                        return (
                          <option value={item.id}>{item.typeRoomName}</option>
                        );
                      })}
                  </select>
                </div>
                <div className="form-group col-3">
                  <label htmlFor="inputEmail4">Phòng</label>
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
                <div className="form-group col-3">
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

              <div className="form-row">
                <div className="form-group col-3">
                  <label htmlFor="inputCity">Tiền dịch vụ</label>
                  <input
                    type="text"
                    readOnly="readOnly"
                    value={CommonUtils.formatter.format(
                      inputValues.priceService
                    )}
                    name="priceService"
                    onChange={(event) => handleOnChange(event)}
                    className="form-control"
                    id=""
                  />
                </div>
                <div className="form-group col-3">
                  <label htmlFor="inputCity">Tiền phòng</label>
                  <input
                    type="text"
                    readOnly="readOnly"
                    value={CommonUtils.formatter.format(
                      inputValues.priceTypeRoom
                    )}
                    name="priceTypeRoom"
                    onChange={(event) => handleOnChange(event)}
                    className="form-control"
                    id=""
                  />
                </div>

                <div className="form-group col-3">
                  <label htmlFor="inputCity">Tổng cộng</label>
                  <input
                    type="text"
                    readOnly="readOnly"
                    value={CommonUtils.formatter.format(inputValues.amount)}
                    name="amount"
                    onChange={(event) => handleOnChange(event)}
                    className="form-control"
                    id=""
                  />
                </div>
                <div className="form-group col-3">
                  <label htmlFor="inputCity">Thành tiền</label>
                  <input
                    type="text"
                    value={inputValues.total ? inputValues.total : 0}
                    name="total"
                    onChange={(event) => handleOnChange(event)}
                    className="form-control"
                    id=""
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-4">
                  <label htmlFor="inputCity">Ngày bắt đầu hợp đồng</label>
                  <DatePicker
                    className="form-control"
                    onChange={handleOnChangeDatePickerStart}
                    value={contractStart}
                  />
                </div>
                <div className="form-group col-4">
                  <label htmlFor="inputCity">Ngày kết thúc hợp đồng</label>
                  <DatePicker
                    className="form-control"
                    onChange={handleOnChangeDatePickerEnd}
                    value={contractEnd}
                  />
                </div>
              </div>
            </form>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handleSaveContract()}>
            Lưu thông tin
          </Button>{" "}
          <Button onClick={handleCloseModal}>Hủy</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default ExtendModal;
