import registerService from "../services/registerService";
const { Op } = require("sequelize");

let getAllRegister = async (req, res) => {
  try {
    let data = await registerService.getAllRegister(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let updateRegister = async (req, res) => {
  try {
    let data = await registerService.updateRegister(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getDetailRegisterById = async (req, res) => {
  try {
    let data = await registerService.getDetailRegisterById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getDetailRegisterByStudentId = async (req, res) => {
  try {
    let data = await registerService.getDetailRegisterByStudentId(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let deleteRegister = async (req, res) => {
  try {
    let data = await registerService.deleteRegister(req.body.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let acceptRegister = async (req, res) => {
  console.log(req.body.id);
  try {
    let data = await registerService.acceptRegister(req.body.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let cancelRegister = async (req, res) => {
  try {
    let data = await registerService.cancelRegister(req.body.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let cancelAll = async (req, res) => {
  try {
    let data = await registerService.cancelAll(req.body.userId);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let createNewRegister = async (req, res) => {
  try {
    let data = await registerService.createNewRegister(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllStudentRegisterById = async (req, res) => {
  try {
    let data = await registerService.getAllStudentRegisterById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllRegisterAccept = async (req, res) => {
  try {
    let data = await registerService.getAllRegisterAccept();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllRegisterByStudentId = async (req, res) => {
  try {
    let data = await registerService.getAllRegisterByStudentId(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let checkAccept = async (req, res) => {
  try {
    let data = await registerService.checkAccept(req.body.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getNewResgister = async (req, res) => {
  try {
    let data = await registerService.getNewResgister(req.query.id);
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
  getAllRegister: getAllRegister,
  updateRegister: updateRegister,
  getDetailRegisterById: getDetailRegisterById,
  deleteRegister: deleteRegister,
  getDetailRegisterByStudentId: getDetailRegisterByStudentId,
  createNewRegister: createNewRegister,
  acceptRegister: acceptRegister,
  cancelRegister: cancelRegister,
  deleteRegister: deleteRegister,
  getAllStudentRegisterById: getAllStudentRegisterById,
  getAllRegisterAccept: getAllRegisterAccept,
  getAllRegisterByStudentId: getAllRegisterByStudentId,
  checkAccept: checkAccept,
  cancelAll: cancelAll,
  getNewResgister: getNewResgister,
};
