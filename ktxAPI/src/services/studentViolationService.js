import db from "../models/index";
import constants, { studentViolationStatus } from "../utils/constants";
require("dotenv").config();
const { Op, Sequelize } = require("sequelize");

let createNewStudentViolation = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.violationId ||
        !data.actionId ||
        !data.times ||
        !data.userId ||
        !data.dateViolation
      ) {
        // các thứ phải truyền (có mặt), giá trị có thể '' cũng được
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let res = await db.Violation_Action.findOne({
          where: {
            violationId: data.violationId,
            actionId: data.actionId,
            times: data.times,
          },
        });
        if (res) {
          await db.StudentViolation.create({
            userId: data.userId,
            violationActionId: res.id,
            dateViolation: data.dateViolation,
            note: data.note,
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

let getStudentViolationById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.StudentViolation.findOne({
          where: { id: id },
          raw: true,
          include: [
            { model: db.User, as: "studentData" },
            {
              model: db.Violation_Action,
              as: "violationActionData",
              include: [
                { model: db.Code, as: "violationData" },
                { model: db.Code, as: "actionData" },
              ],
            },
          ],
          nest: true,
        });

        res.roomBedData = await db.Room_Bed.findOne({
          where: { isLast: 1, userId: res.userId },
          raw: true,
          include: [
            { model: db.Code, as: "bedData" },
            {
              model: db.Room,
              as: "roomData",
              include: [{ model: db.Area, as: "areaData" }],
            },
          ],
          nest: true,
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

let getAllStudentViolation = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let objectFilter;
      if (data.keyword !== "") {
        objectFilter = {
          raw: true,
          include: [
            {
              model: db.User,
              as: "studentData",
              where: { code: { [Op.substring]: data.keyword } },
            },
            {
              model: db.Violation_Action,
              as: "violationActionData",
              include: [
                { model: db.Code, as: "violationData" },
                { model: db.Code, as: "actionData" },
              ],
            },
          ],
          nest: true,
          order: [["id", "DESC"]],
        };
      } else {
        objectFilter = {
          raw: true,
          include: [
            { model: db.User, as: "studentData" },
            {
              model: db.Violation_Action,
              as: "violationActionData",
              include: [
                { model: db.Code, as: "violationData" },
                { model: db.Code, as: "actionData" },
              ],
            },
          ],
          nest: true,
          order: [["id", "DESC"]],
        };
      }

      if (data.limit && data.offset) {
        objectFilter.limit = +data.limit;

        objectFilter.offset = +data.offset;
      }

      let res = await db.StudentViolation.findAndCountAll(objectFilter);

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

let updateStudentViolation = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.id ||
        !data.violationId ||
        !data.actionId ||
        !data.times ||
        !data.userId ||
        !data.dateViolation
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let studentViolation = await db.StudentViolation.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (studentViolation) {
          let res = await db.Violation_Action.findOne({
            where: {
              violationId: data.violationId,
              actionId: data.actionId,
              times: data.times,
            },
          });
          if (res) {
            studentViolation.violationActionId = res.id;
            studentViolation.userId = data.userId;
            studentViolation.dateViolation = data.dateViolation;
            studentViolation.note = data.note;
            await studentViolation.save();
            resolve({
              errCode: 0,
              errMessage: "ok",
            });
          }
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAllStudentViolationByStudentId = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let objectFilter = {
          raw: true,
          include: [
            { model: db.User, as: "studentData" },
            {
              model: db.Violation_Action,
              as: "violationActionData",
              include: [
                { model: db.Code, as: "violationData" },
                { model: db.Code, as: "actionData" },
              ],
            },
          ],
          nest: true,
          where: {
            userId: data.id,
          },
          order: [["id", "DESC"]],
        };
        if (data.limit && data.offset) {
          objectFilter.limit = +data.limit;

          objectFilter.offset = +data.offset;
        }

        let res = await db.StudentViolation.findAndCountAll(objectFilter);

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

let deleteStudentViolation = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.StudentViolation.findOne({
          where: { id: id },
          raw: false,
        });
        if (res) {
          await res.destroy();
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
let getStaticsStudentViolation = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataStatics = {
        count: 0,
        first: 0,
        second: 0,
        third: 0,
      };
      if (!data.start || !data.end) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let arr = await db.StudentViolation.findAndCountAll({
          nest: true,
          raw: true,

          where: {
            createdAt: {
              [Op.between]: [data.start, data.end],
            },
          },
        });
        if (arr.count > 0) {
          data.count = arr.count;
        }
        let arr2 = await db.StudentViolation.findAndCountAll({
          attributes: [
            "id",
            [Sequelize.fn("count", Sequelize.col("id")), "count"],
          ],
          group: ["userId"],
          raw: true,
          where: {
            createdAt: {
              [Op.between]: [data.start, data.end],
            },
          },
        });
        if (arr2.rows.length > 0) {
          dataStatics.count = arr.rows.length;
          for (let i = 0; i < arr2.rows.length; i++) {
            if (arr2.rows[i].count == 1) {
              dataStatics.first += 1;
            } else if (arr2.rows[i].count == 2) {
              dataStatics.second += 1;
            } else if (arr2.rows[i].count == 3) {
              dataStatics.third += 3;
            }
          }
        }
        resolve({
          errCode: 0,

          data: dataStatics,
          //  sum: sum,
          // data: arr2.rows,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewStudentViolation: createNewStudentViolation,
  getAllStudentViolation: getAllStudentViolation,
  getStudentViolationById: getStudentViolationById,
  deleteStudentViolation: deleteStudentViolation,
  updateStudentViolation: updateStudentViolation,
  getAllStudentViolationByStudentId: getAllStudentViolationByStudentId,
  getStaticsStudentViolation: getStaticsStudentViolation,
};
