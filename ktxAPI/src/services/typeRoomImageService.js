import db from "../models/index";
import constants, { typeRoomImageStatus } from "../utils/constants";
require("dotenv").config();
const { Op } = require("sequelize");

let createNewTypeRoomImage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.typeRoomId || !data.image || !data.caption) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        await db.TypeRoom_Image.create({
          caption: data.caption,
          image: data.image,
          typeRoomId: data.typeRoomId,
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

let getTypeRoomImageById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.TypeRoom_Image.findOne({
          where: { id: id },
          raw: false,
        });
        if (res && res.image) {
          res.image = new Buffer(res.image, "base64").toString("binary");
        }
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

let getAllTypeRoomImageById = (data) => {
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

        let res = await db.TypeRoom_Image.findAndCountAll(objectFilter);
        if (res.rows && res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            if (res.rows[i].image !== null)
              res.rows[i].image = new Buffer(
                res.rows[i].image,
                "base64"
              ).toString("binary");
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

let updateTypeRoomImage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.image || !data.caption) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let typeRoomImage = await db.TypeRoom_Image.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (typeRoomImage) {
          typeRoomImage.image = data.image;
          typeRoomImage.caption = data.caption;
          await typeRoomImage.save();
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

let deleteTypeRoomImage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let typeRoomImage = await db.TypeRoom_Image.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (typeRoomImage) {
          await db.TypeRoom_Image.destroy({
            where: { id: data.id },
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
  createNewTypeRoomImage: createNewTypeRoomImage,
  getTypeRoomImageById: getTypeRoomImageById,
  getAllTypeRoomImageById: getAllTypeRoomImageById,
  updateTypeRoomImage: updateTypeRoomImage,
  deleteTypeRoomImage: deleteTypeRoomImage,
};
