import axios from "../axios";

const getAllTypeRoomPrice = (data) => {};
const getAllTypeRoomPriceByIdService = (data) => {
  return axios.get(
    `/api/get-all-typeRoomPrice-by-id?limit=${data.limit}&offset=${data.offset}&typeRoomId=${data.typeRoomId}`
  );
};
const getTypeRomPriceByIdService = (id) => {
  return axios.get(`/api/get-typeRoomPrice-by-id?id=${id}`);
};
const createNewTypeRoomPriceService = (data) => {
  return axios.post(`/api/create-new-typeRoomPrice`, data);
};
const updateTypeRoomPriceService = (data) => {
  console.log(data);
  return axios.put(`/api/update-typeRoomPrice`, data);
};
const deleteTypeRoomPriceService = (id) => {
  return axios.delete(`/api/delete-typeRoomPrice`, {
    data: {
      id: id,
    },
  });
};

const getTypeRoomPriceByTypeRoom = (id) => {
  return axios.get(`/api/get-typeRoomPrice-by-TypeRoom?typeRoomId=${id}`);
};
export {
  getAllTypeRoomPrice,
  getTypeRomPriceByIdService,
  createNewTypeRoomPriceService,
  updateTypeRoomPriceService,
  deleteTypeRoomPriceService,
  getAllTypeRoomPriceByIdService,
  getTypeRoomPriceByTypeRoom,
};
