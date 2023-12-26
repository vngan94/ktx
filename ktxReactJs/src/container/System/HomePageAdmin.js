import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";
import Home from "./Home";
import ManageDevice from "./Device/ManageDevice";
import ManageStudentViolation from "./StudentViolation/ManageStudentViolation";
import ManageViolationAction from "./ViolationAction/ManageViolationAction";
import AddViolationAction from "./ViolationAction/AddViolationAction";
import AddAction from "./Action/AddAction";
import ManageAction from "./Action/ManageAction";
import ManageViolation from "./Violation/ManageViolation";
import AddViolation from "./Violation/AddViolation";

import AddStudentViolation from "./StudentViolation/AddStudentViolation";

import ManageUser from "./User/ManageUser";
import AddUser from "./User/AddUser";
import AddContract from "./Contract/AddContract";
import ManageContract from "./Contract/ManageContract";
import ManageNotification from "./Notification/ManageNotification";
import AddNotification from "./Notification/AddNotification";
import AddDevice from "./Device/AddDevice";
import AddArea from "./Area/AddArea";
import ManageArea from "./Area/ManageArea";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ManageRegister from "./Register/ManageRegister";
import StudentViolation from "./StudentViolation/StudentViolation";

import ListStudentViolation from "./StudentViolation/ListStudentViolation";
import ManageBed from "./Bed/ManageBed";
import AddBed from "./Bed/AddBed";
import ManageRoom from "./Room/ManageRoom";
import ManageTypeRoom from "./TypeRoom/ManageTypeRoom";
import AddTypeRoom from "./TypeRoom/AddTypeRoom";
import EditTypeRoom from "./TypeRoom/EditTypeRoom";
import Test from "./Test/Test";
import DetailTypeRoom from "./TypeRoom/DetailTypeRoom";
import AddRegister from "./Register/AddRegister";
import AddRoom from "./Room/AddRoom";
import ManageComplaint from "./Complaint/ManageComplaint";
import Complaint from "./Complaint/Complaint";
import Information from "./User/Information";
import ChangePassword from "./User/ChangePassword";

import DetailRoom from "./Room/DetailRoom";
import AddProductDetail from "./Product/ProductDetail/AddProductDetail";

import Message from "./Message/Message";
import AddFAQ from "./FAQ/AddFAQ";
import ManageFAQ from "./FAQ/ManageFAQ";
import AddRegulation from "./Regulation/AddRegulation";
import ManageRegulation from "./Regulation/ManageRegulation";

import Turnover from "./Statistic/Turnover";
import Profit from "./Statistic/Profit";
import History from "./History/History";
import HistoryDetail from "./History/HistoryDetail";

