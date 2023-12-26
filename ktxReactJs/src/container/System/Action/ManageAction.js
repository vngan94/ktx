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
  const [dataAction, setdataAction] = useState([]);
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
  let handleSearchAction = (keyword) => {
    fetchData(keyword);
    setkeyword(keyword);
  };
  let fetchData = async (keyword) => {
    let arrData = await getAllCodeByTypeStatus({
      limit: PAGINATION.pagerow,
      offset: 0,
      keyword: keyword,
      type: "ACTION",
      status: "",
    });
    if (arrData && arrData.errCode === 0) {
      setdataAction(arrData.data);
      setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
    }
  };

  let handleChangePage = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getAllCodeByTypeStatus({
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
      keyword: keyword,
      type: "ACTION",
      status: "",
    });
    if (arrData && arrData.errCode === 0) {
      setdataAction(arrData.data);
    }
  };

  let handleOnClickExport = async () => {
    let res = await getAllCodeByTypeStatus({
      limit: "",
      offset: "",
      keyword: keyword,
      type: "ACTION",
      status: "",
    });
    if (res && res.errCode == 0) {
      await CommonUtils.exportExcel(
        res.data,
        "Danh sách hình phạt",
        "ListAction"
      );
    }
  };
  let handleBlockAction = async (event, id, code, status) => {
    event.preventDefault();
    if (status == 1) {
      let res = await blockBedService({
        id: id,
        code: code,
      });
      if (res && res.errCode == 0) {
        toast.success("Khóa hình phạt thành công");
        let res = await getAllCodeByTypeStatus({
          limit: PAGINATION.pagerow,
          offset: numberPage * PAGINATION.pagerow,
          keyword: keyword,
          type: "ACTION",
          status: "",
        });
        if (res && res.errCode === 0) {
          setdataAction(res.data);
          setCount(Math.ceil(res.count / PAGINATION.pagerow));
        }
      } else {
        console.log(res.errCode);
        toast.error("Khóa hình phạt thất bại");
      }
    } else {
      let res = await unblockCodeService({
        id: id,
      });
      if (res && res.errCode === 0) {
        toast.success("Mở khóa hình phạt thành công");
        let res = await getAllCodeByTypeStatus({
          limit: PAGINATION.pagerow,
          offset: numberPage * PAGINATION.pagerow,
          keyword: keyword,
          type: "ACTION",
          status: "",
        });
        if (res && res.errCode === 0) {
          setdataAction(res.data);
          setCount(Math.ceil(res.count / PAGINATION.pagerow));
        }
      } else {
        console.log(res.errCode);
        toast.error("Mở hình phạt thất bại");
      }
    }
  };

  let handleDeleteAction = async (event, id) => {
    event.preventDefault();

    let res = await deleteCodeService(id);
    if (res && res.errCode === 0) {
      toast.success("Xóa hình phạt thành công");
      let arrData = await getAllCodeByTypeStatus({
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
        keyword: keyword,
        type: "ACTION",
        status: "",
      });
      if (arrData && arrData.errCode === 0) {
        setdataAction(arrData.data);
        setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
      }
    } else {
      console.log(res.errCode);
      toast.error("Không cho phép xóa hình phạt này");
    }
  };
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Quản lý hình phạt</h1>

      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1" />
          Danh sách hình phạt
        </div>
        <div className="card-body ">
          <div className="row mb-2">
            <div className="col-4 ">
              <FormSearch
                title={"hình phạt"}
                handleOnchange={handleOnchangeSearch}
                handleSearch={handleSearchAction}
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
                  <th>Hình phạt</th>
                  <th className="col-2">Trạng thái</th>
                  <th className="col-3">Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {dataAction &&
                  dataAction.length > 0 &&
                  dataAction.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.value}</td>
                        <td>{item.status == 1 ? "Còn áp dụng" : "Bỏ"}</td>

                        <td>
                          <Link to={`/admin/edit-action/${item.id}`}>
                            Chỉnh sửa
                          </Link>
                          &nbsp; &nbsp;
                          <a
                            href="#"
                            onClick={(event) =>
                              handleBlockAction(
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
                              handleDeleteAction(event, item.id)
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
