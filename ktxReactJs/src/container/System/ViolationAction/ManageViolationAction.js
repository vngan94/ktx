import React from "react";
import { useEffect, useState } from "react";
import {
  deleteViolationAction,
  getAllViolationAction,
  blockViolationAction,
} from "../../../services/violationActionService";
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
  const [dataViolationAction, setdataViolationAction] = useState([]);
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
    let arrData = await getAllViolationAction({
      limit: PAGINATION.pagerow,
      offset: 0,
      keyword: keyword,
    });
    if (arrData && arrData.errCode === 0) {
      setdataViolationAction(arrData.data);
      setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
    }
  };

  let handleChangePage = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getAllViolationAction({
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
      keyword: keyword,
    });
    if (arrData && arrData.errCode === 0) {
      setdataViolationAction(arrData.data);
    }
  };

  let handleOnClickExport = async () => {
    let res = await getAllViolationAction({
      limit: "",
      offset: "",
    });
    if (res && res.errCode == 0) {
      await CommonUtils.exportExcel(
        res.data,
        "Danh sách nhập hàng",
        "ListReceipt"
      );
    }
  };
  let handleDeleteViolationAction = async (event, id) => {
    event.preventDefault();
    let res = await deleteViolationAction(id);
    if (res && res.errCode === 0) {
      toast.success("Xóa xử lý thành công");
      let res = await getAllViolationAction({
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
        keyword: keyword,
      });
      if (res && res.errCode === 0) {
        setdataViolationAction(res.data);
        setCount(Math.ceil(res.count / PAGINATION.pagerow));
      }
    } else {
      console.log(res.errCode);
      toast.error("Không cho phép xóa xử lý này");
    }
  };

  let handleBlockViolationAction = async (event, id, status) => {
    event.preventDefault();

    let res = await blockViolationAction(id);
    if (res && res.errCode === 0) {
      status != 1
        ? toast.success("Khóa xử lý thành công")
        : toast.success("Mở khóa xử lý thành công");
    } else {
      console.log(res.errCode);
      status != 1
        ? toast.error("Khóa xử lý thất bại")
        : toast.error("Khóa xử lý thất bại");
    }
    res = await getAllViolationAction({
      limit: PAGINATION.pagerow,
      offset: numberPage * PAGINATION.pagerow,
      keyword: keyword,
    });
    if (res && res.errCode === 0) {
      setdataViolationAction(res.data);
      setCount(Math.ceil(res.count / PAGINATION.pagerow));
    }
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Khung xử lý</h1>

      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1" />
          Danh sách xử lý
        </div>
        <div className="card-body ">
          <div className="row mb-2">
            <div className="col-4 ">
              <FormSearch
                title={"vi phạm, hình phạt"}
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
                  <th>Tên vi phạm</th>
                  <th>Lần vi phạm</th>
                  <th>Hình phạt</th>

                  <th className="col-2">Trạng thái</th>

                  <th>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {dataViolationAction &&
                  dataViolationAction.length > 0 &&
                  dataViolationAction.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.violationData.value}</td>
                        <td>{item.times}</td>
                        <td>{item.actionData.value}</td>

                        <td>{item.status == 1 ? "Còn áp dụng" : "Bỏ"}</td>
                        <td>
                          <Link to={`/admin/edit-violation_action/${item.id}`}>
                            Chỉnh sửa
                          </Link>
                          &nbsp; &nbsp;
                          <a
                            href="#"
                            onClick={(event) =>
                              handleBlockViolationAction(event, item.id)
                            }
                          >
                            {item.status == 1 ? "Ngưng áp dụng" : "Áp dụng"}
                          </a>
                          &nbsp; &nbsp;
                          <a
                            href="#"
                            onClick={(event) =>
                              handleDeleteViolationAction(
                                event,
                                item.id,
                                item.status
                              )
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
