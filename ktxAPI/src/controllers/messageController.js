import messageService from "../services/messageService";

let getLastMessageById = async (req, res) => {
  try {
    let data = await messageService.getLastMessageById(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let seenMessage = async (req, res) => {
  try {
    let data = await messageService.seenMessage(req.query.groupId);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let createNewMessage = async (req, res) => {
  try {
    let data = await messageService.createNewMessage(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let deleteMessage = async (req, res) => {
  try {
    let data = await messageService.deleteMessage(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let updateMessage = async (req, res) => {
  try {
    let data = await messageService.updateMessage(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let deleteAllMessage = async (req, res) => {
  try {
    let data = await messageService.deleteAllMessage(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getNewMessage = async (req, res) => {
  try {
    let data = await messageService.getNewMessage(req.query.userId);
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
  getLastMessageById: getLastMessageById,
  seenMessage: seenMessage,
  createNewMessage: createNewMessage,
  deleteMessage: deleteMessage,
  updateMessage: updateMessage,
  deleteAllMessage: deleteAllMessage,
  getNewMessage: getNewMessage,
};
