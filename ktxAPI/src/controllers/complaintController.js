import complaintService from "../services/complaintService";
let deleteComplaint = async (req, res) => {
  try {
    let data = await complaintService.deleteComplaint(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let updateComplaint = async (req, res) => {
  try {
    let data = await complaintService.updateComplaint(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getDetailComplaintById = async (req, res) => {
  try {
    let data = await complaintService.getDetailComplaintById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllComplaint = async (req, res) => {
  try {
    let data = await complaintService.getAllComplaint(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let createNewComplaint = async (req, res) => {
  try {
    let data = await complaintService.createNewComplaint(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllComplaintById = async (req, res) => {
  try {
    let data = await complaintService.getAllComplaintById(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getNewComplaint = async (req, res) => {
  try {
    let data = await complaintService.getNewComplaint();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  deleteComplaint: deleteComplaint,
  updateComplaint: updateComplaint,
  getAllComplaint: getAllComplaint,
  getDetailComplaintById: getDetailComplaintById,
  createNewComplaint: createNewComplaint,
  getAllComplaintById: getAllComplaintById,
  getNewComplaint: getNewComplaint,
};
