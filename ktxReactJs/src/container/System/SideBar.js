import React from "react";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
const SideBar = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    setUser(userData);
  }, []);
  return (
    <div id="layoutSidenav_nav">
      <nav
        className="sb-sidenav accordion sb-sidenav-dark"
        id="sidenavAccordion"
      >
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading"></div>
            <Link to="/admin" className="nav-link">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt" />
              </div>
              Trang chủ
            </Link>

            <div className="sb-sidenav-menu-heading">Quản lý</div>
            {user && user.roleId === "R1" && (
              <>
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseLayouts"
                  aria-expanded="false"
                  aria-controls="collapseLayouts"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  Quản lý thiết bị
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down" />
                  </div>
                </a>
                <div
                  className="collapse"
                  id="collapseLayouts"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link to={"/admin/list-device"} className="nav-link">
                      Danh sách thiết bị
                    </Link>
                    <Link to={"/admin/add-device"} className="nav-link">
                      Thêm thiết bị
                    </Link>
                  </nav>
                </div>
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseCategory"
                  aria-expanded="false"
                  aria-controls="collapseLayouts"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-list-ol"></i>
                  </div>
                  Quản lý đăng ký phòng
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down" />
                  </div>
                </a>
                <div
                  className="collapse"
                  id="collapseCategory"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link to={"/admin/list-register"} className="nav-link">
                      Danh sách đăng ký phòng
                    </Link>
                  </nav>
                </div>

                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseBrand"
                  aria-expanded="false"
                  aria-controls="collapseLayouts"
                >
                  <div className="sb-nav-link-icon">
                    <i className="far fa-copyright"></i>
                  </div>
                  Quản lý khiếu nại
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down" />
                  </div>
                </a>
                <div
                  className="collapse"
                  id="collapseBrand"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link to={"/admin/list-complaint"} className="nav-link">
                      Danh sách khiếu nại
                    </Link>
                  </nav>
                </div>

                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseBanner"
                  aria-expanded="false"
                  aria-controls="collapseLayouts"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fab fa-adversal"></i>
                  </div>
                  Quản lý FAQ
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down" />
                  </div>
                </a>
                <div
                  className="collapse"
                  id="collapseBanner"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link to={"/admin/list-faq"} className="nav-link">
                      Danh sách FAQ
                    </Link>
                    <Link to={"/admin/add-faq"} className="nav-link">
                      Thêm FAQ
                    </Link>
                  </nav>
                </div>

                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseSubject"
                  aria-expanded="false"
                  aria-controls="collapseLayouts"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fab fa-blogger"></i>
                  </div>
                  Quản lý nội quy-quy định
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down" />
                  </div>
                </a>
                <div
                  className="collapse"
                  id="collapseSubject"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link to={"/admin/list-regulation"} className="nav-link">
                      DS nội quy-quy định
                    </Link>
                    <Link to={"/admin/add-regulation"} className="nav-link">
                      Thêm nội quy-quy định
                    </Link>
                  </nav>
                </div>
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOrder"
                  aria-expanded="false"
                  aria-controls="collapseLayouts"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-cart-plus"></i>
                  </div>
                  Quản lý thông báo
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down" />
                  </div>
                </a>
                <div
                  className="collapse"
                  id="collapseOrder"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link to={"/admin/list-notification"} className="nav-link">
                      Danh sách thông báo
                    </Link>
                    <Link to={"/admin/add-notification"} className="nav-link">
                      Thêm thông báo
                    </Link>
                  </nav>
                </div>

                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseBlog"
                  aria-expanded="false"
                  aria-controls="collapseLayouts"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-feather-alt"></i>
                  </div>
                  Quản lý kỷ luật
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down" />
                  </div>
                </a>
                <div
                  className="collapse"
                  id="collapseBlog"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link
                      to={"/admin/list-student_violation"}
                      className="nav-link"
                    >
                      Danh sách kỷ luật
                    </Link>
                    <Link
                      to={"/admin/add-student_violation"}
                      className="nav-link"
                    >
                      Thêm kỷ luật
                    </Link>
                    <Link
                      to={"/admin/list-violation_action"}
                      className="nav-link"
                    >
                      Khung xử lý
                    </Link>
                    <Link
                      to={"/admin/add-violation_action"}
                      className="nav-link"
                    >
                      Thêm xử lý
                    </Link>
                    <Link to={"/admin/list-action"} className="nav-link">
                      Danh sách hình phạt
                    </Link>
                    <Link to={"/admin/add-action"} className="nav-link">
                      Thêm hình phạt
                    </Link>
                    <Link to={"/admin/list-violation"} className="nav-link">
                      Danh sách nội dung vi phạm
                    </Link>
                    <Link to={"/admin/add-violation"} className="nav-link">
                      Thêm nội dung vi phạm
                    </Link>
                  </nav>
                </div>
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseShip"
                  aria-expanded="false"
                  aria-controls="collapseLayouts"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-feather-alt"></i>
                  </div>
                  Quản lý hợp đồng
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down" />
                  </div>
                </a>
                <div
                  className="collapse"
                  id="collapseShip"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link to={"/admin/list-contract"} className="nav-link">
                      Danh sách hợp đồng
                    </Link>
                    <Link to={"/admin/add-contract"} className="nav-link">
                      Thêm hợp đồng
                    </Link>
                  </nav>
                </div>

                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseVoucher"
                  aria-expanded="false"
                  aria-controls="collapseLayouts"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-percentage"></i>
                  </div>
                  Quản lý phòng
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down" />
                  </div>
                </a>
                <div
                  className="collapse"
                  id="collapseVoucher"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link to={"/admin/list-typeroom"} className="nav-link">
                      DS loại phòng
                    </Link>
                    <Link to={"/admin/add-typeroom"} className="nav-link">
                      Thêm loại phòng
                    </Link>
                    <Link to={"/admin/list-room"} className="nav-link">
                      DS phòng
                    </Link>
                    <Link to={"/admin/add-room"} className="nav-link">
                      Thêm phòng
                    </Link>
                    <Link to={"/admin/list-bed"} className="nav-link">
                      DS giường
                    </Link>
                    <Link to={"/admin/add-bed"} className="nav-link">
                      Thêm giường
                    </Link>
                    <Link to={"/admin/list-area"} className="nav-link">
                      DS khu
                    </Link>
                    <Link to={"/admin/add-area"} className="nav-link">
                      Thêm khu
                    </Link>
                    <Link to={"/admin/history-student"} className="nav-link">
                      Lịch sử chỗ ở
                    </Link>
                  </nav>
                </div>
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseSupplier"
                  aria-expanded="false"
                  aria-controls="collapseLayouts"
                >
                  <div className="sb-nav-link-icon">
                    <i class="fa-solid fa-person-military-pointing"></i>
                  </div>
                  Quản lý người dùng
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down" />
                  </div>
                </a>
                <div
                  className="collapse"
                  id="collapseSupplier"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link to={"/admin/list-user"} className="nav-link">
                      Danh sách người dùng
                    </Link>
                    <Link to={"/admin/add-user"} className="nav-link">
                      Thêm người dùng
                    </Link>
                  </nav>
                </div>

                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseReceipt"
                  aria-expanded="false"
                  aria-controls="collapseLayouts"
                >
                  <div className="sb-nav-link-icon">
                    <i class="fa-brands fa-facebook-messenger"></i>
                  </div>
                  Quản lý tin nhắn
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down" />
                  </div>
                </a>
                <div
                  className="collapse"
                  id="collapseReceipt"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link to={"/admin/chat"} className="nav-link">
                      Messenger
                    </Link>
                  </nav>
                </div>
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseStatistic"
                  aria-expanded="false"
                  aria-controls="collapseLayouts"
                >
                  <div className="sb-nav-link-icon">
                    <i class="fa-solid fa-magnifying-glass-chart"></i>
                  </div>
                  Thống kê
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down" />
                  </div>
                </a>

                <div
                  className="collapse"
                  id="collapseStatistic"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link to={"/admin/revenue"} className="nav-link">
                      {" "}
                      Thống kê thiết bị
                    </Link>

                    <Link to={"/admin/room"} className="nav-link">
                      Thống kê chung
                    </Link>
                  </nav>
                </div>
              </>
            )}

            {/* {user && user.roleId === "R1" &&
                            <>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseStatistic" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i class="fa-solid fa-magnifying-glass-chart"></i></div>
                                    Thống kê
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>

                                <div className="collapse" id="collapseStatistic" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to={'/admin/turnover'} className="nav-link" >Thống kê doanh thu</Link>

                                        <Link to={'/admin/profit'} className="nav-link" >Thống kê lợi nhuận</Link>
                                        <Link to={'/admin/stock-product'} className="nav-link" >Thống kê tồn kho</Link>


                                    </nav>
                                </div>
                            </>

                        } */}
          </div>
        </div>
        <div className="sb-sidenav-footer">Trang quản trị</div>
      </nav>
    </div>
  );
};
export default SideBar;