function HomePageAdmin(props) {
  return (
    <Router>
      <Switch>
        <div className="sb-nav-fixed">
          <Header />
          <div id="layoutSidenav">
            <SideBar />
            <div id="layoutSidenav_content">
              <main>
                <Route exact path="/admin/">
                  <Home />
                </Route>
                <Route exact path="/admin/test">
                  <Test />
                </Route>
                <Route exact path="/admin/list-device">
                  <ManageDevice />
                </Route>
                <Route exact path="/admin/add-device">
                  <AddDevice />
                </Route>
                <Route exact path="/admin/edit-device/:id">
                  <AddDevice />
                </Route>

                <Route exact path="/admin/list-register">
                  <ManageRegister />
                </Route>
                <Route exact path="/admin/list-notification">
                  <ManageNotification />
                </Route>
                <Route exact path="/admin/add-notification">
                  <AddNotification />
                </Route>
                <Route exact path="/admin/edit-notification/:id">
                  <AddNotification />
                </Route>
                <Route exact path="/admin/edit-register/:id">
                  <AddRegister />
                </Route>
                <Route exact path="/admin/add-register">
                  <AddRegister />
                </Route>
                <Route exact path="/admin/edit-register/:id">
                  <AddRegister />
                </Route>
                <Route exact path="/admin/list-complaint">
                  <ManageComplaint />
                </Route>
                <Route exact path="/admin/complaint/:id">
                  <Complaint />
                </Route>
                <Route exact path="/admin/infor/:id">
                  <Information />
                </Route>
                <Route exact path="/admin/change-password/:id">
                  <ChangePassword />
                </Route>
                <Route exact path="/admin/list-user">
                  <ManageUser />
                </Route>
                <Route exact path="/admin/edit-user/:id">
                  <AddUser />
                </Route>
                <Route exact path="/admin/add-user">
                  <AddUser />
                </Route>
                <Route exact path="/admin/list-faq">
                  <ManageFAQ />
                </Route>
                <Route exact path="/admin/edit-faq/:id">
                  <AddFAQ />
                </Route>
                <Route exact path="/admin/add-faq">
                  <AddFAQ />
                </Route>

                <Route exact path="/admin/list-regulation">
                  <ManageRegulation />
                </Route>
                <Route exact path="/admin/add-regulation">
                  <AddRegulation />
                </Route>
                <Route exact path="/admin/edit-regulation/:id">
                  <AddRegulation />
                </Route>
                <Route exact path="/admin/list-student_violation">
                  <ManageStudentViolation />
                </Route>
                <Route exact path="/admin/add-student_violation">
                  <AddStudentViolation />
                </Route>
                <Route exact path="/admin/studentviolation/:id">
                  <StudentViolation />
                </Route>
                <Route exact path="/admin/list-studentviolation/:id">
                  <ListStudentViolation />
                </Route>
                <Route exact path="/admin/edit-studentviolation/:id">
                  <AddStudentViolation />
                </Route>

                <Route exact path="/admin/add-studentviolation">
                  <DetailRoom />
                </Route>
                <Route exact path="/admin/edit-student_violation/:id">
                  <AddProductDetail />
                </Route>
                <Route exact path="/admin/list-violation_action">
                  <ManageViolationAction />
                </Route>

                <Route exact path="/admin/add-violation_action">
                  <AddViolationAction />
                </Route>
                <Route exact path="/admin/edit-violation_action/:id">
                  <AddViolationAction />
                </Route>
                <Route exact path="/admin/edit-action/:id">
                  <AddAction />
                </Route>
                <Route exact path="/admin/list-action">
                  <ManageAction />
                </Route>
                <Route exact path="/admin/add-action">
                  <AddAction />
                </Route>
                <Route exact path="/admin/edit-violation/:id">
                  <AddViolation />
                </Route>
                <Route exact path="/admin/list-violation">
                  <ManageViolation />
                </Route>
                <Route exact path="/admin/add-violation">
                  <AddViolation />
                </Route>
                <Route exact path="/admin/list-contract">
                  <ManageContract />
                </Route>
                <Route exact path="/admin/add-contract">
                  <AddContract />
                </Route>
                <Route exact path="/admin/edit-contract/:id">
                  <AddContract />
                </Route>
                <Route exact path="/admin/list-typeroom">
                  <ManageTypeRoom />
                </Route>
                <Route exact path="/admin/add-typeroom">
                  <AddTypeRoom />
                </Route>
                <Route exact path="/admin/detail-typeroom/:id">
                  <DetailTypeRoom />
                </Route>

                <Route exact path="/admin/edit-typeroom/:id">
                  <EditTypeRoom />
                </Route>
                <Route exact path="/admin/list-area">
                  <ManageArea />
                </Route>
                <Route exact path="/admin/add-area">
                  <AddArea />
                </Route>
                <Route exact path="/admin/edit-area/:id">
                  <AddArea />
                </Route>
                <Route exact path="/admin/list-room">
                  <ManageRoom />
                </Route>
                <Route exact path="/admin/detail-room/:id">
                  <DetailRoom />
                </Route>
                <Route exact path="/admin/add-room">
                  <AddRoom />
                </Route>
                <Route exact path="/admin/edit-room/:id">
                  <AddRoom />
                </Route>
                <Route exact path="/admin/list-bed">
                  <ManageBed />
                </Route>
                <Route exact path="/admin/add-bed">
                  <AddBed />
                </Route>
                <Route exact path="/admin/edit-bed/:id">
                  <AddBed />
                </Route>

                <Route exact path="/admin/chat">
                  <Message />
                </Route>
                <Route exact path="/admin/revenue">
                  <Turnover />
                </Route>
                <Route exact path="/admin/room">
                  <Profit />
                </Route>
                <Route exact path="/admin/history-student">
                  <History />
                </Route>
                <Route exact path="/admin/history-student/:id">
                  <HistoryDetail />
                </Route>
              </main>
            </div>
          </div>
        </div>
      </Switch>
    </Router>
  );
}

export default HomePageAdmin;
