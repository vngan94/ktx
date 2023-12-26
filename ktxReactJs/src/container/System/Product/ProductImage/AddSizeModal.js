import React from "react";
import { useEffect, useState } from "react";
import CommonUtils from "../../../../utils/CommonUtils";
import moment from "moment";
import { toast } from "react-toastify";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { useFetchAllcode } from "../../../customize/fetch";
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from "reactstrap";
import { getAllBedAvailableByIdService } from "../../../../services/roomBedService";
import { getAllStudentAvailableService } from "../../../../services/userService";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
} from "react-router-dom";

const AddSizeModal = (props) => {
  const [inputValues, setInputValues] = useState({
    userId: "",
    code: "",
  });
  const [dataBedAvailable, setdataBedAvailable] = useState([]);
  const [dataStudent, setdataStudent] = useState([]);
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  useEffect(() => {
    let id = props.roomId;

    if (id) {
      let fetchBedAvailable = async () => {
        let res = await getAllBedAvailableByIdService(id);
        if (res && res.errCode === 0) {
          setdataBedAvailable(res.data);
        } else {
          toast.error(res.errMessage);
        }
      };
      let fetchStudent = async () => {
        let res = await getAllStudentAvailableService(id);
        if (res && res.errCode === 0) {
          setdataStudent(res.data);
        }
      };
      fetchBedAvailable();
      fetchStudent();
    }
  }, [props.isOpenModal]);
  let handleSaveInfor = () => {
    props.sendDataFromModalSize({
      code: inputValues.code,
      userId: inputValues.userId,
    });
    setInputValues({ ...inputValues, ["code"]: "", ["userId"]: "" });
  };
  let handleCloseModal = () => {
    props.closeModal();
    setInputValues({ ...inputValues, ["code"]: "", ["userId"]: "" });
  };
  return (
    <div className="">
      <Modal
        isOpen={props.isOpenModal}
        className={"booking-modal-container"}
        size="md"
        centered
      >
        <div className="modal-header">
          <h5 className="modal-title">Thêm sinh viên</h5>
          <button
            onClick={handleCloseModal}
            type="button"
            className="btn btn-time"
            aria-label="Close"
          >
            X
          </button>
        </div>
        <ModalBody>
          <select
            className="form-select mb-4"
            onChange={handleOnChange}
            name="code"
          >
            <option value={"ALL"} selected>
              Danh sách giường trống
            </option>
            {dataBedAvailable &&
              dataBedAvailable.length > 0 &&
              dataBedAvailable.map((item, index) => {
                return (
                  <option value={item.bedData.code}>
                    {item.bedData.value}
                  </option>
                );
              })}
          </select>

          <select
            className="form-select "
            onChange={handleOnChange}
            name="userId"
          >
            <option value={"ALL"} selected>
              Danh sách sinh viên còn hợp đồng và chưa có giường
            </option>
            {dataStudent &&
              dataStudent.length > 0 &&
              dataStudent.map((item, index) => {
                return <option value={item.id}>{item.code}</option>;
              })}
          </select>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSaveInfor}>
            Lưu thông tin
          </Button>{" "}
          <Button onClick={handleCloseModal}>Hủy</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default AddSizeModal;
