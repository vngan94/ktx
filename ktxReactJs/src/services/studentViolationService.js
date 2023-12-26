import axios from "../axios";

const createNewStudentViolation = (data) => {

    return axios.post(`/api/create-new-studentViolation`, data)

}
const getAllStudentViolation = (data) => {
    return axios.get(`/api/get-all-studentViolation?limit=${data.limit}&offset=${data.offset}&keyword=${data.keyword}`)
}
const getStudentViolationById = (id) => {
    return axios.get(`/api/get-studentViolation-by-id?id=${id}`)
}

const updateStudentViolation = (data) => {
    return axios.put(`/api/update-studentViolation`, data)
}
const deleteStudentViolation = (id) => {
   
    return axios.delete(`/api/delete-studentViolation?id=${id}`)
}

export {
    createNewStudentViolation, 
    getAllStudentViolation, 
    getStudentViolationById, 
    
    updateStudentViolation,
    deleteStudentViolation
}