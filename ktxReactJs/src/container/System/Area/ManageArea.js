import React from "react";
import { useEffect, useState } from "react";
import {
  blockAreaService,
  deleteArea,
  getAllArea,
} from "../../../services/areaService";
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
  const [dataArea, setdataArea] = useState([]);
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
  let handleSearchArea = (keyword) => {
    fetchData(keyword);
    setkeyword(keyword);
  };
  let fetchData = async (keyword) => {
    let arrData = await getAllArea({
      limit: PAGINATION.pagerow,
      offset: 0,
      keyword: keyword,
    });
    if (arrData && arrData.errCode === 0) {
      setdataArea(arrData.data);
      setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
    }
  };

  let handleChangePage = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getAllArea({
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
      keyword: keyword,
    });
    if (arrData && arrData.errCode === 0) {
      setdataArea(arrData.data);
      setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
    }
  };

  let handleOnClickExport = async () => {
    let res = await getAllArea({
      limit: "",
      offset: "",
      keyword: keyword,
    });
    if (res && res.errCode == 0) {
      await CommonUtils.exportExcel(res.data, "Danh sách khu", "ListArea");
    }
  };
  let handleBlockArea = async (event, id, status) => {
    event.preventDefault();

    let res = await blockAreaService({
      id: id,
      status: status,
    });
    if (res && res.errCode === 0) {
      status == 1
        ? toast.success("Khóa khu thành công")
        : toast.success("Mở khóa khu thành công");
    } else {
      console.log(res.errCode);
      status == 1
        ? toast.error("Khóa khu thất bại")
        : toast.error("Khóa khu thất bại");
    }
    res = await getAllArea({
      limit: PAGINATION.pagerow,
      offset: numberPage * PAGINATION.pagerow,
      keyword: keyword,
    });
    if (res && res.errCode === 0) {
      setdataArea(res.data);
      setCount(Math.ceil(res.count / PAGINATION.pagerow));
    }
  };
  let handleDeleteArea = async (event, id) => {
    event.preventDefault();
    let res = await deleteArea(id);
    if (res && res.errCode === 0) {
      toast.success("Xóa kkhu thành công");
      let arrData = await getAllArea({
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
        keyword: keyword,
      });
      if (arrData && arrData.errCode === 0) {
        setdataArea(arrData.data);
        setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
      }
    } else {
      console.log(res.errCode);
      toast.error("Không cho phép xóa khu này");
    }
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Quản lý khu</h1>

      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1" />
          Danh sách khu
        </div>
        <div className="card-body ">
          <div className="row mb-2">
            <div className="col-4 ">
              <FormSearch
                title={"khu"}
                handleOnchange={handleOnchangeSearch}
                handleSearch={handleSearchArea}
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
                  <th>Khu</th>
                  <th>Dành cho sinh viên</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {dataArea &&
                  dataArea.length > 0 &&
                  dataArea.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.areaName}</td>
                        <td>{item.gender === "M" ? "Nam" : "Nữ"}</td>
                        <td>
                          {item.status == 1 ? "Hoạt động" : "Không hoạt động"}
                        </td>

                        <td>
                          <Link to={`/admin/edit-area/${item.id}`}>
                            Chỉnh sửa
                          </Link>
                          &nbsp; &nbsp;
                          <a
                            href="#"
                            onClick={(event) =>
                              handleBlockArea(event, item.id, item.status)
                            }
                          >
                            {item.status == 1 ? "Ngưng hoạt động" : "Hoạt động"}
                          </a>
                          &nbsp; &nbsp;
                          <a
                            href="#"
                            onClick={(event) =>
                              handleDeleteArea(event, item.id)
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
