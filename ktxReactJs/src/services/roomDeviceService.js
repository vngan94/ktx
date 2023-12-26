import axios from "../axios";

const getAllRoomDeviceByRoomId = (data) => {
  return axios.get(
    `/api/get-all-roomDevice-by-roomId?id=${data.id}&limit=${data.limit}&offset=${data.offset}&keyword=${data.keyword}`
  );
};
const getDetailRoomDeviceById = (id) => {
  return axios.get(`/api/get-detail-roomDevice?id=${id}`);
};
const createNewRoomDevice = (data) => {
  return axios.post(`/api/create-new-roomDevice`, data);
};
const updateRoomDevice = (data) => {
  return axios.put(`/api/update-room_device`, data);
};

const deleteRoomDevice = (id) => {
  return axios.delete(`/api/delete-roomDevice?id=${id}`);
};
const getAllRoomByIdDevice = (id) => {
  return axios.get(`/api/get-all-roomDevice-by-deviceId?id=${id}`);
};

export {
  getAllRoomDeviceByRoomId,
  deleteRoomDevice,
  updateRoomDevice,
  getDetailRoomDeviceById,
  createNewRoomDevice,
  getAllRoomByIdDevice,
};
