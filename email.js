const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sourcecodebooks@gmail.com",
    pass: "vgvarfpohqpawzex",
  },
});

const orderConf = "Your order is getting ready!";

module.exports = {
  transporter,
  orderConf
};
