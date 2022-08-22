const conn = require('./conn');
const { Sequelize } = conn;

const ProductCategory = conn.define('productCategory', {
    category:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
})

module.exports = ProductCategory;