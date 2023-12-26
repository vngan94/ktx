import db from "../models/index";
import constants, { violationActionStatus } from "../utils/constants";
require("dotenv").config();
import Sequelize from "sequelize";
const { Op } = require("sequelize");

let createNewViolationAction = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.violationId || !data.actionId || !data.times) {
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
          resolve({
            errCode: 2,
            errMessage: "Cách xử lý đã tồn tại !",
          });
        } else {
          await db.Violation_Action.create({
            violationId: data.violationId,
            actionId: data.actionId,
            times: data.times,
            note: data.note, // khong check nhung bat buoc phải có trong luc gửi đi gán
            status: constants.violationActionStatus.ACTIVE,
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

let getViolationActionById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.Violation_Action.findOne({
          where: { id: id },
          raw: false,
          include: [
            { model: db.Code, as: "violationData" },
            { model: db.Code, as: "actionData" },
          ],
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

let getAllViolationAction = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let objectFilter,
        violationCodes = [],
        actionCodes = [],
        checkViolationCodes = false,
        checkActionCodes = false;

      if (data.keyword !== "") {
        let violation = await db.Code.findAndCountAll({
          where: {
            type: "VIOLATION",
            status: 1,
            value: { [Op.substring]: data.keyword },
          },
        });
        if (violation.rows !== "undefined") {
          checkViolationCodes = true;
          violationCodes = violation.rows.map((x) => x.code);
        }
        let action = await db.Code.findAndCountAll({
          where: {
            type: "ACTION",
            status: 1,
            value: { [Op.substring]: data.keyword },
          },
        });
        if (action.rows !== "undefined") {
          checkActionCodes = true;
          actionCodes = action.rows.map((x) => x.code);
        }
      }
      objectFilter = {
        raw: true,
        include: [
          { model: db.Code, as: "violationData" },
          { model: db.Code, as: "actionData" },
        ],
        nest: true,
        order: [["id", "DESC"]],
      };
      if (data.limit && data.offset) {
        objectFilter.limit = +data.limit;

        objectFilter.offset = +data.offset;
      }
      if (checkActionCodes && checkViolationCodes) {
        objectFilter.where = {
          ...objectFilter.where,
          [Op.or]: [
            { violationId: { [Op.in]: violationCodes } },
            { actionId: { [Op.in]: actionCodes } },
          ],
        };
      } else if (checkActionCodes) {
        objectFilter.where = {
          ...objectFilter.where,
          actionId: { [Op.in]: actionCodes },
        };
      } else if (checkViolationCodes) {
        objectFilter.where = {
          ...objectFilter.where,
          violationId: { [Op.in]: violationCodes },
        };
      }

      let res = await db.Violation_Action.findAndCountAll(objectFilter);

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

let updateViolationAction = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.violationId || !data.actionId || !data.times) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let violationAction = await db.Violation_Action.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (violationAction) {
          violationAction.violationId = data.violationId;
          violationAction.actionId = data.actionId;
          violationAction.times = data.times;
          violationAction.note = data.note;
          await violationAction.save();
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

let blockViolationAction = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let violationAction = await db.Violation_Action.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (violationAction) {
          violationAction.status = !violationAction.status;
          await violationAction.save();
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

let deleteViolationAction = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.Violation_Action.findOne({
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

let getAllViolation = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.Violation_Action.findAndCountAll({
        where: { status: constants.violationActionStatus.ACTIVE },
        attributes: [
          [
            Sequelize.fn("DISTINCT", Sequelize.col("violationId")),
            "violationId",
          ],
        ],
        distinct: true,
        raw: true,
        include: [{ model: db.Code, as: "violationData" }],
        nest: true,
        order: [["id", "DESC"]],
      });

      resolve({
        errCode: 0,
        data: res.rows,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getAllActionByViolationIdTimes = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.violationId || !data.times) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.Violation_Action.findAndCountAll({
          where: {
            violationId: data.violationId,
            times: data.times,
          },
          raw: true,
          nest: true,
          include: [{ model: db.Code, as: "actionData" }],
          order: [["id", "DESC"]],
        });

        resolve({
          errCode: 0,

          data: res.rows,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllTimesByUserIdViolationId = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let violations2 = [],
        result;
      if (!data.userId || !data.violationId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.Violation_Action.findAndCountAll({
          // không vi phạm
          where: { violationId: data.violationId },
          raw: true,
        });
        resolve({
          errCode: 0,

          data: res.rows,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewViolationAction: createNewViolationAction,
  getAllViolationAction: getAllViolationAction,
  getViolationActionById: getViolationActionById,
  deleteViolationAction: deleteViolationAction,
  blockViolationAction: blockViolationAction,

  updateViolationAction: updateViolationAction,

  getAllViolation: getAllViolation,
  getAllActionByViolationIdTimes: getAllActionByViolationIdTimes,
  getAllTimesByUserIdViolationId: getAllTimesByUserIdViolationId,
};
