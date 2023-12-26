import db from "../models/index";
import constants, { areaStatus } from "../utils/constants";
require("dotenv").config();
const { Op } = require("sequelize");
const getLastId = async () => {
  let res = await db.Complaint.findOne({
    order: [["id", "DESC"]],
    limit: 1,
  });
  return res ? res.id + 1 : 1;
};
let createNewComplaint = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.userId || !data.subject || !data.complaintHTML) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        // sinh vien gui lan dau
        let id = await getLastId();
        await db.Complaint.create({
          userId: data.userId,
          subject: data.subject,
          status: constants.complaintStatus.NEW,

          complaintHTML: data.complaintHTML,

          code: id,
        });

        resolve({
          errCode: 0,
          data: "ok",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getDetailComplaintById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.Complaint.findOne({
          where: { id: id },
          raw: true,
        });
        if (res) {
          let res2 = await db.Complaint.findAndCountAll({
            where: { code: res.code },
            raw: true,
            include: [
              { model: db.User, as: "studentData" },
              { model: db.User, as: "employeeData" },
            ],
            nest: true,
          });

          resolve({
            errCode: 0,
            data: res2.rows,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllComplaint = (data) => {
  return new Promise(async (resolve, reject) => {
    let dataComplaintDistinct;
    try {
      let objectFilter = {
        raw: true,
        nest: true,
        include: [
          { model: db.User, as: "studentData" },
          { model: db.User, as: "employeeData" },
        ],
        order: [["id", "DESC"]],
      };
      // if (data.limit && data.offset) {
      //   objectFilter.limit = +data.limit;

      //   objectFilter.offset = +data.offset;
      // }
      if (data.keyword !== "")
        objectFilter.where = {
          ...objectFilter.where,
          [Op.or]: [
            { subject: { [Op.substring]: data.keyword } },
            { complaintHTML: { [Op.substring]: data.keyword } },
            { responseHTML: { [Op.substring]: data.keyword } },
          ],
        };
      if (data.status !== "")
        objectFilter.where = {
          ...objectFilter.where,

          status: data.status,
        };
      let res = await db.Complaint.findAndCountAll(objectFilter);
      if (res.rows?.length > 0) {
        dataComplaintDistinct = Object.values(
          res.rows
            .reverse()
            .reduce((acc, obj) => ({ ...acc, [obj.code]: obj }), {})
        );
      }
      if (dataComplaintDistinct?.length > 0) {
        for (let i = 0; i < dataComplaintDistinct.length; i++) {
          dataComplaintDistinct[i].roomBedData = await db.Room_Bed.findOne({
            where: { userId: dataComplaintDistinct[i].userId, isLast: 1 },
            nest: true,
            include: [{ model: db.Room, as: "roomData" }],
            raw: true,
          });
        }
      }
      resolve({
        errCode: 0,
        data: dataComplaintDistinct,
        count: dataComplaintDistinct?.length,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getAllComplaintById = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataComplaintDistinct;
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let objectFilter = {
          raw: true,
          nest: true,
          include: [
            { model: db.User, as: "studentData" },
            { model: db.User, as: "employeeData" },
          ],
          order: [["id", "DESC"]],
          where: {
            userId: data.id,
          },
        };

        let res = await db.Complaint.findAndCountAll(objectFilter);

        if (res.rows?.length > 0) {
          dataComplaintDistinct = Object.values(
            res.rows
              .reverse()
              .reduce((acc, obj) => ({ ...acc, [obj.code]: obj }), {})
          );
          if (data.status !== "")
            dataComplaintDistinct = dataComplaintDistinct.filter(
              (obj) => obj.status === data.status
            );
        }

        resolve({
          errCode: 0,
          data: dataComplaintDistinct,
          count: dataComplaintDistinct?.length,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateComplaint = (data) => {
  // phản hồi
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.code) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let complaint = await db.Complaint.findOne({
          where: { code: data.code },
          raw: false,
        });

        if (complaint) {
          if (data.employeeId)
            // admin phản hồi
            await db.Complaint.create({
              userId: complaint.userId,
              employeeId: data.employeeId,
              subject: complaint.subject,
              responseHTML: data.responseHTML,

              status: data.status,
              code: data.code,
            });
          else {
            // sinh viên phản hồi
            await db.Complaint.create({
              userId: data.userId,
              subject: complaint.subject,
              responseHTML: data.responseHTML,
              status: data.status,
              code: data.code,
            });
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

let deleteComplaint = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let blog = await db.Complaint.findOne({
          where: { id: id },
        });
        if (blog) {
          await db.Complaint.destroy({
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
let getNewComplaint = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.Complaint.count({
        where: {
          status: constants.complaintStatus.NEW,
        },
      });

      resolve({
        errCode: 0,
        data: res,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  deleteComplaint: deleteComplaint,
  updateComplaint: updateComplaint,
  getAllComplaint: getAllComplaint,
  getDetailComplaintById: getDetailComplaintById,
  createNewComplaint: createNewComplaint,
  getAllComplaintById: getAllComplaintById,
  getNewComplaint: getNewComplaint,
};
