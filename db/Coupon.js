const conn = require('./conn');
const { Sequelize } = conn;

const Coupon = conn.define('coupon', {
    code:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    percentage:{
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
})

module.exports = Coupon;