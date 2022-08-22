const conn = require('./conn');
const { Sequelize } = conn;

const WishList = conn.define('wishList', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  }
});

module.exports = WishList;