import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Pie, Bar } from "react-chartjs-2";
import {
  getCountCardStatistic,
  getCountStatusOrder,
  getStatisticByMonth,
  getStatisticByDay,
  getNewRegister,
  getNewComplaint,
  getUser,
} from "../../services/userService";
import moment from "moment";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Home = () => {
  const [newMessage, setNewMessage] = useState(null);
  const [newRegister, setNewRegister] = useState(null);
  const [newComplaint, setNewComplaint] = useState(null);
  const [countUser, setCountUser] = useState(null);
  const [CountStatusOrder, setCountStatusOrder] = useState({});
  const [StatisticOrderByMonth, setStatisticOrderByMonth] = useState({});
  const [StatisticOrderByDay, setStatisticOrderByDay] = useState({});
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [DateTime, setDateTime] = useState(new Date());
  const [type, settype] = useState("month");
  const [month, setmonth] = useState(new Date());
  const [year, setyear] = useState(new Date());

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    loadCountCard(userData.id);
    loadNewRegister();
    loadNewComplaint();
    loadCountUser();
  }, []);

  let loadCountCard = async (id) => {
    let res = await getCountCardStatistic(id);

    if (res && res.errCode == 0) {
      setNewMessage(res.data);
    }
  };

  let loadNewRegister = async () => {
    let res = await getNewRegister();

    if (res && res.errCode == 0) {
      setNewRegister(res.data);
    }
  };
  let loadNewComplaint = async () => {
    let res = await getNewComplaint();

    if (res && res.errCode == 0) {
      setNewComplaint(res.data);
    }
  };

  let loadCountUser = async () => {
    let res = await getUser();
    if (res && res.errCode == 0) {
      setCountUser(res.data);
    }
  };

  let loadStatisticOrderByMonth = async (year) => {
    let res = await getStatisticByMonth(year);
    if (res && res.errCode == 0) {
      setStatisticOrderByMonth(res.data);
    }
  };
  let loadStatisticOrderByDay = async (year, month) => {
    let res = await getStatisticByDay({ year, month });
    if (res && res.errCode == 0) {
      setStatisticOrderByDay(res.data);
    }
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">THỐNG KÊ</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">Trang thống kê</li>
      </ol>
      <div className="row">
        <div className="col-xl-3 col-md-6">
          <div className="card bg-primary text-white mb-4">
            <div className="card-body">TIN NHẮN MỚI ({newMessage})</div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <Link
                className="small text-white stretched-link"
                to={"/admin/chat"}
              >
                Chi tiết
              </Link>
              <div className="small text-white">
                <i className="fas fa-angle-right" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card bg-warning text-white mb-4">
            <div className="card-body">ĐĂNG KÝ PHÒNG MỚI({newRegister})</div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <Link
                className="small text-white stretched-link"
                to={"/admin/list-register"}
              >
                Chi tiết
              </Link>
              <div className="small text-white">
                <i className="fas fa-angle-right" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card bg-success text-white mb-4">
            <div className="card-body">KHIẾU NẠI MỚI ({newComplaint})</div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <Link
                className="small text-white stretched-link"
                to={"/admin/list-complaint"}
              >
                Chi tiết
              </Link>
              <div className="small text-white">
                <i className="fas fa-angle-right" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card bg-danger text-white mb-4">
            <div className="card-body">NGƯỜI DÙNG ({countUser})</div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <Link
                className="small text-white stretched-link"
                to={"/admin/list-user"}
              >
                Chi tiết
              </Link>
              <div className="small text-white">
                <i className="fas fa-angle-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
