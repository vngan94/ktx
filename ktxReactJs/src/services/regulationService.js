import axios from "../axios";

const getAllRegulations = (data) => {
    return axios.get(`/api/get-all-regulation?limit=${data.limit}&offset=${data.offset}&keyword=${data.keyword}`)

}
const deleteRegulationService = (id) => {
    return axios.delete(`/api/delete-regulation`, {
        data: {
            id: id
        }
    })
}


const createNewRegulationService = (data) => {
    return axios.post(`/api/create-new-regulation`, data)
}

const getDetailRegulationByIdService = (id) => {
    return axios.get(`/api/get-detail-regulation?id=${id}`)
}

const updateRegulationService = (data) => {
    return axios.put(`/api/update-regulation`, data)
}


export {
    getAllRegulations, deleteRegulationService, getDetailRegulationByIdService, createNewRegulationService, updateRegulationService
}