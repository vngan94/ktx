import React from "react";
import { useEffect, useState } from "react";
import { useFetchAllcode } from "../../customize/fetch";
import {
  deleteComplaint,
  getAllComplaint,
} from "../../../services/complaintService";
import moment from "moment";
import { toast } from "react-toastify";
import { PAGINATION2, STATUS_COMPLAINT } from "../../../utils/constant";
import CommonUtils from "../../../utils/CommonUtils";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import ReactPaginate from "react-paginate";
import FormSearch from "../../../component/Search/FormSearch";
import Select from "react-select";
const ManageComplaint = () => {
  const [dataComplaint, setdataComplaint] = useState([]);
  const [dataComplaintRender, setdataComplaintRender] = useState([]);
  const [statusId, setStatusId] = useState("");
  const [count, setCount] = useState("");
  const [numberPage, setnumberPage] = useState("");
  const [keyword, setkeyword] = useState("");
  useEffect(() => {
    fetchData(keyword, "");
  }, []);
  let fetchData = async (keyword, status) => {
    let arrData = await getAllComplaint({
      limit: PAGINATION2.pagerow,
      offset: 0,
      keyword: keyword,
      status: status,
    });
    if (arrData && arrData.errCode === 0) {
      let v = arrData.data?.reverse();

      setdataComplaint(v);
      setdataComplaintRender(v);
      // setdataComplaint(arrData.data);

      setCount(Math.ceil(arrData.count / PAGINATION2.pagerow));
    }
  };

  let handleChangePage = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getAllComplaint({
      limit: PAGINATION2.pagerow,
      offset: number.selected * PAGINATION2.pagerow,
      keyword: keyword,
      status: "",
    });
    if (arrData && arrData.errCode === 0) {
      setdataComplaint(arrData.data);
      setCount(Math.ceil(arrData.count / PAGINATION2.pagerow));
    }
  };
  let handleSearchComplaint = (keyword) => {
    // fetchData(keyword, "");
    // <td>{item.studentData.code}</td>
    //                     <td>{item.studentData.fullName}</td>
    //                     <td>{item.roomBedData?.roomData.roomName}</td>
    //                     <td>{item.subject}</td>
    //                     <td>
    //                       {" "}
    //                       {moment
    //                         .utc(item.updatedAt)
    //                         .local()
    //                         .format("DD/MM/YYYY HH:mm:ss")}
    //                     </td>
    //                     <td>{item.employeeData.fullName}</td>
    let users = dataComplaint?.filter(
      (obj) =>
        obj.studentData.fullName.includes(keyword) ||
        obj.complaintHTML?.includes(keyword) ||
        obj.responseHTML?.includes(keyword) ||
        obj.studentData.code.includes(keyword) ||
        obj.subject.includes(keyword)
    );
    setdataComplaintRender(users);
    setkeyword(keyword);
  };
  let handleOnchangeSearch = (keyword) => {
    if (keyword === "") {
      fetchData(keyword, "");
      setkeyword(keyword);
    }
  };
  let handleOnClickExport = async () => {
    let res = await getAllComplaint({
      limit: "",
      offset: "",
      keyword: keyword,
      status: "",
    });
    if (res && res.errCode == 0) {
      await CommonUtils.exportExcel(
        res.data,
        "Danh sách khiếu nại",
        "ListComplaint"
      );
    }
  };
  const handleSelect = (value) => {
    let users = dataComplaint?.filter((obj) => obj.status == value);
    setdataComplaintRender(users);
    setStatusId(value);
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Quản lý khiếu nại</h1>

      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1" />
          Danh sách khiếu nại
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <FormSearch
                title={"tên, MSSV, chủ đề, nội dung khiếu nại, phản hồi"}
                handleOnchange={handleOnchangeSearch}
                handleSearch={handleSearchComplaint}
              />
            </div>
            <div className="  col-4">
              <Select
                options={STATUS_COMPLAINT}
                placeholder={"Chọn trạng thái"}
                isSearchable
                onChange={(item) => {
                  handleSelect(item.value);
                }}
              />
            </div>
            {/* <div className="col-2">
              <button
                style={{ float: "right" }}
                onClick={() => handleOnClickExport()}
                className="btn btn-success"
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

                  <th>MSV</th>
                  <th>Họ tên</th>
                  <th>Phòng</th>
                  <th>Chủ đề</th>
                  <th>Thời gian</th>
                  <th>Nhân viên xử lý</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {dataComplaintRender &&
                  dataComplaintRender.length > 0 &&
                  dataComplaintRender.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.studentData.code}</td>
                        <td>{item.studentData.fullName}</td>
                        <td>{item.roomBedData?.roomData.roomName}</td>
                        <td>{item.subject}</td>
                        <td>
                          {" "}
                          {moment
                            .utc(item.updatedAt)
                            .local()
                            .format("DD/MM/YYYY HH:mm:ss")}
                        </td>
                        <td>{item.employeeData.fullName}</td>

                        <td>
                          {item.status == 0
                            ? "Mới"
                            : item.status == 1
                            ? "Từ chối giải quyết"
                            : item.status == 2
                            ? "Đang giải quyết"
                            : "Thành công"}
                        </td>
                        <td>
                          <Link to={`/admin/complaint/${item.id}`}>Xem</Link>
                          &nbsp; &nbsp;
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
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
        </div>
      </div>
    </div>
  );
};
export default ManageComplaint;
