import React from "react";
import { useEffect, useState } from "react";
import {
  createNewRegulationService,
  updateRegulationService,
  getDetailRegulationByIdService,
} from "../../../services/regulationService";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { getStorage } from "firebase/storage";
import MdEditor from "react-markdown-editor-lite";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import MarkdownIt from "markdown-it";
import moment from "moment";
import { storage } from "../../../utils/firebase";
import "react-markdown-editor-lite/lib/index.css";
const AddRegulation = (props) => {
  const mdParser = new MarkdownIt();
  const [isActionADD, setisActionADD] = useState(true);
  const { id } = useParams();
  const [inputValues, setInputValues] = useState({
    regulationName: "",
    link: "",
    userId: "",
    imageReview: "",
    isOpen: false,
    caption: "",
    contentMarkdown: "",
    contentHTML: "",
  });
  const [user, setUser] = useState({});
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setUser(userData);
    if (id) {
      let fetchDetailRegulation = async () => {
        setisActionADD(false);
        let supplier = await getDetailRegulationByIdService(id);
        if (supplier && supplier.errCode === 0) {
          setInputValues({
            ...inputValues,
            ["regulationName"]: supplier.data.regulationName,
            ["link"]: supplier.data.link,
            ["userId"]: supplier.data.userId,
            ["caption"]: supplier.data.caption,
            ["contentMarkdown"]: supplier.data.contentMarkdown,
            ["contentHTML"]: supplier.data.contentHTML,
          });
          console.log("beginner " + supplier.data.link);
        }
      };
      fetchDetailRegulation();
    }
  }, []);
  let handleEditorChange = ({ html, text }) => {
    setInputValues({
      ...inputValues,
      ["contentMarkdown"]: text,
      ["contentHTML"]: html,
    });
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  let handleSaveRegulation = async () => {
    if (isActionADD === true) {
      const storage = getStorage();
      const reference = ref(storage, `pdf/${v4()}`);

      await uploadBytes(reference, inputValues.link)
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((downloadURL) => {
          inputValues.link = downloadURL;
        });
      let res = await createNewRegulationService({
        regulationName: inputValues.regulationName,
        link: inputValues.link,
        userId: user.id,
        caption: inputValues.caption,
        contentMarkdown: inputValues.contentMarkdown,
        contentHTML: inputValues.contentHTML,
      });
      if (res && res.errCode === 0) {
        toast.success("Thêm nội quy-quy định thành công");
        setInputValues({
          ...inputValues,
          ["regulationName"]: "",
          ["link"]: "",
          ["caption"]: "",
        });
      } else if (res && res.errCode === 1) {
        toast.error(res.errMessage);
      } else toast.error("Thêm nội quy-quy định thất bại");
    } else {
      console.log("update " + inputValues.link);
      let res = await updateRegulationService({
        regulationName: inputValues.regulationName,
        link: inputValues.link,
        userId: inputValues.userId,
        id: id,
        caption: inputValues.caption,
        contentMarkdown: inputValues.contentMarkdown,
        contentHTML: inputValues.contentHTML,
      });
      if (res && res.errCode === 0) {
        toast.success("Cập nhật nội quy-quy định thành công");
      } else if (res && res.errCode === 1) {
        toast.error(res.errMessage);
      } else toast.error("Cập nhật nội quy-quy định thất bại");
    }
  };
  let handleOnChangePdf = async (event) => {
    let data = event.target.files;

    let file = data[0];

    if (file.size > 31312281) {
      toast.error("Dung lượng file bé hơn 30mb");
    } else {
      setInputValues({
        ...inputValues,
        ["link"]: file,
        ["caption"]: file.name,
      });
    }
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Quản lý nội quy - quy định</h1>

      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1" />
          {isActionADD === true
            ? "Thêm mới nội quy-quy định"
            : "Cập nhật thông tin nội quy-quy định"}
        </div>
        <div className="card-body">
          <form>
            <div className="\row">
              <div className="form-group ">
                <label htmlFor="inputEmail4">Nội quy-quy định</label>
                <input
                  type="text"
                  value={inputValues.regulationName}
                  name="regulationName"
                  onChange={(event) => handleOnChange(event)}
                  className="form-control"
                  id="inputEmail4"
                />
              </div>
              <div className="row">
                <div className="form-group">
                  <label>
                    {inputValues.caption
                      ? `File ảnh: ${inputValues.caption}`
                      : "Chọn file"}
                  </label>
                  <input
                    accept=".pdf"
                    onChange={(event) => handleOnChangePdf(event)}
                    type="file"
                    className="form-control form-file"
                  />
                </div>
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="inputAddress">Nội dung (Không bắt buộc)</label>
                <MdEditor
                  style={{ height: "500px" }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={handleEditorChange}
                  value={inputValues.contentMarkdown}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleSaveRegulation()}
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
export default AddRegulation;
