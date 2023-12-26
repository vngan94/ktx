import roomDeviceService from "../services/roomDeviceService";
let createNewRoomDevice = async (req, res) => {
  try {
    let data = await roomDeviceService.createNewRoomDevice(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getDetailRoomDeviceById = async (req, res) => {
  try {
    let data = await roomDeviceService.getDetailRoomDeviceById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllRoomDevice = async (req, res) => {
  try {
    let data = await roomDeviceService.getAllRoomDevice(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getAllRoomDeviceByRoomId = async (req, res) => {
  try {
    let data = await roomDeviceService.getAllRoomDeviceByRoomId(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getAllRoomByIdDevice = async (req, res) => {
  try {
    let data = await roomDeviceService.getAllRoomByIdDevice(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let updateRoomDevice = async (req, res) => {
  try {
    let data = await roomDeviceService.updateRoomDevice(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let deleteRoomDevice = async (req, res) => {
  try {
    let data = await roomDeviceService.deleteRoomDevice(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getStaticsRoomDevice = async (req, res) => {
  try {
    let data = await roomDeviceService.getStaticsRoomDevice(req.query);
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
  createNewRoomDevice: createNewRoomDevice,
  getDetailRoomDeviceById: getDetailRoomDeviceById,
  getAllRoomDevice: getAllRoomDevice,
  updateRoomDevice: updateRoomDevice,
  deleteRoomDevice: deleteRoomDevice,
  getAllRoomDeviceByRoomId: getAllRoomDeviceByRoomId,
  getAllRoomByIdDevice: getAllRoomByIdDevice,
  getStaticsRoomDevice: getStaticsRoomDevice,
};
