import typeRoomImageService from "../services/typeRoomImageService"
let createNewTypeRoomImage = async (req, res) => {
    try {
   
        let data = await typeRoomImageService.createNewTypeRoomImage(req.body);
        return res.status(200).json(data);
    }
    catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let getTypeRoomImageById = async (req, res) => {
    try {
   
        let data = await typeRoomImageService.getTypeRoomImageById(req.query.id);
        return res.status(200).json(data);
    }
    catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getAllTypeRoomImageById = async (req, res) => {
    try {
        let data = await typeRoomImageService.getAllTypeRoomImageById(req.query);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getAllTypeRoomImage = async (req, res) => {
    try {
        let data = await typeRoomImageService.getAllTypeRoomImage(req.query);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let updateTypeRoomImage = async (req, res) => {

    try {
        let data = await typeRoomImageService.updateTypeRoomImage(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let deleteTypeRoomImage = async (req, res) => {
    try {
        let data = await typeRoomImageService.deleteTypeRoomImage(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    createNewTypeRoomImage: createNewTypeRoomImage,
    getAllTypeRoomImageById: getAllTypeRoomImageById,
    getAllTypeRoomImage: getAllTypeRoomImage,
    updateTypeRoomImage: updateTypeRoomImage,
    deleteTypeRoomImage: deleteTypeRoomImage,
    getTypeRoomImageById: getTypeRoomImageById
}