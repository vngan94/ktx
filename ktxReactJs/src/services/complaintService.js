import axios from "../axios";

const getAllComplaint = (data) => {
  return axios.get(
    `/api/get-all-complaint?limit=${data.limit}&offset=${data.offset}&keyword=${data.keyword}&status=${data.status}`
  );
};
const getDetailComplaintByIdService = (id) => {
  return axios.get(`/api/get-detail-complaint?id=${id}`);
};
const createNewComplaintService = (data) => {
  return axios.post(`/api/create-new-complaint`, data);
};
const updateComplaintService = (data) => {
  return axios.put(`/api/update-complaint`, data);
};
const deleteComplaint = (data) => {
  return axios.delete(`/api/block-complaint`, data);
};

export {
  getAllComplaint,
  getDetailComplaintByIdService,
  createNewComplaintService,
  updateComplaintService,
  deleteComplaint,
};
