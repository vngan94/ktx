import db from "../models";
import CommonUtils from "../utils/CommonUtils";
import bcrypt from "bcryptjs";
import constants, { messageStatus } from "../utils/constants";
const { Op } = require("sequelize");
const salt = bcrypt.genSaltSync(10);
import { v4 as uuidv4 } from "uuid";
import emailSerivce from "./emailSerivce";

let handleLogin = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.password) {
        resolve({
          errCode: 4,
          errMessage: "Missing required parameters!",
        });
      } else {
        let userData = {};

        let isExist = await checkUserEmail(data.email);

        if (isExist === true) {
          let user = await db.User.findOne({
            where: { email: data.email },
            raw: true,
          });
          if (user) {
            if (user.status == "0") {
              userData.errCode = 5;
              userData.errMessage =
                "Tài khoản của bạn bị khóa. Hãy liên hệ với quản trị viên để trợ giúp";
            } else {
              let check = bcrypt.compareSync(data.password, user.password);
              if (check) {
                userData.errCode = 0;
                userData.errMessage = "Ok";
                delete user.password;
                userData.user = user;
                userData.accessToken = CommonUtils.encodeToken(user.id);
              } else {
                userData.errCode = 3;
                userData.errMessage = "Mật khẩu không đúng";
              }
            }
          } else {
            userData.errCode = 2;
            userData.errMessage = "Không tìm thấy tài khoản";
          }
        } else {
          userData.errCode = 1;
          userData.errMessage = `Email không tồn tại. Hãy kiểm tra lại`;
        }
        resolve(userData);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleChangePassword = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.password || !data.oldpassword) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let user = await db.User.findOne({
          where: { id: data.id },
          raw: false,
        });

        if (bcrypt.compareSync(data.oldpassword, user.password)) {
          if (user) {
            let newPassword = bcrypt.hashSync(data.password, salt);
            user.password = newPassword;
            await user.save();
          }
          resolve({
            errCode: 0,
            errMessage: "ok",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Mật khẩu cũ không chính xác",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let resetPassword = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.password) {
        console.log(data.id + " " + data.password);
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let user = await db.User.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (user) {
          let newPassword = bcrypt.hashSync(data.password, salt);
          user.password = newPassword;
          await user.save();
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

let getAllStudent = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let objectFilter = {
        raw: true,
        nest: true,
        order: [["id", "DESC"]],
      };
      if (data.limit && data.offset) {
        objectFilter.limit = +data.limit;

        objectFilter.offset = +data.offset;
      }
      if (data.keyword !== "")
        objectFilter.where = {
          ...objectFilter.where,
          code: { [Op.substring]: data.keyword },
        };
      let res = await db.User.findAndCountAll(objectFilter);
      if (res.rows && res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          res.rows[i].staying = await db.Contract.findOne({
            where: {
              userId: res.rows[i].id,
              isLast: 1,
              status: constants.contractStatus.VALID,
            },
          });
        }
      }
      resolve({
        errCode: 0,
        data: res.rows,
        count: res.count,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
let getDetailUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.User.findOne({
          where: { id: id },
          raw: false,
          include: [{ model: db.Code, as: "roleData" }],
        });

        // let contract = await db.Contract.findOne({where:{userId:id, isLast: 1}})
        // let stayingStatus
        // contract ? stayingStatus = contract.status : stayingStatus = 0

        resolve({
          errCode: 0,
          data: res,
          // stayStatus: stayingStatus
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let hashUserPasswordFromBcrypt = async (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let objectFilter = {
        raw: true,
        nest: true,
        include: [{ model: db.Code, as: "roleData" }],
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
            { code: { [Op.substring]: data.keyword } },
            { phonenumber: data.keyword },
          ],
          order: [["id", "DESC"]],
        };
      if (data.roleId === "R2") {
        objectFilter.where = { ...objectFilter.where, roleId: "R2" };
      }

      let res = await db.User.findAndCountAll(objectFilter);

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

let getAllUserToText = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let objectFilter = {
        raw: true,
        nest: true,
        include: [{ model: db.Code, as: "roleData" }],
        where: { id: { [Op.ne]: data.id } },
      };

      if (data.keyword !== "")
        objectFilter.where = {
          ...objectFilter.where,
          [Op.or]: [
            { code: { [Op.substring]: data.keyword } },
            { fullName: { [Op.substring]: data.keyword } },
          ],
        };

      let res = await db.User.findAndCountAll(objectFilter);
      if (res.count > 0) {
        for (let i = 0; i < res.count; i++) {
          let code1 = data.id + "_" + res.rows[i].id;
          let code2 = res.rows[i].id + "_" + data.id;
          let haveConnection = await db.Group.findOne({
            where: {
              [Op.or]: [{ code: code1 }, { code: code2 }],
            },
            raw: false,
            nest: true,
          });
          res.rows[i].haveConnection = haveConnection;
          if (haveConnection) {
            // có tin nhắn
            res.rows[i].countNew = await db.Message.count({
              where: {
                groupId: haveConnection.id,
                isRead: messageStatus.UNSEEN,

                userId: data.id, // them
              },
              raw: true,
              nest: true,
            });

            res.rows[i].lastMessage = await db.Message.findOne({
              where: {
                groupId: haveConnection.id,

                userId: data.id, // them
              },
              order: [["id", "DESC"]],
              limit: 1,
              raw: true,
              nest: true,
            });
          }
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

let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: `Missing required parameters`,
        });
      } else {
        let user = await db.User.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (user) {
          user.fullName = data.fullName;
          user.gender = data.gender;
          user.address = data.address;
          user.phonenumber = data.phonenumber;
          user.image = data.image;
          user.dob = data.dob;
          user.roleId = data.roleId;
          user.code = data.code;

          await user.save();
          resolve({
            errCode: 0,
            data: "ok",
          });
        } else {
          resolve({
            errCode: 1,
            errMessage: "User not found!",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
let blockUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let user = await db.User.findOne({
          where: { id: id },
          raw: false,
        });
        if (user) {
          user.status = !user.status;
          await user.save();
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

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.password) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters !",
        });
      } else {
        let check = await checkUserEmail(data.email);
        if (check === true) {
          resolve({
            errCode: 1,
            errMessage: "Email này đã được sử dụng. Hãy kiểm tra lại",
          });
        } else {
          let hashPassword = await hashUserPasswordFromBcrypt(data.password);
          await db.User.create({
            email: data.email,
            password: hashPassword,
            fullName: data.fullName,
            address: data.address,
            gender: data.gender,
            phonenumber: data.phonenumber,
            image: data.image,
            dob: data.dob,
            status: 1,
            roleId: data.roleId,
            isLeader: 0,
            class: data.class,
            code: data.code,
          });
          resolve({
            errCode: 0,
            message: "OK",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAllStudentById = (data) => {
  return new Promise(async (resolve, reject) => {
    if (!data.roomId) {
      resolve({
        errCode: 1,
        errMessage: "Missing required parameter !",
      });
    } else {
      try {
        let objectFilter = {
          raw: true,
          nest: true,
          include: [{ model: db.Code, as: "bedData" }],
          where: {
            roomId: data.roomId,
            statusStudent: constants.room_bedStatus.STAYING,
          },
        };
        if (data.limit && data.offset) {
          objectFilter.limit = +data.limit;

          objectFilter.offset = +data.offset;
        }
        // if(data.keyword !=='')
        //     objectFilter.where = {...objectFilter.where,
        //         [Op.or]: [
        //         {code: {[Op.substring]: data.keyword}},
        //         {phonenumber: data.keyword}
        //         ]
        //     }

        let res = await db.Room_Bed.findAndCountAll(objectFilter);
        if (res.rows && res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            let studentData = await db.User.findOne({
              where: { id: res.rows[i].userId },
            });
            res.rows[i].studentData = studentData;
          }
        }
        resolve({
          errCode: 0,
          data: res.rows,
          count: res.count,
        });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    }
  });
};
let setLeader = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let user = await db.User.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (user) {
          user.isLeader = !user.isLeader;

          await user.save();
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

let deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let blog = await db.User.findOne({
          where: { id: id },
        });
        if (blog) {
          await db.User.destroy({
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
let handleSendEmailForgotPassword = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!email) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let check = await checkUserEmail(email);
        if (check === true) {
          let user = await db.User.findOne({
            where: { email: email },
            attributes: {
              exclude: ["password"],
            },
            raw: false,
          });

          if (user) {
            let min = 100000;
            var max = 999999;
            var rand = min + Math.round(Math.random() * (max - min));
            let hashPassword = await hashUserPasswordFromBcrypt(rand + "");
            user.password = hashPassword;
            await emailSerivce.sendSimpleEmail({
              fullName: user.fullName,
              //redirectLink: `${process.env.URL_REACT_MOBILE}/verify-forgotpassword?token=${token}&userId=${user.id}`,
              email: user.email,
              type: "forgotpassword",
              password: rand,
            });
            await user.save();
          }
          resolve({
            errCode: 0,
            errMessage: "ok",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: `Hãy kiểm tra email sinh viên của bạn rồi thử lại`,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getCountUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.User.count({
        where: {
          status: constants.userStatus.ACTIVE,
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
let getHistory = (data) => {
  return new Promise(async (resolve, reject) => {
    let dataRegisterDistinct, objectFilter;
    try {
      if (data.keyword !== "")
        objectFilter = {
          where: { isLast: 1, statusStudent: { [Op.ne]: null } },
          raw: false,
          include: [
            { model: db.Code, as: "bedData" },
            {
              model: db.User,
              as: "studentData",
              where: {
                [Op.or]: [
                  { code: { [Op.substring]: data.keyword } },
                  { fullName: { [Op.substring]: data.keyword } },
                ],
              },
            },
            {
              model: db.Room,
              as: "roomData",
              include: [
                { model: db.TypeRoom, as: "typeroomData" },
                { model: db.Area, as: "areaData" },
              ],
            },
          ],
          order: [["updatedAt", "DESC"]],
        };
      else {
        objectFilter = {
          where: { isLast: 1, statusStudent: { [Op.ne]: null } },
          raw: false,
          include: [
            { model: db.Code, as: "bedData" },
            { model: db.User, as: "studentData" },
            {
              model: db.Room,
              as: "roomData",
              include: [
                { model: db.TypeRoom, as: "typeroomData" },
                { model: db.Area, as: "areaData" },
              ],
            },
          ],
          order: [["updatedAt", "DESC"]],
        };
      }
      if (data.limit && data.offset) {
        objectFilter.limit = +data.limit;

        objectFilter.offset = +data.offset;
      }
      let res = await db.Room_Bed.findAndCountAll(objectFilter);

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
let getHistoryDetailById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res1 = await db.Room_Bed.findOne({
          where: { id: id },
        });
        if (res1) {
          let objectFilter = {
            where: { userId: res1.userId },
            raw: false,
            include: [
              { model: db.Code, as: "bedData" },
              { model: db.User, as: "studentData" },
              {
                model: db.Room,
                as: "roomData",
                include: [
                  { model: db.TypeRoom, as: "typeroomData" },
                  { model: db.Area, as: "areaData" },
                ],
              },
            ],
            order: [["updatedAt", "DESC"]],
          };
          let res = await db.Room_Bed.findAndCountAll(objectFilter);

          resolve({
            errCode: 0,
            data: res.rows,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getHistoryDetailById: getHistoryDetailById,
  handleLogin: handleLogin,
  handleChangePassword: handleChangePassword,
  resetPassword: resetPassword,
  getAllStudent: getAllStudent,
  getDetailUserById: getDetailUserById,
  getAllUser: getAllUser,
  updateUser: updateUser,
  createNewUser: createNewUser,
  getAllStudentById: getAllStudentById,
  setLeader: setLeader,
  blockUser: blockUser,
  deleteUser: deleteUser,
  handleSendEmailForgotPassword: handleSendEmailForgotPassword,
  getAllUserToText: getAllUserToText,
  getCountUser: getCountUser,
  getHistory: getHistory,
};
