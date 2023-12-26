import axios from "../axios";

const getAllCode = (data)  => {
    return axios.get(`/api/get-all-code?type=${data.type}`)
}
const getAllCodeByTypeStatus = (data)  => { 
    return axios.get(`/api/get-all-code-by-type-status?limit=${data.limit}&offset=${data.offset}&keyword=${data.keyword}&type=${data.type}&status=${data.status}`)
}
const createNewCodeService = (data)  => { 
    return axios.post(`/api/create-new-code`, data)
}
const updateCodeService = (data) => {
    return axios.put(`/api/update-code`, data)
}

const blockBedService = (data) => {
    return axios.put(`/api/block-bed`,  {
        id: data.id,
        code: data.code,
    })
}
const unblockCodeService = (data) => {
    return axios.put(`/api/unblock-code`,  {
        id: data.id
    })
}
const getDetailCodeByIdService = (id) => {
    return axios.get(`/api/get-detail-code-by-id?id=${id}`)
}
const deleteCodeService = (id) => {
    return axios.delete(`/api/delete-code?id=${id}`)
}
const getAllRoomBedNewByIdService = (id)  => { 
    return axios.get(`/api/get-all-roombed-new-by-id?id=${id}`)
}
export {
    getAllCode,getAllCodeByTypeStatus, createNewCodeService, updateCodeService, 
    getDetailCodeByIdService, blockBedService, unblockCodeService,getAllRoomBedNewByIdService,
    deleteCodeService
}