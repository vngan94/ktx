import React from "react";
import { useEffect, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { PAGINATION } from "../../../utils/constant";
import ReactPaginate from "react-paginate";
import CommonUtils from "../../../utils/CommonUtils";
import {
  getAllUsers,
  DeleteUserService,
  blockUserService,
  deleteUser,
} from "../../../services/userService";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import FormSearch from "../../../component/Search/FormSearch";

const ManageUser = () => {
  const [dataUser, setdataUser] = useState([]);
  const [count, setCount] = useState("");
  const [numberPage, setnumberPage] = useState("");
  const [keyword, setkeyword] = useState("");

  useEffect(() => {
    fetchAllUser(keyword);
  }, []);
  let fetchAllUser = async (keyword) => {
    let res = await getAllUsers({
      limit: PAGINATION.pagerow,
      offset: 0,
      keyword: keyword,
      roleId: "",
    });
    if (res && res.errCode === 0) {
      setdataUser(res.data);
      setCount(Math.ceil(res.count / PAGINATION.pagerow));
    }
  };
  let handleUnblockUser = async (event, id) => {
    event.preventDefault();

    let res = await blockUserService(id);
    if (res && res.errCode === 0) {
      toast.success("Thao tác thành công");
      let user = await getAllUsers({
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
        keyword: keyword,
      });
      if (user && user.errCode === 0) {
        setdataUser(user.data);
        setCount(Math.ceil(user.count / PAGINATION.pagerow));
      }
    } else {
      toast.error("Thao tác thất bại");
    }
  };
  let handleChangePage = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getAllUsers({
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
      keyword: keyword,
      roleId: "",
    });
    if (arrData && arrData.errCode === 0) {
      setdataUser(arrData.data);
    }
  };
  let handleSearchUser = (keyword) => {
    fetchAllUser(keyword);
    setkeyword(keyword);
  };
  let handleOnchangeSearch = (keyword) => {
    if (keyword === "") {
      fetchAllUser(keyword);
      setkeyword(keyword);
    }
  };
  let handleOnClickExport = async (keyword) => {
    let res = await getAllUsers({
      limit: "",
      offset: "",
      keyword: keyword,
      roleId: "",
    });
    if (res && res.errCode == 0) {
      await CommonUtils.exportExcel(
        res.data,
        "Danh sách người dùng",
        "ListUser"
      );
    }
  };
  let handleDeleteUser = async (event, id) => {
    event.preventDefault();
    let res = await deleteUser(id);
    if (res && res.errCode === 0) {
      toast.success("Xóa người dùng thành công");
      let user = await getAllUsers({
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
        keyword: keyword,
      });
      if (user && user.errCode === 0) {
        setdataUser(user.data);
        setCount(Math.ceil(user.count / PAGINATION.pagerow));
      }
    } else {
      console.log(res.errCode);
      toast.error("Không cho phép xóa người dùng này");
    }
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Quản lý người dùng</h1>

      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1" />
          Danh sách người dùng
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <FormSearch
                title={"code, số điện thoại"}
                handleOnchange={handleOnchangeSearch}
                handleSearch={handleSearchUser}
              />
            </div>
            {/* <div className="col-6">
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
                  <th>Email</th>

                  <th>Họ và tên</th>
                  <th>Số điện thoại</th>
                  <th>Trạng thái</th>
                  <th>Quyền</th>
                  <th>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {dataUser &&
                  dataUser.length > 0 &&
                  dataUser.map((item, index) => {
                    let date = moment
                      .unix(item.dob / 1000)
                      .format("DD/MM/YYYY");
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.email}</td>

                        <td>{item.fullName}</td>
                        <td>{item.phonenumber}</td>

                        <td>
                          {item.status == 1 ? "Hoạt động" : "Ngưng hoạt động"}
                        </td>
                        <td>{item.roleData.value}</td>
                        <td>
                          <Link to={`/admin/edit-user/${item.id}`}>
                            Chỉnh sửa
                          </Link>
                          &nbsp; &nbsp;
                          <a
                            href="#"
                            onClick={(event) =>
                              handleUnblockUser(event, item.id)
                            }
                          >
                            {item.status == 1 ? "Ngưng hoạt động" : "Hoạt động"}
                          </a>
                          &nbsp; &nbsp;
                          <a
                            href="#"
                            onClick={(event) =>
                              handleDeleteUser(event, item.id)
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
export default ManageUser;
