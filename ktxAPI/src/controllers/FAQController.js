import FAQService from "../services/FAQService"
let createNewFAQ = async (req, res) => {
    try {
     
        let data = await FAQService.createNewFAQ(req.body);
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

let getDetailFAQById = async (req, res) => {

    try {
        let data = await FAQService.getDetailFAQById(req.query.id);

        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getAllFAQ = async (req, res) => {
    try {
        let data = await FAQService.getAllFAQ(req.query);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let updateFAQ = async (req, res) => {
    try {
        let data = await FAQService.updateFAQ(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let deleteFAQ = async (req, res) => {
    try {
        let data = await FAQService.deleteFAQ(req.body.id);
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
    createNewFAQ: createNewFAQ,
    getDetailFAQById: getDetailFAQById,
    getAllFAQ: getAllFAQ,
    updateFAQ: updateFAQ,
    deleteFAQ: deleteFAQ
}