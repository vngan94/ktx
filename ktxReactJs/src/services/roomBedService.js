import axios from "../axios";
const getAllRomBedByIdService = (data) => {
  return axios.get(
    `/api/get-all-bedRoom-by-id?limit=${data.limit}&offset=${data.offset}&id=${data.id}`
  );
};
const createNewRoomBedService = (data) => {
  return axios.post(`/api/create-new-roombed`, data);
};
const deleteRoomBedService = (id) => {
  return axios.delete(`/api/delete-roomBed?id=${id}`);
};

const blockRoomBedService = (data) => {
  return axios.put(`/api/block-roomBed`, data);
};
const deleteStudentService = (data) => {
  return axios.put(`/api/delete-student-from-roombed`, data);
};
const getAllBedAvailableByIdService = (id) => {
  return axios.get(
    `/api/get-all-roombed-available-for-add-student-by-id?id=${id}`
  );
};

const updateRoomBedService = (data) => {
  return axios.put(`/api/update-roombed`, data);
};
const getAllStudentStaying = () => {
  return axios.get(`/api/get-all-student-staying`);
};

const getStudentStayingById = (id) => {
  return axios.get(`/api/get-student-staying-by-id?id=${id}`);
};
const changeRoomBedById = (data) => {
  return axios.put(`/api/change-room-by-id`, data);
};
const changeRoomWithDifferentTypeRoom = (data) => {
  return axios.put(`/api/change-room-withDifferentTypeRoom`, data);
};
export {
  getAllRomBedByIdService,
  createNewRoomBedService,
  deleteRoomBedService,
  blockRoomBedService,
  deleteStudentService,
  getAllBedAvailableByIdService,
  updateRoomBedService,
  getAllStudentStaying,
  getStudentStayingById,
  changeRoomBedById,
  changeRoomWithDifferentTypeRoom,
};
