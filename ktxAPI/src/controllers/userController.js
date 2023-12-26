import userService from "../services/userService";

let handleLogin = async (req, res) => {
  try {
    let data = await userService.handleLogin(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let handleChangePassword = async (req, res) => {
  try {
    let data = await userService.handleChangePassword(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let resetPassword = async (req, res) => {
  try {
    let data = await userService.resetPassword(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getDetailUserById = async (req, res) => {
  try {
    let data = await userService.getDetailUserById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllUser = async (req, res) => {
  try {
    let data = await userService.getAllUser(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let updateUser = async (req, res) => {
  try {
    let data = await userService.updateUser(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let setLeader = async (req, res) => {
  try {
    let data = await userService.setLeader(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let createNewUser = async (req, res) => {
  try {
    let data = await userService.createNewUser(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllStudentById = async (req, res) => {
  try {
    let data = await userService.getAllStudentById(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let blockUser = async (req, res) => {
  try {
    let data = await userService.blockUser(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let deleteUser = async (req, res) => {
  try {
    let data = await userService.deleteUser(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let handleSendEmailForgotPassword = async (req, res) => {
  try {
    let data = await userService.handleSendEmailForgotPassword(req.query.email);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getAllUserToText = async (req, res) => {
  try {
    let data = await userService.getAllUserToText(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getCountUser = async (req, res) => {
  try {
    let data = await userService.getCountUser();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getHistory = async (req, res) => {
  try {
    let data = await userService.getHistory(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getHistoryDetailById = async (req, res) => {
  try {
    let data = await userService.getHistoryDetailById(req.query.id);
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
  getHistoryDetailById: getHistoryDetailById,
  handleLogin: handleLogin,
  handleChangePassword: handleChangePassword,
  resetPassword: resetPassword,
  getDetailUserById: getDetailUserById,
  getAllUser: getAllUser,
  updateUser: updateUser,
  createNewUser: createNewUser,
  getAllStudentById: getAllStudentById,
  setLeader: setLeader,
  blockUser: blockUser,
  deleteUser: deleteUser,
  handleSendEmailForgotPassword: handleSendEmailForgotPassword,
  getAllUserToText: getAllUserToText,
  getCountUser: getCountUser,
  getHistory: getHistory,
};
