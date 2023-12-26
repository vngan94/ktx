import db from "../models/index";
import constants, { room_bedStatus } from "../utils/constants";
const { Op } = require("sequelize");
let handleCreateNewCode = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.type || !data.value) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters !",
        });
      } else {
        let res = await db.Code.findOne({
          where: { value: data.value },
        });

        if (res) {
          resolve({
            errCode: 2,
            errMessage:
              data.type === "BED"
                ? "Tên giường đã tồn tại !"
                : data.type === "ACTION"
                ? "Hình phạt đã tồn tại"
                : "Nội dung vi phạm đã tồn tại",
          });
        } else {
          let count = await db.Code.count({
            where: { type: data.type },
          });

          await db.Code.create({
            type: data.type,
            value: data.value,
            code: data.type + (count + 1),
            status: constants.codeStatus.ACTIVE,
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
let getAllCodeService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters !",
        });
      } else {
        let code = await db.Code.findAll({
          where: { type: data },
          order: [["id", "DESC"]],
        });
        resolve({
          errCode: 0,
          data: code,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let handleUpdateCode = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.value || !data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters !",
        });
      } else {
        let res = await db.Code.findOne({
          where: {
            id: data.id,
          },
          raw: false,
        });
        if (res) {
          res.value = data.value;
          await res.save();
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
let getDetailCodeById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters !",
        });
      } else {
        let data = await db.Code.findOne({
          where: { id: id },
        });
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let handleDeleteCode = (codeId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!codeId) {
        resolve({
          errCode: 1,
          errMessage: `Missing required parameters !`,
        });
      } else {
        let foundCode = await db.Code.findOne({
          where: { id: codeId },
        });
        if (!foundCode) {
          resolve({
            errCode: 2,
            errMessage: `The allCode isn't exist`,
          });
        }
        await db.Code.destroy({
          where: { id: codeId },
        });
        resolve({
          errCode: 0,
          data: `ok`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getListCodeService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let objectFilter = {
        where: { type: data.type },
        order: [["id", "DESC"]],
      };
      if (data.limit && data.offset) {
        objectFilter.limit = +data.limit;
        objectFilter.offset = +data.offset;
      }
      if (data.keyword !== "")
        objectFilter.where = {
          ...objectFilter.where,
          value: { [Op.substring]: data.keyword },
        };
      let code = await db.Code.findAndCountAll(objectFilter);
      resolve({
        errCode: 0,
        data: code.rows,
        count: code.count,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getListCodeServiceByTypeStatus = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let objectFilter = {
        where: { type: data.type },
        order: [["id", "DESC"]],
      };
      if (data.limit && data.offset) {
        objectFilter.limit = +data.limit;
        objectFilter.offset = +data.offset;
      }
      if (data.status)
        objectFilter.where = { ...objectFilter.where, status: data.status }; // k có status thì lấy hết
      if (data.keyword !== "")
        objectFilter.where = {
          ...objectFilter.where,
          value: { [Op.substring]: data.keyword },
        };
      let code = await db.Code.findAndCountAll(objectFilter);
      resolve({
        errCode: 0,
        data: code.rows,
        count: code.count,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getAllCategoryBlog = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters !",
        });
      } else {
        let code = await db.Code.findAll({
          where: { type: typeInput },
        });
        for (let i = 0; i < code.length; i++) {
          let blog = await db.Blog.findAll({
            where: { subjectId: code[i].code },
          });
          if (blog) code[i].countPost = blog.length;
        }

        resolve({
          errCode: 0,
          data: code,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let test = (data) => {
  console.log(data);
  return new Promise(async (resolve, reject) => {
    try {
      let x = await db.Device.findAndCountAll();
      console.log(x.count);
      resolve({
        errCode: 0,
        data: "hello",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let handleBlockBedSerice = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.code) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let bed = await db.Code.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (bed) {
          bed.status = constants.codeStatus.INACTIVE; // cho phép block giường
          await bed.save();
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

let handleUnblockCodeService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let bed = await db.Code.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (bed) {
          bed.status = constants.codeStatus.ACTIVE;
          await bed.save();
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
  handleCreateNewCode: handleCreateNewCode,
  getAllCodeService: getAllCodeService,
  handleUpdateCode: handleUpdateCode,
  getDetailCodeById: getDetailCodeById,
  handleDeleteCode: handleDeleteCode,
  getListCodeService: getListCodeService,
  getAllCategoryBlog: getAllCategoryBlog,
  test: test,
  getListCodeServiceByTypeStatus: getListCodeServiceByTypeStatus,
  handleBlockBedSerice: handleBlockBedSerice,
  handleUnblockCodeService: handleUnblockCodeService,
  handleDeleteCode: handleDeleteCode,
};
