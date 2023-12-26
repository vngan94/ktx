import React from "react";
import { useEffect, useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import {
  getAllRegulations,
  deleteRegulationService,
} from "../../../services/regulationService";
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
  const [imgPreview, setimgPreview] = useState("");
  const [isOpen, setisOpen] = useState(false);
  const [dataRegulation, setdataRegulation] = useState([]);
  const [count, setCount] = useState("");
  const [numberPage, setnumberPage] = useState("");
  const [keyword, setkeyword] = useState("");

  useEffect(() => {
    fetchAllRegulation(keyword);
  }, []);
  let fetchAllRegulation = async (keyword) => {
    let res = await getAllRegulations({
      limit: PAGINATION.pagerow,
      offset: 0,
      keyword: keyword,
    });

    setdataRegulation(res);
    if (res && res.errCode === 0 && res.data.length > 0) {
      setdataRegulation(res.data);
      setCount(Math.ceil(res.count / PAGINATION.pagerow));
    }
  };

  let handleChangePage = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getAllRegulations({
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
      keyword: keyword,
    });
    if (arrData && arrData.errCode === 0) {
      setdataRegulation(arrData.data);
    }
  };
  let handleSearchRegulation = (keyword) => {
    fetchAllRegulation(keyword);
    setkeyword(keyword);
  };
  let handleOnchangeSearch = (keyword) => {
    if (keyword === "") {
      fetchAllRegulation(keyword);
      setkeyword(keyword);
    }
  };
  let handleOnClickExport = async (keyword) => {
    let res = await getAllRegulations({
      limit: "",
      offset: "",
      keyword: keyword,
    });
    if (res && res.errCode == 0) {
      console.log(res.data);
      await CommonUtils.exportExcel(
        res.data,
        "Danh sách Regulation",
        "ListRegulation"
      );
    }
  };
  let handleDeleteRegulation = async (event, id) => {
    event.preventDefault();

    let res = await deleteRegulationService(id);
    if (res && res.errCode === 0) {
      toast.success("Xóa nội quy-quy định thành công");
      let res = await getAllRegulations({
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
        keyword: keyword,
      });
      if (res && res.errCode === 0) {
        setdataRegulation(res.data);
        setCount(Math.ceil(res.count / PAGINATION.pagerow));
      }
    } else {
      console.log(res.errCode);
      toast.error("Xóa nội quy-quy định thất bại");
    }
  };
  let openPreviewImage = (event, url) => {
    console.log("url " + url);
    event.preventDefault();
    window.open(url);
  };
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Quản lý nội quy-quy định</h1>

      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1" />
          Danh sách nội quy-quy định
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-4">
              <FormSearch
                title={"nội quy-quy định"}
                handleOnchange={handleOnchangeSearch}
                handleSearch={handleSearchRegulation}
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
                  <th>Nội dung-quy định</th>

                  <th>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {dataRegulation &&
                  dataRegulation.length > 0 &&
                  dataRegulation.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.regulationName}</td>
                        <td>
                          <a
                            href=""
                            onClick={(event) =>
                              openPreviewImage(event, item.link)
                            }
                          >
                            Xem
                          </a>
                          &nbsp; &nbsp;
                          <Link to={`/admin/edit-regulation/${item.id}`}>
                            Chỉnh sửa
                          </Link>
                          &nbsp; &nbsp;
                          <a
                            href="#"
                            onClick={(event) =>
                              handleDeleteRegulation(event, item.id)
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
export default ManageStudent;
