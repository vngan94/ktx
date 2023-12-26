import React from "react";
import { useEffect, useState } from "react";
import {
  createNewUser,
  getDetailUserById,
  UpdateUserService,
} from "../../../services/userService";
import DatePicker from "../../../component/input/DatePicker";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useFetchAllcode } from "../../customize/fetch";
import localization from "moment/locale/vi";
import CommonUtils from "../../../utils/CommonUtils";
import moment from "moment";
const AddRegister = (props) => {
  const [birthday, setbirthday] = useState("");

  const [isActionADD, setisActionADD] = useState(true);
  const [isChangeDate, setisChangeDate] = useState(false);
  const { id } = useParams();

  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    phonenumber: "",
    genderId: "",
    roleId: "",
    id: "",
    dob: "",
  });

  const [dataStudent, setDataStuent] = useState([]);

  let setStateUser = (data) => {
    setInputValues({
      ...inputValues,
      ["firstName"]: data.firstName,
      ["lastName"]: data.lastName,
      ["address"]: data.address,
      ["phonenumber"]: data.phonenumber,
      ["genderId"]: data.genderId,
      ["roleId"]: data.roleId,
      ["email"]: data.email,
      ["id"]: data.id,
      ["dob"]: data.dob,
    });
    setbirthday(
      moment
        .unix(+data.dob / 1000)
        .locale("vi")
        .format("DD/MM/YYYY")
    );
  };
  useEffect(() => {
    if (id) {
      let fetchUser = async () => {
        setisActionADD(false);
        let user = await getDetailUserById(id);
        if (user && user.errCode === 0) {
          setStateUser(user.data);
        }
      };
      fetchUser();
    }
  }, []);
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const { data: dataGender } = useFetchAllcode("GENDER");
  const { data: dataRole } = useFetchAllcode("ROLE");

  if (
    dataGender &&
    dataGender.length > 0 &&
    inputValues.genderId === "" &&
    dataRole &&
    dataRole.length > 0 &&
    inputValues.roleId === ""
  ) {
    setInputValues({
      ...inputValues,
      ["genderId"]: dataGender[0].code,
      ["roleId"]: dataRole[0].code,
    });
  }

  let handleSaveUser = async () => {
    if (isActionADD === true) {
      let res = await createNewUser({
        email: inputValues.email,
        password: inputValues.password,
        firstName: inputValues.firstName,
        lastName: inputValues.lastName,
        address: inputValues.address,
        roleId: inputValues.roleId,
        genderId: inputValues.genderId,
        phonenumber: inputValues.phonenumber,

        dob: new Date(birthday).getTime(),
      });
      if (res && res.errCode === 0) {
        toast.success("Thêm mới người dùng thành công");
        setInputValues({
          ...inputValues,
          ["firstName"]: "",
          ["lastName"]: "",
          ["address"]: "",
          ["phonenumber"]: "",
          ["genderId"]: "",
          ["roleId"]: "",
          ["email"]: "",
        });
        setbirthday("");
      } else {
        toast.error(res.errMessage);
      }
    } else {
      let res = await UpdateUserService({
        id: inputValues.id,
        firstName: inputValues.firstName,
        lastName: inputValues.lastName,
        address: inputValues.address,
        roleId: inputValues.roleId,
        genderId: inputValues.genderId,
        phonenumber: inputValues.phonenumber,
        dob:
          isChangeDate === false
            ? inputValues.dob
            : new Date(birthday).getTime(),
      });
      if (res && res.errCode === 0) {
        toast.success("Cập nhật người dùng thành công");
      } else {
        toast.error(res.errMessage);
      }
    }
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Quản lý đăng ký phòng</h1>

      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1" />
          {isActionADD === true
            ? "Thêm đăng ký phòng"
            : "Cập nhật thông tin đăng ký phòng"}
        </div>
        <div className="card-body">
          <form>
            <div className="form-row">
              <div className="form-group col-4">
                <label htmlFor="inputEmail4">MSV</label>
                <select
                  value={inputValues.code}
                  name="code"
                  onChange={(event) => handleOnChange(event)}
                  id="inputState"
                  className="form-control"
                >
                  {dataStudent &&
                    dataStudent.length > 0 &&
                    dataStudent.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.code}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="form-group col-4">
                <label htmlFor="inputEmail4">Họ tên</label>
                <input
                  type="text"
                  readonly="readonly"
                  value={inputValues.firstName}
                  name="firstName"
                  onChange={(event) => handleOnChange(event)}
                  className="form-control"
                  id="inputEmail4"
                />
              </div>
              <div className="form-group col-4">
                <label htmlFor="inputEmail4">Lớp</label>
                <input
                  type="text"
                  readonly="readonly"
                  name="phonenumber"
                  onChange={(event) => handleOnChange(event)}
                  className="form-control"
                  id="inputEmail4"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-4">
                <label htmlFor="inputAddress">Địa chỉ</label>
                <input
                  type="text"
                  readonly="readonly"
                  value={inputValues.address}
                  name="address"
                  onChange={(event) => handleOnChange(event)}
                  className="form-control"
                  id="inputAddress"
                />
              </div>
              <div className="form-group col-4">
                <label htmlFor="inputEmail4">Số điện thoại</label>
                <input
                  type="text"
                  readonly="readonly"
                  name="phonenumber"
                  onChange={(event) => handleOnChange(event)}
                  className="form-control"
                  id=""
                />
              </div>
              <div className="form-group col-4">
                <label htmlFor="inputEmail4">Giới tính</label>
                <input
                  type="text"
                  readonly="readonly"
                  name="gender"
                  onChange={(event) => handleOnChange(event)}
                  className="form-control"
                  id=""
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-4">
                <label htmlFor="inputEmail4">Khu</label>
                <select
                  value={inputValues.genderId}
                  name="genderId"
                  onChange={(event) => handleOnChange(event)}
                  id="inputState"
                  className="form-control"
                >
                  {dataGender &&
                    dataGender.length > 0 &&
                    dataGender.map((item, index) => {
                      return (
                        <option key={index} value={item.code}>
                          {item.value}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="form-group col-4">
                <label htmlFor="inputEmail4">Loại phòng</label>
                <select
                  value={inputValues.genderId}
                  name="genderId"
                  onChange={(event) => handleOnChange(event)}
                  id="inputState"
                  className="form-control"
                >
                  {dataGender &&
                    dataGender.length > 0 &&
                    dataGender.map((item, index) => {
                      return (
                        <option key={index} value={item.code}>
                          {item.value}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="form-group col-4">
                <label htmlFor="inputEmail4">Phòng</label>
                <select
                  value={inputValues.genderId}
                  name="genderId"
                  onChange={(event) => handleOnChange(event)}
                  id="inputState"
                  className="form-control"
                >
                  {dataGender &&
                    dataGender.length > 0 &&
                    dataGender.map((item, index) => {
                      return (
                        <option key={index} value={item.code}>
                          {item.value}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>

            {/* <div className="form-row">
                            <div className="form-group col-3">
                                <label htmlFor="inputCity">CCCD</label>
                                <input type="text"  name="phonenumber" onChange={(event) => handleOnChange(event)} className="form-control" id="" />
                            </div>
                            <div className="form-group col-3">
                                <label htmlFor="inputPassword4">CCCD mặt trước</label>
                                <input type="file" id="previewImg" accept=".jpg,.png"
                                    hidden onChange={(event) => handleOnChangeImage(event)}
                                />
                                <br></br>
                                <label style={{ backgroundColor: '#eee', borderRadius: '5px', padding: '6px', cursor: 'pointer' }} className="label-upload" htmlFor="previewImg"

                                >Tải ảnh <i className="fas fa-upload"></i></label>
                                <div style={{ backgroundImage: `url(${inputValues.imageReview})` }} onClick={() => openPreviewImage()} className="box-image"></div>
                            </div>
                            <div className="form-group col-3">
                                <label htmlFor="inputPassword4">CCCD mặt sau</label>
                                <input type="file" id="previewImg" accept=".jpg,.png"
                                    hidden onChange={(event) => handleOnChangeImage(event)}
                                />
                                <br></br>
                                <label style={{ backgroundColor: '#eee', borderRadius: '5px', padding: '6px', cursor: 'pointer' }} className="label-upload" htmlFor="previewImg"

                                >Tải ảnh <i className="fas fa-upload"></i></label>
                                <div style={{ backgroundImage: `url(${inputValues.imageReview})` }} onClick={() => openPreviewImage()} className="box-image"></div>
                            </div>
                            <div className="form-group col-3">
                                <label htmlFor="inputPassword4">Hình 3x4</label>
                                <input type="file" id="previewImg" accept=".jpg,.png"
                                    hidden onChange={(event) => handleOnChangeImage(event)}
                                />
                                <br></br>
                                <label style={{ backgroundColor: '#eee', borderRadius: '5px', padding: '6px', cursor: 'pointer' }} className="label-upload" htmlFor="previewImg"

                                >Tải ảnh <i className="fas fa-upload"></i></label>
                                <div style={{ backgroundImage: `url(${inputValues.imageReview})` }} onClick={() => openPreviewImage()} className="box-image"></div>
                            </div>
                        </div> */}

            <button
              type="button"
              onClick={() => handleSaveUser()}
              className="btn btn-primary"
            >
              Lưu thông tin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddRegister;
