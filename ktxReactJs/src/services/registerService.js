import axios from "../axios";

const getAllRegisterService = (data) => {
  return axios.get(
    `/api/get-all-register?limit=${data.limit}&offset=${data.offset}&keyword=${data.keyword}&status=${data.status}&startDate=${data.startDate}&endDate=${data.endDate}`
  );
};
const acceptRegisterService = (data) => {
  return axios.put(`/api/accept-register`, data);
};
const cancelRegisterService = (data) => {
  return axios.put(`/api/cancel-register`, data);
};
const getAllRegisterAccept = () => {
  return axios.get(`/api/get-all-register-accept`);
};
const getStudentRegisterById = (id) => {
  return axios.get(`/api/get-detail-register-by-student-id?id=${id}`);
};
const checkAcceptService = (data) => {
  return axios.put(`/api/check-accept`, data);
};

const cancelAll = (data) => {
  return axios.put(`/api/cancel-all`, data);
};

export {
  getAllRegisterService,
  acceptRegisterService,
  cancelRegisterService,
  getAllRegisterAccept,
  getStudentRegisterById,
  checkAcceptService,
  cancelAll,
};
