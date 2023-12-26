import axios from "../axios";

const getAllNotification = (data) => {
    return axios.get(`/api/get-all-notification?limit=${data.limit}&offset=${data.offset}&keyword=${data.keyword}&tagId=${data.tagId}`)

}
const getDetailNotificationByIdService = (id) => {
    return axios.get(`/api/get-detail-notification-by-id?id=${id}`)
}
const createNewNotificationService = (data) => {
    return axios.post(`/api/create-new-notification`, data)
}
const updateNotificationService = (data) => {
    return axios.put(`/api/update-notification`, data)
}
const deleteNotificationService = (id) => {
    return axios.delete(`/api/delete-notification`, {
        data: {
            id: id
        }
    })
}

export {
    getAllNotification, getDetailNotificationByIdService, createNewNotificationService, updateNotificationService, deleteNotificationService
}