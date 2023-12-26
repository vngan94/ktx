import axios from "../axios";

const getAllFAQs = (data) => {
    return axios.get(`/api/get-all-faq?limit=${data.limit}&offset=${data.offset}&keyword=${data.keyword}`)

}
const getDetailFAQByIdService = (id) => {
    return axios.get(`/api/get-detail-faq-by-id?id=${id}`)
}
const createNewFAQService = (data) => {
    return axios.post(`/api/create-new-faq`, data)
}
const updateFAQService = (data) => {
    return axios.put(`/api/update-faq`, data)
}
const deleteFAQService = (id) => {
    return axios.delete(`/api/delete-faq`, {
        data: {
            id: id
        }
    })
}

export {
    getAllFAQs, getDetailFAQByIdService, createNewFAQService, updateFAQService, deleteFAQService
}