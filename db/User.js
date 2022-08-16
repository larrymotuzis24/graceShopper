const conn = require('./conn');
const { Sequelize } = conn;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const User = conn.define('user', {
  firstName:{
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  },
  lastName:{
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  },
  isAdmin:{
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Must be a valid email address",
      },
    },
  },
  address:{
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl:{
    type: Sequelize.TEXT,
    defaultValue: "data:image/png;base64,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"
  }
});

User.addHook('beforeSave', async(user)=> {
  if(user.changed('password')){
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.prototype.createOrderFromCart = async function(){
  const cart = await this.getCart();
  cart.isCart = false;
  cart.lineItems.map(async (lineItem) => {
    const quantity = lineItem.quantity;
    const productId = lineItem.productId;
    const product = conn.models.product.findByPk(productId);
    product.inventory = product.inventory - quantity;
    await product.save();
  })
  return cart.save();
}

User.prototype.addToCart = async function({ product, quantity}){
  const cart = await this.getCart();
  let lineItem = await conn.models.lineItem.findOne({
    where: {
      productId: product.id,
      orderId: cart.id
    }
  });
  if(lineItem){
    lineItem.quantity = quantity;
    if(lineItem.quantity){
      await lineItem.save();
    }
    else {
      await lineItem.destroy();
    }
  }
  else {
    await conn.models.lineItem.create({ productId: product.id, quantity, orderId: cart.id });
  }
  return this.getCart();
}

User.prototype.getCart = async function(){
  let order = await conn.models.order.findOne({
    where: {
      userId: this.id,
      isCart: true
    },
    include: [
      {
        model: conn.models.lineItem,
        include: [ conn.models.product ]
      }
    ]
  });
  if(!order){
    order = await conn.models.order.create({ userId: this.id });
    order = await conn.models.order.findByPk(order.id, {
      include: [ conn.models.lineItem ]
    });
  }
  return order;
}

User.authenticate = async function(credentials){
  const user = await this.findOne({
    where: {
      username: credentials.username
    } 
  });
  if(user && await bcrypt.compare(credentials.password, user.password)){
    return jwt.sign({ id: user.id}, process.env.JWT);
  }
  else {
    const error = new Error('Bad Credentials');
    error.status = 401;
    throw error;
  }
}

User.findByToken = async function findByToken(token){
  try {
    const id = jwt.verify(token, process.env.JWT).id;
    const user = await User.findByPk(id);
    if(!user){
      throw 'error';
    }
    return user;
  }
  catch(ex){
    const error = new Error('bad token');
    error.status = 401;
    throw error;
  }
}

module.exports = User;

