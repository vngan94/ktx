import db from "../models/index";
import constants, { areaStatus } from "../utils/constants";
require("dotenv").config();
const { Op } = require("sequelize");

let createNewArea = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.areaName || !data.gender) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let res = await db.Area.findOne({
          where: { areaName: data.areaName },
        });

        if (res) {
          resolve({
            errCode: 2,
            errMessage: "Tên khu đã tồn tại !",
          });
        } else {
          await db.Area.create({
            areaName: data.areaName,
            gender: data.gender,
            status: constants.areaStatus.ACTIVE,
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

let getDetailAreaById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.Area.findOne({
          where: { id: id },
          raw: false,
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

let getAllArea = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let objectFilter = {
        raw: true,
        order: [["id", "DESC"]],

        // nest: true
      };
      if (data.limit && data.offset) {
        objectFilter.limit = +data.limit;

        objectFilter.offset = +data.offset;
      }

      if (data.keyword !== "")
        objectFilter.where = {
          ...objectFilter.where,
          areaName: { [Op.substring]: data.keyword },
        };
      let res = await db.Area.findAndCountAll(objectFilter);
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

let updateArea = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.areaName || !data.gender) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let area = await db.Area.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (area) {
          if (area.areaName === data.areaName) {
            area.gender = data.gender;
            await area.save();
            resolve({
              errCode: 0,
              errMessage: "ok",
            });
          } else {
            let count = await db.Area.count({
              where: { areaName: data.areaName },
              raw: false,
            });
            if (count > 0) {
              resolve({
                errCode: 2,
                errMessage: "Tên khu đã tồn tại !",
              });
            } else {
              area.areaName = data.areaName;
              area.gender = data.gender;
              await area.save();
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

let blockArea = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || data.status === "undefined") {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let area = await db.Area.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (area) {
          area.status = data.status === 0 ? 1 : 0;
          await area.save();
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

let getAllAreaByGender = (gender) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!gender) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.Area.findAndCountAll({
          where: { gender: gender, status: constants.areaStatus.ACTIVE },
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
let deleteArea = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let blog = await db.Area.findOne({
          where: { id: id },
        });
        if (blog) {
          await db.Area.destroy({
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

let getAllAreaHavingRoomAvailableByGender = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.typeRoomId || !data.gender) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let objectFilter = {
          raw: true,
          where: {
            typeRoomId: data.typeRoomId,
            status: constants.roomStatus.AVAILABLE,
          },
          include: [
            {
              model: db.Area,
              as: "areaData",
              where: {
                gender: data.gender,
                status: constants.areaStatus.ACTIVE,
              },
            },
          ],
          nest: true,
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

const getCountStudentStaying = (areaId, roomArr) => {
  let count = 0;

  for (let i = 0; i < roomArr.count; i++) {
    if (roomArr.rows[i].areaId == areaId) {
      count += roomArr.rows[i].countStudentStaying;
    }
  }
  return count;
};
const getCountRoomAvailable = (areaId, roomArr) => {
  let count = 0;

  for (let i = 0; i < roomArr.count; i++) {
    if (
      roomArr.rows[i].areaId == areaId &&
      roomArr.rows[i].isAvailable === true
    ) {
      count += 1;
    }
  }
  return count;
};

let getStaticsArea = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataContractDistinct;
      let total = 0;
      let sum = {
        countArea: 0,
        countRoom: 0,
        countRoomAvailable: 0,
        countRoomFull: 0,
        countRoomAvailable: 0,
        countStudentStaying: 0,
      };
      if (!data.start || !data.end) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let areaArr = await db.Area.findAndCountAll({
          nest: true,
          raw: true,
        });

        let roomArr = await db.Room.findAndCountAll({
          raw: true,
          include: [
            { model: db.Area, as: "areaData" },
            { model: db.TypeRoom, as: "typeroomData" },
          ],
          nest: true,
        });
        if (roomArr.count > 0) {
          for (let i = 0; i < roomArr.rows.length; i++) {
            let countStudentStaying = await db.Room_Bed.count({
              where: {
                roomId: roomArr.rows[i].id,
                isLast: 1,
                statusStudent: constants.room_bedStatus.STAYING,
                updatedAt: {
                  [Op.between]: [data.start, data.end],
                },
              },
            });
            roomArr.rows[i].countStudentStaying = countStudentStaying;
            roomArr.rows[i].isAvailable =
              roomArr.rows[i].typeroomData.maxStudent - countStudentStaying > 0
                ? true
                : false;
          }
        }
        if (areaArr.count > 0 && roomArr.count > 0) {
          for (let i = 0; i < areaArr.count; i++) {
            areaArr.rows[i].countRoomAll = await db.Room.count({
              where: {
                areaId: areaArr.rows[i].id,
              },
            });
            areaArr.rows[i].countRoomAvailable = getCountRoomAvailable(
              areaArr.rows[i].id,
              roomArr
            );
            areaArr.rows[i].countRoomFull =
              areaArr.rows[i].countRoomAll - areaArr.rows[i].countRoomAvailable;
            areaArr.rows[i].countStudentStaying = getCountStudentStaying(
              areaArr.rows[i].id,
              roomArr
            );
            sum.countArea += 1;
            sum.countRoom += areaArr.rows[i].countRoomAll;
            sum.countRoomAvailable += areaArr.rows[i].countRoomAvailable;
            sum.countRoomFull += areaArr.rows[i].countRoomFull;
            sum.countStudentStaying += areaArr.rows[i].countStudentStaying;
          }
        }

        resolve({
          errCode: 0,
          data: {
            data: areaArr.rows,
            sum: sum,
          },
        });
      }
    } catch (error) {
      reject(error);
    }
  });
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
