import React from "react";
import { useEffect, useState } from "react";
import {
  getAllCodeByTypeStatus,
  blockBedService,
  unblockCodeService,
  deleteCodeService,
} from "../../../services/codeService";
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
  const [dataViolation, setdataViolation] = useState([]);
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
  let handleSearchViolation = (keyword) => {
    fetchData(keyword);
    setkeyword(keyword);
  };
  let fetchData = async (keyword) => {
    let arrData = await getAllCodeByTypeStatus({
      limit: PAGINATION.pagerow,
      offset: 0,
      keyword: keyword,
      type: "VIOLATION",
      status: "",
    });
    if (arrData && arrData.errCode === 0) {
      setdataViolation(arrData.data);
      setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
    }
  };

  let handleChangePage = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getAllCodeByTypeStatus({
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
      keyword: keyword,
      type: "VIOLATION",
      status: "",
    });
    if (arrData && arrData.errCode === 0) {
      setdataViolation(arrData.data);
    }
  };

  let handleOnClickExport = async () => {
    let res = await getAllCodeByTypeStatus({
      limit: "",
      offset: "",
      keyword: keyword,
      type: "VIOLATION",
      status: "",
    });
    if (res && res.errCode == 0) {
      await CommonUtils.exportExcel(
        res.data,
        "Danh sách nội dung vi phạm",
        "ListViolation"
      );
    }
  };
  let handleBlockViolation = async (event, id, code, status) => {
    event.preventDefault();
    if (status == 1) {
      let res = await blockBedService({
        id: id,
        code: code,
      });
      if (res && res.errCode == 0) {
        toast.success("Khóa nội dung vi phạm thành công");
        let res = await getAllCodeByTypeStatus({
          limit: PAGINATION.pagerow,
          offset: numberPage * PAGINATION.pagerow,
          keyword: keyword,
          type: "VIOLATION",
          status: "",
        });
        if (res && res.errCode === 0) {
          setdataViolation(res.data);
          setCount(Math.ceil(res.count / PAGINATION.pagerow));
        }
      } else {
        console.log(res.errCode);
        toast.error("Khóa nội dung vi phạm thất bại");
      }
    } else {
      let res = await unblockCodeService({
        id: id,
      });
      if (res && res.errCode === 0) {
        toast.success("Mở khóa nội dung vi phạm thành công");
        let res = await getAllCodeByTypeStatus({
          limit: PAGINATION.pagerow,
          offset: numberPage * PAGINATION.pagerow,
          keyword: keyword,
          type: "VIOLATION",
          status: "",
        });
        if (res && res.errCode === 0) {
          setdataViolation(res.data);
          setCount(Math.ceil(res.count / PAGINATION.pagerow));
        }
      } else {
        console.log(res.errCode);
        toast.error("Mở nội dung vi phạm thất bại");
      }
    }
  };
  let handleDeleteViolation = async (event, id) => {
    event.preventDefault();

    let res = await deleteCodeService(id);
    if (res && res.errCode === 0) {
      toast.success("Xóa nội dung vi phạm thành công");
      let arrData = await getAllCodeByTypeStatus({
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
        keyword: keyword,
        type: "VIOLATION",
        status: "",
      });
      if (arrData && arrData.errCode === 0) {
        setdataViolation(arrData.data);
        setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
      }
    } else {
      console.log(res.errCode);
      toast.error("Không cho phép xóa hình phạt này");
    }
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Quản lý nội dung vi phạm</h1>

      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1" />
          Danh sách nội dung vi phạm
        </div>
        <div className="card-body ">
          <div className="row mb-2">
            <div className="col-4 ">
              <FormSearch
                title={"nội dung vi phạm"}
                handleOnchange={handleOnchangeSearch}
                handleSearch={handleSearchViolation}
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
                  <th>Nội dung vi phạm</th>
                  <th className="col-2">Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {dataViolation &&
                  dataViolation.length > 0 &&
                  dataViolation.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.value}</td>
                        <td>
                          {item.status == 1 ? "Còn áp dụng" : "Ngưng áp dụng"}
                        </td>

                        <td>
                          <Link to={`/admin/edit-violation/${item.id}`}>
                            Chỉnh sửa
                          </Link>
                          &nbsp; &nbsp;
                          <a
                            href="#"
                            onClick={(event) =>
                              handleBlockViolation(
                                event,
                                item.id,
                                item.code,
                                item.status
                              )
                            }
                          >
                            {item.status == 1 ? "Ngưng áp dụng" : "Áp dụng"}
                          </a>
                          &nbsp; &nbsp;
                          <a
                            href="#"
                            onClick={(event) =>
                              handleDeleteViolation(event, item.id)
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
