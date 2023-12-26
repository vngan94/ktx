import typeRoomService from "../services/typeRoomService";
let createNewTypeRoom = async (req, res) => {
  try {
    let data = await typeRoomService.createNewTypeRoom(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getDetailTypeRoomById = async (req, res) => {
  try {
    let data = await typeRoomService.getDetailTypeRoomById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllTypeRoom = async (req, res) => {
  try {
    let data = await typeRoomService.getAllTypeRoom(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getAllTypeRoomActive = async (req, res) => {
  try {
    let data = await typeRoomService.getAllTypeRoomActive(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let updateTypeRoom = async (req, res) => {
  try {
    let data = await typeRoomService.updateTypeRoom(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let blockTypeRoom = async (req, res) => {
  try {
    let data = await typeRoomService.blockTypeRoom(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let deleteTypeRoom = async (req, res) => {
  try {
    let data = await typeRoomService.deleteTypeRoom(req.query.id);
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
  createNewTypeRoom: createNewTypeRoom,
  getDetailTypeRoomById: getDetailTypeRoomById,
  getAllTypeRoom: getAllTypeRoom,
  updateTypeRoom: updateTypeRoom,
  blockTypeRoom: blockTypeRoom,
  getAllTypeRoomActive: getAllTypeRoomActive,
  deleteTypeRoom: deleteTypeRoom,
};
