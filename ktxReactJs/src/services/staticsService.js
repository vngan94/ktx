import axios from "../axios";

const staticsContract = (data) => {
  return axios.get(`/api/statics-contract?start=${data.start}&end=${data.end}`);
};
const staticsArea = (data) => {
  return axios.get(`/api/get-statics-area?start=${data.start}&end=${data.end}`);
};
const staticsDevice = (data) => {
  return axios.get(
    `/api/get-statics-roomDevice?start=${data.start}&end=${data.end}`
  );
};
const staticsStudentViolation = (data) => {
  return axios.get(
    `/api/get-statics-studentViolation?start=${data.start}&end=${data.end}`
  );
};

export { staticsContract, staticsArea, staticsDevice, staticsStudentViolation };
