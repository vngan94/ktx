import React from "react";
import { useEffect, useState } from "react";
import {
  getAllUsers,
  DeleteUserService,
  getHistory,
  getHistoryDetailById,
} from "../../../services/userService";
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
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const HistoryDetail = () => {
  const [dataUser, setdataUser] = useState([]);
  const [count, setCount] = useState("");
  const [numberPage, setnumberPage] = useState("");
  const [keyword, setkeyword] = useState("");
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [student]);
  let fetchUser = async () => {
    let res = await getHistoryDetailById(id);
    if (res && res.errCode === 0) {
      let users = res.data.filter((obj) => obj.statusStudent == 2);
      let usersOther = res.data.filter((obj) => obj.statusStudent != 2);
      setStudent(users[0]);
      setdataUser(usersOther);
    }
  };
  let handleBanUser = async (event, id) => {};
  let handleChangePage = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getHistory({
      keyword: keyword,
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
    });
    if (arrData && arrData.errCode === 0) {
      setdataUser(arrData.data);
    }
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Lịch sử chỗ ở của sinh viên </h1>

      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1" />
          {student && student.studentData.fullName
            ? student.studentData.fullName
            : ""}{" "}
          -{" "}
          {student && student.studentData.code ? student.studentData.code : ""}
        </div>
        <div className="card-body">
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

                  <th>Khu </th>
                  <th>Loại phòng</th>
                  <th>Phòng </th>
                  <th>Giường </th>
                  <th>Trạng thái </th>
                  <th>Thời gian</th>
                </tr>
              </thead>

              <tbody>
                {student && (
                  <tr key={{}}>
                    <td>{1}</td>

                    <td>{student.roomData.areaData.areaName}</td>
                    <td>{student.roomData.typeroomData.typeRoomName}</td>
                    <td>{student.roomData.roomName}</td>
                    <td>{student.bedData.value}</td>
                    <td>
                      {student.statusStudent == 2 ? "Đang ở" : "Đã rời đi"}
                    </td>
                    <td>
                      {student.statusStudent == 2 &&
                        moment
                          .unix(+student.dateCheckIn / 1000)
                          .locale("vi")
                          .format("DD/MM/YYYY")}
                    </td>
                  </tr>
                )}
                {dataUser &&
                  dataUser.length > 0 &&
                  dataUser.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 2}</td>

                        <td>{item.roomData.areaData.areaName}</td>
                        <td>{item.roomData.typeroomData.typeRoomName}</td>
                        <td>{item.roomData.roomName}</td>
                        <td>{item.bedData.value}</td>
                        <td>
                          {item.statusStudent == 2 ? "Đang ở" : "Đã rời đi"}
                        </td>
                        <td>
                          {
                            item.statusStudent == 2 ? (
                              moment
                                .unix(+item.dateCheckIn / 1000)
                                .locale("vi")
                                .format("DD/MM/YYYY")
                            ) : (
                              <>
                                {moment
                                  .unix(+item.dateCheckIn / 1000)
                                  .locale("vi")
                                  .format("DD/MM/YYYY")}{" "}
                                - {moment(item.updatedAt).format("DD/MM/YYYY")}
                              </>
                            )
                            // : moment
                            //     .unix(+item.dateCheckIn / 1000)
                            //     .locale("vi")
                            //     .format("DD/MM/YYYY") -
                            //   moment.(item.updatedAt).format("DD/MM/YYYY")
                          }
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
export default HistoryDetail;
