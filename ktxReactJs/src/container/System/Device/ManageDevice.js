import React from "react";
import { useEffect, useState } from "react";
import { getAllDevice, deleteDevice } from "../../../services/deviceService";
import moment from "moment";
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
  const [dataDevice, setdataDevice] = useState([]);
  const [keyword, setkeyword] = useState([]);
  const [count, setCount] = useState("");
  const [numberPage, setnumberPage] = useState("");
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
  let handleSearchDevice = (keyword) => {
    fetchData(keyword);
    setkeyword(keyword);
  };
  let fetchData = async (keyword) => {
    let arrData = await getAllDevice({
      limit: PAGINATION.pagerow,
      offset: 0,
      keyword: keyword,
      status: "",
    });
    if (arrData && arrData.errCode === 0) {
      setdataDevice(arrData.data);
      setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
    }
  };

  let handleChangePage = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getAllDevice({
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
      keyword: keyword,
      status: "",
    });
    if (arrData && arrData.errCode === 0) {
      setdataDevice(arrData.data);
      setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
    }
  };

  let handleOnClickExport = async () => {
    let res = await getAllDevice({
      limit: "",
      offset: "",
      keyword: keyword,
    });
    if (res && res.errCode == 0) {
      await CommonUtils.exportExcel(
        res.data,
        "Danh sách thiết bị",
        "ListDevice"
      );
    }
  };

  let handleDeleteDevice = async (event, id) => {
    event.preventDefault();
    let res = await deleteDevice(id);
    if (res && res.errCode === 0) {
      toast.success("Xóa thiết bị thành công");
      let arrData = await getAllDevice({
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
        keyword: keyword,
        status: "",
      });
      if (arrData && arrData.errCode === 0) {
        setdataDevice(arrData.data);
        setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
      }
    } else {
      console.log(res.errCode);
      toast.error("Đã có phòng trang bị, không thể xóa thiết bị này");
    }
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Quản lý thiết bị</h1>

      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1" />
          Danh sách thiết bị
        </div>
        <div className="card-body ">
          <div className="row mb-2">
            <div className="col-4 ">
              <FormSearch
                title={"thiết bị"}
                handleOnchange={handleOnchangeSearch}
                handleSearch={handleSearchDevice}
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
                  <th>Mã thiết bị</th>
                  <th>Loại thiết bị</th>
                  <th>Trạng thái</th>
                  {/* <th>Phòng</th> */}
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
                        <td>{item.code}</td>
                        <td>{item.type}</td>
                        <td>
                          {item.status == 1
                            ? "Chưa được trang bị"
                            : item.status == 5
                            ? "Không còn dùng được nữa"
                            : "Đã được trang bị"}
                        </td>
                        {/* {item.roomData ? (
                          <td>{item.roomData.roomData.roomName}</td>
                        ) : (
                          <td></td>
                        )} */}
                        <td>
                          <Link to={`/admin/edit-device/${item.id}`}>
                            Chỉnh sửa
                          </Link>
                          &nbsp; &nbsp;
                          <a
                            href="#"
                            onClick={(event) =>
                              handleDeleteDevice(event, item.id)
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
