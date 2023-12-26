import codeService from "../services/codeService";

let handleCreateNewCode = async (req, res) => {
  try {
    let data = await codeService.handleCreateNewCode(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getAllCode = async (req, res) => {
  try {
    let data = await codeService.getAllCodeService(req.query.type);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let test = async (req, res) => {
  try {
    let data = await codeService.test(req.query.type);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getAllCategoryBlog = async (req, res) => {
  try {
    let data = await codeService.getAllCategoryBlog(req.query.type);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let handleUpdateCode = async (req, res) => {
  try {
    let data = await codeService.handleUpdateCode(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getDetailCodeById = async (req, res) => {
  try {
    let data = await codeService.getDetailCodeById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let handleDeleteCode = async (req, res) => {
  try {
    let data = await codeService.handleDeleteCode(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getListCodeService = async (req, res) => {
  try {
    let data = await codeService.getListCodeService(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getListCodeByTypeStatus = async (req, res) => {
  try {
    let data = await codeService.getListCodeServiceByTypeStatus(req.query);

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let handleBlockBed = async (req, res) => {
  try {
    console.log(req.body);
    let data = await codeService.handleBlockBedSerice(req.body);

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let handleUnblockCode = async (req, res) => {
  try {
    let data = await codeService.handleUnblockCodeService(req.body);

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  handleCreateNewCode: handleCreateNewCode,
  getAllCode: getAllCode,
  handleUpdateCode: handleUpdateCode,
  getDetailCodeById: getDetailCodeById,
  handleDeleteCode: handleDeleteCode,
  getListCodeService: getListCodeService,
  getAllCategoryBlog: getAllCategoryBlog,
  test: test,
  getListCodeByTypeStatus: getListCodeByTypeStatus,
  handleBlockBed: handleBlockBed,
  handleUnblockCode: handleUnblockCode,
};
