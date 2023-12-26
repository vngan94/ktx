import db from "../models/index";
import constants, { roomStatus } from "../utils/constants";
require("dotenv").config();
const { Op } = require("sequelize");

let createNewRoom = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.areaId || !data.typeRoomId || !data.roomName) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let res = await db.Room.findOne({
          where: { roomName: data.roomName },
        });

        if (res) {
          resolve({
            errCode: 2,
            errMessage: "Tên phòng đã tồn tại !",
          });
        } else {
          await db.Room.create({
            roomName: data.roomName,
            areaId: data.areaId,
            typeRoomId: data.typeRoomId,
            status: constants.roomStatus.AVAILABLE,
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

let getDetailRoomById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.Room.findOne({
          where: { id: id },
          raw: false,
          include: [
            { model: db.Area, as: "areaData" },
            { model: db.TypeRoom, as: "typeroomData" },
          ],
          nest: true,
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
let getAllRoom = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res, objectFilter;
      if (data.areaId !== "" && data.typeRoomId !== "" && data.status !== "") {
        // search theo ca 3
        let objectFilter3 = {
          raw: true,
          include: [
            { model: db.Area, as: "areaData", where: { id: data.areaId } },
            {
              model: db.TypeRoom,
              as: "typeroomData",
              where: { id: data.typeRoomId },
            },
          ],
          where: {
            status: data.status,
          },
          nest: true,
          order: [["id", "DESC"]],
        };
        if (data.limit && data.offset) {
          objectFilter3.limit = +data.limit;
          objectFilter3.offset = +data.offset;
        }
        res = await db.Room.findAndCountAll(objectFilter3);
      } else {
        if (data.areaId !== "") {
          // search theo area
          objectFilter = {
            raw: true,
            include: [
              { model: db.Area, as: "areaData", where: { id: data.areaId } },
              { model: db.TypeRoom, as: "typeroomData" },
            ],
            nest: true,
            order: [["id", "DESC"]],
          };
        } else if (data.typeRoomId !== "") {
          // search theo typeroom
          objectFilter = {
            raw: true,
            include: [
              { model: db.Area, as: "areaData" },
              {
                model: db.TypeRoom,
                as: "typeroomData",
                where: { id: data.typeRoomId },
              },
            ],
            nest: true,
          };
        } else if (data.status !== "") {
          // search theo status
          objectFilter = {
            raw: true,
            include: [
              { model: db.Area, as: "areaData" },
              { model: db.TypeRoom, as: "typeroomData" },
            ],
            nest: true,
            where: {
              status: data.status,
            },
            order: [["id", "DESC"]],
          };
        } else {
          objectFilter = {
            raw: true,
            include: [
              { model: db.Area, as: "areaData" },
              { model: db.TypeRoom, as: "typeroomData" },
            ],
            nest: true,
            order: [["id", "DESC"]],
          };
        }
        if (data.limit && data.offset) {
          objectFilter.limit = +data.limit;
          objectFilter.offset = +data.offset;
        }
        if (data.keyword !== "")
          objectFilter.where = {
            ...objectFilter.where,
            roomName: { [Op.substring]: data.keyword },
          };
        res = await db.Room.findAndCountAll(objectFilter);
      }
      for (let i = 0; i < res.rows.length; i++) {
        let countRegister = await db.Register.count({
          where: {
            roomId: res.rows[i].id,
            status: constants.registerStatus.ACCEPT,
          },
        });
        let countStudentStaying = await db.Room_Bed.count({
          where: {
            roomId: res.rows[i].id,
            isLast: 1,
            statusStudent: constants.room_bedStatus.STAYING,
          },
        });
        res.rows[i].countRegister = countRegister;
        res.rows[i].countStudentStaying = countStudentStaying;
      }
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

// let getAllRoom = (data) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let objectFilter = {
//                 raw: true,
//                  nest: true,
//                 include: [
//                     {model: db.Area, as: 'areaData'},
//                     {model: db.TypeRoom, as: 'typeroomData'}
//                 ]
//             }
//             if (data.limit && data.offset) {

//                 objectFilter.limit = +data.limit

//                 objectFilter.offset = +data.offset
//             }

//             if(data.keyword !=='')
//                 objectFilter.where = {...objectFilter.where, roomName: {[Op.substring]: data.keyword  } }

//             let res = await db.Room.findAndCountAll(objectFilter)
//             for (let i = 0; i < res.rows.length; i++) {
//                 let countRegister = await db.Register.count({ where: { roomId: res.rows[i].id, status: constants.registerStatus.ACCEPT } })
//                 let countStudentStaying = await db.Room_Bed.count({ where  :  {roomId : res.rows[i].id, isLast: 1, statusStudent: constants.room_bedStatus.STAYING}})
//                 res.rows[i].countRegister = countRegister

//                res.rows[i].countStudentStaying = countStudentStaying

//             }
//             resolve({
//                 errCode: 0,
//                 data: res.rows,
//                 count: res.count
//             })
//         } catch (error) {
//             reject(error)
//         }
//     })
// }

let getAllRoomById = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.typeRoomId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let objectFilter = {
          raw: true,
          nest: true,
          where: {
            typeRoomId: data.typeRoomId,
          },
          include: [{ model: db.Area, as: "areaData" }],
        };
        if (data.limit && data.offset) {
          objectFilter.limit = +data.limit;

          objectFilter.offset = +data.offset;
        }
        if (data.keyword !== "")
          objectFilter.where = {
            ...objectFilter.where,
            roomName: { [Op.substring]: data.keyword },
          };
        let res = await db.Room.findAndCountAll(objectFilter);
        resolve({
          errCode: 0,
          data: res.rows,
          count: res.count,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateRoom = (data) => {
  // chưa xong
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.areaId || !data.typeRoomId || !data.roomName) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let room = await db.Room.findOne({
          where: { id: data.id },
          raw: false,
        });

        if (room) {
          // kiểm tra số sinh viên đang ở + đăng ký > max student của loại phòng

          // kiểm tra tên phòng có trùng hay không
          if (room.roomName === data.roomName) {
            room.areaId = data.areaId;
            room.typeRoomId = data.typeRoomId;

            await room.save();
            resolve({
              errCode: 0,
              errMessage: "ok",
            });
          } else {
            let count = await db.Room.count({
              where: { roomName: data.roomName },
              raw: false,
            });
            if (count > 0) {
              resolve({
                errCode: 2,
                errMessage: "Tên phòng đã tồn tại !",
              });
            } else {
              room.roomName = data.roomName;
              room.areaId = data.areaId;
              room.typeRoomId = data.typeRoomId;
              await room.save();
              resolve({
                errCode: 0,
                errMessage: "ok",
              });
            }
          }
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let blockRoom = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let room = await db.Room.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (room) {
          if (room.status == constants.roomStatus.INACTIVE) {
            room.status = constants.roomStatus.AVAILABLE;
          } else {
            room.status = constants.roomStatus.INACTIVE;
          }

          await room.save();
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
let removeTypeRoom = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let room = await db.Room.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (room) {
          room.typeRoomId = null;
          await room.save();
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
let addTypeRoom = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.typeRoomId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let room = await db.Room.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (room) {
          room.typeRoomId = data.typeRoomId;
          await room.save();
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

let getAllRoomByWithoutTypeRoom = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let objectFilter = {
        raw: true,
        where: {
          typeRoomId: { [Op.is]: null },

          status: { [Op.not]: constants.roomStatus.INACTIVE },
        },
        order: [["id", "DESC"]],
      };

      let res = await db.Room.findAndCountAll(objectFilter);
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

let getAllRoomByTypeRoomAreaAvailable = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.typeRoomId || !data.areaId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.Room.findAndCountAll({
          where: {
            areaId: data.areaId,
            typeRoomId: data.typeRoomId,
            status: constants.roomStatus.AVAILABLE,
          },
          raw: false,
        });
        resolve({
          errCode: 0,
          data: res.rows,
          count: res.count,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let deleteRoom = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let blog = await db.Room.findOne({
          where: { id: id },
        });
        if (blog) {
          await db.Room.destroy({
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

module.exports = {
  createNewRoom: createNewRoom,
  getDetailRoomById: getDetailRoomById,
  getAllRoom: getAllRoom,
  updateRoom: updateRoom,
  blockRoom: blockRoom,
  getAllRoomById: getAllRoomById,
  removeTypeRoom: removeTypeRoom,
  addTypeRoom: addTypeRoom,
  getAllRoomByWithoutTypeRoom: getAllRoomByWithoutTypeRoom,
  getAllRoomByTypeRoomAreaAvailable: getAllRoomByTypeRoomAreaAvailable,
  deleteRoom: deleteRoom,
};
