import React from "react";
import { useEffect, useState } from "react";
import { getAllArea } from "../../../services/areaService";
import { getAllTypeRoom } from "../../../services/typeRoomService";
import {
  getAllRoom,
  blockRoomService,
  deleteRoom,
} from "../../../services/roomService";
import { toast } from "react-toastify";
import { PAGINATION } from "../../../utils/constant";
import ReactPaginate from "react-paginate";
import CommonUtils from "../../../utils/CommonUtils";
import FormSearch from "../../../component/Search/FormSearch";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import moment from "moment";

const ManageRegulation = () => {
  const [dataArea, setdataArea] = useState([]);
  const [dataTypeRoom, setdataTypeRoom] = useState([]);
  const [dataStatus, setdataStatus] = useState([
    { id: "1", value: "Ngưng hoạt động" },
    { id: "2", value: "Còn trống" },
    { id: "3", value: "Đầy" },
  ]);
  const [dataRoom, setdataRoom] = useState([{}]);
  const [keyword, setkeyword] = useState("");
  const [count, setCount] = useState("");
  const [numberPage, setnumberPage] = useState("");
  const [inputValues, setInputValues] = useState({
    areaId: "",
    typeRoomId: "",
    status: "",
  });
  useEffect(() => {
    try {
      fetchDataArea();
      fetchDataTypeRoom();
      fetchData(
        keyword,
        inputValues.areaId,
        inputValues.typeRoomId,
        inputValues.status
      );
    } catch (error) {
      console.log(error);
    }
  }, []);
  let handleOnchangeSearch = (keyword) => {
    if (keyword === "") {
      fetchData(
        keyword,
        inputValues.areaId,
        inputValues.typeRoomId,
        inputValues.status
      );
      setkeyword(keyword);
    }
  };

  let fetchData = async (keyword, areaId, typeRoomId, status) => {
    let arrData = await getAllRoom({
      limit: PAGINATION.pagerow,
      offset: 0,
      keyword: keyword,
      areaId: areaId,
      typeRoomId: typeRoomId,
      status: status,
    });
    if (arrData && arrData.errCode === 0) {
      setdataRoom(arrData.data);
      setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
    }
  };

  let fetchDataArea = async () => {
    let arrData = await getAllArea({
      limit: "",
      offset: "",
      keyword: "",
    });
    if (arrData && arrData.errCode === 0) {
      setdataArea(arrData.data);
    }
  };
  let fetchDataTypeRoom = async () => {
    let arrData = await getAllTypeRoom({
      limit: "",
      offset: "",
      keyword: "",
    });
    if (arrData && arrData.errCode === 0) {
      setdataTypeRoom(arrData.data);
    }
  };

  let handleChangePage = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getAllRoom({
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
      keyword: keyword,
      areaId: inputValues.areaId,
      typeRoomId: inputValues.typeRoomId,
      status: inputValues.status,
    });
    if (arrData && arrData.errCode === 0) {
      setdataRoom(arrData.data);
      setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
    }
  };

  let handleOnClickExport = async () => {
    let res = await getAllRoom({
      limit: "",
      offset: "",
      keyword: keyword,
      areaId: inputValues.areaId,
      typeRoomId: inputValues.typeRoomId,
      status: inputValues.status,
    });
    if (res && res.errCode == 0) {
      await CommonUtils.exportExcel(res.data, "Danh sách phòng", "ListRoom");
    }
  };
  let handleBlockRoom = async (event, id, status) => {
    event.preventDefault();

    let res = await blockRoomService({
      id: id,
    });
    if (res && res.errCode === 0) {
      status != 1
        ? toast.success("Khóa phòng thành công")
        : toast.success("Mở khóa phòng thành công");
    } else {
      status != 1
        ? toast.error("Khóa phòng thất bại")
        : toast.error("Mở phòng thất bại");
    }
    res = await getAllRoom({
      limit: PAGINATION.pagerow,
      offset: numberPage * PAGINATION.pagerow,
      keyword: keyword,
      areaId: inputValues.areaId,
      typeRoomId: inputValues.typeRoomId,
      status: inputValues.status,
    });
    if (res && res.errCode === 0) {
      setdataRoom(res.data);
      setCount(Math.ceil(res.count / PAGINATION.pagerow));
    }
  };
  let handleSearchRoom = (keyword) => {
    fetchData(
      keyword,
      inputValues.areaId,
      inputValues.typeRoomId,
      inputValues.status
    );
    setkeyword(keyword);
  };
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleOnFind = async () => {
    let res = await getAllRoom({
      limit: PAGINATION.pagerow,
      offset: 0,
      keyword: "",
      areaId: inputValues.areaId,
      typeRoomId: inputValues.typeRoomId,
      status: inputValues.status,
    });
    if (res && res.errCode === 0) {
      setdataRoom(res.data);
      setCount(Math.ceil(res.count / PAGINATION.pagerow));
    }
  };
  let handleDeleteRoom = async (event, id) => {
    event.preventDefault();
    let res = await deleteRoom(id);
    if (res && res.errCode === 0) {
      toast.success("Xóa phòng thành công");
      let arrData = await getAllRoom({
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
        keyword: keyword,
        areaId: inputValues.areaId,
        typeRoomId: inputValues.typeRoomId,
        status: inputValues.status,
      });
      if (arrData && arrData.errCode === 0) {
        setdataRoom(arrData.data);
        setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
      }
    } else {
      console.log(res.errCode);
      toast.error("Không cho phép xóa phòng này");
    }
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Quản lý phòng</h1>

      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1" />
          Danh sách phòng
        </div>
        <div className="card-body ">
          <div className="row mb-2">
            <div className="col-4 ">
              <FormSearch
                title={"phòng"}
                handleOnchange={handleOnchangeSearch}
                handleSearch={handleSearchRoom}
              />
            </div>
            {/* <div className="col-8 ">
              <button
                style={{ float: "right" }}
                onClick={() => handleOnClickExport()}
                className="btn btn-success mb-2"
              >
                Xuất excel <i class="fa-solid fa-file-excel"></i>
              </button>
            </div> */}
          </div>
          <div className="row mb-2">
            <select
              className="col-2 ml-3"
              onChange={(event) => handleOnChange(event)}
              name="areaId"
            >
              <option value={""} selected>
                Khu
              </option>
              {dataArea &&
                dataArea.length > 0 &&
                dataArea.map((item, index) => {
                  return <option value={item.id}>{item.areaName}</option>;
                })}
            </select>
            <select
              className=" col-4 ml-2  "
              onChange={(event) => handleOnChange(event)}
              name="typeRoomId"
            >
              <option value={""} selected>
                Loại phòng
              </option>
              {dataTypeRoom &&
                dataTypeRoom.length > 0 &&
                dataTypeRoom.map((item, index) => {
                  return <option value={item.id}>{item.typeRoomName}</option>;
                })}
            </select>

            <select
              className=" col-2 ml-2 "
              onChange={(event) => handleOnChange(event)}
              name="status"
            >
              <option value={""} selected>
                Trạng thái
              </option>
              {dataStatus &&
                dataStatus.length > 0 &&
                dataStatus.map((item, index) => {
                  return <option value={item.id}>{item.value}</option>;
                })}
            </select>
            <div className="col-2 ">
              <button
                style={{ float: "left" }}
                className="btn btn-success "
                onClick={() => handleOnFind()}
              >
                Tìm <i class=""></i>
              </button>
            </div>
          </div>
          <div className="table-responsive">
            <table
              className="table table-bordered"
              style={{ border: "1" }}
              width="100%"
              cellspacing="0"
            >
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Phòng</th>
                  <th>Khu</th>
                  <th>Loại phòng</th>

                  <th>Dành cho</th>
                  <th>Số SV tối đa</th>
                  <th>Số SV đang ở</th>
                  <th>Số đơn đăng ký được duyệt</th>
                  <th>Trạng thái</th>

                  <th>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {dataRoom &&
                  dataRoom.length > 0 &&
                  dataRoom.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.roomName}</td>
                        <td>{item.areaData && item.areaData.areaName}</td>
                        <td>
                          {item.typeroomData && item.typeroomData.typeRoomName}
                        </td>

                        <td>
                          {item.areaData && item.areaData.gender === "F"
                            ? "Nữ"
                            : "Nam"}
                        </td>
                        <td>
                          {item.typeroomData && item.typeroomData.maxStudent}
                        </td>
                        <td>{item.countStudentStaying}</td>
                        <td>{item.countRegister}</td>

                        {item.status == 1 ? (
                          <td>Ngưng hoạt động</td>
                        ) : item.status == 2 ? (
                          <td>Còn trống</td>
                        ) : (
                          <td>Đầy</td>
                        )}

                        <td>
                          <Link to={`/admin/detail-room/${item.id}`}>Xem</Link>
                          &nbsp; &nbsp;
                          <Link to={`/admin/edit-room/${item.id}`}>
                            Chỉnh sửa
                          </Link>
                          &nbsp; &nbsp;
                          <a
                            href="#"
                            onClick={(event) =>
                              handleBlockRoom(event, item.id, item.status)
                            }
                          >
                            {item.status == 1 ? "Hoạt động" : "Ngưng hoạt động"}
                          </a>
                          &nbsp; &nbsp;
                          <a
                            href="#"
                            onClick={(event) =>
                              handleDeleteRoom(event, item.id)
                            }
                          >
                            Xóa
                          </a>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ReactPaginate
        previousLabel={"Quay lại"}
        nextLabel={"Tiếp"}
        breakLabel={"..."}
        pageCount={count}
        marginPagesDisplayed={3}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakLinkClassName={"page-link"}
        breakClassName={"page-item"}
        activeClassName={"active"}
        onPageChange={handleChangePage}
      />
    </div>
  );
};
export default ManageRegulation;
