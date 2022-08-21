const conn = require('./conn');
const { Sequelize } = conn;

const State = conn.define('state', {
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
})

module.exports = State;
