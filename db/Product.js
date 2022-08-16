const conn = require('./conn');
const { Sequelize } = conn;

const Product = conn.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  },
  author:{
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  },
  publisher:{
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  },
  year:{
    type: Sequelize.DATE,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  },
  description:{
    type: Sequelize.TEXT,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  },
  inventory:{
    type: Sequelize.INTEGER,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  },
  rating:{
    type: Sequelize.INTEGER,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  }
});

module.exports = Product;

