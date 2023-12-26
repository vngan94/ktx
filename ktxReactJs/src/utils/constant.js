export const path = {
  HOME: "/",
  HOMEPAGE: "/home",
};
export const SHOP_CART = {
  ADD_ITEM_CART_START: "ADD_ITEM_CART_START",
  ADD_ITEM_CART_SUCCESS: "ADD_ITEM_CART_SUCCESS",
  ADD_ITEM_CART_FAILD: "ADD_ITEM_CART_FAILD",

  GET_ITEM_CART_START: "GET_ITEM_CART_START",
  GET_ITEM_CART_SUCCESS: "GET_ITEM_CART_SUCCESS",
  GET_ITEM_CART_FAILD: "GET_ITEM_CART_FAILD",

  CHOOSE_VOUCHER_START: "CHOOSE_VOUCHER_START",
  CHOOSE_TYPESHIP_START: "CHOOSE_TYPESHIP_START",
};

export const CRUD_ACTIONS = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
};
export const manageActions = {
  ADD: "ADD",
  EDIT: "EDIT",
  DELETE: "DELETE",
};

export const dateFormat = {
  SEND_TO_SERVER: "DD/MM/YYYY",
};

export const YesNoObj = {
  YES: "Y",
  NO: "N",
};
export const USER_ROLE = {
  ADMIN: "R1",
  USER: "R2",
};
export const PAGINATION = {
  pagerow: 6,
};
export const PAGINATION2 = {
  pagerow: 8,
};
export const PREFIX_CURRENCY = {
  minimumFractionDigits: 0,
};
export const EXCHANGE_RATES = {
  USD: 24300,
};
export const STATUS_REGISTER = [
  { value: 1, label: "Chờ duyệt" },
  { value: 2, label: "Đã duyệt" },
  { value: 3, label: "Từ chối" },
  { value: 4, label: "Đã nhận phòng" },
  { value: 5, label: "Đã hủy" },
];

export const STATUS_COMPLAINT = [
  { value: 0, label: "Mới" },
  { value: 1, label: "Từ chối giải quyết" },
  { value: 2, label: "Đang giải quyết" },
  { value: 3, label: "Thành công" },
];

export const STATUS_CONTRACT = [
  { value: 1, label: "Còn hạn" },
  { value: 2, label: "Hết hạn" },
  { value: 3, label: "Chấm dứt do vi phạm nội quy" },
];
