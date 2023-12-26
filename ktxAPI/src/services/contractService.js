import db, { sequelize } from "../models/index";
import constants, { contractStatus } from "../utils/constants";
require("dotenv").config();
const { Op } = require("sequelize");
import Sequelize from "sequelize";
import moment from "moment";
import {
  deleteStudent,
  updateRoomBed,
  getStudentStayingById,
} from "../services/roomBedService";
let createNewContract = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.userId ||
        !data.start ||
        !data.end ||
        !data.amount ||
        !data.roomBedId
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        try {
          const result = await sequelize.transaction(async (t) => {
            {
              // kiểm tra phòng đó đầy chưa
              let roomBed = await db.Room_Bed.findOne({
                where: { id: data.roomBedId },
                raw: true,
                nest: true,
                include: [
                  {
                    model: db.Room,
                    as: "roomData",
                    include: [{ model: db.TypeRoom, as: "typeroomData" }],
                  },
                ],
              });
              if (roomBed) {
                let roomId = roomBed.roomId;

                let maxStudent = roomBed.roomData.typeroomData.maxStudent;

                let countNow = await db.Room_Bed.findAndCountAll({
                  where: {
                    roomId: roomBed.roomId,
                    statusStudent: constants.room_bedStatus.STAYING,
                    isLast: 1,
                  },
                  raw: true,
                  nest: true,
                });
                if (countNow.count === maxStudent) {
                  resolve({
                    errCode: 2,
                    errMessage: `Phòng sinh viên đăng ký đã đầy, không thể tạo hợp đồng.`,
                  });
                } else {
                  // kiểm tra sinh viên mới
                  let res = await db.Contract.findOne({
                    where: {
                      userId: data.userId,
                      status: contractStatus.VALID,
                    },
                    raw: false,
                  });
                  if (!res) {
                    let old = await db.Room_Bed.findOne({
                      where: {
                        userId: data.userId,
                        isLast: 1,
                      },
                      raw: false,
                    });
                    if (old) {
                      old.isLast = 0;
                      await old.save();
                    }
                  }
                  let left = maxStudent - countNow.count;
                  if (left === 1) {
                    // cập nhật lại thái phòng nếu chỉ còn 1 slot

                    let room = await db.Room.findOne({
                      where: { id: roomId },
                      raw: false,
                    });
                    if (room) {
                      room.status = constants.roomStatus.FULL;
                      await room.save();
                    }
                  }

                  await db.Contract.create({
                    userId: data.userId,
                    start: data.start,
                    end: data.end,
                    amount: data.amount,
                    roomBedId: data.roomBedId,

                    status: constants.contractStatus.VALID,
                  });

                  // cập nhật lại trạng thái đơn đăng ký phòng
                  let register = await db.Register.findOne({
                    raw: false,
                    where: {
                      userId: data.userId,
                      status: constants.registerStatus.ACCEPT,
                    },
                  });
                  if (register) {
                    register.status = constants.registerStatus.CHECKIN;
                    await register.save();
                  }

                  // thêm sinh viên vào giường
                  let roomBed = await db.Room_Bed.findOne({
                    where: { id: data.roomBedId },
                    raw: false,
                  });
                  if (roomBed) {
                    roomBed.statusStudent = constants.room_bedStatus.STAYING;
                    roomBed.userId = data.userId;
                    roomBed.dateCheckIn = data.start;
                    await roomBed.save();
                  }

                  resolve({
                    errCode: 0,
                    errMessage: "ok",
                  });
                }
              }
            }
          });

          // If the execution reaches this line, the transaction has been committed successfully
          // `result` is whatever was returned from the transaction callback (the `user`, in this case)
        } catch (error) {
          // If the execution reaches this line, an error occurred.
          // The transaction has already been rolled back automatically by Sequelize!
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
let extendContract = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.id ||
        !data.start ||
        !data.end ||
        !data.amount ||
        !data.roomBedId
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
        // } else {
        //   let contract = await db.Contract.findOne({
        //     where: { id: data.id },
        //     raw: false,
        //   });
        //   if (contract) {
        //     // update lại hợp đồng cũ

        //     contract.status = constants.contractStatus.INVALID;
        //     await contract.save();

        //     // // thêm hợp đồng mới
        //     let x = await db.Contract.create({
        //       userId: contract.userId,
        //       start: data.start,
        //       end: data.end,
        //       amount: data.amount,
        //       roomBedId: data.roomBedId,
        //       isLast: 1,
        //       status: constants.contractStatus.VALID,
        //     });

        //     let now = await getStudentStayingById(contract.userId);

        //     if (now.data && now.data.id != data.roomBedId) {
        //       console.log("khac");
        //       let d = await deleteStudent({
        //         id: now.data.id,
        //       });
        //       if (d.errCode === 0) {
        //         let roomBed = await db.Room_Bed.findOne({
        //           where: {
        //             id: data.roomBedId,
        //           },
        //         });
        //         if (roomBed) {
        //           let u = await updateRoomBed({
        //             roomId: roomBed.roomId,
        //             bedId: roomBed.bedId,
        //             userId: contract.userId,
        //           });

        //           if (u.errCode === 1) {
        //             resolve({
        //               errCode: 1,
        //               errMessage: u.errMessage,
        //             });
        //           }
        //         }
        //       }
        //     } else {
        //       console.log("chỗ cũ");
        //     }

        //     resolve({
        //       errCode: 0,
        //       errMessage: "ok",
        //     });
        //   }
        // }
      } else {
        try {
          const result = await sequelize.transaction(async (t) => {
            let contract = await db.Contract.findOne({
              where: { id: data.id },
              raw: false,
            });
            if (contract) {
              // update lại hợp đồng cũ
              contract.status = constants.contractStatus.INVALID;
              await contract.save();

              // tao hop dong moi
              await db.Contract.create({
                userId: contract.userId,
                start: data.start,
                end: data.end,
                amount: data.amount,
                roomBedId: data.roomBedId,
                status: constants.contractStatus.VALID,
              });

              let now = await getStudentStayingById(contract.userId);
              if (now.data && now.data.id != data.roomBedId) {
                let res = await deleteStudent({ id: now.data.id }); // xoa

                let roomBed = await db.Room_Bed.findOne({
                  where: { id: data.roomBedId },
                  raw: false,
                });

                if (roomBed) {
                  // update
                  roomBed.statusStudent = constants.room_bedStatus.STAYING;
                  roomBed.userId = contract.userId;
                  roomBed.dateCheckIn = new Date(data.start).getTime();
                  await roomBed.save();
                }

                // cap nhat trang trang thai phong cu

                let res2 = await db.Room.findOne({
                  where: {
                    id: now.data.roomId,
                  },
                  raw: false,
                });
                if (res) {
                  let countNow = await db.Room_Bed.findAndCountAll({
                    where: {
                      roomId: now.data.roomId,
                      statusStudent: constants.room_bedStatus.STAYING,
                      isLast: 1,
                    },
                    raw: true,
                    nest: true,
                  });
                  let max = await db.Room.findOne({
                    where: { id: now.data.roomId },
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
              } else {
                console.log("chỗ cũ");
              }
            }

            resolve({
              errCode: 0,
              errMessage: "ok",
            });
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

let getDetailContractById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let res = await db.Contract.findOne({
          where: { id: id },
          nest: true,
          raw: true,
          include: [
            { model: db.User, as: "studentData" },
            {
              model: db.Room_Bed,
              as: "roombedData",
              include: [
                { model: db.Code, as: "bedData" },
                {
                  model: db.Room,
                  as: "roomData",
                  include: [
                    { model: db.Area, as: "areaData" },
                    { model: db.TypeRoom, as: "typeroomData" },
                  ],
                },
              ],
            },
          ],
        });
        if (res) {
          res.priceData = await db.TypeRoom_Price.findOne({
            where: {
              typeRoomId: res.roombedData.roomData.typeRoomId,
              isLast: 1,
            },
            nest: true,
          });
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

let getAllContract = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let objectFilter;
      if (data.keyword) {
        objectFilter = {
          raw: true,
          include: [
            {
              model: db.User,
              as: "studentData",
              where: { code: { [Op.substring]: data.keyword } },
            },
            {
              model: db.Room_Bed,
              as: "roombedData",
              include: [
                { model: db.Code, as: "bedData" },
                { model: db.Room, as: "roomData" },
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
              model: db.Room_Bed,
              as: "roombedData",
              include: [
                { model: db.Code, as: "bedData" },
                { model: db.Room, as: "roomData" },
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
      if (data.status !== "") {
        objectFilter.where = {
          ...objectFilter.where,
          status: data.status,
        };
      }
      if (data.startDate !== "" && data.endDate !== "") {
        objectFilter.where = {
          ...objectFilter.where,
          start: data.startDate,
          end: data.endDate,
        };
      }
      let res = await db.Contract.findAndCountAll(objectFilter);

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

let updateContract = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.id ||
        !data.start ||
        !data.end ||
        !data.roomBedId ||
        !data.status ||
        !data.total
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else
        try {
          const result = await sequelize.transaction(async (t) => {
            {
              let contract = await db.Contract.findOne({
                where: { id: data.id },
                raw: false,
              });
              if (contract) {
                // kiểm tra kết thúc hoặc chấm dứt
                if (contract.status != data.status) {
                  let res4 = await db.Room_Bed.findOne({
                    where: { id: data.roomBedId },
                  });
                  if (res4) {
                    let student2 = await db.Room_Bed.findOne({
                      where: { isLast: 1, userId: res4.userId },
                    });
                    if (student2) {
                      let d = await deleteStudent({
                        // k phải roombed mà là user vì user có thể đổi phòng
                        id: student2.id,
                        end: true,
                      });
                    }
                  }
                }

                // kiem tra thay doi ngay
                if (contract.start != data.start) {
                  let res4 = await db.Room_Bed.findOne({
                    where: {
                      userId: contract.userId,
                      dateCheckIn: contract.start,
                    },
                    raw: false,
                  });
                  if (res4) {
                    res4.dateCheckIn = data.start;
                    await res4.save();
                  }
                }

                //
                contract.start = data.start;
                contract.end = data.end;
                contract.roomBedId = data.roomBedId;
                contract.status = data.status;
                contract.amount = data.total;
                await contract.save();
                resolve({
                  errCode: 0,
                  errMessage: "ok",
                });
              }
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
    } catch (error) {
      reject(error);
    }
  });
};

let deleteContract = (data) => {
  return new Promise(async (resolve, reject) => {
    let temp;
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let contract = await db.Contract.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (contract) {
          // hoạt động sinh viên trong khoảng thời gian đó sẽ bị xóa
          let res = await db.Room_Bed.findOne({
            where: {
              userId: contract.userId,
            },
            raw: false,
            nest: true,
            limit: 1,
            order: [["id", "DESC"]],
          });
          if (res) {
            temp = res;

            let room = await db.Room.findOne({
              where: { id: res.roomId, status: constants.roomStatus.FULL },
              raw: false,
            });

            if (room) {
              room.status = constants.roomStatus.AVAILABLE;
              await room.save();
            }

            let result = await contract.destroy();
            if (result) {
              await res.destroy();
            }
            let res2 = await db.Room_Bed.findOne({
              where: {
                userId: temp.userId,
              },
              raw: false,
              nest: true,
              limit: 1,
              order: [["id", "DESC"]],
            });
            if (res2) {
              res2.isLast = 1;
              await res2.save();

              await db.Room_Bed.create({
                roomId: temp.roomId,
                bedId: temp.bedId,
                statusStudent: null,
                userId: null,
                isLast: 1,
                statusRoomBed: constants.room_bedStatus.ACTIVE,
              });
            } else {
              await db.Room_Bed.create({
                roomId: temp.roomId,
                bedId: temp.bedId,
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
            }
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

let getAllContractById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id) {
        let objectFilter = {
          raw: true,
          nest: true,
          where: {
            userId: id,
          },
        };
        let res = await db.Contract.findAndCountAll(objectFilter);

        resolve({
          errCode: 0,
          data: res.rows,
          count: res.count,
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getFreqArr = (arr) => {
  const counts = {};
  for (const num of arr) {
    counts[num.roombedData.roomData.typeRoomId] = counts[
      num.roombedData.roomData.typeRoomId
    ]
      ? counts[num.roombedData.roomData.typeRoomId] + 1
      : 1;
  }

  return counts;
};
const getCountNewStudentArr = async (arr) => {
  let newArr = arr;
  const counts = {};
  for (const num of newArr) {
    num.isNewStudent = await checkNewStudent(num.userId);
  }

  return counts;
};
const checkNewStudent = async (userId) => {
  let count = await db.Contract.count({
    where: {
      userId: userId,
    },
  });

  if (count > 1) {
    return false;
  }
  return true;
};
const getCountAll = (typeRoomId, contractArr) => {
  let count = 0;

  for (let i = 0; i < contractArr.length; i++) {
    if (contractArr[i].roombedData.roomData.typeRoomId == typeRoomId) {
      count++;
    }
  }
  return count;
};
const getCountNew = (typeRoomId, contractArr) => {
  let count = 0;

  for (let i = 0; i < contractArr.length; i++) {
    if (
      contractArr[i].isNewStudent &&
      contractArr[i].roombedData.roomData.typeRoomId == typeRoomId
    ) {
      count++;
    }
  }
  return count;
};
const getTotal = (typeRoomId, contractArr) => {
  let count = 0;

  for (let i = 0; i < contractArr.length; i++) {
    if (contractArr[i].roombedData.roomData.typeRoomId == typeRoomId) {
      count += contractArr[i].amount;
    }
  }
  return count;
};
let staticsContract = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataContractDistinct;
      let total = 0;
      let sum = {
        countTypeRoom: 0,
        countAll: 0,
        countNew: 0,
        countTotal: 0,
      };
      if (!data.start || !data.end) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let start = new Date(data.start).getTime();
        let end = new Date(data.end).getTime();
        let objectFilter = {
          raw: true,
          nest: true,
          where: {
            // 2023-12-11 02:22:4

            start: {
              [Op.gte]: start,
            },
            end: {
              [Op.lte]: end,
            },
          },
          order: [["id", "DESC"]],
          include: [
            {
              model: db.Room_Bed,
              as: "roombedData",
              include: [
                { model: db.Code, as: "bedData" },
                {
                  model: db.Room,
                  as: "roomData",
                  include: [{ model: db.TypeRoom, as: "typeroomData" }],
                },
              ],
            },
          ],
        };
        let res = await db.Contract.findAndCountAll(objectFilter);
        if (res.rows?.length > 0) {
          dataContractDistinct = Object.values(
            res.rows
              .reverse()
              .reduce((acc, obj) => ({ ...acc, [obj.userId]: obj }), {})
          );

          for (let e of dataContractDistinct) {
            e.isNewStudent = await checkNewStudent(e.userId);
          }
        }
        let typeRoomArr = await db.TypeRoom.findAndCountAll({
          nest: true,
          raw: true,
        });
        if (typeRoomArr.count > 0) {
          for (let i = 0; i < typeRoomArr.count; i++) {
            typeRoomArr.rows[i].priceData = await db.TypeRoom_Price.findOne({
              where: {
                typeRoomId: typeRoomArr.rows[i].id,
                isLast: 1,
              },
            });
          }
          if (dataContractDistinct) {
            for (let i = 0; i < typeRoomArr.count; i++) {
              typeRoomArr.rows[i].countAll = getCountAll(
                typeRoomArr.rows[i].id,
                dataContractDistinct
              );
              typeRoomArr.rows[i].countNew = getCountNew(
                typeRoomArr.rows[i].id,
                dataContractDistinct
              );
              typeRoomArr.rows[i].total = getTotal(
                typeRoomArr.rows[i].id,
                dataContractDistinct
              );

              sum.countTypeRoom += 1;
              sum.countAll += typeRoomArr.rows[i].countAll;
              sum.countNew += typeRoomArr.rows[i].countNew;
              sum.countTotal += typeRoomArr.rows[i].total;
            }
          }
        }
        resolve({
          errCode: 0,
          data: {
            data: typeRoomArr.rows,
            sum: sum,
          },
          count: typeRoomArr?.length,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewContract: createNewContract,
  getDetailContractById: getDetailContractById,
  getAllContract: getAllContract,
  updateContract: updateContract,
  deleteContract: deleteContract,
  getAllContractById: getAllContractById,
  extendContract: extendContract,
  staticsContract: staticsContract,
};
