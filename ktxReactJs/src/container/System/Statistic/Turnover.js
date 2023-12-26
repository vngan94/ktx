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
import {
  staticsArea,
  staticsContract,
  staticsDevice,
} from "../../../services/staticsService";
const Profit = (props) => {
  const [dataOrder, setdataOrder] = useState([]);
  const [dataExport, setdataExport] = useState([]);
  const [dataContract, setdataContract] = useState([]);
  const [dataDevice, setDataDevice] = useState([]);
  const [sumDevice, setSumDevice] = useState(null);
  const [type, settype] = useState("day");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [DateTime, setDateTime] = useState(new Date());

  let handleSearchByDate = async () => {
    if (!startDate || !endDate) {
      toast.error("Hãy chọn ngày bắt đầu và kết thúc đầy đủ");
      return;
    } else {
      let start = new Date(startDate).toISOString();
      let end = new Date(endDate).toISOString();
      // Hợp đồng
      let arrData = await staticsDevice({
        start: start,
        end: end,
      });

      if (arrData && arrData.errCode === 0) {
        // console.log(arrData.data.data);
        setDataDevice(arrData.data.data);
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
                  <th>Tên loại thiết bị</th>

                  <th>Còn lại trong kho</th>
                  <th>Được trang bị và hoạt động bình thường</th>
                  <th>Đang bị hư</th>
                </tr>
              </thead>

              <tbody>
                {dataDevice &&
                  dataDevice.length > 0 &&
                  dataDevice.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.type} </td>
                        <td>{item.count} </td>
                        <td>{item.countWorking ? item.countWorking : 0} </td>
                        <td>{item.countBroken ? item.countBroken : 0}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profit;
