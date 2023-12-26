import db, { sequelize } from "../models/index";
import constants from "../utils/constants";
require("dotenv").config();
const { Op } = require("sequelize");
let blockRoomBed = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.statusRoomBed) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let roombed = await db.Room_Bed.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (roombed) {
          roombed.statusRoomBed =
            data.statusRoomBed === constants.room_bedStatus.MAINTAINED
              ? constants.room_bedStatus.ACTIVE
              : constants.room_bedStatus.MAINTAINED;
          await roombed.save();
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
let getCountStudentStayingById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.Room_Bed.count({
          where: {
            roomId: id,
            isLast: 1,
            statusStudent: constants.room_bedStatus.STAYING,
          },
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
let updateRoomBed = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.roomId || !data.bedId || !data.userId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let roomBed = await db.Room_Bed.findOne({
          where: { isLast: 1, roomId: data.roomId, bedId: data.bedId },
          raw: false,
        });
        if (roomBed) {
          roomBed.statusStudent = constants.room_bedStatus.STAYING;
          roomBed.userId = data.userId;
          await roomBed.save();
        }

        let res = await db.Room.findOne({
          where: {
            id: data.roomId,
          },
          raw: false,
        });
        if (res) {
          let countNow = await db.Room_Bed.findAndCountAll({
            where: {
              roomId: data.roomId,
              statusStudent: constants.room_bedStatus.STAYING,
              isLast: 1,
            },
            raw: true,
            nest: true,
          });
          let max = await db.Room.findOne({
            where: { id: data.roomId },
            raw: false,
            nest: true,
            include: [{ model: db.TypeRoom, as: "typeroomData" }],
          });
          if (max) {
            let maxStudent = max.typeroomData.maxStudent;
            let left = maxStudent - countNow.count;
            if (left === 1) {
              // cập nhật lại thái phòng nếu chỉ còn 1 slot

              max.status = constants.roomStatus.FULL;
              await max.save();
            }
          }
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

let getAllRoomBedById = (data) => {
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
          where: { roomId: data.id },
          order: [["id", "DESC"]],
        };

        if (data.limit && data.offset) {
          objectFilter.limit = +data.limit;

          objectFilter.offset = +data.offset;
        }
        let res = await db.Room_Bed.findAndCountAll(objectFilter);
        const dataRegisterDistinct = Object.values(
          res.rows
            .reverse()
            .reduce((acc, obj) => ({ ...acc, [obj.bedId]: obj }), {})
        );

        resolve({
          errCode: 0,
          data: dataRegisterDistinct,
          count: dataRegisterDistinct.length,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAllStudentStaying = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.Room_Bed.findAndCountAll({
        where: { isLast: 1, statusStudent: constants.room_bedStatus.STAYING },
        raw: false,
        include: [
          { model: db.Code, as: "bedData" },
          { model: db.User, as: "studentData" },
          { model: db.Room, as: "roomData" },
        ],
      });
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
let getStudentStayingById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.Room_Bed.findOne({
          where: {
            isLast: 1,
            statusStudent: constants.room_bedStatus.STAYING,
            userId: id,
          },
          raw: true,
          nest: true,
          include: [
            { model: db.Code, as: "bedData" },
            { model: db.User, as: "studentData" },
            {
              model: db.Room,
              as: "roomData",
              include: [
                { model: db.Area, as: "areaData" },
                { model: db.TypeRoom, as: "typeroomData" },
              ],
            },
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
let getAllRoomBedNewById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let maxStudent = await db.Room.findOne({
          where: { id: id },
          raw: false,
          nest: true,
          include: [{ model: db.TypeRoom, as: "typeroomData" }],
        });
        let res = await db.Room_Bed.findAndCountAll({
          where: { roomId: id },
          raw: false,
          order: [["id", "DESC"]],
        });

        // maxStudent.typeroomData.maxStudent === null) { // phòng  chưa có loại giường
        if (maxStudent.typeroomData === null) {
          resolve({
            errCode: 2,
            errMessage:
              "Không xác định được số lượng giường tối đa. Hãy thêm loại phòng cho phòng trước",
          });
        } else if (res.count == maxStudent.typeroomData.maxStudent) {
          // full giường cho phép

          resolve({
            errCode: 3,
            errMessage:
              "Số lượng giường đã đạt tới giới hạn loại phòng cho phép",
          });
        } else {
          const oldRoomBedCodes = res.rows.map((x) => x.bedId);
          let resBed = await db.Code.findAll({
            where: {
              code: { [Op.notIn]: oldRoomBedCodes },
              status: 1,
              type: "BED",
            },
            raw: false,
          });
          resolve({
            errCode: 0,
            data: resBed,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAllRoomBedAvailableById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let objectFilter = {
          raw: true,
          where: {
            roomId: id,
            statusRoomBed: constants.room_bedStatus.ACTIVE,
            isLast: 1,

            statusStudent: null,
          },
          include: [{ model: db.Code, as: "bedData" }],
          nest: true,
          order: [["id", "DESC"]],
        };
        let res = await db.Room_Bed.findAndCountAll(objectFilter);
        const dataRegisterDistinct = Object.values(
          res.rows
            .reverse()
            .reduce((acc, obj) => ({ ...acc, [obj.bedId]: obj }), {})
        );

        resolve({
          errCode: 0,
          data: dataRegisterDistinct,
          count: dataRegisterDistinct.length,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let createNewRoomBed = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.roomId || !data.bedId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        await db.Room_Bed.create({
          roomId: data.roomId,
          bedId: data.bedId,
          statusStudent: null,
          userId: null,
          isLast: 1,
          statusRoomBed: constants.room_bedStatus.ACTIVE,
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

let deleteRoomBed = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.Room_Bed.findOne({ where: { id: id } });

        let bedId = res.bedId;

        res = await db.Room_Bed.findOne({ where: { bedId: bedId, isLast: 0 } });
        if (res) {
          resolve({
            errCode: 2,
            errMessage: "Giường này đã từng có sinh viên ở nên không thể xóa",
          });
        } else {
          await db.Room_Bed.destroy({
            where: { id: id },
          });

          resolve({
            errCode: 0,
            data: "ok",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
let deleteStudent = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.Room_Bed.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (res) {
          if (data.end) {
            res.statusStudent = constants.room_bedStatus.LEFT;

            await res.save();
          } else {
            res.statusStudent = constants.room_bedStatus.LEFT;
            res.isLast = 0;
            await res.save();
          }

          await db.Room_Bed.create({
            roomId: res.roomId,
            bedId: res.bedId,
            statusStudent: null,
            userId: null,
            isLast: 1,
            statusRoomBed: constants.room_bedStatus.ACTIVE,
          });

          let student = await db.User.findOne({
            where: { id: res.userId },
            raw: false,
          }); // bỏ nhóm trưởng
          if (student && student.isLeader) {
            student.isLeader = 0;
            await student.save();
          }

          // cập nhật lại trạng thái phòng nếu phòng đang đầy
          let room = await db.Room.findOne({
            where: { id: res.roomId, status: constants.roomStatus.FULL },
            raw: false,
          });
          if (room) {
            room.status = constants.roomStatus.AVAILABLE;

            await room.save();
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
let changeRoomById = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.oldRoomBedId || !data.newRoomBedId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        try {
          const result = await sequelize.transaction(async (t) => {
            let res = await deleteStudent({ id: data.oldRoomBedId });
            if (res.errCode == 0) {
              let oldRoomBed = await db.Room_Bed.findOne({
                where: { id: data.oldRoomBedId },
                raw: false,
              });

              let roomBed = await db.Room_Bed.findOne({
                where: { id: data.newRoomBedId },
                raw: false,
              });
              if (roomBed) {
                roomBed.statusStudent = constants.room_bedStatus.STAYING;
                roomBed.userId = oldRoomBed.userId;
                roomBed.dateCheckIn = new Date().getTime();
                await roomBed.save();
              }

              let res = await db.Room.findOne({
                where: {
                  id: oldRoomBed.roomId,
                },
                raw: false,
              });
              if (res) {
                let countNow = await db.Room_Bed.findAndCountAll({
                  where: {
                    roomId: oldRoomBed.roomId,
                    statusStudent: constants.room_bedStatus.STAYING,
                    isLast: 1,
                  },
                  raw: true,
                  nest: true,
                });
                let max = await db.Room.findOne({
                  where: { id: oldRoomBed.roomId },
                  raw: false,
                  nest: true,
                  include: [{ model: db.TypeRoom, as: "typeroomData" }],
                });
                if (max) {
                  let maxStudent = max.typeroomData.maxStudent;
                  let left = maxStudent - countNow.count;
                  if (left === 1) {
                    // cập nhật lại thái phòng nếu chỉ còn 1 slot

                    max.status = constants.roomStatus.FULL;
                    await max.save();
                  }
                }
              }
              console.log("done");

              resolve({
                errCode: 0,
                errMessage: "ok",
              });
            }
          });
        } catch (error) {
          console.log(error);
          resolve({
            errCode: 1,
            errMessage: "Lỗi server",
          });
          // If the execution reaches this line, an error occurred.
          // The transaction has already been rolled back automatically by Sequelize!
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
let changeRoomWithDifferentTypeRoom = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.oldRoomBedId ||
        !data.newRoomBedId ||
        !data.amount ||
        !data.start ||
        !data.end
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        try {
          const result = await sequelize.transaction(async (t) => {
            let res = await deleteStudent({ id: data.oldRoomBedId }); // xoa

            if (res.errCode == 0) {
              let oldRoomBed = await db.Room_Bed.findOne({
                where: { id: data.oldRoomBedId },
                raw: false,
              });

              let roomBed = await db.Room_Bed.findOne({
                where: { id: data.newRoomBedId },
                raw: false,
              });
              let contract = await db.Contract.findOne({
                where: {
                  userId: oldRoomBed.userId,
                  status: constants.contractStatus.VALID,
                },
                raw: false,
              });
              if (roomBed && oldRoomBed && contract) {
                // update lại hợp đồng cũ
                contract.status = constants.contractStatus.INVALID;
                await contract.save();

                // tao hop dong moi
                await db.Contract.create({
                  userId: oldRoomBed.userId,
                  start: data.start,
                  end: data.end,
                  amount: data.amount,
                  roomBedId: data.newRoomBedId,
                  status: constants.contractStatus.VALID,
                });
                // update
                roomBed.statusStudent = constants.room_bedStatus.STAYING;
                roomBed.userId = oldRoomBed.userId;
                roomBed.dateCheckIn = new Date().getTime();
                await roomBed.save();
              }

              // cap nhat trang trang thai phong

              let res = await db.Room.findOne({
                where: {
                  id: oldRoomBed.roomId,
                },
                raw: false,
              });
              if (res) {
                let countNow = await db.Room_Bed.findAndCountAll({
                  where: {
                    roomId: oldRoomBed.roomId,
                    statusStudent: constants.room_bedStatus.STAYING,
                    isLast: 1,
                  },
                  raw: true,
                  nest: true,
                });
                let max = await db.Room.findOne({
                  where: { id: oldRoomBed.roomId },
                  raw: false,
                  nest: true,
                  include: [{ model: db.TypeRoom, as: "typeroomData" }],
                });
                if (max) {
                  let maxStudent = max.typeroomData.maxStudent;
                  let left = maxStudent - countNow.count;
                  if (left === 1) {
                    // cập nhật lại thái phòng nếu chỉ còn 1 slot

                    max.status = constants.roomStatus.FULL;
                    await max.save();
                  }
                }
              }

              resolve({
                errCode: 0,
                errMessage: "ok",
              });
            }
          });
        } catch (error) {
          console.log(error);
          resolve({
            errCode: 1,
            errMessage: "Lỗi server",
          });
          // If the execution reaches this line, an error occurred.
          // The transaction has already been rolled back automatically by Sequelize!
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getAllRoomBedById: getAllRoomBedById,
  blockRoomBed: blockRoomBed,
  getCountStudentStayingById: getCountStudentStayingById,
  getAllRoomBedNewById: getAllRoomBedNewById,
  createNewRoomBed: createNewRoomBed,
  deleteRoomBed: deleteRoomBed,
  deleteStudent: deleteStudent,
  getAllRoomBedAvailableById: getAllRoomBedAvailableById,
  updateRoomBed: updateRoomBed,
  getAllStudentStaying: getAllStudentStaying,
  getStudentStayingById: getStudentStayingById,
  changeRoomById: changeRoomById,
  changeRoomWithDifferentTypeRoom: changeRoomWithDifferentTypeRoom,
};
