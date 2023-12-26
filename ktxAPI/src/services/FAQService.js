import db from "../models/index";
import constants, { FAQStatus } from "../utils/constants";
require("dotenv").config();
const { Op } = require("sequelize");

let createNewFAQ = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.userId || !data.question || !data.answer) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        await db.FAQ.create({
          userId: data.userId,
          question: data.question,
          answer: data.answer,
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

let getDetailFAQById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.FAQ.findOne({
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

let getAllFAQ = (data) => {
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
          [Op.or]: [
            { question: { [Op.substring]: data.keyword } },
            { answer: { [Op.substring]: data.keyword } },
          ],
        };
      let res = await db.FAQ.findAndCountAll(objectFilter);
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

let updateFAQ = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.question || !data.answer) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let faq = await db.FAQ.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (faq) {
          faq.question = data.question;
          faq.answer = data.answer;
          await faq.save();
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

let deleteFAQ = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let blog = await db.FAQ.findOne({
          where: { id: id },
        });
        if (blog) {
          await db.FAQ.destroy({
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
  createNewFAQ: createNewFAQ,
  getDetailFAQById: getDetailFAQById,
  getAllFAQ: getAllFAQ,
  updateFAQ: updateFAQ,
  deleteFAQ: deleteFAQ,
};
