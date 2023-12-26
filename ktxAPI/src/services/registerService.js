import db from "../models/index";
import constants, { areaStatus } from "../utils/constants";
require("dotenv").config();
const { Op, Sequelize, where } = require("sequelize");
import moment from "moment";
let createNewRegister = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.userId || !data.roomId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let res = await db.Register.create({
          userId: data.userId,
          roomId: data.roomId,
          status: constants.registerStatus.WAITING,
        });
        resolve({
          errCode: 0,
          errMessage: "ok",
          data: res,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getDetailRegisterById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.Register.findOne({
          where: {
            id: id,
          },
          nest: true,
          raw: true,
          include: [
            { model: db.User, as: "studentData" },
            {
              model: db.Room,
              as: "roomData",
              include: [
                { model: db.Area, as: "areaData" },
                { model: db.TypeRoom, as: "typeroomData" },
              ],
              raw: true,
              nest: true,
            },
          ],
        });
        if (res)
          res.priceData = await db.TypeRoom_Price.findOne({
            where: { typeRoomId: res.roomData.typeRoomId, isLast: 1 },
          });
        resolve({
          errCode: 0,
          data: res,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAllRegisterByStudentId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id) {
        let objectFilter = {
          raw: true,
          include: [
            { model: db.User, as: "studentData" },
            {
              model: db.Room,
              as: "roomData",
              include: [
                { model: db.Area, as: "areaData" },
                { model: db.TypeRoom, as: "typeroomData" },
              ],
            },
          ],
          nest: true,
          where: {
            userId: id,
          },
          order: [["id", "DESC"]],
        };
        let res = await db.Register.findAndCountAll(objectFilter);

        if (res.count > 0) {
          for (let i = 0; i < res.count; i++) {
            res.rows[i].priceData = await db.TypeRoom_Price.findOne({
              where: { typeRoomId: res.rows[i].roomData.typeRoomId, isLast: 1 },
              nest: true,
            });
          }
        }

        resolve({
          errCode: 0,
          data: res.rows,
          count: res.count,
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getDetailRegisterByStudentId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id) {
        let objectFilter = {
          raw: true,
          include: [
            { model: db.User, as: "studentData" },
            {
              model: db.Room,
              as: "roomData",
              include: [
                { model: db.Area, as: "areaData" },
                { model: db.TypeRoom, as: "typeroomData" },
              ],
            },
          ],
          nest: true,
          where: {
            userId: id,
            status: constants.registerStatus.ACCEPT,
          },
        };
        let res = await db.Register.findOne(objectFilter);

        if (res) {
          res.priceData = await db.TypeRoom_Price.findOne({
            where: { typeRoomId: res.roomData.typeRoomId, isLast: 1 },
            nest: true,
          });
        }

        resolve({
          errCode: 0,
          data: res,
          count: res,
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAllRegister = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let objectFilter;
      if (data.keyword) {
        objectFilter = {
          raw: true,
          include: [
            {
              model: db.User,
              as: "studentData",
              where: { code: { [Op.substring]: data.keyword } },
            },

            {
              model: db.Room,
              as: "roomData",
              include: [
                { model: db.Area, as: "areaData" },
                { model: db.TypeRoom, as: "typeroomData" },
              ],
            },
          ],
          nest: true,
          order: [["id", "DESC"]],
        };
      } else {
        objectFilter = {
          raw: true,
          include: [
            { model: db.User, as: "studentData" },
            {
              model: db.Room,
              as: "roomData",
              include: [
                { model: db.Area, as: "areaData" },
                {
                  model: db.TypeRoom,
                  as: "typeroomData",
                },
              ],
            },
          ],
          nest: true,
          order: [["id", "DESC"]],
        };
      }
      if (data.limit && data.offset) {
        objectFilter.limit = +data.limit;

        objectFilter.offset = +data.offset;
      }
      if (data.status !== "") {
        objectFilter.where = {
          ...objectFilter.where,
          status: data.status,
        };
      }
      if (data.startDate !== "" && data.endDate !== "") {
        objectFilter.where = {
          ...objectFilter.where,
          createdAt: {
            [Op.between]: [data.startDate, data.endDate],
          },
        };
      }

      let res = await db.Register.findAndCountAll(objectFilter);

      resolve({
        errCode: 0,
        data: res.rows,
        count: res.count,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let updateRegister = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.roomId || !data.userId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let register = await db.Register.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (register) {
          register.roomId = data.roomId;
          register.userId = data.userId;
          await register.save();
          resolve({
            errCode: 0,
            errMessage: "ok",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let cancelRegister = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let register = await db.Register.findOne({
          where: { id: id },
          raw: false,
        });
        if (register) {
          register.status = constants.registerStatus.CANCEL;

          await register.save();
          resolve({
            errCode: 0,
            errMessage: "ok",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const left = async (idRoom) => {
  let countNow = await db.Room_Bed.findAndCountAll({
    where: {
      roomId: idRoom,
      statusStudent: constants.room_bedStatus.STAYING,
      isLast: 1,
    },
    raw: true,
    nest: true,
  });

  let max = await db.Room.findOne({
    where: { id: idRoom },
    raw: false,
    nest: true,
    include: [{ model: db.TypeRoom, as: "typeroomData" }],
  });
  if (max && countNow) {
    let maxStudent = max.typeroomData.maxStudent;
    let left = maxStudent - countNow.count;
    return left;
  }
  return 0;
};
let acceptRegister = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let register = await db.Register.findOne({
          where: { id: id },
          raw: false,
        });
        if (register) {
          // kiem tra phong dang ky day chua va con
          let leftBed = await left(register.roomId);
          if (leftBed > 0) {
            // cập nhật lại thái phòng nếu chỉ còn 1 slot
            register.status = constants.registerStatus.ACCEPT;
            await register.save();
            let otherRegisters = await db.Register.findAndCountAll({
              where: {
                userId: register.userId,
                status: constants.registerStatus.WAITING,
                id: { [Op.ne]: register.id },
              },
              raw: false,
            });
            if (otherRegisters.count > 0) {
              for (let i = 0; i < otherRegisters.count; i++) {
                let res = await db.Register.findOne({
                  where: { id: otherRegisters.rows[i].id },
                  raw: false,
                });
                if (res) {
                  res.status = constants.registerStatus.FAIL;
                  await res.save();
                }
              }
            }
            resolve({
              errCode: 0,
              errMessage: "ok",
            });
          } else {
            resolve({
              errCode: 2,
              errMessage: "Phòng đăng ký đã đầy. Hãy kiểm tra lại",
            });
          }
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
let deleteRegister = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let blog = await db.Register.findOne({
          where: { id: id },
        });
        if (blog) {
          await db.Register.destroy({
            where: { id: id },
          });
          resolve({
            errCode: 0,
            errMessage: "ok",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllStudentRegisterById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let array = [];
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        // lấy danh sách sinh viên còn hợp đồng và chưa có phòng
        // ntn là chưa có phòng: isLast: 1, status: left
        let res = await db.Contract.findAndCountAll({
          where: {
            status: constants.contractStatus.VALID,
          },
          include: [
            {
              model: db.User,
              as: "studentData",
            },
          ],
          raw: true,
          nest: true,
        });

        if (res.count > 0) {
          for (let i = 0; i < res.count; i++) {
            let isStaying = await db.Room_Bed.findOne({
              where: {
                isLast: 1,
                statusStudent: constants.room_bedStatus.STAYING,
                userId: res.rows[i].studentData.id,
              },
            });
            if (!isStaying) {
              array.push(res.rows[i].studentData);
            }
          }
        }
        resolve({
          errCode: 0,
          data: array,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllRegisterAccept = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let objectFilter = {
        raw: true,
        include: [{ model: db.User, as: "studentData" }],
        nest: true,
        where: {
          status: constants.registerStatus.ACCEPT,
        },
      };
      let res = await db.Register.findAndCountAll(objectFilter);
      resolve({
        errCode: 0,
        data: res.rows,
        count: res.count,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let checkAccept = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        var result = Object.entries(id);

        let arr = [];
        for (let i = 0; i < result.length; i++) {
          let roomId = result[i][0];
          let countRegister = result[i][1];

          let leftBed = await left(roomId);

          if (leftBed < countRegister) {
            arr.push(roomId);
          }
        }
        let res = [];
        if (arr.length > 0) {
          for (let i = 0; i < arr.length; i++) {
            let room = await db.Room.findOne({
              where: {
                id: arr[i],
              },
            });
            res.push(room);
          }
        }

        resolve({
          errCode: 0,
          data: res,
          count: res.length,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let cancelAll = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let otherRegisters = await db.Register.findAndCountAll({
          where: {
            userId: userId,
            status: constants.registerStatus.WAITING,
          },
          raw: false,
        });
        if (otherRegisters.count > 0) {
          for (let i = 0; i < otherRegisters.count; i++) {
            let res = await db.Register.findOne({
              where: { id: otherRegisters.rows[i].id },
              raw: false,
            });
            if (res) {
              res.status = constants.registerStatus.FAIL;
              await res.save();
            }
          }
        }
        resolve({
          errCode: 0,
          errMessage: "ok",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getNewResgister = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let objectFilter = {
        attributes: [
          "userId",
          [Sequelize.fn("count", Sequelize.col("id")), "count"],
        ],
        group: ["userId"],
        where: {
          status: constants.registerStatus.WAITING,
        },
      };
      let res = await db.Register.findAndCountAll(objectFilter);

      resolve({
        errCode: 0,
        data: res.rows?.length,
      });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewRegister: createNewRegister,
  getDetailRegisterById: getDetailRegisterById,
  getAllRegister: getAllRegister,
  updateRegister: updateRegister,
  cancelRegister: cancelRegister,
  getDetailRegisterByStudentId: getDetailRegisterByStudentId,
  acceptRegister: acceptRegister,
  deleteRegister: deleteRegister,
  getAllStudentRegisterById: getAllStudentRegisterById,
  getAllRegisterAccept: getAllRegisterAccept,
  getAllRegisterByStudentId: getAllRegisterByStudentId,
  checkAccept: checkAccept,
  cancelAll: cancelAll,
  getNewResgister: getNewResgister,
};
