import React from "react";
import { useEffect, useState } from "react";
import {
  createNewContractrService,
  getDetailComplaintByIdService,
  updateComplaintService,
} from "../../../services/complaintService";
import CommonUtils from "../../../utils/CommonUtils";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { useFetchAllcode } from "../../customize/fetch";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
const Complaint = (props) => {
  const mdParser = new MarkdownIt();
  const { id } = useParams();
  const [dataComplaint, setdataComplaint] = useState([]);

  const [inputValues, setInputValues] = useState({
    subject: "",
    complaintHTML: "",
    isActionADD: true,
    responseHTML: "",
    createdAt: "",
    updatedAt: "",
    fullName: "",
    code: "",
    employee: "",
    employeeCode: "",
    status: "",
    codeComplaint: "",
  });
  const [previousData, setPreviousData] = useState([]);
  const [dataStatus, setdataStatus] = useState([
    { id: 0, value: "Mới" },
    { id: 1, value: "Từ chối giải quyết" },
    { id: 2, value: "Đang giải quyết" },
    { id: 3, value: "Thành công" },
  ]);

  useEffect(() => {
    if (id) {
      let fetchContract = async () => {
        let res = await getDetailComplaintByIdService(id);

        if (res && res.errCode === 0) {
          setdataComplaint(res.data);

          if (res.data.length > 1) {
            const [, ...rest] = res.data;
            setInputValues({
              ...inputValues,
              ["status"]: rest[rest.length - 1].status,
            });
            setPreviousData(rest);
          }
        }
      };
      fetchContract();
    }
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  let handleSaveContract = async () => {
    let res = await updateComplaintService({
      id: id,
      responseHTML: inputValues.responseHTML,
      status: inputValues.status,
      employeeId: JSON.parse(localStorage.getItem("userData")).id,
      code: dataComplaint[0].code,
    });
    if (res && res.errCode === 0) {
      toast.success("Cập nhật thành công !");
    } else if (res && res.errCode !== 0) {
      toast.error(res.errMessage);
    } else toast.error("Cập nhật thất bại");
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4 ml-4 mb-4">
        {dataComplaint && dataComplaint[0]?.subject}
      </h1>
      <div className="card mb-4 ml-4 mr-5">
        <div className="card-header">
          <i className="fas fa-user me-1" />
          {moment
            .utc(dataComplaint[0]?.createdAt)
            .local()
            .format("DD/MM/YYYY HH:mm:ss")}{" "}
          - {dataComplaint[0]?.studentData.code} -{" "}
          {dataComplaint[0]?.studentData.fullName}
        </div>
        <div className="card-body">
          <form>
            <div className="form-row">
              <div className="form-group col-md-12">
                <textarea
                  rows="4"
                  name="complaintHTML"
                  readOnly="readOnly"
                  value={dataComplaint[0]?.complaintHTML}
                  className="form-control"
                ></textarea>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="container-fluid px-0">
        {previousData?.length > 0 && (
          <div className="card mb-4 mr-0 ml-5">
            <div className="card-header ">
              <div className="float-left">
                <i className="fas fa-user me-1" />
                Phản hồi trước đó
              </div>
            </div>
            <div className="card-body">
              <form>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    {previousData?.length > 0 &&
                      previousData.map((item, index) => {
                        return (
                          <div className="mb-4">
                            <p>
                              +{" "}
                              {moment(item.createdAt).format(
                                "DD/MM/YYYY HH:mm"
                              )}{" "}
                              -{" "}
                              {item.status == 1
                                ? "Từ chối giải quyết"
                                : item.status == 2
                                ? "Đang giải quyết"
                                : "Thành công"}
                            </p>
                            <span>
                              {"   "}
                              {item.employeeData.fullName}:{" "}
                              {item.responseHTML
                                ? item.responseHTML
                                : "Chỉ cập nhật trạng thái"}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="card mb-4 mr-0 ml-5">
          <div className="card-header ">
            <i className="fas fa-table me-1" />
            Phản hồi bây giờ
          </div>
          <div className="card-body">
            <form>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <textarea
                    rows="4"
                    name="responseHTML"
                    onChange={(event) => handleOnChange(event)}
                    className="form-control"
                  ></textarea>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="d-flex ml-5 justify-content-end">
        <div class="form-group col-md-3">
          <select
            class="form-control "
            value={inputValues.status}
            name="status"
            onChange={(event) => handleOnChange(event)}
          >
            {dataStatus &&
              dataStatus.length > 0 &&
              dataStatus.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.value}
                  </option>
                );
              })}
          </select>
        </div>
        <div class="form-group">
          <div class="input-group">
            <span class="input-group-btn">
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => handleSaveContract()}
              >
                {" "}
                Lưu
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Complaint;
