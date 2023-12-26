import regulationService from "../services/regulationService"
let createNewRegulation = async (req, res) => {
    try {
        let data = await regulationService.createNewRegulation(req.body);
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

let getDetailRegulationById = async (req, res) => {
    try {
       
        let data = await regulationService.getDetailRegulationById(req.query.id);
       
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getAllRegulation = async (req, res) => {
   
    try {
        let data = await regulationService.getAllRegulation(req.query);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let updateRegulation = async (req, res) => {
    try {
        let data = await regulationService.updateRegulation(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let deleteRegulation = async (req, res) => {
    try {
        let data = await regulationService.deleteRegulation(req.body.id);
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
    createNewRegulation: createNewRegulation,
    getDetailRegulationById: getDetailRegulationById,
    updateRegulation: updateRegulation,
    deleteRegulation: deleteRegulation,
    getAllRegulation: getAllRegulation,
}