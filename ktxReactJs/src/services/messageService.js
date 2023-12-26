import axios from "../axios";

const getAllUserToText = (data) => {
  return axios.get(
    `/api/get-all-user-to-text?keyword=${data.keyword}&limit=${data.limit}&offset=${data.offset}&id=${data.id}`
  );
};

const createNewMessage = (data) => {
  return axios.post(`/api/create-new-message`, data);
};

const deleteMessage = (id) => {
  return axios.delete(`/api/delete-message?id=${id}`);
};

const updateMessage = (data) => {
  return axios.put(`/api/update-message-by-id?id=${data.id}`);
};
const deleteAllMessage = (id) => {
  return axios.delete(`/api/delete-all-message-by-id?id=${id}`);
};
const seenMessage = (id) => {
  return axios.put(`/api/seen-message?groupId=${id}`);
};

export {
  getAllUserToText,
  createNewMessage,
  deleteMessage,
  updateMessage,
  deleteAllMessage,
  seenMessage,
};
