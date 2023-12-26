import otpService from "../services/otpService";
let sendSerivce = async (req, res) => {
  try {
    let data = await otpService.sendSerivce();
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
  //   verifyService,
  sendSerivce,
};
