import React from "react";
import { useEffect, useState } from "react";
import CommonUtils from "../../../utils/CommonUtils";
import moment from "moment";
import { toast } from "react-toastify";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import DatePicker from "../../../component/input/DatePicker";
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from "reactstrap";

import { getAllTypeRoomActive } from "../../../services/typeRoomService";
import { getAllRoomByTypeRoomAreaAvailable } from "../../../services/roomService";
import { getTypeRoomPriceByTypeRoom } from "../../../services/typeRoomPriceService";
import { getAllAreaByGender } from "../../../services/areaService";
import {
  changeRoomWithDifferentTypeRoom,
  getAllBedAvailableByIdService,
} from "../../../services/roomBedService";
import { extendContract } from "../../../services/contractService";

const ExtendModal = (props) => {
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
  useEffect(async () => {
    if (props.isOpenModal) {
      let item = {
        id: props.itemRoomBed.id,
        bedData: {
          value: props.itemRoomBed.bedData.value,
        },
      };

      let res2 = await getTypeRoomPriceByTypeRoom(
        props.itemRoomBed.roomData.typeRoomId
      );
      if (res2 && res2.errCode === 0) {
        console.log(res2.data);
        setInputValues({
          ...inputValues,
          ["typeRoomId"]: res2.data.typeRoomId,
          ["priceService"]: res2.data.priceService,
          ["priceTypeRoom"]: res2.data.priceTypeRoom,
          ["amount"]: res2.data.priceService + res2.data.priceTypeRoom,
          ["userId"]: props.itemRoomBed.userId,
          ["code"]: props.itemRoomBed.studentData.code,
          ["fullName"]: props.itemRoomBed.studentData.fullName,
          ["phonenumber"]: props.itemRoomBed.studentData.phonenumber,
          ["gender"]: props.itemRoomBed.studentData.gender,
          ["areaId"]: props.itemRoomBed.roomData.areaId,
          ["typeRoomId"]: props.itemRoomBed.roomData.typeRoomId,
          // ["roomId"]: props.itemRoomBed.roomData.id,
          // ["bedId"]: props.itemRoomBed.id,
        });
        let res = await getAllBedAvailableByIdService(
          props.itemRoomBed.roomData.id
        );
        if (res && res.errCode === 0) {
          res.data.push(item);
          setdataBed(res.data);
        }

        fetchTypeRoom(props.itemRoomBed.roomData.typeRoomId);

        fetchAreaByGender(props.itemRoomBed.studentData.gender);

        fetchRoom(
          props.itemRoomBed.roomData.typeRoomId,
          props.itemRoomBed.roomData.areaId
        );
      }
    }
  }, [props.isOpenModal]);

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
    // setInputValues({ ...inputValues, ["code"]: "", ["userId"]: "" });
  };
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleOnChangeArea = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    let areaId = event.target.value;

    if (areaId) {
      fetchRoom(inputValues.typeRoomId, areaId);
    } else {
      setdataRoom([]);
      setdataBed([]);
      setInputValues({
        ...inputValues,
        ["bedId"]: "",
      });
    }
  };

  const handleOnChangeTypeRoom = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    let typeRoomId = event.target.value;
    if (typeRoomId) {
      fetchRoom(typeRoomId, inputValues.areaId);
      fetchPrice(typeRoomId);
    } else {
      setdataRoom([]);
      setdataBed([]);
      setInputValues({
        ...inputValues,
        ["bedId"]: "",
      });
    }

    // setdataBed([]);
  };

  const handleOnChangeRoom = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    let roomId = event.target.value;
    if (roomId) {
      fetchBed(roomId);
    } else {
      setdataBed([]);
      setInputValues({
        ...inputValues,
        ["bedId"]: null,
      });
    }
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

  let fetchTypeRoom = async (idTypeRoomName) => {
    let user = await getAllTypeRoomActive();
    if (user && user.errCode === 0) {
      let others = user.data.filter((obj) => obj.id != idTypeRoomName);

      setdataTypeRoom(others);
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
        console.log("check");
        toast.error(
          `Không có phòng tương ứng hoặc tất cả phòng đã đầy đối với khu và loại phòng bạn chọn`
        );
        setdataRoom([]);
        setdataBed([]);
        // setInputValues({
        //   ...inputValues,
        //   ["bedId"]: "",
        // });
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
  // let handleSaveContract = async () => {
  //   if (
  //     !inputValues.bedId ||
  //     !inputValues.total ||
  //     !contractStart ||
  //     !contractEnd
  //   ) {
  //     toast.error(`Yêu cầu chọn và điền đầy đủ thông tin`);
  //   } else {
  //     console.log(inputValues.bedId);
  //   }
  //   // let res = await extendContract({
  //   //   id: props.info.id,

  //   //   amount: inputValues.total,
  //   //   roomBedId: inputValues.bedId,
  //   //   start: new Date(contractStart).getTime(),
  //   //   end: new Date(contractEnd).getTime(),
  //   // });

  //   // if (res && res.errCode === 0) {
  //   //   toast.success("Gia hạn hợp đồng thành công");
  //   //   setInputValues({
  //   //     ...inputValues,
  //   //     ["userId"]: "",
  //   //     ["code"]: "",
  //   //     ["fullName"]: "",
  //   //     ["phonenumber"]: "",
  //   //     ["gender"]: "",
  //   //     ["areaId"]: "",
  //   //     ["typeRoomId"]: "",
  //   //     ["roomId"]: "",
  //   //     ["priceService"]: "",
  //   //     ["priceTypeRoom"]: "",
  //   //     ["amount"]: "",
  //   //     ["bedId"]: "",
  //   //     ["start"]: "",
  //   //     ["end"]: "",
  //   //   });
  //   //   setSateContractEnd("");
  //   //   setSateContractStart("");
  //   //   props.closeModal();
  //   // } else {
  //   //   toast.error(res.errMessage);
  //   // }
  // };
  let handleSaveContract = async () => {
    if (
      !inputValues.bedId ||
      !inputValues.total ||
      !contractStart ||
      !contractEnd
    ) {
      toast.error(`Yêu cầu điền đầy đủ thông tin`);
    } else if (parseInt(inputValues.bedId) == props.itemRoomBed.id) {
      toast.error(`Thông tin phòng mới không thay đổi`);
    } else {
      let res = await changeRoomWithDifferentTypeRoom({
        oldRoomBedId: props.itemRoomBed.id,
        newRoomBedId: inputValues.bedId,

        amount: inputValues.total,

        start: new Date(contractStart).getTime(),
        end: new Date(contractEnd).getTime(),
      });

      if (res && res.errCode === 0) {
        toast.success("Tạo hợp đồng mới và đổi phòng thành công");
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
    <div className="">
      <Modal
        isOpen={props.isOpenModal}
        className={"booking-modal-container"}
        size="xl"
        centered
      >
        <div className="modal-header">
          <h5 className="modal-title">Tạo hợp đồng mới</h5>
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
                  <label htmlFor="inputEmail4">Phòng </label>
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
