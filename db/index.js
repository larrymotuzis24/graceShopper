const conn = require('./conn');
const { Sequelize } = conn;
const Product = require('./Product');
const User = require('./User');
const LineItem = require('./LineItem');
const Order = require('./Order');
const seedUsers = require('./seed-users.json');
const seedProducts = require('./seed-products.json');
const seedOrders = require('./seed-orders.json');
const seedLineItems = require('./seed-lineItems.json');

User.hasMany(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Product);

const seeder = async() =>{
  await conn.sync({force: true});
  await Promise.all(seedUsers.map(user => User.create(user)));
  await Promise.all(seedProducts.map(product => Product.create(product)));
  await Promise.all(seedOrders.map(order => Order.create(order)));
  await Promise.all(seedLineItems.map(lineItem => LineItem.create(lineItem)));
}

module.exports = {
  conn,
  User,
  Product,
  LineItem,
  Order,
  seeder
};
