import React from "react";
import { useEffect, useState } from "react";
import FormSearch from "../../../component/Search/FormSearch";
import {
  getAllRoomByIdService,
  removeTypeRoomFromRoomService,
  addTypeRoomToRoomService,
} from "../../../services/roomService";
import {
  getAllTypeRoomPriceByIdService,
  createNewTypeRoomPriceService,
  deleteTypeRoomPriceService,
  updateTypeRoomPriceService,
} from "../../../services/typeRoomPriceService";
import {
  getAllTypeRoomImageByIdService,
  createNewTypeRoomImageService,
  updateTypeRoomImageService,
  deleteTypeRoomImageService,
} from "../../../services/typeRoomImageService";
import moment from "moment";
import { toast } from "react-toastify";
import "./DetailTypeRoom.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { PAGINATION } from "../../../utils/constant";
import CommonUtils from "../../../utils/CommonUtils";
import ReactPaginate from "react-paginate";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
} from "react-router-dom";
import AddImageModal from "./AddImageModal";
import AddSizeModal from "./AddSizeModal";
import AddImageRealModal from "./AddImageRealModal";

const DetailTypeRoom = () => {
  const [dataRoom, setdataRoom] = useState([]);
  const [dataPrice, setdataPrice] = useState([]);
  const [dataTypeRoomImage, setdataTypeRoomImage] = useState([]);
  const [isOpen, setisOpen] = useState(false);
  const [isOpenModal, setisOpenModal] = useState(false);
  const [isOpenModalSize, setisOpenModalSize] = useState(false);
  const [isOpenRealModal, setisOpenRealModal] = useState(false);
  const [imgPreview, setimgPreview] = useState("");
  const [productImageId, setproductImageId] = useState("");
  const [productRealImageId, setproductRealImageId] = useState("");

  const [typeRoomPriceId, settypeRoomPriceId] = useState("");
  const [keyword, setkeyword] = useState("");
  const [countRoom, setCountRoom] = useState("");
  const [countPrice, setcountPrice] = useState("");
  const [countImage, setcountImage] = useState("");
  const [numberPage, setnumberPage] = useState("");
  const { id } = useParams();
  useEffect(() => {
    fetchTypeRoomImage();
    fetchTypeRoomPrice();
    fetchRoom(keyword);
  }, []);
  let fetchTypeRoomPrice = async () => {
    let arrSize = await getAllTypeRoomPriceByIdService({
      limit: PAGINATION.pagerow,
      offset: 0,
      typeRoomId: id,
    });
    if (arrSize && arrSize.errCode === 0) {
      setdataPrice(arrSize.data);
      setcountPrice(Math.ceil(arrSize.count / PAGINATION.pagerow));
    }
  };
  let fetchRoom = async (keyword) => {
    let arrSize = await getAllRoomByIdService({
      limit: PAGINATION.pagerow,
      offset: 0,
      keyword: keyword,
      typeRoomId: id,
    });

    if (arrSize && arrSize.errCode === 0) {
      setdataRoom(arrSize.data);
      setCountRoom(Math.ceil(arrSize.count / PAGINATION.pagerow));
    }
  };
  let fetchTypeRoomImage = async () => {
    let arrData = await getAllTypeRoomImageByIdService({
      limit: PAGINATION.pagerow,
      offset: 0,
      typeRoomId: id,
    });
    if (arrData && arrData.errCode === 0) {
      setdataTypeRoomImage(arrData.data);
      setcountImage(Math.ceil(arrData.count / PAGINATION.pagerow));
    }
  };

  let openPreviewImage = (url) => {
    setimgPreview(url);
    setisOpen(true);
  };
  let handleEditProductImage = (id) => {
    setproductImageId(id);
    setisOpenModal(true);
  };
  let handleDeleteProductImage = async (event, idImage) => {
    event.preventDefault();
    let res = await deleteTypeRoomImageService(idImage);
    if (res && res.errCode === 0) {
      toast.success("Xóa hình ảnh thành công !");
      let arrData = await getAllTypeRoomImageByIdService({
        typeRoomId: id,
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
      });
      if (arrData && arrData.errCode === 0) {
        setdataTypeRoomImage(arrData.data);
        setcountImage(Math.ceil(arrData.count / PAGINATION.pagerow));
      }
    } else {
      toast.error("Xóa hình ảnh thất bại !");
    }
  };
  let handleDeleteTypeRoomPrice = async (event, idPrice) => {
    event.preventDefault();
    let res = await deleteTypeRoomPriceService(idPrice);
    if (res && res.errCode === 0) {
      toast.success("Xóa giá phòng thành công !");
      let arrData = await getAllTypeRoomPriceByIdService({
        typeRoomId: id,
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
      });
      if (arrData && arrData.errCode === 0) {
        setdataPrice(arrData.data);
        setcountPrice(Math.ceil(arrData.count / PAGINATION.pagerow));
      }
    } else {
      toast.error("Xóa giá phòng thất bại !");
    }
  };

  let sendDataFromModal = async (data) => {
    if (data.isActionUpdate === false) {
      let res = await createNewTypeRoomImageService({
        caption: data.caption,
        image: data.image,
        typeRoomId: id,
      });
      if (res && res.errCode === 0) {
        toast.success("Thêm hình ảnh thành công !");
        setisOpenModal(false);
        await fetchTypeRoomImage();
      } else if (res && res.errCode === 1) {
        toast.error(res.errMessage);
      } else {
        toast.error("Thêm hình ảnh thất bại !");
      }
    } else {
      let res = await updateTypeRoomImageService({
        caption: data.caption,
        image: data.image,
        id: data.id,
      });
      if (res && res.errCode === 0) {
        setproductImageId("");
        toast.success("Cập nhật hình ảnh thành công !");
        setisOpenModal(false);
        await fetchTypeRoomImage();
      } else if (res && res.errCode === 1) {
        toast.error(res.errMessage);
      } else {
        toast.error("Cập nhật ảnh thất bại !");
      }
    }
  };
  let handleChangePage = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getAllTypeRoomImageByIdService({
      typeRoomId: id,
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
    });
    if (arrData && arrData.errCode === 0) {
      setdataTypeRoomImage(arrData.data);
    }
  };
  let handleChangePageRoom = async (number) => {
    setnumberPage(number.selected);

    let arrSize = await getAllRoomByIdService({
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
      keyword: keyword,
      typeRoomId: id,
    });

    if (arrSize && arrSize.errCode === 0) {
      setdataRoom(arrSize.data);
    }
  };
  let sendDataFromModalSize = async (data) => {
    if (data.isActionUpdate === false) {
      // them moi
      let res = await createNewTypeRoomPriceService({
        typeRoomId: id,
        priceService: data.priceService,
        priceTypeRoom: data.priceTypeRoom,
        startAt: new Date(data.startAt).getTime(),
        endAt: new Date(data.endAt).getTime(),
      });
      if (res && res.errCode === 0) {
        toast.success("Thêm giá thành công !");
        setisOpenModalSize(false);
        await fetchTypeRoomPrice();
      } else if (res && res.errCode === 1) {
        toast.error(res.errMessage);
      } else {
        toast.error("Thêm giá thất bại !");
      }
    } else {
      let res = await updateTypeRoomPriceService({
        // cap nhat
        id: data.id,
        priceService: data.priceService,
        priceTypeRoom: data.priceTypeRoom,
        startAt: data.startAt,
        endAt: data.endAt,
      });
      if (res && res.errCode === 0) {
        settypeRoomPriceId("");
        toast.success("Cập nhật giá thành công !");
        setisOpenModalSize(false);
        await fetchTypeRoomPrice();
      } else if (res && res.errCode === 1) {
        toast.error(res.errMessage);
      } else {
        toast.error("Cập nhật giá thất bại !");
      }
    }
  };
  let sendDataRealFromModal = async (data) => {
    let res = await addTypeRoomToRoomService({
      typeRoomId: id,
      id: data.id,
    });
    if (res && res.errCode === 0) {
      toast.success("Thêm phòng thành công !");
      setisOpenRealModal(false);
      let arrSize = await getAllRoomByIdService({
        typeRoomId: id,
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
        keyword: keyword,
      });
      if (arrSize && arrSize.errCode === 0) {
        setdataRoom(arrSize.data);
        setCountRoom(Math.ceil(arrSize.count / PAGINATION.pagerow));
      }
    } else if (res && res.errCode === 1) {
      toast.error(res.errMessage);
    } else {
      toast.error("Thêm phòng thất bại !");
    }
  };

  let handleChangePageTypeRoomPrice = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getAllTypeRoomPriceByIdService({
      typeRoomId: id,
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
    });
    if (arrData && arrData.errCode === 0) {
      setdataPrice(arrData.data);
    }
  };

  let closeModal = () => {
    setisOpenModal(false);
    setproductImageId("");
  };
  let closeRealModal = () => {
    setisOpenRealModal(false);
    setproductRealImageId("");
  };
  let handleOpenModal = () => {
    setisOpenModal(true);
  };
  let handleOpenRealModal = () => {
    setisOpenRealModal(true);
  };
  let closeModalSize = () => {
    setisOpenModalSize(false);
    settypeRoomPriceId("");
  };
  let handleOpenModalSize = () => {
    setisOpenModalSize(true);
  };
  let handleEditPrice = (id) => {
    settypeRoomPriceId(id);
    setisOpenModalSize(true);
  };
  let handleDeleteRoom = async (event, idRoom) => {
    event.preventDefault();
    let res = await removeTypeRoomFromRoomService(idRoom);
    if (res && res.errCode === 0) {
      toast.success("Xóa phòng khỏi loại phòng thành công !");
      let arrSize = await getAllRoomByIdService({
        typeRoomId: id,
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
        keyword: keyword,
      });
      if (arrSize && arrSize.errCode === 0) {
        setdataRoom(arrSize.data);
        setCountRoom(Math.ceil(arrSize.count / PAGINATION.pagerow));
      }
    } else {
      toast.error("Xóa phòng khỏi loại phòng thất bại !");
    }
  };
  let handleOnchangeSearch = (keyword) => {
    if (keyword === "") {
      fetchRoom(keyword);
      setkeyword(keyword);
    }
  };
  let handleSearchRoom = (keyword) => {
    fetchRoom(keyword);
    setkeyword(keyword);
  };
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Thông tin chi tiết loại phòng</h1>
      <div>
        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1" />
            Danh sách phòng
            <div onClick={() => handleOpenRealModal()} className="float-right">
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
              <FormSearch
                title={"phòng"}
                handleOnchange={handleOnchangeSearch}
                handleSearch={handleSearchRoom}
              />
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
                    <th>Phòng</th>
                    <th>Khu</th>
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
                          <td>{item.areaData.areaName}</td>

                          <td>
                            <span
                              style={{ color: "#0E6DFE", cursor: "pointer" }}
                              onClick={(event) =>
                                handleDeleteRoom(event, item.id)
                              }
                            >
                              Delete
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
          <AddImageRealModal
            isOpenModal={isOpenRealModal}
            closeModal={closeRealModal}
            sendDataRealFromModal={sendDataRealFromModal}
            productRealImageId={productRealImageId}
          />
        </div>
        <ReactPaginate
          previousLabel={"Quay lại"}
          nextLabel={"Tiếp"}
          breakLabel={"..."}
          pageCount={countRoom}
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
          onPageChange={handleChangePageRoom}
        />
      </div>

      <div>
        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1" />
            Danh sách thay đổi giá
            <div onClick={() => handleOpenModalSize()} className="float-right">
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
              <FormSearch title={""} />
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
                    <th>Giá dịch vụ</th>
                    <th>Giá phòng</th>
                    <th>Thời gian áp dụng bắt đầu</th>
                    <th>Thời gian áp dụng kết thúc</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>

                <tbody>
                  {dataPrice &&
                    dataPrice.length > 0 &&
                    dataPrice.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>

                          <td>
                            {CommonUtils.formatter.format(item.priceService)}
                          </td>
                          <td>
                            {CommonUtils.formatter.format(item.priceTypeRoom)}
                          </td>

                          <td>
                            {moment
                              .unix(item.startAt / 1000)
                              .locale("vi")
                              .format("DD/MM/YYYY")}
                          </td>
                          <td>
                            {moment
                              .unix(item.endAt / 1000)
                              .locale("vi")
                              .format("DD/MM/YYYY")}
                          </td>

                          <td>{item.isLast == 1 ? "Đang áp dụng" : "Cũ"}</td>
                          <td>
                            <span
                              style={{ color: "#0E6DFE", cursor: "pointer" }}
                              onClick={(event) =>
                                handleDeleteTypeRoomPrice(event, item.id)
                              }
                            >
                              Delete
                            </span>
                            &nbsp; &nbsp;
                            <span
                              onClick={() => handleEditPrice(item.id)}
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

          <AddSizeModal
            isOpenModal={isOpenModalSize}
            closeModal={closeModalSize}
            sendDataFromModalSize={sendDataFromModalSize}
            typeRoomPriceId={typeRoomPriceId}
          />
        </div>
        <ReactPaginate
          previousLabel={"Quay lại"}
          nextLabel={"Tiếp"}
          breakLabel={"..."}
          pageCount={countPrice}
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
          onPageChange={handleChangePageTypeRoomPrice}
        />
      </div>

      <div>
        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1" />
            Danh sách hình ảnh
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
                    <th>Tên hình ảnh</th>
                    <th>Hình ảnh</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>

                <tbody>
                  {dataTypeRoomImage &&
                    dataTypeRoomImage.length > 0 &&
                    dataTypeRoomImage.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.caption}</td>

                          <td>
                            <div
                              onClick={() => openPreviewImage(item.image)}
                              className="box-image"
                              style={{ backgroundImage: `url(${item.image})` }}
                            ></div>
                          </td>
                          <td>
                            <span
                              onClick={() => handleEditProductImage(item.id)}
                              style={{ color: "#0E6DFE", cursor: "pointer" }}
                            >
                              Edit
                            </span>
                            &nbsp; &nbsp;
                            <span
                              onClick={(event) =>
                                handleDeleteProductImage(event, item.id)
                              }
                              style={{ color: "#0E6DFE", cursor: "pointer" }}
                            >
                              Delete
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
            productImageId={productImageId}
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
          pageCount={countImage}
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
    </div>
  );
};

export default DetailTypeRoom;
