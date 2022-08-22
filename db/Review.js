const conn = require('./conn');
const { Sequelize } = conn;

const Review = conn.define('review', {
    review:{
        type: Sequelize.TEXT,
    },
    review_date:{
        type: Sequelize.DATE
    }
})

module.exports = Review;