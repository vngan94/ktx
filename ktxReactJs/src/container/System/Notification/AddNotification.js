import React from "react";
import { useEffect, useState } from "react";
import {
  createNewNotificationService,
  getDetailNotificationByIdService,
  updateNotificationService,
} from "../../../services/notificationService";
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
const AddNotification = (props) => {
  const mdParser = new MarkdownIt();
  const { id } = useParams();
  const { data: dataSubject } = useFetchAllcode("TAG");
  const [inputValues, setInputValues] = useState({
    isActionADD: true,
    imageReview: "",
    isOpen: false,
    tagId: "",
    shortDescription: "",
    title: "",
    image: "",
    contentMarkdown: "",
    contentHTML: "",
  });
  if (dataSubject && dataSubject.length > 0 && inputValues.tagId === "") {
    setInputValues({ ...inputValues, ["tagId"]: dataSubject[0].code });
  }
  useEffect(() => {
    if (id) {
      let fetchNotification = async () => {
        let res = await getDetailNotificationByIdService(id);
        if (res && res.errCode === 0) {
          setStateNotification(res.data);
        }
      };
      fetchNotification();
    }
  }, []);
  let setStateNotification = (data) => {
    setInputValues({
      ...inputValues,
      ["title"]: data.title,
      ["shortDescription"]: data.shortDescription,
      ["image"]: data.image,
      ["imageReview"]: data.image,
      ["isActionADD"]: false,
      ["contentMarkdown"]: data.contentMarkdown,
      ["contentHTML"]: data.contentHTML,
      ["tagId"]: data.tagId,
    });
  };
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  let handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file.size > 31312281) {
      toast.error("Dung lượng file bé hơn 30mb");
    } else {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      setInputValues({
        ...inputValues,
        ["image"]: base64,
        ["imageReview"]: objectUrl,
      });
    }
  };

  let handleSaveNotification = async () => {
    if (inputValues.isActionADD === true) {
      let res = await createNewNotificationService({
        shortDescription: inputValues.shortDescription,
        title: inputValues.title,
        tagId: inputValues.tagId,
        image: inputValues.image,
        contentMarkdown: inputValues.contentMarkdown,
        contentHTML: inputValues.contentHTML,
      });
      if (res && res.errCode === 0) {
        toast.success("Tạo mới thông báo thành công !");
        setInputValues({
          ...inputValues,
          ["shortDescription"]: "",
          ["title"]: "",
          ["tagId"]: "",
          ["image"]: "",
          ["contentMarkdown"]: "",
          ["contentHTML"]: "",
          ["imageReview"]: "",
        });
      } else toast.error("Tạo mới thông báo thất bại");
    } else {
      let res = await updateNotificationService({
        shortDescription: inputValues.shortDescription,
        title: inputValues.title,
        tagId: inputValues.tagId,
        image: inputValues.image,
        contentMarkdown: inputValues.contentMarkdown,
        contentHTML: inputValues.contentHTML,
        id: id,
      });

      if (res && res.errCode === 0) {
        toast.success("Cập nhật thông báo thành công !");
      } else if (res && res.errCode === 1) {
        toast.error(res.errMessage);
      } else toast.error("Cập nhật thông báo thất bại");
    }
  };
  let handleEditorChange = ({ html, text }) => {
    setInputValues({
      ...inputValues,
      ["contentMarkdown"]: text,
      ["contentHTML"]: html,
    });
  };
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Quản lý thông báo</h1>
      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1" />
          {inputValues.isActionADD === true
            ? "Tạo mới thông báo"
            : "Cập nhật thông tin thông báo"}
        </div>
        <div className="card-body">
          <form>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputEmail4">Tên thông báo</label>
                <input
                  type="text"
                  value={inputValues.title}
                  name="title"
                  onChange={(event) => handleOnChange(event)}
                  className="form-control"
                  id="inputEmail4"
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="inputEmail4">Chủ đề</label>
                <select
                  value={inputValues.tagId}
                  name="tagId"
                  onChange={(event) => handleOnChange(event)}
                  id="inputState"
                  className="form-control"
                >
                  {dataSubject &&
                    dataSubject.length > 0 &&
                    dataSubject.map((item, index) => {
                      return (
                        <option key={index} value={item.code}>
                          {item.value}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-md-3 form-group">
                <label>Chọn hình ảnh</label>
                <input
                  accept=".jpg,.png"
                  onChange={(event) => handleOnChangeImage(event)}
                  type="file"
                  className="form-control form-file"
                />
              </div>

              <div className="form-group col-md-12">
                <label htmlFor="inputAddress">Mô tả ngắn</label>
                <textarea
                  rows="4"
                  value={inputValues.shortDescription}
                  name="shortDescription"
                  onChange={(event) => handleOnChange(event)}
                  className="form-control"
                ></textarea>
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="inputAddress">Nội dung thông báo</label>
                <MdEditor
                  style={{ height: "500px" }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={handleEditorChange}
                  value={inputValues.contentMarkdown}
                />
              </div>
            </div>
            <button
              onClick={() => handleSaveNotification()}
              type="button"
              className="btn btn-primary"
            >
              Lưu thông tin
            </button>
          </form>
        </div>
      </div>
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

export default AddNotification;
