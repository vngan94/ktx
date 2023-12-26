import db from "../models/index";
import constants, { areaStatus } from "../utils/constants";
require("dotenv").config();
const { Op } = require("sequelize");

let createNewNotification = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.tagId ||
        !data.shortDescription ||
        !data.title ||
        !data.image ||
        !data.contentMarkdown ||
        !data.contentHTML
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        await db.Notification.create({
          tagId: data.tagId,
          shortDescription: data.shortDescription,
          image: data.image,
          contentMarkdown: data.contentMarkdown,
          contentHTML: data.contentHTML,
          title: data.title,
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

let getDetailNotificationById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.Notification.findOne({
          where: { id: id },
          raw: false,
          nest: true,
          include: [{ model: db.Code, as: "tagData" }],
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

let getAllNotification = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let objectFilter = {
        raw: true,
        include: [{ model: db.Code, as: "tagData" }],
        nest: true,
        order: [["updatedAt", "DESC"]],
      };

      if (data.limit && data.offset) {
        objectFilter.limit = +data.limit;
        objectFilter.offset = +data.offset;
      }
      if (data.tagId !== "") {
        objectFilter.where = { ...objectFilter.where, tagId: data.tagId };
      }
      if (data.keyword !== "")
        objectFilter.where = {
          ...objectFilter.where,
          [Op.or]: [
            { shortDescription: { [Op.substring]: data.keyword } },
            { title: { [Op.substring]: data.keyword } },
            { contentHTML: { [Op.substring]: data.keyword } },
          ],
        };
      let res = await db.Notification.findAndCountAll(objectFilter);
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
    } catch (error) {
      reject(error);
    }
  });
};

let updateNotification = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.id ||
        !data.tagId ||
        !data.shortDescription ||
        !data.title ||
        !data.image ||
        !data.contentMarkdown ||
        !data.contentHTML
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let notification = await db.Notification.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (notification) {
          (notification.tagId = data.tagId),
            (notification.shortDescription = data.shortDescription),
            (notification.image = data.image),
            (notification.contentMarkdown = data.contentMarkdown),
            (notification.contentHTML = data.contentHTML),
            (notification.title = data.title),
            await notification.save();
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

let deleteNotification = (id) => {
  console.log(id);
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let blog = await db.Notification.findOne({
          where: { id: id },
        });
        if (blog) {
          await db.Notification.destroy({
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
  createNewNotification: createNewNotification,
  getDetailNotificationById: getDetailNotificationById,
  getAllNotification: getAllNotification,
  updateNotification: updateNotification,
  deleteNotification: deleteNotification,
};
