import axios from "../axios";

const getAllTypeRoom = (data) => {
  return axios.get(
    `/api/get-all-typeRoom?limit=${data.limit}&offset=${data.offset}&keyword=${data.keyword}`
  );
};
const getAllTypeRoomActive = () => {
  return axios.get(`/api/get-all-typeRoom-active?limit=&offset=&keyword=`);
};
const getDetailTypeRoomByIdService = (id) => {
  return axios.get(`/api/get-detail-typeRoom?id=${id}`);
};
const createNewTypeRoomService = (data) => {
  console.log(data);
  return axios.post(`/api/create-new-typeRoom`, data);
};
const updateTypeRoomService = (data) => {
  return axios.put(`/api/update-typeRoom`, data);
};
const blockTypeRoomService = (data) => {
  return axios.put(`/api/block-typeRoom`, {
    id: data.id,
    status: data.status,
  });
};
const deleteTypeRoom = (id) => {
  return axios.delete(`/api/delete-typeRoom?id=${id}`);
};

export {
  getAllTypeRoom,
  getDetailTypeRoomByIdService,
  createNewTypeRoomService,
  updateTypeRoomService,
  blockTypeRoomService,
  getAllTypeRoomActive,
  deleteTypeRoom,
};
