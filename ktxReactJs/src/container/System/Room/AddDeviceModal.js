import React from "react";
import { useEffect, useState } from "react";
import CommonUtils from "../../../utils/CommonUtils";
import moment from "moment";
import { toast } from "react-toastify";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from "reactstrap";
import { getDetailRoomDeviceById } from "../../../services/roomDeviceService";
import { getAllDevice } from "../../../services/deviceService";
import Select from "react-select";
const AddImageModal = (props) => {
  const [inputValues, setInputValues] = useState({
    idStatus: "",
    type: "",
    code: "",
    isActionUpdate: false,
    deviceId: "",
  });

  const [dataDevice, setdataDevice] = useState({});
  const [dataStatus, setdataStatus] = useState({});
  const [id, setId] = useState("");
  useEffect(() => {
    setId(props.deviceId);
    let id = props.deviceId;
    if (id) {
      //  load 1 device
      setdataStatus([
        { id: 1, status: "Mới" },
        { id: 2, status: "Đang bị hỏng" },
        { id: 3, status: "Đã sửa" },
        { id: 5, status: "Không còn sử dụng được nữa" },
      ]);

      fetchDetailDevice(id);
    } else {
      // load list device
      fetchAllDevice();
    }
  }, [props.isOpenModal]);

  let fetchDetailDevice = async (id) => {
    let res = await getDetailRoomDeviceById(id);
    if (res && res.errCode === 0) {
      setInputValues({
        ...inputValues,
        ["isActionUpdate"]: true,
        ["idStatus"]: res.data.status,
        ["type"]: res.data.deviceData.type,
        ["code"]: res.data.deviceData.code,
      });
    }
  };
  let fetchAllDevice = async () => {
    let arrData = await getAllDevice({
      limit: "",
      offset: "",
      keyword: "",
      status: 1,
    });
    if (arrData && arrData.errCode === 0) {
      if (arrData.data) {
        let array = [];
        for (var i = 0; i < arrData.data.length; i++) {
          array.push({
            value: arrData.data[i].id,
            label: arrData.data[i].type + "_" + arrData.data[i].code,
          });
        }

        setdataDevice(array);
      }
    }
  };
  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setInputValues({ ...inputValues, [name]: value });
  };
  let HandleSendDataFromModal = () => {
    if (id) {
      // update

      props.sendDataRealFromModal({
        id: id,
        status: inputValues.idStatus,
        isActionUpdate: inputValues.isActionUpdate,
      });
    } else {
      // them moi

      props.sendDataRealFromModal({
        deviceId: inputValues.deviceId,
        isActionUpdate: inputValues.isActionUpdate,
      });
    }
    setInputValues({
      ...inputValues,
      ["idStatus"]: "",
      ["type"]: "",
      ["code"]: "",
      ["isActionUpdate"]: false,
      ["deviceId"]: "",
    });
    setId("");
  };
  let handleCloseModal = () => {
    props.closeModal();
    setInputValues({
      ...inputValues,
      ["idStatus"]: "",
      ["type"]: "",
      ["code"]: "",
      ["isActionUpdate"]: false,
      ["deviceId"]: "",
    });
    setId("");
  };
  const handleOnChangeDevice = (id) => {
    setInputValues({
      ...inputValues,
      ["deviceId"]: id,
    });
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
          <h5 className="modal-title">
            {id ? "Cập nhật trạng thái" : "Thêm thiết bị"}
          </h5>
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
          {id ? (
            <div className="row">
              <div className="col-12 form-group">
                <label htmlFor="inputEmail4">Mã thiết bị</label>
                <input
                  type="text"
                  value={inputValues.code}
                  readOnly="readOnly"
                  onChange={(event) => handleOnChange(event)}
                  className="form-control"
                  id="inputEmail4"
                />
              </div>
              <div className="col-12 form-group">
                <label htmlFor="inputPassword4">Thiết bị</label>
                <input
                  type="text"
                  value={inputValues.type}
                  readOnly="readOnly"
                  onChange={(event) => handleOnChange(event)}
                  className="form-control"
                  id="inputPassword4"
                />
              </div>
              <div className="col-12 form-group">
                <label htmlFor="inputPassword4">Trạng thái</label>
                <select
                  className=" form-select "
                  onChange={handleOnChange}
                  name="idStatus"
                  value={inputValues.idStatus}
                >
                  {dataStatus &&
                    dataStatus.length > 0 &&
                    dataStatus.map((item, index) => {
                      return <option value={item.id}>{item.status}</option>;
                    })}
                </select>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-12 form-group">
                <Select
                  options={dataDevice}
                  placeholder={"Chọn thiết bị"}
                  isSearchable
                  onChange={(item) => {
                    console.log("item.id " + item.value);
                    handleOnChangeDevice(item.value);
                  }}
                />
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={HandleSendDataFromModal}>
            Lưu thông tin
          </Button>{" "}
          <Button onClick={handleCloseModal}>Hủy</Button>
        </ModalFooter>
      </Modal>
      {inputValues.isOpen === true && (
        <Lightbox
          mainSrc={inputValues.imageReview}
          onCloseRequest={() =>
            setInputValues({ ...inputValues, ["isOpen"]: false })
          }
        />
      )}
    </div>
  );
};
export default AddImageModal;
