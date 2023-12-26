import db from "../models/index";
import constants, { typeRoomStatus } from "../utils/constants";
require("dotenv").config();
const { Op } = require("sequelize");

let createNewTypeRoom = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.typeRoomName ||
        !data.maxStudent ||
        !data.priceService ||
        !data.caption ||
        !data.priceTypeRoom ||
        !data.image ||
        !data.startAt ||
        !data.endAt
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let res = await db.TypeRoom.create({
          typeRoomName: data.typeRoomName,
          maxStudent: data.maxStudent,
          status: constants.typeRoomStatus.ACTIVE,
        });

        await db.TypeRoom_Image.create({
          caption: data.caption,
          image: data.image,
          typeRoomId: res.id,
        });

        await db.TypeRoom_Price.create({
          typeRoomId: res.id,
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

let getDetailTypeRoomById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.TypeRoom.findOne({
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

let getAllTypeRoom = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let objectFilter = {
        raw: true,
        // nest: true
        order: [["id", "DESC"]],
      };
      if (data.limit && data.offset) {
        objectFilter.limit = +data.limit;

        objectFilter.offset = +data.offset;
      }
      if (data.keyword !== "")
        objectFilter.where = {
          ...objectFilter.where,
          typeRoomName: { [Op.substring]: data.keyword },
        };
      let res = await db.TypeRoom.findAndCountAll(objectFilter);
      //   if (res.rows && res.rows.length > 0) {
      //     for (let i = 0; i < res.rows.length; i++) {
      //       res.rows[i].imageData = await db.TypeRoom_Image.findAndCountAll({
      //         where: { typeRoomId: res.rows[i].id },
      //         nest: true,
      //         raw: true,
      //       });
      //       res.rows[i].priceData = await db.TypeRoom_Price.findOne({
      //         where: { typeRoomId: res.rows[i].id, isLast: 1 },
      //         nest: true,
      //         raw: true,
      //       });
      //       // res.rows[i].roomBedData.roomData = await db.Room.findOne({
      //       //     where:{id:res.rows[i].roomBedData.roomId },
      //       //     nest: true,
      //       // })
      //     }
      //   }
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
let getAllTypeRoomActive = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let objectFilter = {
        raw: true,
        nest: true,
        where: { status: constants.typeRoomStatus.ACTIVE },
        order: [["id", "DESC"]],
      };
      if (data.limit && data.offset) {
        objectFilter.limit = +data.limit;

        objectFilter.offset = +data.offset;
      }
      if (data.keyword !== "")
        objectFilter.where = {
          ...objectFilter.where,
          typeRoomName: { [Op.substring]: data.keyword },
        };
      let res = await db.TypeRoom.findAndCountAll(objectFilter);
      if (res.rows && res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          res.rows[i].imageData = await db.TypeRoom_Image.findAndCountAll({
            where: { typeRoomId: res.rows[i].id },
            nest: true,
            raw: true,
          });

          let count = res.rows[i].imageData.count;

          if (count > 0) {
            for (let j = 0; j < count; j++) {
              res.rows[i].imageData.rows[j].image = new Buffer(
                res.rows[i].imageData.rows[j].image,
                "base64"
              ).toString("binary");
            }
          }

          res.rows[i].priceData = await db.TypeRoom_Price.findOne({
            where: { typeRoomId: res.rows[i].id, isLast: 1 },
            nest: true,
            raw: true,
          });

          res.rows[i].haveRoomAvailable = await db.Room.findOne({
            where: {
              typeRoomId: res.rows[i].id,
              status: constants.roomStatus.AVAILABLE,
            },
            raw: false,
          });
        }
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

let updateTypeRoom = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.typeRoomName || !data.maxStudent) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let typeRoom = await db.TypeRoom.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (typeRoom) {
          typeRoom.typeRoomName = data.typeRoomName;
          typeRoom.maxStudent = data.maxStudent;
          await typeRoom.save();
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

let blockTypeRoom = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || data.status === "undefined") {
        // so sánh với số 0

        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let typeRoom = await db.TypeRoom.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (typeRoom) {
          typeRoom.status = data.status === 0 ? 1 : 0;
          await typeRoom.save();
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

let deleteTypeRoom = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let blog = await db.TypeRoom.findOne({
          where: { id: id },
        });
        if (blog) {
          await db.TypeRoom.destroy({
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
  createNewTypeRoom: createNewTypeRoom,
  getDetailTypeRoomById: getDetailTypeRoomById,
  getAllTypeRoom: getAllTypeRoom,
  updateTypeRoom: updateTypeRoom,
  blockTypeRoom: blockTypeRoom,
  getAllTypeRoomActive: getAllTypeRoomActive,
  deleteTypeRoom: deleteTypeRoom,
};
