import express from "express";
import areaController from "../controllers/areaController";
import messageController from "../controllers/messageController";
import deviceController from "../controllers/deviceController";
import contractController from "../controllers/contractController";
import roomController from "../controllers/roomController";
import typeRoomController from "../controllers/typeRoomController";
import roomBedController from "../controllers/roomBedController";
import typeRoomImageController from "../controllers/typeRoomImageController";
import typeRoomPriceController from "../controllers/typeRoomPriceController";
import codeController from "../controllers/codeController";
import notificationController from "../controllers/notificationController";
import userController from "../controllers/userController";
import registerController from "../controllers/registerController";
import complaintController from "../controllers/complaintController";
import FAQController from "../controllers/FAQController";
import regulationController from "../controllers/regulationController";
import violationActionController from "../controllers/violationActionController";
import studentViolationController from "../controllers/studentViolationController";
import roomDeviceController from "../controllers/roomDeviceController";
import otpController from "../controllers/otpController";

import middlewareControllers from "../middlewares/jwtVerify";
let router = express.Router();
let initwebRoutes = (app) => {
  router.get("/", (req, res) => {
    return res.send("hello");
  });

  //=================API AREA ======================//
  // router.post('/api/create-new-area', middlewareControllers.verifyTokenAdmin, areaController.createNewArea)
  router.post("/api/create-new-area", areaController.createNewArea);
  router.get("/api/get-detail-area", areaController.getDetailAreaById);
  router.get("/api/get-all-area", areaController.getAllArea);
  router.put("/api/update-area", areaController.updateArea);
  router.put("/api/block-area", areaController.blockArea);
  router.delete("/api/delete-area", areaController.deleteArea);
  router.get("/api/get-all-area-by-gender", areaController.getAllAreaByGender);
  router.get(
    "/api/get-all-area-having-room-available-by-gender",
    areaController.getAllAreaHavingRoomAvailableByGender
  );
  router.get("/api/get-statics-area", areaController.getStaticsArea);

  //=================API CONTRACT ======================//
  // router.post('/api/create-new-area', middlewareControllers.verifyTokenAdmin, areaController.createNewArea)
  router.post("/api/create-new-contract", contractController.createNewContract);
  router.get(
    "/api/get-detail-contract",
    contractController.getDetailContractById
  );
  router.get("/api/get-all-contract", contractController.getAllContract);
  router.put("/api/update-contract", contractController.updateContract);
  router.delete("/api/delete-contract", contractController.deleteContract);
  router.get(
    "/api/get-all-contract-by-id",
    contractController.getAllContractById
  );
  router.post("/api/extend-contract", contractController.extendContract);
  router.get("/api/statics-contract", contractController.staticsContract);

  //=================API CODE ======================//
  //router.post('/api/create-new-area', middlewareControllers.verifyTokenAdmin, areaController.createNewArea)
  router.post("/api/create-new-area", areaController.createNewArea);
  router.get("/api/get-detail-area", areaController.getDetailAreaById);
  router.get("/api/get-all-area", areaController.getAllArea);
  router.put("/api/update-area", areaController.updateArea);
  router.put("/api/block-area", areaController.blockArea);

  //=================API USER ======================//
  router.post("/api/login", userController.handleLogin);
  router.put("/api/changepassword", userController.handleChangePassword);
  router.put("/api/resetpassword", userController.resetPassword);
  router.get("/api/get-detail-user", userController.getDetailUserById);
  router.get("/api/get-all-user", userController.getAllUser);
  router.put("/api/update-user", userController.updateUser);
  router.post("/api/add-user", userController.createNewUser);
  router.get("/api/get-all-student-by-id", userController.getAllStudentById);
  router.put("/api/set-leader", userController.setLeader);
  router.put("/api/block-user", userController.blockUser);
  router.post("/api/create-new-user", userController.createNewUser);
  router.delete("/api/delete-user", userController.deleteUser);
  router.get("/api/get-all-user-to-text", userController.getAllUserToText);
  router.get("/api/get-user", userController.getCountUser);
  router.get("/api/get-history", userController.getHistory);
  router.get(
    "/api/get-history-detail-by-id",
    userController.getHistoryDetailById
  );
  router.post(
    "/api/send-forgotpassword-email",
    userController.handleSendEmailForgotPassword
  );
  //========================API REGISTER ====================//
  router.get("/api/get-all-register", registerController.getAllRegister);
  router.get(
    "/api/get-all-register-accept",
    registerController.getAllRegisterAccept
  );
  router.get(
    "/api/get-detail-register-by-id",
    registerController.getDetailRegisterById
  );
  router.get(
    "/api/get-detail-register-by-student-id",
    registerController.getDetailRegisterByStudentId
  );
  router.get(
    "/api/get-all-register-by-student-id",
    registerController.getAllRegisterByStudentId
  );
  router.get("/api/get-new-register", registerController.getNewResgister);
  router.post("/api/create-new-register", registerController.createNewRegister);
  router.put("/api/update-register", registerController.updateRegister);
  router.put("/api/accept-register", registerController.acceptRegister);
  router.put("/api/check-accept", registerController.checkAccept);
  router.put("/api/cancel-register", registerController.cancelRegister);
  router.put("/api/delete-register", registerController.deleteRegister);
  router.get(
    "/api/get-all-student-to-add-roomBed-by-id",
    registerController.getAllStudentRegisterById
  );
  router.put("/api/cancel-all", registerController.cancelAll);

  //=======================API COMPLAINT =====================//
  router.get("/api/get-all-complaint", complaintController.getAllComplaint);
  router.get(
    "/api/get-detail-complaint",
    complaintController.getDetailComplaintById
  );
  router.post(
    "/api/create-new-complaint",
    complaintController.createNewComplaint
  );
  router.delete("/api/delete-complaint", complaintController.deleteComplaint);
  router.put("/api/update-complaint", complaintController.updateComplaint);
  router.get(
    "/api/get-all-complaint-by-student-id",
    complaintController.getAllComplaintById
  );
  router.get("/api/get-new-complaint", complaintController.getNewComplaint);
  // ======================API FAQ==========================// OK
  router.post("/api/create-new-faq", FAQController.createNewFAQ);
  router.delete("/api/delete-faq", FAQController.deleteFAQ);
  router.put("/api/update-faq", FAQController.updateFAQ);
  router.get("/api/get-all-faq", FAQController.getAllFAQ);
  router.get("/api/get-detail-faq-by-id", FAQController.getDetailFAQById);

  //=======================API Regulation====================// OK
  router.get("/api/get-all-regulation", regulationController.getAllRegulation);
  router.post(
    "/api/create-new-regulation",
    regulationController.createNewRegulation
  );
  router.get(
    "/api/get-detail-regulation",
    regulationController.getDetailRegulationById
  );
  router.put("/api/update-regulation", regulationController.updateRegulation);
  router.delete(
    "/api/delete-regulation",
    regulationController.deleteRegulation
  );

  // ======================API Notfication==========================// OK
  router.post(
    "/api/create-new-notification",
    notificationController.createNewNotification
  );
  router.delete(
    "/api/delete-notification",
    notificationController.deleteNotification
  );
  router.put(
    "/api/update-notification",
    notificationController.updateNotification
  );
  router.get(
    "/api/get-all-notification",
    notificationController.getAllNotification
  );
  router.get(
    "/api/get-detail-notification-by-id",
    notificationController.getDetailNotificationById
  );

  //======================= API Code ==================================//
  router.post("/api/create-new-code", codeController.handleCreateNewCode);
  router.put("/api/update-code", codeController.handleUpdateCode);
  router.put("/api/update-code", codeController.handleBlockBed);
  router.delete("/api/delete-code", codeController.handleDeleteCode);
  // //router.get('/api/get-all-code', codeController.getAllCode)
  // router.get('/api/get-list-code', codeController.getListCodeService)
  router.get("/api/get-detail-code-by-id", codeController.getDetailCodeById);
  // router.get('/api/get-all-category-blog', codeController.getAllCategoryBlog)
  router.get("/api/test", codeController.test);
  router.get("/api/get-all-code", codeController.getAllCode);
  router.get(
    "/api/get-all-code-by-type-status",
    codeController.getListCodeByTypeStatus
  );
  router.put("/api/block-bed", codeController.handleBlockBed);
  router.put("/api/unblock-code", codeController.handleUnblockCode);

  //======================== API TYPEROOM =============================//
  router.post("/api/create-new-typeRoom", typeRoomController.createNewTypeRoom);
  router.get(
    "/api/get-detail-typeRoom",
    typeRoomController.getDetailTypeRoomById
  );

  router.put("/api/update-typeRoom", typeRoomController.updateTypeRoom);
  router.put("/api/block-typeRoom", typeRoomController.blockTypeRoom);
  router.get("/api/get-all-typeRoom", typeRoomController.getAllTypeRoom);
  router.get(
    "/api/get-all-typeRoom-active",
    typeRoomController.getAllTypeRoomActive
  );
  router.delete("/api/delete-typeRoom", typeRoomController.deleteTypeRoom);

  //======================== API TYPEROOM_IMAGE =============================//
  router.post(
    "/api/create-new-typeRoomImage",
    typeRoomImageController.createNewTypeRoomImage
  );
  router.get(
    "/api/get-all-typeRoomImage-by-id",
    typeRoomImageController.getAllTypeRoomImageById
  );
  router.get(
    "/api/get-typeRoomImage-by-id",
    typeRoomImageController.getTypeRoomImageById
  );
  router.put(
    "/api/update-typeRoomImage",
    typeRoomImageController.updateTypeRoomImage
  );
  router.delete(
    "/api/delete-typeRoomImage",
    typeRoomImageController.deleteTypeRoomImage
  );

  //======================== API ROOM =============================//
  router.post("/api/create-new-room", roomController.createNewRoom);
  router.put("/api/update-room", roomController.updateRoom);
  router.get("/api/get-detail-room", roomController.getDetailRoomById);
  router.delete("/api/delete-room", roomController.deleteRoom);
  router.put("/api/remove-typeroom-from-room", roomController.removeTypeRoom);
  router.put("/api/add-typeroom-to-room", roomController.addTypeRoom);
  router.put("/api/block-room", roomController.blockRoom);
  router.get("/api/get-all-room-by-id", roomController.getAllRoomById);
  router.get("/api/get-all-room", roomController.getAllRoom);
  router.get(
    "/api/get-all-room-without-typeRoom",
    roomController.getAllRoomByWithoutTypeRoom
  );
  router.get(
    "/api/get-all-room-by-typeRoomId-areaId-available",
    roomController.getAllRoomByTypeRoomAreaAvailable
  );

  //======================== API TYPEROOM_PRICE =============================//
  router.post(
    "/api/create-new-typeRoomPrice",
    typeRoomPriceController.createNewTypeRoomPrice
  );
  router.get(
    "/api/get-all-typeRoomPrice-by-id",
    typeRoomPriceController.getAllTypeRoomPriceById
  );
  router.get(
    "/api/get-typeRoomPrice-by-TypeRoom",
    typeRoomPriceController.getTypeRoomPriceByTypeRoom
  );
  router.get(
    "/api/get-typeRoomPrice-by-id",
    typeRoomPriceController.getTypeRoomPriceById
  );
  router.put(
    "/api/update-typeRoomPrice",
    typeRoomPriceController.updateTypeRoomPrice
  );
  router.delete(
    "/api/delete-typeRoomPrice",
    typeRoomPriceController.deleteTypeRoomPrice
  );

  //======================== API ROOM-BED =============================//
  router.put("/api/update-roombed", roomBedController.updateRoomBed);
  router.get("/api/get-all-bedRoom-by-id", roomBedController.getAllRoomBedById);
  router.get(
    "/api/get-all-roombed-new-by-id",
    roomBedController.getAllRoomBedNewById
  );
  router.get(
    "/api/get-all-roombed-available-for-add-student-by-id",
    roomBedController.getAllRoomBedAvailableById
  );
  router.post("/api/create-new-roombed", roomBedController.createNewRoomBed);
  router.delete("/api/delete-roomBed", roomBedController.deleteRoomBed);
  router.put("/api/block-roomBed", roomBedController.blockRoomBed);
  router.put(
    "/api/delete-student-from-roombed",
    roomBedController.deleteStudent
  );
  router.get(
    "/api/get-all-student-staying",
    roomBedController.getAllStudentStaying
  );
  router.get(
    "/api/get-student-staying-by-id",
    roomBedController.getStudentStayingById
  );
  router.put("/api/change-room-by-id", roomBedController.changeRoomById);
  router.put(
    "/api/change-room-withDifferentTypeRoom",
    roomBedController.changeRoomWithDifferentTypeRoom
  );

  //======================== API VIOLATION_ACTION =============================//
  router.post(
    "/api/create-new-violationAction",
    violationActionController.createNewViolationAction
  );
  router.get(
    "/api/get-all-violationAction",
    violationActionController.getAllViolationAction
  );
  router.get(
    "/api/get-violationAction-by-id",
    violationActionController.getViolationActionById
  );
  router.put(
    "/api/update-violationAction",
    violationActionController.updateViolationAction
  );
  router.delete(
    "/api/delete-violationAction",
    violationActionController.deleteViolationAction
  );
  router.put(
    "/api/block-violationAction",
    violationActionController.blockViolationAction
  );
  router.get(
    "/api/get-all-violation-distinct",
    violationActionController.getAllViolation
  );
  router.get(
    "/api/get-all-action-by-violationId-times",
    violationActionController.getAllActionByViolationIdTimes
  );
  router.get(
    "/api/get-all-times-by-userId-violationId",
    violationActionController.getAllTimesByUserIdViolationId
  );

  //======================== API STUDENTVIOLATION =============================//
  router.post(
    "/api/create-new-studentViolation",
    studentViolationController.createNewStudentViolation
  );
  router.get(
    "/api/get-all-studentViolation",
    studentViolationController.getAllStudentViolation
  );
  router.get(
    "/api/get-studentViolation-by-id",
    studentViolationController.getStudentViolationById
  );
  router.get(
    "/api/get-all-studentViolation-by-student-id",
    studentViolationController.getAllStudentViolationByStudentId
  );
  router.put(
    "/api/update-studentViolation",
    studentViolationController.updateStudentViolation
  );
  router.delete(
    "/api/delete-studentViolation",
    studentViolationController.deleteStudentViolation
  );
  router.get(
    "/api/get-statics-studentViolation",
    studentViolationController.getStaticsStudentViolation
  );

  //=================API DEVICE ======================//
  // router.post('/api/create-new-area', middlewareControllers.verifyTokenAdmin, areaController.createNewArea)
  router.post("/api/create-new-device", deviceController.createNewDevice);
  router.get("/api/get-detail-device", deviceController.getDetailDeviceById);
  router.get("/api/get-all-device", deviceController.getAllDevice);
  router.get(
    "/api/get-all-device-by-type",
    deviceController.getAllDeviceByType
  );
  router.put("/api/update-device", deviceController.updateDevice);
  router.delete("/api/delete-device", deviceController.deleteDevice);

  //=================API ROOM_DEVICE ======================//

  router.get(
    "/api/get-all-roomDevice-by-roomId",
    roomDeviceController.getAllRoomDeviceByRoomId
  );
  router.get(
    "/api/get-all-roomDevice-by-deviceId",
    roomDeviceController.getAllRoomByIdDevice
  );
  router.get(
    "/api/get-detail-roomDevice",
    roomDeviceController.getDetailRoomDeviceById
  );
  router.put("/api/update-room_device", roomDeviceController.updateRoomDevice);
  //    router.delete('/api/delete-room_device', roomDeviceController.deleteRoomDevice)
  router.post(
    "/api/create-new-roomDevice",
    roomDeviceController.createNewRoomDevice
  );
  router.delete(
    "/api/delete-roomDevice",
    roomDeviceController.deleteRoomDevice
  );
  router.get(
    "/api/get-statics-roomDevice",
    roomDeviceController.getStaticsRoomDevice
  );

  // ================= OTP =================

  router.post("/api/send-code", otpController.sendSerivce);
  // router.post("api/verify", otpController.verifyService);

  // ================= Message =================

  router.put("/api/seen-message", messageController.seenMessage);
  router.post("/api/create-new-message", messageController.createNewMessage);
  router.delete("/api/delete-message", messageController.deleteMessage);
  router.put("/api/update-message-by-id", messageController.updateMessage);
  router.delete(
    "/api/delete-all-message-by-id",
    messageController.deleteAllMessage
  );
  router.get("/api/get-new-message", messageController.getNewMessage);

  return app.use("/", router);
};

module.exports = initwebRoutes;
