import axios from "../axios";

const getAllDevice = (data) => {
    return axios.get(`/api/get-all-device?limit=${data.limit}&offset=${data.offset}&keyword=${data.keyword}&status=${data.status}`)
}
const getDetailDeviceById = (id) => {
    return axios.get(`/api/get-detail-device?id=${id}`)
}
const createNewDevice = (data) => {
    return axios.post(`/api/create-new-device`, data)
}
const updateDevice = (data) => {
    return axios.put(`/api/update-device`, data)
}
const getAllDeviceByType = (type) => {
    
    return axios.get(`/api/get-all-device-by-type?type=${type}`)
}

const deleteDevice = (id) => {
    return axios.delete(`/api/delete-device?id=${id}`)
}

export {
    createNewDevice, getDetailDeviceById, getAllDevice, getAllDeviceByType, updateDevice, deleteDevice
}