import React from "react";
import { useEffect, useState } from "react";
import { getStatisticProfit } from "../../../services/userService";
// import DatePicker from '../../../component/input/DatePicker';
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import CommonUtils from "../../../utils/CommonUtils";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {
  staticsArea,
  staticsContract,
  staticsStudentViolation,
} from "../../../services/staticsService";
const Profit = (props) => {
  const [dataOrder, setdataOrder] = useState([]);
  const [dataExport, setdataExport] = useState([]);
  const [dataContract, setdataContract] = useState([]);
  const [dataRoom, setDataRoom] = useState([]);
  const [dataTotal, setTotal] = useState([]);
  const [sumPrice, setsumPrice] = useState(0);
  const [sumRoom, setsumRoom] = useState(null);
  const [sumContract, setsumContract] = useState(null);
  const [type, settype] = useState("day");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [DateTime, setDateTime] = useState(new Date());
  const [studentViolationData, setStudentViolationData] = useState([]);
  let handleOnclick = async () => {
    let res = await getStatisticProfit({
      oneDate: type == "day" ? startDate : DateTime,
      twoDate: endDate,
      type: type,
    });
    let sumPrice = 0;
    if (res && res.errCode == 0) {
      setdataOrder(res.data);
      let arrayObject = [];
      res.data.forEach((item) => {
        arrayObject.push({
          id: item.id,
          createdAt: moment
            .utc(item.createdAt)
            .local()
            .format("DD/MM/YYYY HH:mm:ss"),
          updatedAt: moment
            .utc(item.updatedAt)
            .local()
            .format("DD/MM/YYYY HH:mm:ss"),
          typeShip: item.typeShipData.type,
          codeVoucher: item.voucherData.codeVoucher,
          paymentType:
            item.isPaymentOnlien == 0
              ? "Thanh toán tiền mặt"
              : "Thanh toán online",
          statusOrder: item.statusOrderData.value,
          totalpriceProduct: item.totalpriceProduct,
          importPrice: item.importPrice,
          profitPrice: item.profitPrice,
        });
        sumPrice = sumPrice + item.profitPrice;
      });
      setdataExport(arrayObject);
      setsumPrice(sumPrice);
    }
  };
  let handleOnClickExport = async () => {
    let arrayObject = [];
    dataContract.forEach((item) => {
      arrayObject.push({
        typeRoom: item.typeRoomName,
        price: item.priceData.priceService + item.priceData.priceTypeRoom,

        numberOfChoices: item.countAll ? item.countAll : 0,
        numberOfNewStudent: item.countNew ? item.countNew : 0,
        amount: item.total ? item.total : 0,
      });
    });

    await CommonUtils.exportExcel(arrayObject, "Thống kê lợi nhuận", "Profit");
  };
  let handleSearchByDate = async () => {
    if (!startDate || !endDate) {
      toast.error("Hãy chọn ngày bắt đầu và kết thúc đầy đủ");
      return;
    } else {
      let start = new Date(startDate).toISOString();
      let end = new Date(endDate).toISOString();
      // Hợp đồng
      let arrData = await staticsContract({
        start: start,
        end: end,
      });

      if (arrData && arrData.errCode === 0) {
        setdataContract(arrData.data.data);
        setsumContract(arrData.data.sum);
      }

      // Phòng
      let roomData = await staticsArea({
        start: start,
        end: end,
      });

      if (roomData && roomData.errCode === 0) {
        setDataRoom(roomData.data.data);
        setsumRoom(roomData.data.sum);
      }

      // Kỷ luật
      let arrData2 = await staticsStudentViolation({
        start: start,
        end: end,
      });

      if (arrData2 && arrData2.errCode === 0) {
        setStudentViolationData(arrData2.data);
        // setdataContract(arrData.data.data);
        // setsumContract(arrData.data.sum);
      }
    }
  };

  return (
    <div className="container-fluid px-4 ml-2">
      <h1 className="mt-4">Thống kê</h1>
      <div className="form-row d-flex  align-items-end ">
        <div className="form-group col-4">
          <label htmlFor="inputCity">Chọn khoảng thời gian</label>
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
      </div>
      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1" />
          Thống kế hợp đồng
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-12 mb-2">
              <button
                style={{ float: "right" }}
                onClick={() => handleOnClickExport()}
                className="btn btn-success"
              >
                Xuất excel <i class="fa-solid fa-file-excel"></i>
              </button>
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
                  <th>Loại phòng</th>
                  <th>Giá loại phòng</th>
                  <th>Số lượng sinh viên chọn</th>
                  <th>Số lượng sinh viên mới </th>

                  <th>Tổng tiền</th>
                </tr>
              </thead>

              <tbody>
                {dataContract &&
                  dataContract.length > 0 &&
                  dataContract.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.typeRoomName}</td>
                        <td>
                          {CommonUtils.formatter.format(
                            item.priceData.priceService +
                              item.priceData.priceTypeRoom
                          )}
                        </td>
                        <td>{item.countAll ? item.countAll : 0}</td>
                        <td>{item.countNew ? item.countNew : 0}</td>

                        <td>
                          {" "}
                          {CommonUtils.formatter.format(
                            item.total ? item.total : 0
                          )}
                        </td>
                      </tr>
                    );
                  })}
                <tr>
                  <td class="font-weight-bold">Tổng cộng</td>
                  <td class="font-weight-bold">
                    {sumContract?.countTypeRoom == 0 && ""}
                  </td>
                  <td class="font-weight-bold"></td>
                  <td class="font-weight-bold">{sumContract?.countAll}</td>
                  <td class="font-weight-bold">{sumContract?.countNew}</td>

                  <td class="font-weight-bold">
                    {" "}
                    {CommonUtils.formatter.format(
                      sumContract ? sumContract.countTotal : 0
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Phòng */}
      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1" />
          Thống kê phòng
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
                  <th>Khu</th>
                  <th>Số lượng phòng</th>
                  <th>Số lượng phòng trống</th>
                  <th>Số lượng phòng đầy</th>
                  <th>Số lượng sinh viên đang ở</th>
                </tr>
              </thead>

              <tbody>
                {dataRoom &&
                  dataRoom.length > 0 &&
                  dataRoom.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.areaName}</td>
                        <td>{item.countRoomAll}</td>
                        <td>{item.countRoomAvailable}</td>
                        <td>{item.countRoomFull}</td>
                        <td>{item.countStudentStaying}</td>
                      </tr>
                    );
                  })}
                <tr>
                  <td class="font-weight-bold">Tổng cộng</td>
                  <td class="font-weight-bold">{sumRoom?.countArea}</td>
                  <td class="font-weight-bold">{sumRoom?.countRoom}</td>
                  <td class="font-weight-bold">
                    {sumRoom?.countRoomAvailable}
                  </td>
                  <td class="font-weight-bold">{sumRoom?.countRoomFull}</td>

                  <td class="font-weight-bold">
                    {" "}
                    {sumRoom?.countStudentStaying}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Thiết bị */}
      {/* <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1" />
          Thống kê thiết bị
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
                  <th>Tổng số thiết bị</th>

                  <th>Chưa được trang bị</th>
                  <th>Đang bị hư</th>
                  <th>Đã bỏ đi (Không còn dùng được nữa)</th>
                </tr>
              </thead>

              <tbody></tbody>
            </table>
          </div>
        </div>
      </div> */}

      {/* Kỷ luật */}
      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1" />
          Thống kê kỷ luật
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
                  <th>Tổng số kỷ luật</th>
                  <th>Số sinh viên vi phạm lần 1</th>
                  <th>Số sinh viên vi phạm lần 2</th>
                  <th>Số sinh viên vi phạm lần 3</th>
                </tr>
              </thead>

              <tbody>
                {studentViolationData && (
                  <tr>
                    <td>{studentViolationData.count}</td>
                    <td>{studentViolationData.first}</td>
                    <td>{studentViolationData.second}</td>
                    <td>{studentViolationData.third}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profit;
