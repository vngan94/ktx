import { useEffect, useState } from "react";

import {
  getDetailDeviceById,
  updateDevice,
  createNewDevice,
} from "../../../services/deviceService";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import moment from "moment";
import { getAllRoomByIdDevice } from "../../../services/roomDeviceService";
const AddDevice = (props) => {
  const [isActionADD, setisActionADD] = useState(true);
  const { id } = useParams();
  const [dataTimeline, setdataTimeline] = useState(null);
  const [inputValues, setInputValues] = useState({
    type: "",
    quantity: "",
    code: "",
  });

  //

  useEffect(() => {
    if (id) {
      let fetchDetailDevice = async () => {
        setisActionADD(false);
        let device = await getDetailDeviceById(id);
        if (device && device.errCode === 0) {
          setInputValues({
            ...inputValues,
            ["type"]: device.data.type,
            ["code"]: device.data.code,
            ["createdAt"]: device.data.createdAt,
          });
        }
      };
      fetchDetailDevice();
      fetchTimeLine();
    }
  }, []);
  let fetchTimeLine = async () => {
    let res = await getAllRoomByIdDevice(id);

    if (res && res.errCode === 0) {
      console.log(res.data);
      setdataTimeline(res.data);
    }
  };
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  let handleSaveDevice = async () => {
    if (isActionADD === true) {
      let res = await createNewDevice({
        type: inputValues.type,
        userId: JSON.parse(localStorage.getItem("userData")).id,
        quantity: inputValues.quantity,
      });
      if (res && res.errCode === 0) {
        toast.success("Thêm thiết bị thành công");
        setInputValues({
          ...inputValues,
          ["type"]: "",
          ["quantity"]: "",
        });
      } else if (res && res.errCode === 1) {
        toast.error(res.errMessage);
      } else toast.error("Thêm thiết bị thất bại");
    } else {
      let res = await updateDevice({
        type: inputValues.type,
        code: inputValues.code,
        id: id,
      });
      if (res && res.errCode === 0) {
        toast.success("Cập nhật thiết bị thành công");
        setInputValues({ ...inputValues, ["type"]: "", ["code"]: "" });
      } else if (res && res.errCode === 1) {
        toast.error(res.errMessage);
      } else if (res && res.errCode === 2) {
        toast.error(res.errMessage);
      } else toast.error("Cập nhật thiết bị thất bại");
    }
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Quản lý thiết bị</h1>

      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1" />
          {isActionADD === true
            ? "Thêm mới thiết bị"
            : "Cập nhật thông tin thiết bị"}
        </div>
        <div className="card-body">
          <form>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputEmail4">Tên thiết bị</label>
                <input
                  type="text"
                  value={inputValues.type}
                  name="type"
                  onChange={(event) => handleOnChange(event)}
                  className="form-control"
                  id="inputEmail4"
                />
              </div>
              {id && (
                <div className="form-group col-md-6">
                  <label htmlFor="inputEmail4">Mã thiết bị</label>
                  <input
                    type="text"
                    value={inputValues.code}
                    name="code"
                    onChange={(event) => handleOnChange(event)}
                    className="form-control"
                    id="inputEmail4"
                  />
                </div>
              )}
              {!id && (
                <div className="form-group col-md-6">
                  <label htmlFor="inputEmail4">Số lượng</label>
                  <input
                    type="number"
                    value={inputValues.quantity}
                    name="quantity"
                    onChange={(event) => handleOnChange(event)}
                    className="form-control"
                    id="inputEmail4"
                  />
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => handleSaveDevice()}
              className="btn btn-primary"
            >
              Lưu thông tin
            </button>
          </form>
        </div>
      </div>
      {id && (
        <div className="card">
          <div className="card-body">
            <form>
              <div className="form-row">
                <div className="form-group">
                  <div className="d-flex">
                    <p class="fs-5 fw-bold">
                      {moment(inputValues.createdAt).format("DD/MM/YYYY HH:mm")}
                      - Nhập về{" "}
                    </p>
                  </div>
                  <tbody>
                    {dataTimeline &&
                      dataTimeline.length > 0 &&
                      dataTimeline.map((item, index) => {
                        return (
                          <div>
                            <div className="d-flex">
                              <p class="fs-5 fw-bold">
                                {/* {moment(item.roomData.createdAt).format(
                                  "DD/MM/YYYY HH:mm"
                                )}{" "} */}
                                Phòng {item.roomData.roomName}:
                              </p>
                            </div>
                            {item.timelineData &&
                              item.timelineData.rows.length > 0 &&
                              item.timelineData.rows.map((item2, index) => {
                                return (
                                  <div>
                                    {/* <p class="fs-6 ">
                                      + 12/3/2023: <span>Bị hỏng</span>
                                    </p> */}
                                    <p class="fs-6 ">
                                      +{" "}
                                      {moment(item2.createdAt).format(
                                        "DD/MM/YYYY HH:mm"
                                      )}{" "}
                                      <span>
                                        {" "}
                                        -{" "}
                                        {item2.status == 1
                                          ? "Mới"
                                          : item2.status == 2
                                          ? "Đang bị hỏng"
                                          : item2.status == 3
                                          ? "Đã sửa"
                                          : item2.status == 4
                                          ? "Không còn trang bị ở phòng"
                                          : "Không còn sử dụng được nữa"}
                                      </span>
                                    </p>
                                  </div>
                                );
                              })}
                          </div>
                        );
                      })}
                  </tbody>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AddDevice;
