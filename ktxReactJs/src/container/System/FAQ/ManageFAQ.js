import React from "react";
import { useEffect, useState } from "react";
import { getAllUsers, DeleteUserService } from "../../../services/userService";
import { getAllFAQs, deleteFAQService } from "../../../services/faqService";
import moment from "moment";
import { toast } from "react-toastify";
import { PAGINATION } from "../../../utils/constant";
import ReactPaginate from "react-paginate";
import CommonUtils from "../../../utils/CommonUtils";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import FormSearch from "../../../component/Search/FormSearch";

const ManageStudent = () => {
  const [dataFAQ, setdataFAQ] = useState([]);
  const [count, setCount] = useState("");
  const [numberPage, setnumberPage] = useState("");
  const [keyword, setkeyword] = useState("");

  useEffect(() => {
    fetchAllFAQ(keyword);
  }, []);
  let fetchAllFAQ = async (keyword) => {
    let res = await getAllFAQs({
      limit: PAGINATION.pagerow,
      offset: 0,
      keyword: keyword,
    });

    if (res && res.errCode === 0) {
      setdataFAQ(res.data);
      setCount(Math.ceil(res.count / PAGINATION.pagerow));
    }
  };

  let handleChangePage = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getAllFAQs({
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
      keyword: keyword,
    });
    if (arrData && arrData.errCode === 0) {
      setdataFAQ(arrData.data);
    }
  };
  let handleSearchFAQ = (keyword) => {
    fetchAllFAQ(keyword);
    setkeyword(keyword);
  };
  let handleOnchangeSearch = (keyword) => {
    if (keyword === "") {
      fetchAllFAQ(keyword);
      setkeyword(keyword);
    }
  };
  let handleOnClickExport = async (keyword) => {
    let res = await getAllFAQs({
      limit: "",
      offset: "",
      keyword: keyword,
    });
    if (res && res.errCode == 0) {
      console.log(res.data);
      await CommonUtils.exportExcel(res.data, "Danh sách FAQ", "ListFAQ");
    }
  };
  let handleDeleteFAQ = async (event, id) => {
    event.preventDefault();

    let res = await deleteFAQService(id);
    if (res && res.errCode === 0) {
      toast.success("Xóa FAQ thành công");
      let res = await getAllFAQs({
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
        keyword: keyword,
      });
      if (res && res.errCode === 0) {
        setdataFAQ(res.data);
        setCount(Math.ceil(res.count / PAGINATION.pagerow));
      }
    } else {
      console.log(res.errCode);
      toast.error("Xóa FAQ thất bại");
    }
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Quản lý FAQ</h1>

      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1" />
          Danh sách FAQ
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-4">
              <FormSearch
                title={"câu hỏi"}
                handleOnchange={handleOnchangeSearch}
                handleSearch={handleSearchFAQ}
              />
            </div>
            {/* <div className="col-8">
              <button
                style={{ float: "right" }}
                onClick={() => handleOnClickExport(keyword)}
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
                  <th>Câu hỏi</th>
                  <th>Câu trả lời</th>
                  <th className="col-2">Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {dataFAQ &&
                  dataFAQ.length > 0 &&
                  dataFAQ.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.question}</td>
                        <td>{item.answer}</td>

                        <td>
                          <Link to={`/admin/edit-faq/${item.id}`}>
                            Chỉnh sửa
                          </Link>
                          &nbsp; &nbsp;
                          <a
                            href="#"
                            onClick={(event) => handleDeleteFAQ(event, item.id)}
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
export default ManageStudent;
