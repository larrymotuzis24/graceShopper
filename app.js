require('dotenv').config;
const express = require('express');
const app = express();
app.use(express.json({limit: "50mb"}));
const { User, Product, State, ProductCategory, Review } = require('./db');
const path = require('path');
const bcrypt = require('bcrypt');
const cors = require('cors');
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

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

app.put('/users/update/:id', isLoggedIn, async (req, res, next) => {
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

app.post('/pay', async(req, res, next) => {
    try{
        const { name }  = req.body;
        if (!name) return res.status(400).json({message: 'Please enter a name'});
        const paymentIntent = await stripe.paymentIntent.create({
          currency:'USD',
          payment_method_types: ['card'],
          metadata: {name}
        })
        const clientSecret = paymentIntent.client_secret;
        res.json({message: 'payment initiated', clientSecret })
    }
    catch(ex){
      console.log(err)
      res.status(500).json({ messegae: 'Internal server error '})
    }
});

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ error: err });
});

module.exports = app;
