import React from "react";
import { useEffect, useState } from "react";
import {
  getAllUsers,
  DeleteUserService,
  getHistory,
} from "../../../services/userService";
import moment from "moment";
import { toast } from "react-toastify";
import { PAGINATION } from "../../../utils/constant";
import ReactPaginate from "react-paginate";
import CommonUtils from "../../../utils/CommonUtils";
import ChangeRoom from "./ChangeRoom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import FormSearch from "../../../component/Search/FormSearch";
import { getAllAreaByGender } from "../../../services/areaService";
import ExtendModal from "./ExtendModal";
import AddSizeModal from "./ExtendModal";
import { changeRoomBedById } from "../../../services/roomBedService";

const History = () => {
  const [isOpenRealModal, setisOpenRealModal] = useState(false);
  const [dataUser, setdataUser] = useState([]);
  const [count, setCount] = useState("");
  const [numberPage, setnumberPage] = useState("");
  const [keyword, setkeyword] = useState("");
  const [roomBedId, setRoomBedId] = useState("");
  const [itemRoomBed, setItemRoomBed] = useState(null);

  const [isOpenModalSize, setisOpenModalSize] = useState(false);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    fetchUser("");
  }, [isOpenModalSize, isOpenRealModal]);
  let fetchUser = async (keyword) => {
    let res = await getHistory({
      limit: PAGINATION.pagerow,
      offset: 0,
      keyword: keyword,
    });

    if (res && res.errCode === 0) {
      setdataUser(res.data);
      setCount(Math.ceil(res.count / PAGINATION.pagerow));
    }
  };

  let handleChangePage = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getHistory({
      keyword: keyword,
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
    });
    if (arrData && arrData.errCode === 0) {
      setdataUser(arrData.data);
    }
  };
  let handleSearchUser = (keyword) => {
    setkeyword(keyword);
    fetchUser(keyword);
  };
  let handleOnchangeSearch = (keyword) => {
    if (keyword === "") {
      setkeyword(keyword);
      fetchUser("");
    }
  };
  let handleOnClickExport = async (keyword) => {};
  let closeRealModal = () => {
    setisOpenRealModal(false);
    setItemRoomBed(null);
  };
  let handleOpenRealModal = (item) => {
    setItemRoomBed(item);
    setisOpenRealModal(true);
  };
  let sendDataRealFromModal = async (data) => {
    // them moi

    let res = await changeRoomBedById({
      oldRoomBedId: data.oldRoomBedId,
      newRoomBedId: parseInt(data.newRoomBedId),
    });
    console.log(res);
    if (res && res.errCode === 0) {
      toast.success("Đổi phòng thành công !");
      setisOpenRealModal(false);
      setLoad(!load);
    } else if (res && res.errCode === 1) {
      toast.error(res.errMessage);
    } else {
      toast.error("Đổi phòng thành công !");
    }
  };

  let closeModalSize = () => {
    setisOpenModalSize(false);
    setItemRoomBed(null);
  };
  let handleOpenModalSize = (item) => {
    setItemRoomBed(item);
    setisOpenModalSize(true);
  };
  let sendDataFromModalSize = async (data) => {
    console.log(data);
    // let res = await updateRoomBedService({
    //   roomId: id,
    //   bedId: data.code,
    //   userId: data.userId,
    // });
    // if (res && res.errCode === 0) {
    //   toast.success("Thêm sinh viên thành công !");
    //   setisOpenModalSize(false);
    //   let arrSize = await getAllStudentById({
    //     limit: PAGINATION2.pagerow,
    //     offset: numberPage * PAGINATION2.pagerow,
    //     keyword: keyword,
    //     roomId: id,
    //   });
    //   if (arrSize && arrSize.errCode === 0) {
    //     setdataStudent(arrSize.data);
    //     setcountSizes(Math.ceil(arrSize.count / PAGINATION2.pagerow));
    //   }
    // } else if (res && res.errCode === 1) {
    //   toast.error(res.errMessage);
    // } else {
    //   toast.error("Thêm sinh viên thất bại !");
    // }
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Lịch sử chỗ ở của sinh viên</h1>

      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1" />
          Lịch sử chỗ ở
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <FormSearch
                title={"mã, tên sinh viên"}
                handleOnchange={handleOnchangeSearch}
                handleSearch={handleSearchUser}
              />
            </div>
            <div className="col-6">
              <button
                style={{ float: "right" }}
                onClick={() => handleOnClickExport(keyword)}
                className="btn btn-success"
              >
                Xuất excel <i class="fa-solid fa-file-excel"></i>
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
                  <th>MSV</th>
                  <th>Họ và tên</th>

                  <th>Khu </th>
                  <th>Loại phòng</th>
                  <th>Phòng </th>
                  <th>Giường </th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {dataUser &&
                  dataUser.length > 0 &&
                  dataUser.map((item1, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item1.studentData.code}</td>

                        <td>{item1.studentData.fullName}</td>

                        <td>{item1.roomData.areaData.areaName}</td>
                        <td>{item1.roomData.typeroomData.typeRoomName}</td>
                        <td>{item1.roomData.roomName}</td>
                        <td>{item1.bedData.value}</td>
                        <td>
                          {item1.statusStudent == 2 ? "Đang ở KTX" : "Đã rời"}
                        </td>

                        <td>
                          <Link to={`/admin/history-student/${item1.id}`}>
                            Xem
                          </Link>
                          &nbsp; &nbsp;
                          {item1.statusStudent == 2 && (
                            <>
                              <a
                                href="#"
                                onClick={() => handleOpenRealModal(item1)}
                              >
                                Đổi phòng cùng loại
                              </a>
                              &nbsp; &nbsp;
                              <a
                                href="#"
                                onClick={() => handleOpenModalSize(item1)}
                              >
                                Đổi phòng khác loại
                              </a>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ChangeRoom
        isOpenModal={isOpenRealModal}
        closeModal={closeRealModal}
        sendDataRealFromModal={sendDataRealFromModal}
        itemRoomBed={itemRoomBed}
      />
      <AddSizeModal
        isOpenModal={isOpenModalSize}
        closeModal={closeModalSize}
        sendDataFromModalSize={sendDataFromModalSize}
        itemRoomBed={itemRoomBed}
      />

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
export default History;
