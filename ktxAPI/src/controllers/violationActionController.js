import violationActionService from "../services/violationActionService"
let createNewViolationAction = async (req, res) => {
    try {
        let data = await violationActionService.createNewViolationAction(req.body);
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

let getViolationActionById = async (req, res) => {
    try {
        let data = await violationActionService.getViolationActionById(req.query.id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getAllViolationAction = async (req, res) => {
    try {
        let data = await violationActionService.getAllViolationAction(req.query);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let updateViolationAction = async (req, res) => {
    try {
        let data = await violationActionService.updateViolationAction(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let blockViolationAction = async (req, res) => {
    try {
        let data = await violationActionService.blockViolationAction(req.query);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let deleteViolationAction = async (req, res) => {
    try {
        let data = await violationActionService.deleteViolationAction(req.query.id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let getAllViolation = async (req, res) => {
    try {
        let data = await violationActionService.getAllViolation();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let getAllActionByViolationIdTimes = async (req, res) => {
    try {
        let data = await violationActionService.getAllActionByViolationIdTimes(req.query);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let getAllTimesByUserIdViolationId = async (req, res) => {
    try {
        let data = await violationActionService.getAllTimesByUserIdViolationId(req.query);
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
    createNewViolationAction: createNewViolationAction,
    getAllViolationAction: getAllViolationAction,
    getViolationActionById: getViolationActionById,
    deleteViolationAction: deleteViolationAction,
    blockViolationAction: blockViolationAction,
    
    updateViolationAction: updateViolationAction,

    getAllViolation: getAllViolation,
    getAllActionByViolationIdTimes: getAllActionByViolationIdTimes,
    getAllTimesByUserIdViolationId:getAllTimesByUserIdViolationId
}