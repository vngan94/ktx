import React, { useRef } from "react";
import { useEffect, useState } from "react";
import {
  acceptRegisterService,
  getAllRegisterService,
  cancelRegisterService,
  checkAcceptService,
  cancelAll,
} from "../../../services/registerService";
import moment from "moment";
import { toast } from "react-toastify";
import { PAGINATION, STATUS_REGISTER } from "../../../utils/constant";
import CommonUtils from "../../../utils/CommonUtils";

import ReactPaginate from "react-paginate";
import FormSearch from "../../../component/Search/FormSearch";
import Select from "react-select";
import DatePicker from "react-datepicker";
const ManageRegister = () => {
  const [dataRegister, setdataRegister] = useState();
  const [date, setdate] = useState("");
  const [count, setCount] = useState("");
  const [numberPage, setnumberPage] = useState("");
  const [keyword, setkeyword] = useState("");
  const [statusId, setStatusId] = useState("");
  const [item, setItem] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const selectInputRef = useRef();
  useEffect(() => {
    fetchData(keyword, statusId);
  }, []);

  const handleSelect = (value) => {
    setStatusId(value);

    fetchData(keyword, value);
  };
  let fetchData = async (keyword, status) => {
    let arrData = await getAllRegisterService({
      limit: PAGINATION.pagerow,
      offset: 0,

      keyword: keyword,
      startDate: startDate ? startDate : "",
      endDate: endDate ? endDate : "",
      status: status ? status : "",
    });

    if (arrData && arrData.errCode === 0) {
      setdataRegister(arrData.data);
      setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
    }
  };
  let handleAcceptRegister = async (event, id) => {
    event.preventDefault();
    let res = await acceptRegisterService({
      id: id,
    });

    if (res && res.errCode === 0) {
      toast.success(
        "Duyệt đơn đăng ký phòng thành công. Những đơn khác của sinh viên này nếu đang chờ duyệt sẽ được tự động từ chối"
      );
      let arrData = await getAllRegisterService({
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
        keyword: keyword,
        startDate: startDate ? startDate : "",
        endDate: endDate ? endDate : "",
        status: statusId ? statusId : "",
      });
      if (arrData && arrData.errCode === 0) {
        setdataRegister(arrData.data);
        setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
      }
    } else {
      toast.error(res.errMessage);
    }
  };
  let handleCancelRegister = async (event, id) => {
    event.preventDefault();
    let res = await cancelRegisterService({
      id: id,
    });
    if (res && res.errCode === 0) {
      toast.success("Từ chối đơn đăng ký phòng thành công");
      let arrData = await getAllRegisterService({
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
        keyword: keyword,
        startDate: startDate ? startDate : "",
        endDate: endDate ? endDate : "",
        status: statusId ? statusId : "",
      });
      if (arrData && arrData.errCode === 0) {
        setdataRegister(arrData.data);
        setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
      } else {
        toast.error(arrData.errMessage);
      }
    } else toast.error("Từ chối đơn đăng ký phòng thất bại");
  };
  let handleChangePage = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getAllRegisterService({
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
      keyword: keyword,
      startDate: startDate ? startDate : "",
      endDate: endDate ? endDate : "",
      status: statusId ? statusId : "",
    });
    if (arrData && arrData.errCode === 0) {
      setdataRegister(arrData.data);
    }
  };
  let handleSearchCategory = (keyword) => {
    fetchData(keyword, statusId);
    setkeyword(keyword);
  };
  let handleOnchangeSearch = (keyword) => {
    if (keyword === "") {
      fetchData(keyword, statusId);
      setkeyword(keyword);
    }
  };
  let handleOnClickExport = async () => {
    let res = await getAllRegisterService({
      limit: "",
      offset: "",
      keyword: keyword,
      startDate: startDate ? startDate : "",
      endDate: endDate ? endDate : "",
      status: statusId ? statusId : "",
    });
    if (res && res.errCode == 0) {
      await CommonUtils.exportExcel(
        res.data,
        "Danh sách đơn đăng ký phòng",
        "ListRegister"
      );
    }
  };

  const handleSearchByDate = async () => {
    if (!startDate || !endDate) {
      toast.error("Hãy chọn ngày bắt đầu và kết thúc đầy đủ");
      return;
    }

    let arrData = await getAllRegisterService({
      limit: PAGINATION.pagerow,
      offset: 0,
      keyword: keyword,
      startDate: startDate ? startDate : "",
      endDate: endDate ? endDate : "",
      status: statusId ? statusId : "",
    });

    if (arrData && arrData.errCode === 0) {
      setdataRegister(arrData.data);
      setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
    }
  };
  const handleAcceptAll = async (event) => {
    // duyet nhung register cua user rieng biet
    event.preventDefault();
    let count = {};
    let res;

    const dataRegisterDistinct = Object.values(
      dataRegister
        .reverse()
        .reduce((acc, obj) => ({ ...acc, [obj.userId]: obj }), {})
    );

    for (let ele of dataRegisterDistinct) {
      if (count[ele.roomId]) {
        count[ele.roomId] += 1;
      } else {
        count[ele.roomId] = 1;
      }
    }

    let checkAccept = await checkAcceptService({
      id: count,
    });
    if (checkAccept && checkAccept.errCode == 1) {
      toast.error(`${checkAccept.errMessage}`);
      return;
    } else {
      if (checkAccept.count > 0) {
        const room = checkAccept.data.map((x) => x.roomName);
        toast.error(
          `Duyệt phòng tất cả không thành công. Phòng ${room} có số đơn đăng ký vượt số giường trống.`
        );
        return;
      } else {
        for (let i = 0; i < dataRegisterDistinct.length; i++) {
          res = await acceptRegisterService({
            id: dataRegisterDistinct[i].id,
          });
        }
        // Huy nhung cai con lai
        for (let ele of dataRegisterDistinct) {
          res = await cancelAll({
            userId: ele.userId,
          });
        }

        if (res && res.errCode === 0) {
          toast.success(
            `Duyệt ${dataRegisterDistinct.length} đơn đăng ký phòng thành công. Những đơn khác của cùng 1 sinh viên nếu đang chờ duyệt sẽ được tự động từ chối.`
          );
          let arrData = await getAllRegisterService({
            limit: PAGINATION.pagerow,
            offset: numberPage * PAGINATION.pagerow,
            keyword: keyword,
            startDate: startDate ? startDate : "",
            endDate: endDate ? endDate : "",
            status: statusId ? statusId : "",
          });
          if (arrData && arrData.errCode === 0) {
            setdataRegister(arrData.data);
            setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
          } else {
            toast.error(arrData.errMessage);
          }
        } else toast.error("Duyệt đơn đăng ký phòng thất bại");
      }
    }
  };
  const handleCancelAll = async (event) => {
    event.preventDefault();
    let res;
    for (let i = 0; i < dataRegister.length; i++) {
      res = await cancelRegisterService({
        id: dataRegister[i].id,
      });
    }

    if (res && res.errCode === 0) {
      toast.success(
        `Từ chối ${dataRegister.length}  đơn đăng ký phòng thành công`
      );
      let arrData = await getAllRegisterService({
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
        keyword: keyword,
        startDate: startDate ? startDate : "",
        endDate: endDate ? endDate : "",
        status: statusId ? statusId : "",
      });
      if (arrData && arrData.errCode === 0) {
        setdataRegister(arrData.data);
        setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
      } else {
        toast.error(arrData.errMessage);
      }
    } else toast.error("Từ chối đơn đăng ký phòng thất bại");
  };
  const handleReset = () => {
    setkeyword("");
    selectInputRef.current.clearValue();
    setDateRange([null, null]);

    fetchData("", "");
  };
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Quản lý đăng ký phòng</h1>

      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1" />
          Danh sách đăng ký phòng
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-4">
              <FormSearch
                title={"mã sinh viên"}
                handleOnchange={handleOnchangeSearch}
                handleSearch={handleSearchCategory}
              />
            </div>
            <div className="form-row d-flex col-8 justify-content-end ">
              <div className="form-group col-2 mr-3">
                {statusId == 1 && count > 0 ? (
                  <button
                    onClick={(event) => handleAcceptAll(event)}
                    className="btn btn-warning"
                  >
                    Duyệt tất cả
                  </button>
                ) : (
                  <button className="btn btn-secondary" disabled>
                    Duyệt tất cả
                  </button>
                )}
              </div>
              <div className="form-group col-2 mr-4">
                {statusId == 1 && count > 0 ? (
                  <button
                    onClick={(event) => handleCancelAll(event)}
                    className="btn btn-danger"
                  >
                    Từ chối tất cả
                  </button>
                ) : (
                  <button className="btn btn-secondary" disabled>
                    Từ chối tất cả
                  </button>
                )}
              </div>
              {/* <div className=" form-group col-2 mr-3">
                <button
                  onClick={() => handleOnClickExport()}
                  className="btn btn-success"
                >
                  Xuất excel <i class="fa-solid fa-file-excel"></i>
                </button>
              </div> */}
              <div className="form-group col-2 ">
                <button className="btn btn-info" onClick={() => handleReset()}>
                  Làm mới
                </button>
              </div>
            </div>
          </div>
          <div className="form-row d-flex  align-items-end">
            <div className="form-group col-4">
              <label htmlFor="inputCity">Ngày đăng ký phòng</label>
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setDateRange(update);
                }}
                className="form-control"
                isClearable
              />
            </div>
            <div className="form-group  col-2">
              <button
                onClick={() => handleSearchByDate()}
                className="btn btn-primary"
              >
                Tìm kiếm
              </button>
            </div>
            <div className="form-group  col-4">
              <Select
                options={STATUS_REGISTER}
                placeholder={"Chọn trạng thái"}
                isSearchable
                onChange={(item) => {
                  handleSelect(item ? item.value : "");
                }}
                ref={selectInputRef}
              />
            </div>
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
                  <th>Lớp</th>

                  <th>Khu</th>
                  <th>Loại phòng</th>
                  <th>Phòng</th>
                  <th>Ngày nộp</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {dataRegister &&
                  dataRegister.length > 0 &&
                  dataRegister.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.studentData.code}</td>
                        <td>{item.studentData.fullName}</td>
                        <td>{item.studentData.class}</td>

                        <td>{item.roomData.areaData.areaName}</td>
                        <td>{item.roomData.typeroomData.typeRoomName}</td>
                        <td>{item.roomData.roomName}</td>

                        <td>
                          {moment
                            .utc(item.createdAt)
                            .local()
                            .format("DD/MM/YYYY HH:mm:ss")}
                        </td>
                        <td>
                          {item.status == 1
                            ? "Chờ duyệt"
                            : item.status == 2
                            ? "Đã duyệt"
                            : item.status == 3
                            ? "Từ chối"
                            : item.status == 4
                            ? "Đã nhận phòng"
                            : "Đã hủy"}
                        </td>
                        <td>
                          <a
                            href="#"
                            onClick={(event) =>
                              handleAcceptRegister(event, item.id)
                            }
                          >
                            {item.status == 1 && "Xác nhận"}
                          </a>
                          &nbsp; &nbsp;
                          <a
                            href="#"
                            onClick={(event) =>
                              handleCancelRegister(event, item.id)
                            }
                          >
                            {item.status == 1 && "Từ chối"}
                          </a>
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
export default ManageRegister;
