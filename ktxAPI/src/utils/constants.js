const areaStatus = {
  ACTIVE: 1,
  INACTIVE: 0,
};
const codeStatus = {
  ACTIVE: 1,
  INACTIVE: 0,
};
const userStatus = {
  ACTIVE: 1,
  INACTIVE: 0,
};
const groupStatus = {
  ACTIVE: 1,
  INACTIVE: 0,
};

const violationActionStatus = {
  ACTIVE: 1,
  INACTIVE: 0,
};
const messageStatus = {
  SEEN: 1,
  UNSEEN: 0,
  DELETE: 1,
  NOTDELETE: 0,
};
const complaintStatus = {
  NEW: 0, // mới = chưa đọc
  DENY: 1, // từ chối giải quyết
  ACCEPT: 2, // đã chấp nhận, đang chờ giải quyết
  RESOLVE: 3, // đã giải quyết
};
const deviceStatus = {
  NEW: 1,
  USED: 0,
};

const roomStatus = {
  INACTIVE: 1, // ngưng hoạt động
  AVAILABLE: 2, // còn trống
  FULL: 3, // đầy
};

const registerStatus = {
  WAITING: 1,
  ACCEPT: 2,
  FAIL: 3,
  CHECKIN: 4,
  CANCEL: 5,
};

const room_bedStatus = {
  ACTIVE: 1, // giường hoạt động
  STAYING: 2, // sinh viên đang ở
  LEFT: 3, // sinh viên rời đi
  MAINTAINED: 4, // giường bảo trì
};

const room_deviceStatus = {
  NEW: 1,
  BROKEN: 2,
  FIXED: 3,
  REMOVED: 4, // xóa thiết bị khỏi phòng (vì nhiều lí do: thêm nhầm hoặc chuyển thuyết bị sang phòng khác)
  USELESS: 5, // không còn dùng được nữa
};

const contractStatus = {
  VALID: 1, // có hiệu lực
  INVALID: 2, // hết hiệu lực do vượt quá thời gian đăng ký
  CANCEL: 3, // Bị chấm dứt do vi phạm nội quy
};

const typeRoomStatus = {
  ACTIVE: 1,
  INACTIVE: 0,
};

module.exports = {
  areaStatus: areaStatus,
  contractStatus: contractStatus,
  registerStatus: registerStatus,
  complaintStatus: complaintStatus,
  userStatus: userStatus,
  codeStatus: codeStatus,
  room_bedStatus: room_bedStatus,
  typeRoomStatus: typeRoomStatus,
  roomStatus: roomStatus,
  violationActionStatus: violationActionStatus,
  deviceStatus: deviceStatus,
  room_deviceStatus: room_deviceStatus,
  messageStatus: messageStatus,
};
