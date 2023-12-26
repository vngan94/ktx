import React from "react";
import { useEffect, useState } from "react";
import {
  createNewStudentViolation,
  getStudentViolationById,
  updateStudentViolation,
} from "../../../services/studentViolationService";
import {
  getAllStudentStaying,
  getStudentStayingById,
} from "../../../services/roomBedService";
import {
  getAllViolation,
  getAllActionByViolationIdTimes,
  getAllTimesByUserIdViolationId,
} from "../../../services/violationActionService";
import DatePicker from "../../../component/input/DatePicker";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useFetchAllcode } from "../../customize/fetch";
import localization from "moment/locale/vi";
import CommonUtils from "../../../utils/CommonUtils";
import moment from "moment";
const AddStudent = (props) => {
  const [date, setdate] = useState("");

  const [dataViolation, setdataViolation] = useState([]);
  const [dataTimes, setdataTimes] = useState([]);
  const [dataAction, setdataAction] = useState([]);
  const [dataStudent, setdataStudent] = useState([]);

  const [isActionADD, setisActionADD] = useState(true);
  const [isChangeDate, setisChangeDate] = useState(false);
  const { id } = useParams();

  const [inputValues, setInputValues] = useState({
    userId: "",
    fullName: "",
    bed: "",
    room: "",
    dateViolation: "",
    violationId: "",
    actionId: "",
    times: "",
    note: "",
    violationActionId: "",
    code: "",
  });

  let setStateStudentViolation = (data) => {
    setInputValues({
      ...inputValues,
      ["fullName"]: data.studentData.fullName,
      ["bed"]: data.roomBedData.bedData.value,
      ["room"]: data.roomBedData.roomData.roomName,
      ["violationId"]: data.violationActionData.violationId,
      ["times"]: data.violationActionData.times,
      ["actionId"]: data.violationActionData.actionId,
      ["note"]: data.note,
      ["dateViolation"]: data.dateViolation,
      ["violationActionId"]: data.violationActionId,
      ["userId"]: data.userId,
      ["code"]: data.studentData.code,
    });
    setdate(
      moment
        .unix(+data.dateViolation / 1000)
        .locale("vi")
        .format("DD/MM/YYYY")
    );
  };
  let setStudentStaying = (data) => {
    setInputValues({
      ...inputValues,
      ["userId"]: data.userId,
      ["fullName"]: data.studentData.fullName,
      ["bed"]: data.bedData.value,
      ["room"]: data.roomData.roomName,
    });
    setdate(
      moment
        .unix(+data.dob / 1000)
        .locale("vi")
        .format("DD/MM/YYYY")
    );
  };

  useEffect(() => {
    if (id) {
      fetchStudentViolation();
      fetchAllViolation();

      fetchAllTimes(inputValues.userId, inputValues.violationId);

      fetchAllAction(inputValues.violationId, inputValues.times);
    }
    fetchAllStudentStaying();
  }, [inputValues.userId]);
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  let fetchStudentViolation = async () => {
    setisActionADD(false);
    let studentViolation = await getStudentViolationById(id);
    if (studentViolation && studentViolation.errCode === 0) {
      setStateStudentViolation(studentViolation.data);
    }
  };
  let fetchAllStudentStaying = async () => {
    let res = await getAllStudentStaying();
    if (res && res.errCode === 0) {
      setdataStudent(res.data);
    }
  };
  let fetchAllAction = async (violationId, times) => {
    let res = await getAllActionByViolationIdTimes({
      violationId: violationId,
      times: times,
    });
    if (res && res.errCode === 0) {
      setdataAction(res.data);
    }
  };
  let fetchAllViolation = async () => {
    let res = await getAllViolation();
    if (res && res.errCode === 0) {
      setdataViolation(res.data);
    }
  };
  let fetchAllTimes = async (userId, violationId) => {
    let res = await getAllTimesByUserIdViolationId({
      userId: userId,
      violationId: violationId,
    });
    if (res && res.errCode === 0) {
      setdataTimes(res.data);
      if (!res.data.length) {
        toast.error(
          "Sinh viên đã đạt giới hạn số lần vi phạm của trường hợp này"
        );
      } else {
        setdataTimes(res.data);
      }
    }
  };
  let getStudentById = async (userId) => {
    let res = await getStudentStayingById(userId);
    if (res && res.errCode === 0) {
      setStudentStaying(res.data);
    }
  };
  const handleOnChangeUser = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    let userId = event.target.value;
    getStudentById(userId); // load thông tin cơ bản của sinh viên
    fetchAllViolation();
  };

  let handleOnChangeDatePicker = (date) => {
    setdate(date[0]);
    setisChangeDate(true);
  };
  let handleSaveStudentViolation = async () => {
    if (isActionADD === true) {
      let res = await createNewStudentViolation({
        violationId: inputValues.violationId,
        times: inputValues.times,
        actionId: inputValues.actionId,

        userId: inputValues.userId,
        note: inputValues.note,
        dateViolation: new Date(date).getTime(),
      });
      if (res && res.errCode === 0) {
        toast.success("Thêm mới vi phạm sinh viên thành công");
        setInputValues({
          ...inputValues,
          ["fullName"]: "",
          ["bed"]: "",
          ["room"]: "",
          ["violationId"]: "",
          ["times"]: "",
          ["actionId"]: "",
          ["note"]: "",
          ["dateViolation"]: "",
          ["violationActionId"]: "",
          ["userId"]: "",
        });
        setdate("");
      } else {
        toast.error(res.errMessage);
      }
    } else {
      let res = await updateStudentViolation({
        id: id,
        violationId: inputValues.violationId,
        times: inputValues.times,
        actionId: inputValues.actionId,

        userId: inputValues.userId,
        note: inputValues.note,
        dateViolation:
          isChangeDate === false
            ? inputValues.dateViolation
            : new Date(date).getTime(),
      });
      if (res && res.errCode === 0) {
        toast.success("Cập nhật vi phạm sinh viên thành công");
      } else {
        toast.error(res.errMessage);
      }
    }
  };
  let handleOnChangeViolation = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    let violationId = event.target.value;
    fetchAllTimes(inputValues.userId, violationId);
  };
  let handleOnChangeTimes = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    let times = event.target.value;
    fetchAllAction(inputValues.violationId, times);
  };
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Quản lý kỷ luật</h1>

      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1" />
          {isActionADD === true
            ? "Thêm vi phạm sinh viên"
            : "Cập nhật thông tin vi phạm sinh viên "}
        </div>
        <div className="card-body">
          <form>
            <div className="form-row">
              {id ? (
                <div className="form-group col-4">
                  <label htmlFor="inputEmail4">MSSV</label>
                  <input
                    type="text"
                    readOnly="readOnly"
                    value={inputValues.code}
                    className="form-control"
                    id="inputEmail4"
                  />
                </div>
              ) : (
                <div className="form-group col-4">
                  <label htmlFor="inputEmail4">
                    Danh sách sinh viên đang ở KTX
                  </label>
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
                </div>
              )}

              <div className="form-group col-4">
                <label htmlFor="inputEmail4">Họ tên</label>
                <input
                  type="text"
                  readOnly="readOnly"
                  value={inputValues.fullName}
                  name="lastName"
                  onChange={(event) => handleOnChange(event)}
                  className="form-control"
                  id="inputEmail4"
                />
              </div>
              <div className="form-group col-2">
                <label htmlFor="inputEmail4">Phòng</label>
                <input
                  type="text"
                  readOnly="readOnly"
                  value={inputValues.room}
                  name="room"
                  onChange={(event) => handleOnChange(event)}
                  className="form-control"
                  id="inputEmail4"
                />
              </div>
              <div className="form-group col-2">
                <label htmlFor="inputEmail4">Giường</label>
                <input
                  type="text"
                  readOnly="readOnly"
                  value={inputValues.bed}
                  name="bed"
                  onChange={(event) => handleOnChange(event)}
                  className="form-control"
                  id="inputEmail4"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-3">
                <label htmlFor="inputEmail4">Ngày vi phạm</label>
                <DatePicker
                  className="form-control"
                  onChange={handleOnChangeDatePicker}
                  value={date}
                />
              </div>
              <div className="form-group col-9">
                <label htmlFor="inputAddress">Tên vi phạm</label>
                <select
                  value={inputValues.violationId}
                  onChange={(event) => handleOnChangeViolation(event)}
                  name="violationId"
                  id="inputState"
                  className="form-control"
                >
                  <option value={"ALL"} selected>
                    Chọn vi phạm{" "}
                  </option>
                  {dataViolation &&
                    dataViolation.length > 0 &&
                    dataViolation.map((item, index) => {
                      return (
                        <option key={index} value={item.violationData.code}>
                          {item.violationData.value}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-3">
                <label htmlFor="inputEmail4">Vi phạm lần thứ</label>
                <select
                  value={inputValues.times}
                  onChange={(event) => handleOnChangeTimes(event)}
                  name="times"
                  id="inputState"
                  className="form-control"
                >
                  <option value={"ALL"} selected>
                    Chọn số lần vi phạm{" "}
                  </option>
                  {dataTimes &&
                    dataTimes.length > 0 &&
                    dataTimes.map((item, index) => {
                      return (
                        <option key={index} value={item.times}>
                          {item.times}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="form-group col-9">
                <label htmlFor="inputEmail4">Hình phạt</label>
                <select
                  value={inputValues.actionId}
                  onChange={(event) => handleOnChange(event)}
                  name="actionId"
                  id="inputState"
                  className="form-control"
                >
                  <option value={"ALL"} selected>
                    Chọn hình phạt{" "}
                  </option>
                  {dataAction &&
                    dataAction.length > 0 &&
                    dataAction.map((item, index) => {
                      return (
                        <option key={index} value={item.actionData.code}>
                          {item.actionData.value}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>

            <div className="form-row mb-4">
              <label htmlFor="inputEmail4">Ghi chú</label>
              <textarea
                rows="4"
                value={inputValues.note}
                name="note"
                onChange={(event) => handleOnChange(event)}
                className="form-control"
              ></textarea>
            </div>

            <button
              type="button"
              onClick={() => handleSaveStudentViolation()}
              className="btn btn-primary"
            >
              Lưu thông tin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddStudent;
