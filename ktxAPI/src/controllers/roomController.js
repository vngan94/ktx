import roomService from "../services/roomService"
let createNewRoom = async (req, res) => {
    console.log(req.body)
    try {
        let data = await roomService.createNewRoom(req.body);
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

let getDetailRoomById = async (req, res) => {
    try {
        let data = await roomService.getDetailRoomById(req.query.id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getAllRoom = async (req, res) => {
    try {
        let data = await roomService.getAllRoom(req.query);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let getAllRoomById = async (req, res) => {
    try {
        let data = await roomService.getAllRoomById(req.query);
        return res.status(200).json(data);
    } catch (error) {
        console.log("in")
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let getAllRoomByWithoutTypeRoom = async (req, res) => {
    try {
        let data = await roomService.getAllRoomByWithoutTypeRoom();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getAllRoomByTypeRoomAreaAvailable  = async (req, res) => {
    try {
        let data = await roomService.getAllRoomByTypeRoomAreaAvailable(req.query);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let updateRoom = async (req, res) => {
    try {
        let data = await roomService.updateRoom(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let removeTypeRoom = async (req, res) => {
    try {
        console.log(req.body)
        let data = await roomService.removeTypeRoom(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let addTypeRoom = async (req, res) => {
    try {
        let data = await roomService.addTypeRoom(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let blockRoom = async (req, res) => {
    try {
        let data = await roomService.blockRoom(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let deleteRoom  = async (req, res) => {
    try {
        let data = await roomService.deleteRoom(req.query.id);
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
    createNewRoom: createNewRoom,
    getDetailRoomById: getDetailRoomById,
    getAllRoom: getAllRoom,
    updateRoom: updateRoom,
    blockRoom: blockRoom,
    getAllRoomById: getAllRoomById,
    removeTypeRoom: removeTypeRoom,
    addTypeRoom: addTypeRoom,
    getAllRoomByWithoutTypeRoom: getAllRoomByWithoutTypeRoom,
    getAllRoomByTypeRoomAreaAvailable: getAllRoomByTypeRoomAreaAvailable,
    deleteRoom:deleteRoom
}