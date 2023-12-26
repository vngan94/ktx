import React from "react";
import { useEffect, useState } from "react";
import {
  blockTypeRoomService,
  getAllTypeRoom,
  updateTypeRoomService,
  deleteTypeRoom,
} from "../../../services/typeRoomService";
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

const ManageRegulation = () => {
  const [dataTypeRoom, setdataTypeRoom] = useState([]);
  const [dataStatus, setdataStatus] = useState([]);
  const [isOpenModal, setisOpenModal] = useState(false);
  const [keyword, setkeyword] = useState([]);
  const [count, setCount] = useState("");
  const [numberPage, setnumberPage] = useState("");
  const [typeRoomId, settypeRoomId] = useState("");
  useEffect(() => {
    try {
      fetchData(keyword);
    } catch (error) {
      console.log(error);
    }
  }, []);
  let handleOnchangeSearch = (keyword) => {
    if (keyword === "") {
      fetchData(keyword);
      setkeyword(keyword);
    }
  };

  let handleSearchTypeRoom = (keyword) => {
    fetchData(keyword);
    setkeyword(keyword);
  };
  let fetchData = async (keyword) => {
    let arrData = await getAllTypeRoom({
      limit: PAGINATION.pagerow,
      offset: 0,
      keyword: keyword,
    });
    if (arrData && arrData.errCode === 0) {
      setdataTypeRoom(arrData.data);
      setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
    }
  };

  let handleChangePage = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getAllTypeRoom({
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
      keyword: keyword,
    });
    if (arrData && arrData.errCode === 0) {
      setdataTypeRoom(arrData.data);
    }
  };

  let handleOnClickExport = async () => {
    let res = await getAllTypeRoom({
      limit: "",
      offset: "",
      keyword: keyword,
    });
    if (res && res.errCode == 0) {
      await CommonUtils.exportExcel(
        res.data,
        "Danh sách loại phòng",
        "ListTypeRoom"
      );
    }
  };
  let handleBlockTypeRoom = async (event, id, status) => {
    event.preventDefault();

    let res = await blockTypeRoomService({
      id: id,
      status: status,
    });
    if (res && res.errCode === 0) {
      status == 1
        ? toast.success("Khóa loại phòng thành công")
        : toast.success("Mở khóa loại phòng thành công");
      let res = await getAllTypeRoom({
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
        keyword: keyword,
      });
      if (res && res.errCode === 0) {
        setdataTypeRoom(res.data);
        setCount(Math.ceil(res.count / PAGINATION.pagerow));
      }
    } else {
      console.log(res.errCode);
      status == 1
        ? toast.error("Khóa loại phòng thất bại")
        : toast.error("Khóa loại phòng thất bại");
    }
  };
  let handleEditTypeRoom = (id) => {
    setisOpenModal(true);
    settypeRoomId(id);
  };

  let closeModal = () => {
    setisOpenModal(false);
    settypeRoomId("");
  };

  let sendDataFromModal = async (data) => {
    let res = await updateTypeRoomService({
      id: data.id,
      typeRoomName: data.typeRoomName,
      maxStudent: data.maxStudent,
    });
    if (res && res.errCode === 0) {
      toast.success("Chỉnh sửa thông tin loại phòng thành công !");
      setisOpenModal(false);
    } else if (res && res.errCode === 1) {
      toast.error(res.errMessage);
    } else {
      toast.error("Chỉnh sửa thông tin loại phòng thất bại !");
    }
  };

  let handleDeleteTypeRoom = async (event, id) => {
    event.preventDefault();
    let res = await deleteTypeRoom(id);
    if (res && res.errCode === 0) {
      toast.success("Xóa loại phòng thành công");
      let arrData = await getAllTypeRoom({
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
        keyword: keyword,
      });
      if (arrData && arrData.errCode === 0) {
        setdataTypeRoom(arrData.data);
        setCount(Math.ceil(res.count / PAGINATION.pagerow));
      }
    } else {
      console.log(res.errCode);
      toast.error("Không cho phép xóa loại phòng này");
    }
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Quản lý loại phòng</h1>

      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1" />
          Danh sách loại phòng
        </div>
        <div className="card-body ">
          <div className="row mb-2">
            <div className="col-4 ">
              <FormSearch
                title={"loại phòng"}
                handleOnchange={handleOnchangeSearch}
                handleSearch={handleSearchTypeRoom}
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
                  <th>Loại phòng</th>
                  <th>Số sinh viên tối đa</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {dataTypeRoom &&
                  dataTypeRoom.length > 0 &&
                  dataTypeRoom.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.typeRoomName}</td>
                        <td>{item.maxStudent}</td>
                        <td>
                          {item.status == 1 ? "Hoạt động" : "Không hoạt động"}
                        </td>

                        <td>
                          <Link to={`/admin/detail-typeroom/${item.id}`}>
                            Xem
                          </Link>
                          &nbsp; &nbsp;
                          <Link to={`/admin/edit-typeroom/${item.id}`}>
                            Chỉnh sửa
                          </Link>
                          &nbsp; &nbsp;
                          <a
                            href="#"
                            onClick={(event) =>
                              handleBlockTypeRoom(event, item.id, item.status)
                            }
                          >
                            {item.status == 1 ? "Ngưng hoạt động" : "Hoạt động"}
                          </a>
                          &nbsp; &nbsp;
                          <a
                            href="#"
                            onClick={(event) =>
                              handleDeleteTypeRoom(event, item.id)
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
