import axios from "../axios";

const getAllContract = (data) => {
  return axios.get(
    `/api/get-all-contract?limit=${data.limit}&offset=${data.offset}&keyword=${data.keyword}&status=${data.status}&startDate=${data.startDate}&endDate=${data.endDate}`
  );
};
const getDetailContractById = (id) => {
  return axios.get(`/api/get-detail-contract?id=${id}`);
};
const createNewContractService = (data) => {
  return axios.post(`/api/create-new-contract`, data);
};
const updateContractService = (data) => {
  return axios.put(`/api/update-contract`, data);
};

const deleteContractService = (id) => {
  return axios.delete(`/api/delete-contract?id=${id}`);
};
const extendContract = (data) => {
  return axios.post(`/api/extend-contract`, data);
};
const getStudentStayingById = (id) => {
  return axios.get(`/api/get-student-staying-by-id?id=${id}`);
};

export {
  getAllContract,
  getDetailContractById,
  createNewContractService,
  updateContractService,
  deleteContractService,
  extendContract,
  getStudentStayingById,
};
