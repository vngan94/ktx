import React from "react";
import { useEffect, useState } from "react";
import {
  updateContractService,
  createNewContractService,
} from "../../../services/contractService";

import { getDetailContractById } from "../../../services/contractService";
import {
  getAllRegisterAccept,
  getStudentRegisterById,
} from "../../../services/registerService";
import { getAllRoomByTypeRoomAreaAvailable } from "../../../services/roomService";
import { getAllTypeRoomActive } from "../../../services/typeRoomService";
import { getTypeRoomPriceByTypeRoom } from "../../../services/typeRoomPriceService";
import { getAllAreaByGender } from "../../../services/areaService";
import { getAllBedAvailableByIdService } from "../../../services/roomBedService";

import DatePicker from "../../../component/input/DatePicker";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import CommonUtils from "../../../utils/CommonUtils";
import moment from "moment";

const AddStudent = (props) => {
  const [dataArea, setdataArea] = useState([]);
  const [dataTypeRoom, setdataTypeRoom] = useState([]);
  const [dataRoom, setdataRoom] = useState([]);
  const [dataBed, setdataBed] = useState([]);
  const [dataStudent, setdataStudent] = useState([]);

  const [months, setMonths] = useState(null);

  const [contractStart, setSateContractStart] = useState("");
  const [contractEnd, setSateContractEnd] = useState("");

  const [isActionADD, setisActionADD] = useState(true);
  const [isChangeDateStart, setisChangeDateStart] = useState(false);
  const [isChangeDateEnd, setisChangeDateEnd] = useState(false);
  const [roomBedData, setRoomBedData] = useState(null);
  const { id } = useParams();

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
    status: "",
    total: "",

    areaName: "",
    typeRoomName: "",
    roomName: "",
    bedName: "",

    originStatus: "",
  });
  const [dataStatus, setdataStatus] = useState([
    { id: 1, value: "Còn hạn" },
    { id: 2, value: "Hết hạn" },
    { id: 3, value: "Đã chấm dứt do vi phạm" },
  ]);

  let setStateRegister = (data) => {
    setInputValues({
      ...inputValues,
      ["userId"]: data.userId,
      ["fullName"]: data.studentData.fullName,
      ["phonenumber"]: data.studentData.phonenumber,
      ["gender"]: data.studentData.gender,
      ["areaId"]: data.roomData.areaId,
      ["typeRoomId"]: data.roomData.typeRoomId,
      ["roomId"]: data.roomId,
      ["priceService"]: data.priceData.priceService,
      ["priceTypeRoom"]: data.priceData.priceTypeRoom,
      ["amount"]: data.priceData.priceService + data.priceData.priceTypeRoom,
      ["status"]: data.status,
    });
  };
  let setSateContract = (data) => {
    setInputValues({
      ...inputValues,
      ["userId"]: data.userId,
      ["code"]: data.studentData.code,
      ["fullName"]: data.studentData.fullName,
      ["phonenumber"]: data.studentData.phonenumber,
      ["gender"]: data.studentData.gender,
      ["areaId"]: data.roombedData.roomData.areaId,
      ["typeRoomId"]: data.roombedData.roomData.typeRoomId,
      ["roomId"]: data.roombedData.roomData.id,
      ["priceService"]: data.priceData.priceService,
      ["priceTypeRoom"]: data.priceData.priceTypeRoom,
      ["amount"]: data.priceData.priceService + data.priceData.priceTypeRoom,
      ["bedId"]: data.roombedData.id,
      ["start"]: data.start,
      ["end"]: data.end,
      ["status"]: data.status,
      ["total"]: data.amount,

      ["areaName"]: data.roombedData.roomData.areaData.areaName,
      ["typeRoomName"]: data.roombedData.roomData.typeroomData.typeRoomName,
      ["roomName"]: data.roombedData.roomData.roomName,
      ["bedName"]: data.roombedData.bedData.value,

      ["originStatus"]: data.status,
    });
    setSateContractStart(
      moment
        .unix(+data.start / 1000)
        .locale("vi")
        .format("DD/MM/YYYY")
    );
    setSateContractEnd(
      moment
        .unix(+data.end / 1000)
        .locale("vi")
        .format("DD/MM/YYYY")
    );
  };
  useEffect(() => {
    fetchTypeRoom();

    fetchAreaByGender(inputValues.gender); //  không set được theo hồi chọn trong đăng ký

    fetchRoom(inputValues.typeRoomId, inputValues.areaId);
    fetchBed(inputValues.roomId);
    if (id) {
      let fetchContract = async () => {
        setisActionADD(false);
        let user = await getDetailContractById(id);
        if (user && user.errCode === 0) {
          setSateContract(user.data);
          let item = {
            id: user.data.roombedData.id,
            bedData: {
              value: user.data.roombedData.bedData.value,
            },
          };

          let res = await getAllBedAvailableByIdService(inputValues.roomId);
          if (res && res.errCode === 0) {
            res.data.push(item);
            setdataBed(res.data);
          }
        }
      };
      fetchContract();
    } else {
      fetchStudent();
    }
  }, [inputValues.userId]);
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

  const handleOnChangeUser = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    let userId = event.target.value;

    fetchStudentRegister(userId); // load thông tin cơ bản của sinh viên
  };
  let fetchStudentRegister = async (id) => {
    let user = await getStudentRegisterById(id);

    if (user && user.errCode === 0) {
      setStateRegister(user.data);
    }
  };
  let fetchStudent = async () => {
    let user = await getAllRegisterAccept();
    if (user && user.errCode === 0) {
      setdataStudent(user.data);
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
          "Phòng sinh viên đăng ký không còn giường trống hoặc ngừng hoạt động. Hãy đăng ký phòng khác"
        );
      }
    }
  };
  let fetchBed = async (roomId) => {
    let res = await getAllBedAvailableByIdService(roomId);
    if (res && res.errCode === 0) {
      setdataBed(res.data);
    }
  };

  let handleOnChangeDatePickerStart = (date) => {
    setSateContractStart(date[0]);
    setisChangeDateStart(true);
  };
  let handleOnChangeDatePickerEnd = (date) => {
    let months;
    let start;
    setSateContractEnd(date[0]);
    setisChangeDateEnd(true);
    if (isActionADD === false) {
      let monthStart = contractStart.split("/")[1] - 1;
      let yearStart = contractStart.split("/")[2];
      months =
        date[0].getMonth() -
        monthStart +
        12 * (date[0].getFullYear() - yearStart);
      // console.log("months " + months);
    } else {
      months = monthDiff(contractStart, date[0]);
    }

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
  console.log(inputValues.originStatus);
  let handleSaveContract = async () => {
    if (isActionADD === true) {
      if (
        !inputValues.userId ||
        !contractStart ||
        !contractEnd ||
        !inputValues.total ||
        !inputValues.bedId
      ) {
        toast.error("Yêu cầu chọn và nhập đầy đủ thông tin");
      } else {
        let res = await createNewContractService({
          userId: inputValues.userId,
          // start: inputValues.start,
          // end: inputValues.end,
          amount: inputValues.total,
          roomBedId: inputValues.bedId,
          start: new Date(contractStart).getTime(),
          end: new Date(contractEnd).getTime(),
        });
        if (res && res.errCode === 0) {
          toast.success("Thêm mới hợp đồng thành công");
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
            ["total"]: "",
          });
          setSateContractEnd("");
          setSateContractStart("");
        } else {
          toast.error(res.errMessage);
        }
      }
    } else {
      let res = await updateContractService({
        status: inputValues.status,
        id: id,
        roomBedId: inputValues.bedId,
        start:
          isChangeDateStart === false
            ? inputValues.start
            : new Date(contractStart).getTime(),
        end:
          isChangeDateEnd === false
            ? inputValues.end
            : new Date(contractEnd).getTime(),
        total: inputValues.total,
      });
      if (res && res.errCode === 0) {
        toast.success("Cập nhật hợp đồng thành công");
      } else {
        toast.error(res.errMessage);
      }
    }
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Thêm hợp đồng</h1>

      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1" />
          {isActionADD === true
            ? "Thêm hợp đồng"
            : "Cập nhật thông tin hợp đồng"}
        </div>
        <div className="card-body">
          <form>
            <div className="form-row">
              <div className="form-group col-4">
                <label htmlFor="inputEmail4">
                  Sinh viên đã được duyệt đăng ký phòng
                </label>
                {id ? (
                  <input
                    readOnly="readOnly"
                    type="text"
                    value={inputValues.code}
                    name="userId"
                    className="form-control"
                    id="inputEmail4"
                  />
                ) : (
                  <select
                    className=" form-select "
                    onChange={handleOnChangeUser}
                    name="userId"
                    value={inputValues.userId}
                  >
                    <option value={""} selected>
                      Chọn sinh viên
                    </option>
                    {dataStudent &&
                      dataStudent.length > 0 &&
                      dataStudent.map((item, index) => {
                        return (
                          <option value={item.userId}>
                            {item.studentData.code}
                          </option>
                        );
                      })}
                  </select>
                )}
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
            {id ? (
              <div className="form-row">
                <div className="form-group col-2">
                  <label htmlFor="inputAddress">
                    Khu dành cho {inputValues.gender === "F" ? " nữ" : " nam"}
                  </label>
                  <input
                    readOnly="readOnly"
                    type="text"
                    value={inputValues.areaName}
                    name="fullName"
                    onChange={(event) => handleOnChange(event)}
                    className="form-control"
                    id="inputEmail4"
                  />
                </div>
                <div className="form-group col-4">
                  <label htmlFor="inputEmail4">Loại phòng</label>
                  <input
                    readOnly="readOnly"
                    type="text"
                    value={inputValues.typeRoomName}
                    name="fullName"
                    onChange={(event) => handleOnChange(event)}
                    className="form-control"
                    id="inputEmail4"
                  />
                </div>
                <div className="form-group col-3">
                  <label htmlFor="inputEmail4">Phòng</label>
                  <input
                    readOnly="readOnly"
                    type="text"
                    value={inputValues.roomName}
                    name="fullName"
                    onChange={(event) => handleOnChange(event)}
                    className="form-control"
                    id="inputEmail4"
                  />
                </div>
                <div className="form-group col-3">
                  <label htmlFor="inputEmail4">Giường</label>
                  <input
                    readOnly="readOnly"
                    type="text"
                    value={inputValues.bedName}
                    name="fullName"
                    onChange={(event) => handleOnChange(event)}
                    className="form-control"
                    id="inputEmail4"
                  />
                </div>
              </div>
            ) : (
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
            )}

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

              {!isActionADD && (
                <div className="form-group col-4">
                  <label htmlFor="inputCity">Trạng thái</label>

                  {/* { id: 2, value: "Hết hạn" },
    { id: 3, value: "Đã chấm dứt do vi phạm" }, */}

                  <select
                    class="form-control "
                    value={inputValues.status}
                    name="status"
                    onChange={(event) => handleOnChange(event)}
                  >
                    {dataStatus &&
                      dataStatus.length > 0 &&
                      dataStatus.map((item, index) => {
                        return (
                          <option key={index} value={item.id}>
                            {item.value}
                          </option>
                        );
                      })}
                  </select>
                </div>
              )}
            </div>
            <div className="form-row">
              <div className="form-group col-3">
                <label htmlFor="inputCity">Tiền dịch vụ</label>
                <input
                  type="text"
                  readOnly="readOnly"
                  value={CommonUtils.formatter.format(inputValues.priceService)}
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
                {id ? (
                  <input
                    readOnly="readOnly"
                    type="text"
                    value={inputValues.total}
                    name="total"
                    onChange={(event) => handleOnChange(event)}
                    className="form-control"
                    id=""
                  />
                ) : (
                  <input
                    type="text"
                    value={inputValues.total}
                    name="total"
                    onChange={(event) => handleOnChange(event)}
                    className="form-control"
                    id=""
                  />
                )}
              </div>
            </div>
            {inputValues.originStatus == 2 || inputValues.originStatus == 3 ? (
              <> </>
            ) : (
              <button
                type="button"
                onClick={() => handleSaveContract()}
                className="btn btn-primary"
              >
                Lưu thông tin
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddStudent;
