import areaService from "../services/areaService";
let createNewArea = async (req, res) => {
  try {
    let data = await areaService.createNewArea(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getDetailAreaById = async (req, res) => {
  try {
    let data = await areaService.getDetailAreaById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllArea = async (req, res) => {
  try {
    let data = await areaService.getAllArea(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let updateArea = async (req, res) => {
  try {
    let data = await areaService.updateArea(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let blockArea = async (req, res) => {
  try {
    let data = await areaService.blockArea(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getAllAreaByGender = async (req, res) => {
  try {
    let data = await areaService.getAllAreaByGender(req.query.gender);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let deleteArea = async (req, res) => {
  try {
    let data = await areaService.deleteArea(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getAllAreaHavingRoomAvailableByGender = async (req, res) => {
  try {
    let data = await areaService.getAllAreaHavingRoomAvailableByGender(
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
let getStaticsArea = async (req, res) => {
  try {
    let data = await areaService.getStaticsArea(req.query);
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
  createNewArea: createNewArea,
  getDetailAreaById: getDetailAreaById,
  getAllArea: getAllArea,
  updateArea: updateArea,
  blockArea: blockArea,
  getAllAreaByGender: getAllAreaByGender,
  deleteArea: deleteArea,
  getAllAreaHavingRoomAvailableByGender: getAllAreaHavingRoomAvailableByGender,
  getStaticsArea: getStaticsArea,
};
