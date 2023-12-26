import axios from "axios";
import { REACT_APP_BACKEND_URL } from "@env";
// FAQ

const getAllFAQs = (data) => {
  console.log(REACT_APP_BACKEND_URL);
  return axios.get(
    `${REACT_APP_BACKEND_URL}/api/get-all-faq?limit=${data.limit}&offset=${data.offset}&keyword=${data.keyword}`
  );
};
// LOGIN

const handleLoginService = (data) => {
  return axios.post(`${REACT_APP_BACKEND_URL}/api/login`, data);
};

// regulation
const getAllRegulations = (data) => {
  return axios.get(
    `${REACT_APP_BACKEND_URL}/api/get-all-regulation?limit=${data.limit}&offset=${data.offset}&keyword=${data.keyword}`
  );
};

// notification
const getAllNotification = (data) => {
  return axios.get(
    `${REACT_APP_BACKEND_URL}/api/get-all-notification?limit=${data.limit}&offset=${data.offset}&keyword=${data.keyword}&tagId=${data.tagId}`
  );
};
// typeRoom
const getAllTypeRoomActive = (data) => {
  return axios.get(
    `${REACT_APP_BACKEND_URL}/api/get-all-typeRoom-active?limit=${data.limit}&offset=${data.offset}&keyword=${data.keyword}`
  );
};
const getAllAreaHavingRoomAvailableByGender = (data) => {
  return axios.get(
    `${REACT_APP_BACKEND_URL}/api/get-all-area-having-room-available-by-gender?gender=${data.gender}&typeRoomId=${data.typeRoomId}`
  );
};
const getAllRoomByTypeRoomAreaAvailable = (data) => {
  return axios.get(
    `${REACT_APP_BACKEND_URL}/api/get-all-room-by-typeRoomId-areaId-available?typeRoomId=${data.typeRoomId}&areaId=${data.areaId}`
  );
};
const createNewRegister = (data) => {
  return axios.post(`${REACT_APP_BACKEND_URL}/api/create-new-register`, data);
};

const getDetailRegisterById = (id) => {
  return axios.get(
    `${REACT_APP_BACKEND_URL}/api/get-detail-register-by-id?id=${id}`
  );
};
const getDetailRegisterByStudentId = (id) => {
  return axios.get(
    `${REACT_APP_BACKEND_URL}/api/get-all-register-by-student-id?id=${id}`
  );
};
const getInforLiving = (id) => {
  return axios.get(
    `${REACT_APP_BACKEND_URL}/api/get-student-staying-by-id?id=${id}`
  );
};
const cancelRegister = (data) => {
  return axios.put(`${REACT_APP_BACKEND_URL}/api/cancel-register`, data);
};
const getAllContract = (id) => {
  return axios.get(
    `${REACT_APP_BACKEND_URL}/api/get-all-contract-by-id?id=${id}`
  );
};
const getContractById = (id) => {
  return axios.get(`${REACT_APP_BACKEND_URL}/api/get-detail-contract?id=${id}`);
};
const getAllStudentViolationById = (data) => {
  return axios.get(
    `${REACT_APP_BACKEND_URL}/api/get-all-studentViolation-by-student-id?id=${data.id}&limit=${data.limit}&offset=${data.offset}`
  );
};
const getDetailStudentViolationById = (id) => {
  return axios.get(
    `${REACT_APP_BACKEND_URL}/api/get-studentViolation-by-id?id=${id}`
  );
};
const getAllComplaint = (data) => {
  return axios.get(
    `${REACT_APP_BACKEND_URL}/api/get-all-complaint?keyword=${data.keyword}&limit=${data.limit}&offset=${data.offset}&status=${data.status}`
  );
};
const getAllComplaintById = (data) => {
  return axios.get(
    `${REACT_APP_BACKEND_URL}/api/get-all-complaint-by-student-id?keyword=${data.keyword}&status=${data.status}&id=${data.id}`
  );
};
const getDetailComplaintById = (id) => {
  return axios.get(
    `${REACT_APP_BACKEND_URL}/api/get-detail-complaint?id=${id}`
  );
};
const createNewComplaint = (data) => {
  return axios.post(`${REACT_APP_BACKEND_URL}/api/create-new-complaint`, data);
};

const handleChangePassword = (data) => {
  return axios.put(`${REACT_APP_BACKEND_URL}/api/changepassword`, data);
};

const verifyForgetPassword = (email) => {
  return axios.post(
    `${REACT_APP_BACKEND_URL}/api/send-forgotpassword-email?email=${email}`
  );
};

const getAllUserToText = (data) => {
  return axios.get(
    `${REACT_APP_BACKEND_URL}/api/get-all-user-to-text?keyword=${data.keyword}&limit=${data.limit}&offset=${data.offset}&id=${data.id}`
  );
};

const seenMessage = (groupId) => {
  return axios.put(
    `${REACT_APP_BACKEND_URL}/api/seen-message?groupId=${groupId}`
  );
};

const createNewMessage = (data) => {
  return axios.post(`${REACT_APP_BACKEND_URL}/api/create-new-message`, data);
};

const deleteMessage = (id) => {
  return axios.delete(`${REACT_APP_BACKEND_URL}/api/delete-message?id=${id}`);
};

const updateMessage = (data) => {
  return axios.put(
    `${REACT_APP_BACKEND_URL}/api/update-message-by-id?id=${data.id}`
  );
};
const deleteAllMessage = (id) => {
  return axios.delete(
    `${REACT_APP_BACKEND_URL}/api/delete-all-message-by-id?id=${id}`
  );
};

export {
  getAllFAQs,
  handleLoginService,
  getAllRegulations,
  getAllNotification,
  getAllTypeRoomActive,
  getAllAreaHavingRoomAvailableByGender,
  getAllRoomByTypeRoomAreaAvailable,
  createNewRegister,
  getDetailRegisterById,
  getDetailRegisterByStudentId,
  getInforLiving,
  cancelRegister,
  getAllContract,
  getContractById,
  getAllStudentViolationById,
  getDetailStudentViolationById,
  getAllComplaint,
  createNewComplaint,
  handleChangePassword,
  verifyForgetPassword,
  getAllUserToText,
  seenMessage,
  createNewMessage,
  deleteMessage,
  updateMessage,
  deleteAllMessage,
  getAllComplaintById,
  getDetailComplaintById,
};
