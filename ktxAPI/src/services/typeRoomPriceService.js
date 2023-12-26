import db from "../models/index";
import constants, { typeRoomPriceStatus } from "../utils/constants";
require("dotenv").config();
const { Op } = require("sequelize");

let createNewTypeRoomPrice = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.typeRoomId ||
        !data.priceService ||
        !data.priceTypeRoom ||
        !data.startAt ||
        !data.endAt
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        // cập nhật record có idLast là 1 > 0
        let x = await db.TypeRoom_Price.findOne({
          where: { typeRoomId: data.typeRoomId },
          raw: false,
          order: [["id", "DESC"]],
        });
        if (x) {
          x.isLast = 0;
          x.save();
        }

        await db.TypeRoom_Price.create({
          typeRoomId: data.typeRoomId,
          priceService: data.priceService,
          priceTypeRoom: data.priceTypeRoom,
          startAt: data.startAt,
          endAt: data.endAt,
          isLast: 1,
        });
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

let getTypeRoomPriceById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.TypeRoom_Price.findOne({
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

let getAllTypeRoomPriceById = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let objectFilter = {
        raw: true,
        // nest: true
        where: {
          typeRoomId: data.typeRoomId,
        },
        order: [["id", "DESC"]],
      };
      if (data.limit && data.offset) {
        objectFilter.limit = +data.limit;

        objectFilter.offset = +data.offset;
      }

      let res = await db.TypeRoom_Price.findAndCountAll(objectFilter);
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

let getTypeRoomPriceByTypeRoom = (typeRoomId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeRoomId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let objectFilter = {
          raw: true,
          // nest: true
          where: {
            typeRoomId: typeRoomId,
            isLast: 1,
          },
        };

        let res = await db.TypeRoom_Price.findOne(objectFilter);
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

let updateTypeRoomPrice = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.priceTypeRoom || !data.startAt || !data.endAt) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let typeRoomPrice = await db.TypeRoom_Price.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (typeRoomPrice) {
          typeRoomPrice.priceService = data.priceService
            ? data.priceService
            : 0;
          typeRoomPrice.priceTypeRoom = data.priceTypeRoom;
          typeRoomPrice.startAt = data.startAt;
          typeRoomPrice.endAt = data.endAt;

          await typeRoomPrice.save();
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

let deleteTypeRoomPrice = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let typeRoomPrice = await db.TypeRoom_Price.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (typeRoomPrice) {
          await db.TypeRoom_Price.destroy({
            where: { id: data.id },
          });
          // cập nhật record có idLast là 1 > 0

          let x = await db.TypeRoom_Price.findOne({
            where: { typeRoomId: typeRoomPrice.typeRoomId },
            raw: false,
            order: [["id", "DESC"]],
          });
          if (x && data.id > x.id) {
            x.isLast = 1;
            x.save();
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

module.exports = {
  createNewTypeRoomPrice: createNewTypeRoomPrice,
  getTypeRoomPriceById: getTypeRoomPriceById,
  getAllTypeRoomPriceById: getAllTypeRoomPriceById,
  updateTypeRoomPrice: updateTypeRoomPrice,
  deleteTypeRoomPrice: deleteTypeRoomPrice,
  getTypeRoomPriceByTypeRoom: getTypeRoomPriceByTypeRoom,
};
