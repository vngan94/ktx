require("dotenv").config();
const nodemailer = require("nodemailer");

let sendSimpleEmail = async (dataSend) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    debug: true,
    secure: true,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  if (dataSend.type === "forgotpassword") {
    let info = transporter.sendMail({
      from: '"iDorm 👻" <vngan240005@gmail.com>', // sender address
      to: dataSend.email, // list of receivers
      subject: "Khôi phục mật khẩu | iDorm", // Subject line
      html: `<h3>Xin chào ${dataSend.fullName}!<h3>
      <p> Bạn nhận được email này vì đã thực hiện lệnh quên mật khẩu!</p>
      <p> Đây là mật khẩu mới của bạn: ${dataSend.password}</p>
      <p> Xin cảm ơn! </p>`,
    });
    return null;
  }
};
let getBodyHTMLEmailVerify = (dataSend) => {
  let result = `<h3>Xin chào ${dataSend.fullName}!</h3>
        <p>Bạn nhận được email này vì đã thực hiện lệnh xác thực email!</p>
        <p>Bui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục xác minh email của bạn</p>
        <div>
            <a href="${dataSend.redirectLink}" target=""_blank>Click here</a>
        </div>
        <div>Xin cảm ơn !</div>
    `;

  return result;
};
let getBodyHTMLEmailForgotPassword = async (dataSend) => {
  let result = `<h3>Xin chào ${dataSend.fullName}!</h3>
        <p>Bạn nhận được email này vì đã thực hiện lệnh quên mật khẩu!</p>
        <p>Đây là mật khẩu mới của bạn: ${dataSend.password}</p>
        <div>Xin cảm ơn !</div>
    `;

  return result;
};

module.exports = {
  sendSimpleEmail: sendSimpleEmail,
};
