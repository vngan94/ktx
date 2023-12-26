import React from "react";
import { useEffect, useState } from "react";
import FormSearch from "../../../component/Search/FormSearch";
import {
  getAllRomBedByIdService,
  createNewRoomBedService,
  deleteRoomBedService,
  blockRoomBedService,
  deleteStudentService,
  updateRoomBedService,
} from "../../../services/roomBedService";
import {
  getAllStudentById,
  setLeaderService,
} from "../../../services/userService";
import {
  getAllRoomDeviceByRoomId,
  deleteRoomDevice,
  createNewRoomDevice,
  updateRoomDevice,
} from "../../../services/roomDeviceService";
import moment from "moment";
import { toast } from "react-toastify";
import "./ManageProductImage.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { PAGINATION2 } from "../../../utils/constant";
import ReactPaginate from "react-paginate";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
} from "react-router-dom";
import AddImageModal from "../Product/ProductImage/AddImageModal";
import AddSizeModal from "../Product/ProductImage/AddSizeModal";
import AddDeviceModal from "./AddDeviceModal";
import { getDetailRoomById } from "../../../services/roomService";
import { constant } from "lodash";
const ManageProductImage = () => {
  const { id } = useParams();
  const [dataDevice, setdataDevice] = useState([]);
  const [dataBed, setdataBed] = useState([]);
  const [dataStudent, setdataStudent] = useState([]);
  const [isOpen, setisOpen] = useState(false);
  const [isOpenModal, setisOpenModal] = useState(false);
  const [isOpenModalSize, setisOpenModalSize] = useState(false);
  const [imgPreview, setimgPreview] = useState("");
  const [roomId, setroomId] = useState("");
  const [productSizeId, setproductSizeId] = useState("");
  const [count, setCount] = useState("");
  const [countSize, setcountSizes] = useState("");
  const [countDevice, setcountDevices] = useState("");

  const [numberPage, setnumberPage] = useState("");
  const [keyword, setkeyword] = useState("");
  const [isOpenRealModal, setisOpenRealModal] = useState(false);
  const [deviceId, setdeviceId] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    let fetchRoomDetail = async () => {
      await loadRoomDetail();
    };
    let fetchRoomBed = async () => {
      await loadRoomBed();
    };
    let fetchAllStudent = async () => {
      await loadAllStudent(keyword);
    };
    let fetchAllDevice = async () => {
      await loadAllDevice();
    };
    fetchRoomBed();
    fetchAllStudent();
    fetchAllDevice();
    fetchRoomDetail();
  }, []);
  let loadRoomDetail = async () => {
    let data = await getDetailRoomById(id);
    if (data && data.errCode === 0) {
      setRoom(data.data);
    }
  };
  let loadRoomBed = async () => {
    let arrData = await getAllRomBedByIdService({
      id: id,
      limit: PAGINATION2.pagerow,
      offset: 0,
    });
    if (arrData && arrData.errCode === 0) {
      setdataBed(arrData.data);
      setCount(Math.ceil(arrData.count / PAGINATION2.pagerow));
    }
  };
  let loadAllStudent = async (keyword) => {
    let arrSize = await getAllStudentById({
      roomId: id,
      limit: PAGINATION2.pagerow,
      offset: 0,
      keyword: keyword,
    });
    if (arrSize && arrSize.errCode === 0) {
      setdataStudent(arrSize.data);
      setcountSizes(Math.ceil(arrSize.count / PAGINATION2.pagerow));
    }
  };
  let loadAllDevice = async () => {
    let arrSize = await getAllRoomDeviceByRoomId({
      id: id,
      limit: PAGINATION2.pagerow,
      offset: 0,
      keyword: "",
    });
    if (arrSize && arrSize.errCode === 0) {
      // console.log(arrSize.data);
      setdataDevice(arrSize.data);
      setcountDevices(Math.ceil(arrSize.count / PAGINATION2.pagerow));
    }
  };

  let closeModal = () => {
    setisOpenModal(false);
    setroomId("");
  };
  let handleOpenModal = () => {
    setisOpenModal(true);
  };
  let closeModalSize = () => {
    setisOpenModalSize(false);
    setproductSizeId("");
  };
  let handleOpenModalSize = () => {
    setisOpenModalSize(true);
  };
  let sendDataFromModal = async (data) => {
    let response = await createNewRoomBedService({
      bedId: data.code,
      roomId: id,
    });
    if (response && response.errCode === 0) {
      toast.success("Thêm giường thành công thành công !");
      setisOpenModal(false);
      await loadRoomBed();
    } else {
      toast.error("Thêm giường thất bại !");
    }
  };
  let sendDataFromModalSize = async (data) => {
    let res = await updateRoomBedService({
      roomId: id,
      bedId: data.code,
      userId: data.userId,
    });
    if (res && res.errCode === 0) {
      toast.success("Thêm sinh viên thành công !");
      setisOpenModalSize(false);
      let arrSize = await getAllStudentById({
        limit: PAGINATION2.pagerow,
        offset: numberPage * PAGINATION2.pagerow,
        keyword: keyword,
        roomId: id,
      });
      if (arrSize && arrSize.errCode === 0) {
        setdataStudent(arrSize.data);
        setcountSizes(Math.ceil(arrSize.count / PAGINATION2.pagerow));
      }
    } else if (res && res.errCode === 1) {
      toast.error(res.errMessage);
    } else {
      toast.error("Thêm sinh viên thất bại !");
    }
  };
  let handleBlockBed = async (idRoomBed, statusRoomBed) => {
    let response = await blockRoomBedService({
      statusRoomBed: statusRoomBed,
      id: idRoomBed,
    });
    if (response && response.errCode === 0) {
      toast.success("Thao tác thành công !");
      let arrData = await getAllRomBedByIdService({
        id: id,
        limit: PAGINATION2.pagerow,
        offset: numberPage * PAGINATION2.pagerow,
      });
      if (arrData && arrData.errCode === 0) {
        setdataBed(arrData.data);
        setCount(Math.ceil(arrData.count / PAGINATION2.pagerow));
      }
    } else {
      toast.error(response.errMessage);
    }
  };
  let handleEditProductSize = (id) => {
    setproductSizeId(id);
    setisOpenModalSize(true);
  };
  let handleDeleteProductImage = async (idRoomBed, status) => {
    if (status == 2) {
      toast.error("Phòng đang có sinh viên ở, không xóa được !");
    } else {
      let response = await deleteRoomBedService(idRoomBed);
      if (response && response.errCode === 0) {
        toast.success("Xóa giường thành công !");
        let arrData = await getAllRomBedByIdService({
          id: id,
          limit: PAGINATION2.pagerow,
          offset: numberPage * PAGINATION2.pagerow,
        });
        if (arrData && arrData.errCode === 0) {
          setdataBed(arrData.data);
          setCount(Math.ceil(arrData.count / PAGINATION2.pagerow));
        }
      } else {
        toast.error(response.errMessage);
      }
    }
  };

  let handleChangePage = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getAllRomBedByIdService({
      id: id,
      limit: PAGINATION2.pagerow,
      offset: number.selected * PAGINATION2.pagerow,
    });
    if (arrData && arrData.errCode === 0) {
      setdataBed(arrData.data);
    }
  };
  let handleDeleteStudent = async (event, idRoomBed) => {
    event.preventDefault();

    let res = await deleteStudentService({
      id: idRoomBed,
    });
    if (res && res.errCode === 0) {
      toast.success("Xóa sinh viên khỏi phòng thành công");
      let res = await getAllStudentById({
        limit: PAGINATION2.pagerow,
        offset: numberPage * PAGINATION2.pagerow,
        roomId: id,
        keyword: keyword,
      });
      if (res && res.errCode === 0) {
        setdataStudent(res.data);
        setcountSizes(Math.ceil(res.count / PAGINATION2.pagerow));
      }
    } else {
      console.log(res.errCode);
      toast.error(res.errMessage);
    }
  };
  let handleSetLeaderStudent = async (event, idStudent) => {
    event.preventDefault();
    let res = await setLeaderService({
      id: idStudent,
    });
    if (res && res.errCode === 0) {
      toast.success("Thao tác thành công");
      let res = await getAllStudentById({
        limit: PAGINATION2.pagerow,
        offset: numberPage * PAGINATION2.pagerow,
        roomId: id,
        keyword: keyword,
      });
      if (res && res.errCode === 0) {
        setdataStudent(res.data);
        setcountSizes(Math.ceil(res.count / PAGINATION2.pagerow));
      }
    } else {
      console.log(res.errCode);
      toast.error(res.errMessage);
    }
  };
  let handleChangePageProductSize = async (number) => {
    setnumberPage(number.selected);
    let arrSize = await getAllStudentById({
      roomId: id,
      limit: PAGINATION2.pagerow,
      offset: number.selected * PAGINATION2.pagerow,
      keyword: keyword,
    });
    if (arrSize && arrSize.errCode === 0) {
      setdataStudent(arrSize.data);
    }
  };
  let closeRealModal = () => {
    setisOpenRealModal(false);
    setdeviceId("");
  };
  let handleOpenRealModal = () => {
    setisOpenRealModal(true);
  };
  let handleEditDevice = (id) => {
    setdeviceId(id);
    setisOpenRealModal(true);
  };
  let sendDataRealFromModal = async (data) => {
    if (data.isActionUpdate === false) {
      // them moi
      let res = await createNewRoomDevice({
        roomId: id,
        userId: JSON.parse(localStorage.getItem("userData")).id,
        deviceId: data.deviceId,
        status: 1,
      });
      if (res && res.errCode === 0) {
        toast.success("Thêm thiết bị thành công !");
        setisOpenRealModal(false);
        await loadAllDevice();
      } else if (res && res.errCode === 1) {
        toast.error(res.errMessage);
      } else {
        toast.error("Thêm thiết bị thất bại !");
      }
    } else {
      let res = await updateRoomDevice({
        // cap nhat
        id: data.id,
        status: data.status,
      });
      if (res && res.errCode === 0) {
        toast.success("Cập nhật trạng thái thiết bị thành công !");
        setisOpenRealModal(false);
        setdeviceId("");
        await loadAllDevice();
      } else if (res && res.errCode === 1) {
        toast.error(res.errMessage);
      } else {
        toast.error("Cập nhật trạng thái thiết bị thất bại !");
      }
    }
  };
  let handleDeleteDevice = async (event, idRoomDevice) => {
    event.preventDefault();
    let res = await deleteRoomDevice(idRoomDevice);

    if (res && res.errCode === 0) {
      toast.success("Xóa thiết bị khỏi phòng thành công");
      let arrSize = await getAllRoomDeviceByRoomId({
        id: id,
        limit: PAGINATION2.pagerow,
        offset: numberPage * PAGINATION2.pagerow,
        keyword: "",
      });
      if (arrSize && arrSize.errCode === 0) {
        setdataDevice(arrSize.data);
        setcountDevices(Math.ceil(arrSize.count / PAGINATION2.pagerow));
      }
    } else {
      console.log(res.errCode);
      toast.error("Xóa thiết bị khỏi phòng thất bại");
    }
  };

  let handleChangePageDevice = async (number) => {
    setnumberPage(number.selected);
    let arrSize = await getAllRoomDeviceByRoomId({
      id: id,
      limit: PAGINATION2.pagerow,
      offset: number.selected * PAGINATION2.pagerow,
      keyword: keyword,
    });
    if (arrSize && arrSize.errCode === 0) {
      // console.log(arrSize.data);
      setdataDevice(arrSize.data);
      setcountDevices(Math.ceil(arrSize.count / PAGINATION2.pagerow));
    }
  };
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Thông tin chi tiết phòng {room.roomName}</h1>

      <div>
        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1" />
            Danh sách giường
            <div onClick={() => handleOpenModal()} className="float-right">
              <i
                style={{
                  fontSize: "35px",
                  cursor: "pointer",
                  color: "#0D6EFD",
                }}
                className="fas fa-plus-square"
              ></i>
            </div>
          </div>
          <div className="card-body">
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

                    <th>Tên giường</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>

                <tbody>
                  {dataBed &&
                    dataBed.length > 0 &&
                    dataBed.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.bedId}</td>
                          <td>
                            {item.statusRoomBed == 4
                              ? "Đang bảo trì"
                              : item.statusStudent == 2
                              ? "Đang có sinh viên ở"
                              : "Trống"}
                          </td>
                          <td>
                            <span
                              onClick={() =>
                                handleBlockBed(item.id, item.statusRoomBed)
                              }
                              style={{ color: "#0E6DFE", cursor: "pointer" }}
                            >
                              {item.statusStudent == 2
                                ? ""
                                : item.statusRoomBed == 4
                                ? "Unblock"
                                : "Block"}
                            </span>
                            &nbsp; &nbsp;
                            <span
                              onClick={() =>
                                handleDeleteProductImage(
                                  item.id,
                                  item.statusStudent
                                )
                              }
                              style={{ color: "#0E6DFE", cursor: "pointer" }}
                            >
                              Xóa
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <AddImageModal
            isOpenModal={isOpenModal}
            closeModal={closeModal}
            sendDataFromModal={sendDataFromModal}
            roomId={id}
          />
        </div>

        {isOpen === true && (
          <Lightbox
            mainSrc={imgPreview}
            onCloseRequest={() => setisOpen(false)}
          />
        )}
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

      <div>
        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1" />
            Danh sách sinh viên
            {/* <div onClick={() => handleOpenModalSize()} className="float-right">
              <i
                style={{
                  fontSize: "35px",
                  cursor: "pointer",
                  color: "#0D6EFD",
                }}
                className="fas fa-plus-square"
              ></i>
            </div> */}
          </div>
          <div className="row mt-3 ml-3 mr-3">
            <div className="col-4">
              <FormSearch title={"mã sinh viên"} />
            </div>
            <div className="col-8">
              <button style={{ float: "right" }} className="btn btn-success">
                Xuất excel <i class="fa-solid fa-file-excel"></i>
              </button>
            </div>
          </div>

          <div className="card-body">
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
                    <th>Giường</th>
                    <th>MSV</th>
                    <th>Họ tên</th>
                    <th>Số điện thoại</th>
                    <th>Nhóm trưởng</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>

                <tbody>
                  {dataStudent &&
                    dataStudent.length > 0 &&
                    dataStudent.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.bedData.value}</td>
                          <td>{item.studentData.code}</td>
                          <td>{item.studentData.fullName}</td>
                          <td>{item.studentData.phonenumber}</td>
                          <td>{item.studentData.isLeader == 1 ? "Có" : ""}</td>
                          <td>
                            <span
                              onClick={(event) =>
                                handleDeleteStudent(event, item.id)
                              }
                              style={{ color: "#0E6DFE", cursor: "pointer" }}
                            >
                              Delete
                            </span>
                            &nbsp; &nbsp;
                            <span
                              onClick={(event) =>
                                handleSetLeaderStudent(
                                  event,
                                  item.studentData.id
                                )
                              }
                              style={{ color: "#0E6DFE", cursor: "pointer" }}
                            >
                              {item.studentData.isLeader == 1
                                ? "Remove leader"
                                : "Set leader"}
                            </span>
                            &nbsp; &nbsp;
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>

          <AddSizeModal
            isOpenModal={isOpenModalSize}
            closeModal={closeModalSize}
            sendDataFromModalSize={sendDataFromModalSize}
            roomId={id}
          />
        </div>

        {isOpen === true && (
          <Lightbox
            mainSrc={imgPreview}
            onCloseRequest={() => setisOpen(false)}
          />
        )}
        <ReactPaginate
          previousLabel={"Quay lại"}
          nextLabel={"Tiếp"}
          breakLabel={"..."}
          pageCount={countSize}
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
          onPageChange={handleChangePageProductSize}
        />
      </div>
      <div>
        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1" />
            Danh sách thiết bị
            <div className="float-right" onClick={() => handleOpenRealModal()}>
              <i
                style={{
                  fontSize: "35px",
                  cursor: "pointer",
                  color: "#0D6EFD",
                }}
                className="fas fa-plus-square"
              ></i>
            </div>
          </div>
          <div className="row mt-3 ml-3 mr-3">
            <div className="col-4">
              <FormSearch title={"thiết bị"} />
            </div>
          </div>
          <div className="card-body">
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
                    <th>Mã thiết bị</th>
                    <th>Thiết bị</th>
                    <th>Trạng thái</th>

                    <th>Thời gian</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>

                <tbody>
                  {dataDevice &&
                    dataDevice.length > 0 &&
                    dataDevice.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.deviceData.code}</td>
                          <td>{item.deviceData.type}</td>
                          <td>
                            {item.status == 1
                              ? "Mới"
                              : item.status == 2
                              ? "Đang bị hỏng"
                              : item.status == 3
                              ? "Đã sửa"
                              : "Không còn sử dụng được nữa"}
                          </td>
                          <td>
                            {moment
                              .utc(item.createdAt)
                              .local()
                              .format("DD/MM/YYYY HH:mm:ss")}
                          </td>

                          <td>
                            <span
                              style={{ color: "#0E6DFE", cursor: "pointer" }}
                              onClick={(event) =>
                                handleDeleteDevice(event, item.id)
                              }
                            >
                              Delete
                            </span>
                            &nbsp; &nbsp;
                            <span
                              onClick={() => handleEditDevice(item.id)}
                              style={{ color: "#0E6DFE", cursor: "pointer" }}
                            >
                              Edit
                            </span>
                            &nbsp; &nbsp;
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <AddDeviceModal
            isOpenModal={isOpenRealModal}
            closeModal={closeRealModal}
            sendDataRealFromModal={sendDataRealFromModal}
            deviceId={deviceId}
          />
        </div>

        <ReactPaginate
          previousLabel={"Quay lại"}
          nextLabel={"Tiếp"}
          breakLabel={"..."}
          pageCount={countDevice}
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
          onPageChange={handleChangePageDevice}
        />
      </div>
    </div>
  );
};
export default ManageProductImage;
