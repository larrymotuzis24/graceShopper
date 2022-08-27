const conn = require('./conn');
const { Sequelize } = conn;
const Product = require('./Product');
const User = require('./User');
const LineItem = require('./LineItem');
const Order = require('./Order');
const State = require('./State');
const ProductCategory = require('./ProductCategory');
const Review = require('./Review');
const WishList = require('./WishList');
const Coupon = require('./Coupon');
const seedUsers = require('./seed-users.json');
const seedProducts = require('./seed-products.json');
const seedOrders = require('./seed-orders.json');
const seedLineItems = require('./seed-lineItems.json');
const seedStates = require('./seed-states.json');
const seedProductCategory = require('./seed-productCategory.json');
const seedReviews = require('./seed-reviews.json')
const seedWishList = require('./seed-wishList.json');
const seedCoupons = require('./seed-coupons.json');

User.hasMany(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Product);
Product.belongsTo(ProductCategory);
Review.belongsTo(Product);
Review.belongsTo(User);
WishList.belongsTo(Product);
WishList.belongsTo(User);

const seeder = async() =>{
  await conn.sync({force: true});
  await Promise.all(seedUsers.map(user => User.create(user)));
  await Promise.all(seedProductCategory.map(category => ProductCategory.create(category)))
  await Promise.all(seedProducts.map(product => Product.create(product)));
  await Promise.all(seedOrders.map(order => Order.create(order)));
  await Promise.all(seedLineItems.map(lineItem => LineItem.create(lineItem)));
  await Promise.all(seedStates.map(state => State.create(state)));
  await Promise.all(seedReviews.map(review => Review.create(review)));
  await Promise.all(seedWishList.map(wishList => WishList.create(wishList)));
  await Promise.all(seedCoupons.map(coupon => Coupon.create(coupon)));
}

module.exports = {
  conn,
  User,
  Product,
  LineItem,
  State,
  Order,
  ProductCategory,
  Review,
  WishList,
  Coupon,
  seeder
};
