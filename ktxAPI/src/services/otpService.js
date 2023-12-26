import db from "../models/index";
const textflow = require("textflow.js");
textflow.useKey(
  "VxDcf7oQ4ybTpkJOxQIUTrxyzo78zWa21jjxDZTXWqlqIiXJOMonpdOQE4wbCgLl"
);
require("dotenv").config();
const { Op } = require("sequelize");

let sendSerivce = (data) => {
  return new Promise(async (resolve, reject) => {
    let code;
    const verificationOptions = {
      service_name: "My super cool app",
      seconds: 600,
    };

    const result = await textflow.sendVerificationSMS(
      "+84395442149",
      verificationOptions
    );
    console.log(result);
    if (result.ok) {
      console.log("SUCCESS");
      code = result.data.verification_code;
      let result2 = await textflow.verifyCode("+84395442149", code);
      if (result2.valid) console.log("Verified!");
    }
  });
};
module.exports = {
  sendSerivce: sendSerivce,
};
