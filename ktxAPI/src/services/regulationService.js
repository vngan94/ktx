import db from "../models/index";
import constants, { RegulationStatus } from "../utils/constants";
require("dotenv").config();
const { Op } = require("sequelize");

let createNewRegulation = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.regulationName || !data.link || !data.userId || !data.caption) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        await db.Regulation.create({
          regulationName: data.regulationName,
          link: data.link,
          userId: data.userId,
          caption: data.caption,
          contentMarkdown: data.contentMarkdown,
          contentHTML: data.contentHTML,
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

let getDetailRegulationById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.Regulation.findOne({
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

let getAllRegulation = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let objectFilter = {
        raw: true,
        order: [["id", "DESC"]],
        // nest: true,
      };
      if (data.limit && data.offset) {
        objectFilter.limit = +data.limit;

        objectFilter.offset = +data.offset;
      }
      if (data.keyword !== "")
        objectFilter.where = {
          ...objectFilter.where,
          regulationName: { [Op.substring]: data.keyword },
        };
      let res = await db.Regulation.findAndCountAll(objectFilter);
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

let updateRegulation = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.regulationName || !data.link || !data.caption) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let regulation = await db.Regulation.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (regulation) {
          regulation.regulationName = data.regulationName;
          regulation.link = data.link;
          regulation.userId = data.userId;
          regulation.caption = data.caption;

          regulation.contentMarkdown = data.contentMarkdown;
          regulation.contentHTML = data.contentHTML;
          await regulation.save();
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

let deleteRegulation = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let regulation = await db.Regulation.findOne({
          where: { id: id },
          raw: false,
        });
        if (regulation) {
          await regulation.destroy();
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
  createNewRegulation: createNewRegulation,
  getDetailRegulationById: getDetailRegulationById,
  getAllRegulation: getAllRegulation,
  updateRegulation: updateRegulation,
  deleteRegulation: deleteRegulation,
};
