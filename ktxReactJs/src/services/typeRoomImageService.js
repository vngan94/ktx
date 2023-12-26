import axios from "../axios";

const getAllTypeRoomImage = (data) => {
    return axios.get(`/api/get-all-room?limit=${data.limit}&offset=${data.offset}&keyword=${data.keyword}&tagId=${data.tagId}`)

}
const getAllTypeRoomImageByIdService = (data) => {
    return axios.get(`/api/get-all-typeRoomImage-by-id?limit=${data.limit}&offset=${data.offset}&typeRoomId=${data.typeRoomId}`)

}
const getTypeRoomImageByIdService = (id) => {
    return axios.get(`/api/get-typeRoomImage-by-id?id=${id}`)
}
const createNewTypeRoomImageService = (data) => {
    return axios.post(`/api/create-new-typeRoomImage`, data)
}
const updateTypeRoomImageService = (data) => {
    return axios.put(`/api/update-typeRoomImage`, data)
}
const deleteTypeRoomImageService = (id) => {
    return axios.delete(`/api/delete-typeRoomImage`, {
        data: {
            id: id
        }
    })
}

export {
    getAllTypeRoomImage, getTypeRoomImageByIdService, createNewTypeRoomImageService, updateTypeRoomImageService, deleteTypeRoomImageService, getAllTypeRoomImageByIdService
}