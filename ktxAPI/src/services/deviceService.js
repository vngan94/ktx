import db from "../models/index";
import constants, { deviceStatus } from "../utils/constants";
require("dotenv").config();
const { Op } = require("sequelize");

let createNewDevice = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.type || !data.userId || !data.quantity) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let type = data.type.toUpperCase();
        let res = await db.Device.findOne({
          where: { type: type },
          order: [["id", "DESC"]],
          limit: 1,
        });
        let numberLastOfCode = 0;
        if (res) {
          numberLastOfCode = res.code.split("_")[1];
        }

        for (let i = 0; i < data.quantity; i++) {
          await db.Device.create({
            type: type,
            code: type + "_" + (parseInt(numberLastOfCode) + 1 + i),
            userId: data.userId,
            status: constants.deviceStatus.NEW,
          });
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

let getDetailDeviceById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.Device.findOne({
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
let getAllDeviceByType = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.Device.findAndCountAll({
          where: { type: data, status: constants.deviceStatus.NEW },
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

let getAllDevice = (data) => {
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
      for (let i = 0; i < res.rows.length; i++) {
        res.rows[i].roomData = await db.Room_Device.findOne({
          where: { deviceId: res.rows[i].id },
          nest: true,
          raw: true,
          include: [{ model: db.Room, as: "roomData" }],
        });
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

let updateDevice = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.type || !data.code) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let device = await db.Device.findOne({
          where: { id: data.id },
          raw: false,
        });

        if (device) {
          if (device.code === data.code) {
            device.type = data.type;
            await device.save();
            resolve({
              errCode: 0,
              errMessage: "ok",
            });
          } else {
            let count = await db.Device.count({
              where: { code: data.code },
              raw: false,
            });
            if (count > 0) {
              resolve({
                errCode: 2,
                errMessage: "Mã thiết bị đã tồn tại !",
              });
            } else {
              device.type = data.type;
              device.code = data.code;
              await device.save();
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

let deleteDevice = (id) => {
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

module.exports = {
  createNewDevice: createNewDevice,
  getDetailDeviceById: getDetailDeviceById,
  getAllDevice: getAllDevice,
  getAllDeviceByType: getAllDeviceByType,
  updateDevice: updateDevice,
  deleteDevice: deleteDevice,
};
