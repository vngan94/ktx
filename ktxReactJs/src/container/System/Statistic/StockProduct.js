import React from "react";
import { useEffect, useState } from "react";
import { getStatisticProfit } from "../../../services/userService";
// import DatePicker from '../../../component/input/DatePicker';
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import CommonUtils from "../../../utils/CommonUtils";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { staticsArea, staticsContract } from "../../../services/staticsService";
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
    await CommonUtils.exportExcel(dataExport, "Thống kê hợp đồng", "Profit");
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
        // console.log(arrData.data.sum);
      }

      // Phòng
      let roomData = await staticsArea({
        start: start,
        end: end,
      });

      if (roomData && roomData.errCode === 0) {
        setDataRoom(roomData.data.data);
        setsumRoom(roomData.data.sum);

        // setdataContract(arrData.data.data);
        // setTotal(arrData.data.total);
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

      {/* Thiết bị */}
      <div className="card mb-4">
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
      </div>
    </div>
  );
};
export default Profit;
