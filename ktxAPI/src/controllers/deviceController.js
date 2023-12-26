import deviceService from "../services/deviceService"
let createNewDevice = async (req, res) => {
    try {
        let data = await deviceService.createNewDevice(req.body);
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

let getDetailDeviceById = async (req, res) => {
    try {
        let data = await deviceService.getDetailDeviceById(req.query.id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getAllDevice = async (req, res) => {
    try {
        let data = await deviceService.getAllDevice(req.query);
        return res.status(200).json(data);
    } catch (error) {
        
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let getAllDeviceByType = async (req, res) => {
    try {
        let data = await deviceService.getAllDeviceByType(req.query.type);
        return res.status(200).json(data);
    } catch (error) {
        
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let updateDevice = async (req, res) => {
    try {
        let data = await deviceService.updateDevice(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let deleteDevice  = async (req, res) => {
    try {
        let data = await deviceService.deleteDevice(req.query.id);
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
    createNewDevice: createNewDevice,
    getDetailDeviceById: getDetailDeviceById,
    getAllDevice: getAllDevice,
    updateDevice: updateDevice,
    deleteDevice: deleteDevice,
    getAllDeviceByType: getAllDeviceByType,
    
}