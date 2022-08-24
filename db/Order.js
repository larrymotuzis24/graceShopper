const conn = require("./conn");
const { Sequelize } = conn;
const {
  transporter,
  orderConf
} = require("../email");

const Order = conn.define("order", {
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

Order.addHook("afterSave", async (order) => {
  if (!order.isCart) {
    const user = await conn.models.user.findByPk(order.userId);
    /**If user email was real, for now, hardcoding the email*/
    const email = user.email;
    const msg = ['<div><h3>Order details</h3></div><br>']
    const html = order.lineItems.map((lineItem) => {
      return `<div><span style="font-weight:bold">Title:</span> ${lineItem.product.title}</div><br><div><span style="font-weight:bold">Price:</span> ${lineItem.product.price}</div><br><div><span style="font-weight:bold">Quantity:</span> ${lineItem.quantity}</div><hr/>`;
    });

    html.unshift(msg);

    const mailOptions = {
      from: "sourcecodebooks@gmail.com",
      to: "rcla1112@gmail.com",
      subject: `Hello ${user.firstName}, ` + orderConf,
      html: html.join("")
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  }
});

module.exports = Order;
