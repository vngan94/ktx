import axios from "../axios";

const getAllArea = (data) => {
    return axios.get(`/api/get-all-area?limit=${data.limit}&offset=${data.offset}&keyword=${data.keyword}`)
}
const getDetailAreaByIdService = (id) => {
    return axios.get(`/api/get-detail-area?id=${id}`)
}
const createNewAreaService = (data) => {
    return axios.post(`/api/create-new-area`, data)
}
const updateAreaService = (data) => {
    return axios.put(`/api/update-area`, data)
}
const blockAreaService = (data) => {
    return axios.put(`/api/block-area`, {
            id: data.id,
            status: data.status
    })
}
const getAllAreaByGender = (gender) => {
    
    return axios.get(`/api/get-all-area-by-gender?gender=${gender}`)
}

const getAllAreaActive = () => {
    
    return axios.get(`/api/get-all-area-active`)
}
const deleteArea = (id) => {
    return axios.delete(`/api/delete-area?id=${id}`)
}

export {
    getAllArea, getDetailAreaByIdService, createNewAreaService, updateAreaService, blockAreaService, getAllAreaByGender,
    getAllAreaActive, deleteArea
}