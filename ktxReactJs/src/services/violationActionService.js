import axios from "../axios";

const getAllViolationAction = (data) => {
    return axios.get(`/api/get-all-violationAction?limit=${data.limit}&offset=${data.offset}&keyword=${data.keyword}`)

}
const getViolationActionById = (id) => {
    return axios.get(`/api/get-violationAction-by-id?id=${id}`)
}
const createNewViolationAction = (data) => {
   
    return axios.post(`/api/create-new-violationAction`, data)
}
const updateViolationAction = (data) => {
    return axios.put(`/api/update-violationAction`, data)
}
const deleteViolationAction = (id) => {
    return axios.delete(`/api/delete-violationAction?id=${id}`)
}
const blockViolationAction = (id) => {
    return axios.put(`/api/block-violationAction?id=${id}`)
         
}
const getAllViolation = () => {
    return axios.get(`/api/get-all-violation-distinct`)
}

const getAllActionByViolationIdTimes = (data) => {
  
    return axios.get(`/api/get-all-action-by-violationId-times?violationId=${data.violationId}&times=${data.times}`)
}

const getAllTimesByUserIdViolationId = (data) => {
    
    return axios.get(`/api/get-all-times-by-userId-violationId?userId=${data.userId}&violationId=${data.violationId}`)
}


export {
    getAllViolationAction, getViolationActionById, createNewViolationAction, 
    updateViolationAction, deleteViolationAction,
    blockViolationAction, getAllViolation,
    getAllActionByViolationIdTimes, getAllTimesByUserIdViolationId
}