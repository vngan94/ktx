import notificationService from "../services/notificationService";
let createNewNotification = async (req, res) => {
  try {
    let data = await notificationService.createNewNotification(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getDetailNotificationById = async (req, res) => {
  try {
    let data = await notificationService.getDetailNotificationById(
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

let getAllNotification = async (req, res) => {
  try {
    let data = await notificationService.getAllNotification(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let updateNotification = async (req, res) => {
  try {
    let data = await notificationService.updateNotification(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let deleteNotification = async (req, res) => {
  try {
    let data = await notificationService.deleteNotification(req.body.id);
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
  createNewNotification: createNewNotification,
  getDetailNotificationById: getDetailNotificationById,
  getAllNotification: getAllNotification,
  updateNotification: updateNotification,
  deleteNotification: deleteNotification,
};
