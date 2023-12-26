import contractService from "../services/contractService";
let createNewContract = async (req, res) => {
  try {
    let data = await contractService.createNewContract(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let extendContract = async (req, res) => {
  try {
    let data = await contractService.extendContract(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getDetailContractById = async (req, res) => {
  try {
    let data = await contractService.getDetailContractById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllContract = async (req, res) => {
  try {
    let data = await contractService.getAllContract(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log("in");
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let updateContract = async (req, res) => {
  console.log(req.body);
  try {
    let data = await contractService.updateContract(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let deleteContract = async (req, res) => {
  console.log(req.body);
  try {
    let data = await contractService.deleteContract(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllContractById = async (req, res) => {
  try {
    let data = await contractService.getAllContractById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let staticsContract = async (req, res) => {
  try {
    let data = await contractService.staticsContract(req.query);
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
  createNewContract: createNewContract,
  getDetailContractById: getDetailContractById,
  getAllContract: getAllContract,
  updateContract: updateContract,
  deleteContract: deleteContract,
  getAllContractById: getAllContractById,
  extendContract: extendContract,
  staticsContract: staticsContract,
};
