import roomBedService from "../services/roomBedService";
let createNewRoomBed = async (req, res) => {
  console.log(req.body);
  try {
    let data = await roomBedService.createNewRoomBed(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getDetailRoomBedById = async (req, res) => {
  try {
    let data = await roomBedService.getDetailRoomBedById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllRoomBed = async (req, res) => {
  try {
    let data = await roomBedService.getAllRoomBed(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getAllRoomBedById = async (req, res) => {
  try {
    let data = await roomBedService.getAllRoomBedById(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let updateRoomBed = async (req, res) => {
  try {
    let data = await roomBedService.updateRoomBed(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getCountStudentStayingById = async (req, res) => {
  try {
    let data = await roomBedService.getCountStudentStayingById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getAllRoomBedNewById = async (req, res) => {
  try {
    let data = await roomBedService.getAllRoomBedNewById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let deleteRoomBed = async (req, res) => {
  try {
    let data = await roomBedService.deleteRoomBed(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let blockRoomBed = async (req, res) => {
  try {
    let data = await roomBedService.blockRoomBed(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let deleteStudent = async (req, res) => {
  try {
    let data = await roomBedService.deleteStudent(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getAllRoomBedAvailableById = async (req, res) => {
  try {
    let data = await roomBedService.getAllRoomBedAvailableById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getAllStudentStaying = async (req, res) => {
  try {
    let data = await roomBedService.getAllStudentStaying();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getStudentStayingById = async (req, res) => {
  try {
    let data = await roomBedService.getStudentStayingById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let changeRoomById = async (req, res) => {
  try {
    let data = await roomBedService.changeRoomById(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let changeRoomWithDifferentTypeRoom = async (req, res) => {
  try {
    let data = await roomBedService.changeRoomWithDifferentTypeRoom(req.body);
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
  createNewRoomBed: createNewRoomBed,
  getDetailRoomBedById: getDetailRoomBedById,
  getAllRoomBed: getAllRoomBed,
  updateRoomBed: updateRoomBed,
  getCountStudentStayingById: getCountStudentStayingById,
  getAllRoomBedById: getAllRoomBedById,
  getAllRoomBedNewById: getAllRoomBedNewById,
  deleteRoomBed: deleteRoomBed,
  blockRoomBed: blockRoomBed,
  deleteStudent: deleteStudent,
  getAllRoomBedAvailableById: getAllRoomBedAvailableById,
  getAllStudentStaying: getAllStudentStaying,
  getStudentStayingById: getStudentStayingById,
  changeRoomById: changeRoomById,
  changeRoomWithDifferentTypeRoom: changeRoomWithDifferentTypeRoom,
};
