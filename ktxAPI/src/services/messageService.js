import db from "../models/index";
import constants, { areaStatus, messageStatus } from "../utils/constants";
import Sequelize from "sequelize";
require("dotenv").config();
const { Op } = require("sequelize");

let getLastMessageById = (data) => {
  return new Promise(async (resolve, reject) => {
    let count = 0;
    try {
      if (!data.idFirst || !data.idSecond) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        const code1 = data.idFirst + "_" + data.idSecond;
        const code2 = data.idSecond + "_" + data.idFirst;
        let res = await db.Group.findOne({
          where: {
            [Op.or]: [{ code: code1 }, { code: code2 }],
          },
          raw: false,
        });
        if (res) {
          // có tin nhắn
          let res2 = await db.Message.findAndCountAll({
            where: {
              groupId: res.id,
              isRead: messageStatus.SEEN,
            },
          });
          count = res2.count;
          res2 = await db.Message.findOne({
            where: {
              groupId: res.id,
            },
            order: [["id", "DESC"]],
            limit: 1,
          });
          res = res2;
        }
        resolve({
          errCode: 0,
          data: res,
          count: count,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let seenMessage = (groupId) => {
  return new Promise(async (resolve, reject) => {
    let count = 0;
    try {
      if (!groupId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.Message.findAndCountAll({
          where: {
            groupId: groupId,
            isRead: messageStatus.UNSEEN,
          },
          raw: false,
        });
        if (res.count > 0) {
          for (let i = 0; i < res.count; i++) {
            let message = await db.Message.findOne({
              where: { id: res.rows[i].id },
              raw: false,
            });
            message.isRead = messageStatus.SEEN;
            await message.save();
          }
          resolve({
            errCode: 0,
            data: "ok",
          });
        } else {
          resolve({
            errCode: 1,
            errMessage: "GroupId not found!",
          });
        }
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let createNewMessage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.fromId || !data.message || !data.toId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let groupId;
        if (data.groupId === "") {
          groupId = await getgroupId(data);
        }

        let id = await getLastId();

        let res = await db.Message.create({
          userId: data.fromId,
          groupId: data.groupId !== "" ? data.groupId : groupId,
          message: data.message,
          isRead: constants.messageStatus.SEEN,

          codeMessage: id,
        });

        let res2 = await db.Message.create({
          userId: data.toId,
          groupId: data.groupId !== "" ? data.groupId : groupId,
          message: data.message,
          isRead: constants.messageStatus.UNSEEN,

          codeMessage: id,
        });

        resolve({
          errCode: 0,

          data: {
            dataFrom: res,
            dataTo: res2,
          },
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getgroupId = async (data) => {
  let res = await db.Group.create({
    code: data.fromId + "_" + data.toId,
    groupName: data.fromId + "_" + data.toId,
    numberMember: 2,
  });
  return res.id;
};
const getLastId = async () => {
  let res = await db.Message.findOne({
    order: [["id", "DESC"]],
    limit: 1,
  });
  return res ? res.id : 1;
};

let deleteMessage = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let message = await db.Message.findOne({
          where: { id: id },
        });
        if (message) {
          await db.Message.destroy({
            where: { codeMessage: message.codeMessage },
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

let updateMessage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let message = await db.Message.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (message) {
          await db.Message.destroy({
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

let deleteAllMessage = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let message = await db.Message.findOne({
          where: { id: id },
        });
        if (message) {
          await db.Message.destroy({
            where: { userId: message.userId, groupId: message.groupId },
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

let getNewMessage = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.Message.findAndCountAll({
          where: {
            userId: userId,
            isRead: messageStatus.UNSEEN,
          },
          attributes: [
            "groupId",
            [Sequelize.fn("count", Sequelize.col("id")), "count"],
          ],
          group: ["groupId"],
        });

        resolve({
          errCode: 0,
          data: res.rows?.length,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getLastMessageById: getLastMessageById,
  seenMessage: seenMessage,
  createNewMessage: createNewMessage,
  deleteMessage: deleteMessage,
  updateMessage: updateMessage,
  deleteAllMessage: deleteAllMessage,
  getNewMessage: getNewMessage,
};
