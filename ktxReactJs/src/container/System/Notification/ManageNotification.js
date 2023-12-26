import React from "react";
import { useEffect, useState } from "react";
import {
  deleteNotificationService,
  getAllNotification,
} from "../../../services/notificationService";
import { PAGINATION } from "../../../utils/constant";
import ReactPaginate from "react-paginate";
import CommonUtils from "../../../utils/CommonUtils";
import FormSearch from "../../../component/Search/FormSearch";
import Lightbox from "react-image-lightbox";
import { useFetchAllcode } from "../../customize/fetch";
import { toast } from "react-toastify";
import "react-image-lightbox/style.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import moment from "moment";
import Select from "react-select";

const ManageRegulation = () => {
  const [dataNotification, setdataNotification] = useState([]);

  const { data: dataSubject } = useFetchAllcode("TAG");
  const [subject, setSubject] = useState("");
  const [tagId, setTagId] = useState("");
  const [keyword, setkeyword] = useState("");
  const [count, setCount] = useState("");
  const [numberPage, setnumberPage] = useState("");
  const [imgPreview, setimgPreview] = useState("");
  const [isOpen, setisOpen] = useState(false);

  useEffect(() => {
    fetchData(keyword, tagId);
    getSubject();
  }, [dataSubject]);
  const getSubject = () => {
    let array = [];

    if (dataSubject) {
      for (var i = 0; i < dataSubject.length; i++) {
        array.push({
          value: dataSubject[i].code,
          label: dataSubject[i].value,
        });
      }

      setSubject(array);
    }
  };

  let handleOnchangeSearch = (keyword) => {
    if (keyword === "") {
      fetchData(keyword, "");
      setkeyword(keyword);
    }
  };

  let handleSearchNotification = (keyword) => {
    fetchData(keyword, "");
    setkeyword(keyword);
  };
  let fetchData = async (keyword, tagId) => {
    console.log(tagId);
    let res = await getAllNotification({
      limit: PAGINATION.pagerow,
      offset: 0,
      keyword: keyword,
      tagId: tagId,
    });
    if (res && res.errCode === 0) {
      // console.log(res.data)
      setdataNotification(res.data);
      setCount(Math.ceil(res.count / PAGINATION.pagerow));
    }
  };

  let openPreviewImage = (url) => {
    setimgPreview(url);
    setisOpen(true);
  };

  let handleChangePage = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getAllNotification({
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
      keyword: keyword,
      tagId: tagId,
    });
    if (arrData && arrData.errCode === 0) {
      setdataNotification(arrData.data);
    }
  };

  let handleOnClickExport = async (keyword) => {
    let res = await getAllNotification({
      limit: "",
      offset: "",
      keyword: keyword,
      tagId: "",
    });
    if (res && res.errCode == 0) {
      await CommonUtils.exportExcel(
        res.data,
        "Danh sách thông báo",
        "ListNotification"
      );
    }
  };
  let handleDeleteNotification = async (event, id) => {
    event.preventDefault();

    let res = await deleteNotificationService(id);
    console.log(res.errCode);
    if (res && res.errCode === 0) {
      toast.success("Xóa thông báo thành công");
      let res = await getAllNotification({
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
        keyword: "",
        tagId: "",
      });
      if (res && res.errCode === 0) {
        setdataNotification(res.data);
        setCount(Math.ceil(res.count / PAGINATION.pagerow));
      }
    } else {
      console.log(res.errCode);
      toast.error("Xóa thông báo thất bại");
    }
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Quản lý thông báo</h1>
      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1" />
          Danh sách thông báo
        </div>
        <div className="card-body ">
          <div className="row ">
            <div className="col-4 ">
              <FormSearch
                title={"thông báo"}
                handleOnchange={handleOnchangeSearch}
                handleSearch={handleSearchNotification}
              />
            </div>
            {/* <div className="col-8 ">
              <button
                style={{ float: "right" }}
                onClick={() => handleOnClickExport(keyword)}
                className="btn btn-success mb-2"
              >
                Xuất excel <i class="fa-solid fa-file-excel"></i>
              </button>
            </div> */}
          </div>
          <div className="row mb-4 col-4" style={{ marginLeft: "-25px" }}>
            <Select
              options={subject}
              placeholder={"Chọn chủ đề"}
              isSearchable
              onChange={(item) => {
                setTagId(item.value);
                fetchData("", item.value);
              }}
            />
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
                  <th>Thông báo</th>
                  <th>Chủ đề</th>
                  <th>Hình ảnh</th>
                  <th>Ngày đăng</th>
                  <th>Ngày chỉnh sửa</th>
                  <th>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {dataNotification &&
                  dataNotification.length > 0 &&
                  dataNotification.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.title}</td>
                        <td>{item.tagData.value}</td>
                        <td>
                          <div
                            onClick={() => openPreviewImage(item.image)}
                            className="box-image"
                            style={{ backgroundImage: `url(${item.image})` }}
                          ></div>
                        </td>
                        <td>{moment(item.createdAt).format("DD/MM/YYYY")}</td>
                        <td>{moment(item.updatedAt).format("DD/MM/YYYY")}</td>

                        <td style={{ width: "20%" }}>
                          <Link to={`/admin/edit-notification/${item.id}`}>
                            Chỉnh sửa
                          </Link>
                          &nbsp; &nbsp;
                          {
                            <a
                              href="#"
                              onClick={(event) =>
                                handleDeleteNotification(event, item.id)
                              }
                            >
                              Xóa
                            </a>
                          }
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
      {isOpen === true && (
        <Lightbox
          mainSrc={imgPreview}
          onCloseRequest={() => setisOpen(false)}
        />
      )}
    </div>
  );
  // return (
  // <>Hellooooo nhá </>)
};
export default ManageRegulation;
