require('dotenv').config;
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const stripe = require('stripe')('sk_test_51LY9OXEi9E0TRZFzdXz2VcsDGfpdGj8esyVkY5JxUsDlnBtPwivg08Ci6DtwnZ41kd2nL3TYQ30LpBWxKhK1Lh9800tkJxNAwB');
const cors = require('cors');
app.use(express.json({limit: "50mb"}));
const { User, Product, State, ProductCategory, Review } = require('./db');
const path = require('path');

app.use('/dist', express.static('dist'));

app.use('/public', express.static('public'));

app.use(cors());


const isLoggedIn = async(req, res, next)=> {
  try {
    req.user = await User.findByToken(req.headers.authorization);
    next();
  }
  catch(ex){
    next(ex);
  }
};

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.use('/api/orders', require('./routes/orders'));
app.use('/api/sessions', require('./routes/sessions'));

app.get('/api/books', async(req, res, next) => {
    try{
      res.send(await Product.findAll({
        order: [['title']]
      }))
    }
    catch(ex){
      next(ex)
    }
});

app.delete('/products/:id', async(req, res) => {
  try {
    const product = await Product.findByPk(req.params.id)
    await product.destroy()
    res.sendStatus(204)
  }
  catch(err){
    console.log(err)
  }
})

app.put('/products/:id', async(req, res) => {
  try {
    const product = await Product.findByPk(req.params.id)
    await product.update(req.body)
    res.send(product)
  }
  catch(err){
    console.log(err)
  }
})

app.put('/api/users/:id', isLoggedIn, async(req, res, next) =>{
  try {
    const user = await User.findByPk(req.params.id);
    if(req.body.checkPassword ){
      if(await bcrypt.compare(req.body.checkPassword, user.password)){
       req.body = {...req.body, password: req.body.newPassword};
       delete req.body.checkPassword;
       delete req.body.newPassword;
       await user.update(req.body);
       res.send(user);
       return 
      }else{
        res.status(500).send({error: 'Current password does not match'})
        return
      }
    }
    await user.update(req.body);
    res.send(user);
   } catch (ex) {
    next(ex);
  }
})

app.delete('/users/:id', async(req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    await user.destroy()
    res.sendStatus(204)
  }
  catch(err){
    console.log(err)
  }
})

app.post('/products', async(req, res)=> {
  try {
    const product = await Product.create(req.body)
    res.send(product)
  }
  catch(err){
    console.log(err)
  }
})
app.post('/createUser', async(req, res)=> {
  try {
    const user = await User.create(req.body)
    res.send(user)
  }
  catch(err){
    console.log(err)
  }
})
app.post('/users', async(req, res) => {
  const existingUser = await User.findOne({
    where: {
      username: req.body.username
    }
  })
  if (!existingUser){
    const user = await User.create(req.body)
    res.send(user)
  } 
  else {
    res.status(500).send({error: 'Username already exists!. Please choose a different username!.'})
  }
})

app.get('/users', isLoggedIn, async(req, res, next) => {
  try {
    res.send(await User.findAll())
  }
  catch(ex){
    next(ex)
  }
});

app.put('/users/update/:id', async (req, res, next) => {
  try{
    const user = await User.findByPk(req.params.id)
    const newuser = await user.update(req.body)
    res.send(newuser)
  }
  catch(ex){
    next(ex)
  }
})

app.get('/api/states', async(req, res, next) => {
  try {
    res.send(await State.findAll({
      order: [['name']]
    }))
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/categories', async(req, res, next) => {
  try {
    res.send(await ProductCategory.findAll({
      order: [['category']]
    }))
  }
  catch(ex){
    next(ex)
  }
});

app.get('/api/reviews', async(req, res, next) => {
  try {
    res.send(await Review.findAll({
      order: [['review_date', 'DESC']]
    }))
  }
  catch(ex){
    next(ex)
  }
});

app.post('/api/reviews', isLoggedIn, async(req, res, next) => {
  try {
    res.status(201).send(await Review.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/payment', cors(), async(req, res) => {
  let { amount, id } = req.body;
    try{
      const payment = await stripe.paymentIntents.create({
        amount, 
        currency:'usd',
        description:'GraceShopper Bookerstore',
        payment_method:id,
        confirm: true      
       })
       console.log('Payment', payment)
       res.json({
        message: 'payment Succesfull',
        success:true
       })
    }
    catch(ex){
      console.log('error', ex)
      res.json({
        message:"payment failed", 
        success:false
      })
    }
});

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ error: err });
});

module.exports = app;
