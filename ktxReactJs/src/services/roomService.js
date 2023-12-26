import axios from "../axios";

const getAllRoom = (data) => {
  return axios.get(
    `/api/get-all-room?limit=${data.limit}&offset=${data.offset}&keyword=${data.keyword}&status=${data.status}&areaId=${data.areaId}&typeRoomId=${data.typeRoomId}`
  );
};
const getAllRoomByIdService = (data) => {
  return axios.get(
    `/api/get-all-room-by-id?limit=${data.limit}&offset=${data.offset}&keyword=${data.keyword}&typeRoomId=${data.typeRoomId}`
  );
};

const getDetailRoomByIdService = (id) => {
  return axios.get(`/api/get-detail-room?id=${id}`);
};
const createNewRoomService = (data) => {
  console.log(data);
  return axios.post(`/api/create-new-room`, data);
};
const updateRoomService = (data) => {
  return axios.put(`/api/update-room`, data);
};
const deleteRoomService = (id) => {
  return axios.delete(`/api/delete-room`, {
    data: {
      id: id,
    },
  });
};
const removeTypeRoomFromRoomService = (id) => {
  return axios.put(`/api/remove-typeroom-from-room`, {
    id: id,
  });
};

const getAllRoomByWithoutTypeRoom = () => {
  return axios.get(`/api/get-all-room-without-typeRoom`);
};
const addTypeRoomToRoomService = (data) => {
  return axios.put(`/api/add-typeroom-to-room`, data);
};
const blockRoomService = (data) => {
  return axios.put(`/api/block-room`, data);
};

const getAllRoomByTypeRoomAreaAvailable = (data) => {
  return axios.get(
    `/api/get-all-room-by-typeRoomId-areaId-available?typeRoomId=${data.typeRoomId}&areaId=${data.areaId}`
  );
};
const deleteRoom = (id) => {
  return axios.delete(`/api/delete-room?id=${id}`);
};
const getDetailRoomById = (id) => {
  return axios.get(`/api/get-detail-room?id=${id}`);
};
export {
  getAllRoom,
  getDetailRoomByIdService,
  createNewRoomService,
  updateRoomService,
  deleteRoomService,
  getAllRoomByIdService,
  removeTypeRoomFromRoomService,
  getAllRoomByWithoutTypeRoom,
  addTypeRoomToRoomService,
  blockRoomService,
  getAllRoomByTypeRoomAreaAvailable,
  deleteRoom,
  getDetailRoomById,
};
