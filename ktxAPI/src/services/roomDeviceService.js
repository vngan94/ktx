import db from "../models/index";
import constants, { deviceStatus } from "../utils/constants";
import Sequelize from "sequelize";
require("dotenv").config();
const { Op } = require("sequelize");

let createNewRoomDevice = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.roomId || !data.userId || !data.deviceId || !data.status) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        await db.Room_Device.create({
          roomId: data.roomId,
          userId: data.userId,
          deviceId: data.deviceId,
          status: data.status,
        });
        if (data.status === 1) {
          // them
          let res = await db.Device.findOne({
            where: { id: data.deviceId },
            raw: false,
          });
          if (res) {
            res.status = constants.deviceStatus.USED;
            await res.save();
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

let getDetailRoomDeviceById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.Room_Device.findOne({
          where: { id: id },
          raw: false,
          include: {
            model: db.Device,
            as: "deviceData",
          },
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
let getAllRoomDeviceByRoomId = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let objectFilter;
      let dataRegisterDistinct;
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        if (data.keyword !== "")
          objectFilter = {
            raw: true,
            include: [
              {
                model: db.Device,
                as: "deviceData",
                where: {
                  [Op.or]: [
                    { type: { [Op.substring]: data.keyword } },
                    { code: { [Op.substring]: data.keyword } },
                  ],
                },
              },
            ],
            nest: true,
            where: {
              roomId: data.id,
            },
            order: [["id", "DESC"]],
          };
        else {
          objectFilter = {
            raw: true,
            include: [{ model: db.Device, as: "deviceData" }],
            nest: true,
            where: {
              roomId: data.id,
            },
            order: [["id", "DESC"]],
          };
        }

        if (data.limit && data.offset) {
          objectFilter.limit = +data.limit;

          objectFilter.offset = +data.offset;
        }
        let res = await db.Room_Device.findAndCountAll(objectFilter);

        if (res.rows?.length > 0) {
          dataRegisterDistinct = Object.values(
            res.rows
              .reverse()
              .reduce((acc, obj) => ({ ...acc, [obj.deviceId]: obj }), {})
          );
          console.log(dataRegisterDistinct.length);
        }
        dataRegisterDistinct = dataRegisterDistinct?.filter(
          (obj) =>
            obj.status != constants.room_deviceStatus.REMOVED &&
            obj.status != constants.room_deviceStatus.USELESS
        );

        resolve({
          errCode: 0,
          data: dataRegisterDistinct,
          count: dataRegisterDistinct?.length,
          // data: res.rows,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAllRoomByIdDevice = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.Room_Device.findAndCountAll({
          where: {
            deviceId: id,
          },
          include: [
            {
              model: db.Room,
              as: "roomData",
            },
          ],
          raw: true,
          nest: true,
          attributes: [
            [Sequelize.fn("DISTINCT", Sequelize.col("roomId")), "roomId"],
          ],
        });
        if (res.count > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            res.rows[i].timelineData = await db.Room_Device.findAndCountAll({
              where: { roomId: res.rows[i].roomId, deviceId: id },
              order: [["id", "DESC"]],
            });
          }
        }
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
let getAllRoomDevice = (data) => {
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
          [Op.or]: [
            { type: { [Op.substring]: data.keyword } },
            { code: { [Op.substring]: data.keyword } },
          ],
        };
      if (data.status != "") {
        objectFilter.where = { ...objectFilter.where, status: data.status };
      }
      let res = await db.Device.findAndCountAll(objectFilter);
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

let updateRoomDevice = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.status) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let roomDevice = await db.Room_Device.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (roomDevice) {
          await db.Room_Device.create({
            roomId: roomDevice.roomId,
            userId: roomDevice.userId,
            deviceId: roomDevice.deviceId,
            status: data.status,
          });

          if (data.status == constants.room_deviceStatus.USELESS) {
            let roomDevice2 = await db.Device.findOne({
              where: { id: roomDevice.deviceId },
              raw: false,
            });
            if (roomDevice2) {
              roomDevice2.status = constants.room_deviceStatus.USELESS;
              await roomDevice2.save();
            }
          }
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

let deleteRoomDevice = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.Room_Device.findOne({
          where: { id: id },
          raw: false,
        });
        if (res) {
          // res.status = constants.room_deviceStatus.REMOVED;
          // await res.save();
          await db.Room_Device.create({
            roomId: res.roomId,
            userId: res.userId,
            deviceId: res.deviceId,
            status: 4,
          });

          let res2 = await db.Device.findOne({
            where: { id: res.deviceId },
            raw: false,
          });
          res2.status = constants.deviceStatus.NEW;
          await res2.save();

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
let addRoomDeviceToRoom = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let blog = await db.Device.findOne({
          where: { id: id },
        });
        if (blog) {
          await db.Device.destroy({
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
const getCountBroken = (type, arr) => {
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    if (
      arr[i].deviceData.type === type &&
      arr[i].status == constants.room_deviceStatus.BROKEN
    ) {
      count += 1;
    }
  }
  return count;
};
const getCountWorking = (type, arr) => {
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    if (
      (arr[i].deviceData.type === type &&
        arr[i].status == constants.room_deviceStatus.NEW) ||
      arr[i].status == constants.room_deviceStatus.FIXED
    ) {
      count += 1;
    }
  }
  return count;
};

let getStaticsRoomDevice = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataRegisterDistinct;
      if (!data.start || !data.end) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let deviceArr2 = await db.Device.findAndCountAll({
          attributes: [
            "type",
            [Sequelize.fn("count", Sequelize.col("id")), "count"],
          ],
          group: ["type"],
          raw: true,
        });
        if (deviceArr2.count > 0) {
          //
        }
        let deviceArr = await db.Room_Device.findAndCountAll({
          nest: true,
          raw: true,

          where: {
            createdAt: {
              [Op.between]: [data.start, data.end],
            },
          },
          include: [{ model: db.Device, as: "deviceData" }],
          order: [["id", "DESC"]],
        });
        if (deviceArr.count > 0) {
          dataRegisterDistinct = Object.values(
            deviceArr.rows
              .reverse()
              .reduce((acc, obj) => ({ ...acc, [obj.deviceId]: obj }), {})
          );
        }

        if (dataRegisterDistinct?.length > 0 && deviceArr2.rows.length > 0) {
          for (let i = 0; i < deviceArr2.rows.length; i++) {
            deviceArr2.rows[i].countBroken = getCountBroken(
              deviceArr2.rows[i].type,
              dataRegisterDistinct
            );
            deviceArr2.rows[i].countWorking = getCountWorking(
              deviceArr2.rows[i].type,
              dataRegisterDistinct
            );
            deviceArr2.rows[i].count = await db.Device.count({
              where: {
                type: deviceArr2.rows[i].type,
                status: constants.room_deviceStatus.NEW,
                createdAt: {
                  [Op.between]: [data.start, data.end],
                },
              },
            });
          }
        }

        resolve({
          errCode: 0,
          data: {
            data: deviceArr2.rows,
            //  sum: sum,
            // data: dataRegisterDistinct,
          },
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewRoomDevice: createNewRoomDevice,
  getDetailRoomDeviceById: getDetailRoomDeviceById,
  getAllRoomDevice: getAllRoomDevice,
  updateRoomDevice: updateRoomDevice,
  deleteRoomDevice: deleteRoomDevice,
  getAllRoomDeviceByRoomId: getAllRoomDeviceByRoomId,
  addRoomDeviceToRoom: addRoomDeviceToRoom,
  deleteRoomDevice: deleteRoomDevice,
  getAllRoomByIdDevice: getAllRoomByIdDevice,
  getStaticsRoomDevice: getStaticsRoomDevice,
};
