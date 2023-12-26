import studentViolationService from "../services/studentViolationService";
let createNewStudentViolation = async (req, res) => {
  try {
    let data = await studentViolationService.createNewStudentViolation(
      req.body
    );
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getStudentViolationById = async (req, res) => {
  try {
    let data = await studentViolationService.getStudentViolationById(
      req.query.id
    );
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllStudentViolation = async (req, res) => {
  try {
    let data = await studentViolationService.getAllStudentViolation(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let updateStudentViolation = async (req, res) => {
  try {
    let data = await studentViolationService.updateStudentViolation(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let deleteStudentViolation = async (req, res) => {
  try {
    let data = await studentViolationService.deleteStudentViolation(
      req.query.id
    );
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllStudentViolationByStudentId = async (req, res) => {
  try {
    let data = await studentViolationService.getAllStudentViolationByStudentId(
      req.query
    );
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getStaticsStudentViolation = async (req, res) => {
  try {
    let data = await studentViolationService.getStaticsStudentViolation(
      req.query
    );
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
  createNewStudentViolation: createNewStudentViolation,
  getAllStudentViolation: getAllStudentViolation,
  getStudentViolationById: getStudentViolationById,
  deleteStudentViolation: deleteStudentViolation,
  updateStudentViolation: updateStudentViolation,
  getAllStudentViolationByStudentId: getAllStudentViolationByStudentId,
  getStaticsStudentViolation: getStaticsStudentViolation,
};
