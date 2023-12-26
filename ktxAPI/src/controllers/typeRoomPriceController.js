import typeRoomPriceService from "../services/typeRoomPriceService";
let createNewTypeRoomPrice = async (req, res) => {
  try {
    let data = await typeRoomPriceService.createNewTypeRoomPrice(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllTypeRoomPriceById = async (req, res) => {
  try {
    let data = await typeRoomPriceService.getAllTypeRoomPriceById(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllTypeRoomPrice = async (req, res) => {
  try {
    let data = await typeRoomPriceService.getAllTypeRoomPrice(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getTypeRoomPriceById = async (req, res) => {
  try {
    let data = await typeRoomPriceService.getTypeRoomPriceById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getTypeRoomPriceByTypeRoom = async (req, res) => {
  try {
    let data = await typeRoomPriceService.getTypeRoomPriceByTypeRoom(
      req.query.typeRoomId
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
let updateTypeRoomPrice = async (req, res) => {
  try {
    let data = await typeRoomPriceService.updateTypeRoomPrice(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let deleteTypeRoomPrice = async (req, res) => {
  try {
    let data = await typeRoomPriceService.deleteTypeRoomPrice(req.body);
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
  createNewTypeRoomPrice: createNewTypeRoomPrice,
  getAllTypeRoomPriceById: getAllTypeRoomPriceById,
  getAllTypeRoomPrice: getAllTypeRoomPrice,
  updateTypeRoomPrice: updateTypeRoomPrice,
  deleteTypeRoomPrice: deleteTypeRoomPrice,
  getTypeRoomPriceById: getTypeRoomPriceById,
  getTypeRoomPriceByTypeRoom: getTypeRoomPriceByTypeRoom,
};
