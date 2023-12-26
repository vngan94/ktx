import React from "react";
import { useEffect, useState, useRef } from "react";
import {
  getAllContract,
  deleteContractService,
  createNewContractService,
  extendContract,
} from "../../../services/contractService";
import moment from "moment";
import { toast } from "react-toastify";
import { PAGINATION, STATUS_CONTRACT } from "../../../utils/constant";
import ReactPaginate from "react-paginate";
import CommonUtils from "../../../utils/CommonUtils";
import FormSearch from "../../../component/Search/FormSearch";
import DatePicker from "react-datepicker";
import Select from "react-select";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import ExtendModal from "./ExtendModal";

const ManageRegulation = () => {
  const [dataContract, setdataContract] = useState([]);
  const [keyword, setkeyword] = useState("");
  const [count, setCount] = useState("");
  const [numberPage, setnumberPage] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const selectInputRef = useRef();
  const [statusId, setStatusId] = useState("");
  const [isOpenRealModal, setisOpenRealModal] = useState(false);
  const [item, setItem] = useState(null);
  useEffect(() => {
    try {
      fetchData(keyword);
    } catch (error) {
      console.log(error);
    }
  }, [isOpenRealModal]);
  let closeRealModal = () => {
    setisOpenRealModal(false);
    setItem(null);
  };
  let handleOnchangeSearch = (keyword) => {
    if (keyword === "") {
      fetchData(keyword);
      setkeyword(keyword);
    }
  };
  let handleSearchContract = (keyword) => {
    fetchData(keyword);
    setkeyword(keyword);
  };
  let fetchData = async (keyword) => {
    let arrData = await getAllContract({
      limit: PAGINATION.pagerow,
      offset: 0,
      keyword: keyword,
      startDate: startDate ? new Date(startDate).getTime() : "",
      endDate: endDate ? new Date(endDate).getTime() : "",
      status: statusId ? statusId : "",
    });
    if (arrData && arrData.errCode === 0) {
      setdataContract(arrData.data);
      setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
    }
  };

  let handleChangePage = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getAllContract({
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
      keyword: keyword,
      startDate: startDate ? new Date(startDate).getTime() : "",
      endDate: endDate ? new Date(endDate).getTime() : "",
      status: statusId ? statusId : "",
    });
    if (arrData && arrData.errCode === 0) {
      setdataContract(arrData.data);
      setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
    }
  };

  let handleOnClickExport = async () => {
    let res = await getAllContract({
      limit: "",
      offset: "",
      keyword: keyword,
    });
    if (res && res.errCode == 0) {
      await CommonUtils.exportExcel(
        res.data,
        "Danh sách hợp đồng",
        "ListContract"
      );
    }
  };
  let handleDeleteContract = async (event, id) => {
    event.preventDefault();
    let res = await deleteContractService(id);
    if (res && res.errCode === 0) {
      toast.success("Xóa hợp đồng thành công");
      let res = await getAllContract({
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
        keyword: keyword,
        startDate: startDate ? new Date(startDate).getTime() : "",
        endDate: endDate ? new Date(endDate).getTime() : "",
        status: statusId ? statusId : "",
      });
      if (res && res.errCode === 0) {
        setdataContract(res.data);
        setCount(Math.ceil(res.count / PAGINATION.pagerow));
      }
    } else {
      toast.error(res.errMessage);
    }
  };

  const handleSearchByDate = async () => {
    if (!startDate || !endDate) {
      toast.error("Hãy chọn ngày bắt đầu và kết thúc đầy đủ");
      return;
    }

    let arrData = await getAllContract({
      limit: PAGINATION.pagerow,
      offset: 0,
      keyword: keyword,
      startDate: startDate ? new Date(startDate).getTime() : "",
      endDate: endDate ? new Date(endDate).getTime() : "",
      status: statusId ? statusId : "",
    });

    if (arrData && arrData.errCode === 0) {
      setdataContract(arrData.data);
      setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
    }
  };
  const handleSelect = async (value) => {
    setStatusId(value);
    let arrData = await getAllContract({
      limit: PAGINATION.pagerow,
      offset: 0,
      keyword: keyword,
      startDate: startDate ? new Date(startDate).getTime() : "",
      endDate: endDate ? new Date(endDate).getTime() : "",
      status: value,
    });
    if (arrData && arrData.errCode === 0) {
      setdataContract(arrData.data);
      setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
    }
  };
  const handleReset = async () => {
    setkeyword("");
    selectInputRef.current.clearValue();
    setDateRange([null, null]);
    let arrData = await getAllContract({
      limit: PAGINATION.pagerow,
      offset: 0,
      keyword: "",
      startDate: "",
      endDate: "",
      status: "",
    });
    if (arrData && arrData.errCode === 0) {
      setdataContract(arrData.data);
      setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
    }
  };
  const handleExtendContract = async (event, item) => {
    setItem(item);
    setisOpenRealModal(true);
  };
  let closeModalSize = () => {
    setisOpenRealModal(false);
    setItem(null);
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Quản lý hợp đồng</h1>

      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1" />
          Danh sách hợp đồng
        </div>
        <div className="card-body ">
          <div className="row mb-2">
            <div className="col-4 ">
              <FormSearch
                title={"mã sinh viên"}
                handleOnchange={handleOnchangeSearch}
                handleSearch={handleSearchContract}
              />
            </div>

            <div className="form-row d-flex col-8 justify-content-end ">
              <div className=" form-group col-2 mr-3">
                {/* <button
                  onClick={() => handleOnClickExport()}
                  className="btn btn-success"
                >
                  Xuất excel <i class="fa-solid fa-file-excel"></i>
                </button> */}
              </div>
              <div className="form-group col-2 ">
                <button className="btn btn-info" onClick={() => handleReset()}>
                  Làm mới
                </button>
              </div>
            </div>
          </div>

          <div className="form-row d-flex  align-items-end">
            <div className="form-group col-4">
              <label htmlFor="inputCity">Thời gian hợp đồng</label>
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
                options={STATUS_CONTRACT}
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
                  <th>Mã sinh viên</th>
                  <th>Họ tên</th>
                  <th>Phòng</th>
                  <th>Giường</th>
                  <th>Bắt đầu</th>
                  <th>Kết thúc</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>

                  <th>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {dataContract &&
                  dataContract.length > 0 &&
                  dataContract.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.studentData.code}</td>
                        <td>{item.studentData.fullName}</td>
                        <td>{item.roombedData.roomData.roomName}</td>
                        <td>{item.roombedData.bedData.value}</td>
                        <td>
                          {moment
                            .unix(item.start / 1000)
                            .locale("vi")
                            .format("DD/MM/YYYY")}
                        </td>
                        <td>
                          {moment
                            .unix(item.end / 1000)
                            .locale("vi")
                            .format("DD/MM/YYYY")}
                        </td>

                        <td>{CommonUtils.formatter.format(item.amount)}</td>
                        <td>
                          {item.status == 1
                            ? "Còn hạn"
                            : item.status == 2
                            ? "Hết hạn"
                            : "Đã chấm dứt do vi phạm"}
                        </td>

                        <td>
                          <Link to={`/admin/edit-contract/${item.id}`}>
                            Chỉnh sửa
                          </Link>
                          &nbsp; &nbsp;
                          {/* <a
                            href="#"
                            onClick={(event) =>
                              handleDeleteContract(event, item.id)
                            }
                          >
                            Xóa
                          </a>
                          &nbsp; &nbsp; */}
                          {item.status == 1 && (
                            <a
                              href="#"
                              onClick={(event) =>
                                handleExtendContract(event, item)
                              }
                            >
                              Gia hạn
                            </a>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <ExtendModal
              isOpenModal={isOpenRealModal}
              closeModal={closeRealModal}
              info={item}
            />
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
