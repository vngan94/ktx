import React from "react";
import { useEffect, useState } from "react";
import {
  getAllStudentViolation,
  deleteStudentViolation,
} from "../../../services/studentViolationService";
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
  const [dataStudentViolation, setdataStudentViolation] = useState([]);
  const [keyword, setkeyword] = useState("");
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
  let handleSearchViolationAction = (keyword) => {
    fetchData(keyword);
    setkeyword(keyword);
  };
  let fetchData = async (keyword) => {
    let arrData = await getAllStudentViolation({
      limit: PAGINATION.pagerow,
      offset: 0,
      keyword: keyword,
    });
    if (arrData && arrData.errCode === 0) {
      setdataStudentViolation(arrData.data);
      setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
    }
  };

  let handleChangePage = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getAllStudentViolation({
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
      keyword: keyword,
    });
    if (arrData && arrData.errCode === 0) {
      setdataStudentViolation(arrData.data);
    }
  };

  let handleOnClickExport = async () => {
    let res = await getAllStudentViolation({
      limit: "",
      offset: "",
      keyword: keyword,
    });
    if (res && res.errCode == 0) {
      await CommonUtils.exportExcel(
        res.data,
        "Danh sách nhập hàng",
        "ListReceipt"
      );
    }
  };

  let handleDeleteStudentViolation = async (event, id) => {
    event.preventDefault();
    let res = await deleteStudentViolation(id);
    if (res && res.errCode === 0) {
      toast.success("Xóa sinh viên vi phạm thành công");
      let res = await getAllStudentViolation({
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
        keyword: keyword,
      });
      if (res && res.errCode === 0) {
        setdataStudentViolation(res.data);
        setCount(Math.ceil(res.count / PAGINATION.pagerow));
      }
    } else {
      console.log(res.errCode);
      toast.error("Xóa sinh viên vi phạm thất bại");
    }
  };
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Quản lý kỷ luật</h1>

      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1" />
          Danh sách vi phạm sinh viên
        </div>
        <div className="card-body ">
          <div className="row mb-2">
            <div className="col-4 ">
              <FormSearch
                title={"mã sinh viên"}
                handleOnchange={handleOnchangeSearch}
                handleSearch={handleSearchViolationAction}
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
                  <th>Mã sinh viên</th>
                  <th>Họ tên</th>
                  <th>Tên vi phạm</th>
                  <th>Vi phạm lần thứ</th>
                  <th>Hình phạt</th>

                  <th>Ngày vi phạm</th>

                  <th>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {dataStudentViolation &&
                  dataStudentViolation.length > 0 &&
                  dataStudentViolation.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.studentData.code}</td>
                        <td>{item.studentData.fullName}</td>

                        <td>{item.violationActionData.violationData.value}</td>
                        <td>{item.violationActionData.times}</td>
                        <td>{item.violationActionData.actionData.value}</td>

                        <td>
                          {moment
                            .unix(+item.dateViolation / 1000)
                            .locale("vi")
                            .format("DD/MM/YYYY")}
                        </td>

                        <td>
                          <Link to={`/admin/edit-studentviolation/${item.id}`}>
                            Chỉnh sửa
                          </Link>
                          &nbsp; &nbsp;
                          <a
                            href="#"
                            onClick={(event) =>
                              handleDeleteStudentViolation(event, item.id)
                            }
                          >
                            Xóa
                          </a>
                          &nbsp; &nbsp;
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
