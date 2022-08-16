const express = require('express');
const app = express();
app.use(express.json());
const { User, Product } = require('./db');
const path = require('path');
const { resolveNaptr } = require('dns/promises');

app.use('/dist', express.static('dist'));

app.use('/public', express.static('public'));


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
      res.send(await Product.findAll())
    }
    catch(ex){
      next(ex)
    }
});


app.post('/users', async(req, res) => {
  const existingUser = await User.findOne({
    where: {
      email: req.body.email
    }
  })
  if (existingUser === null){
    const user = await User.create(req.body)
    res.send(user)
    console.log('added the user')
  } 
  else {
    console.log('user is already existing')
  }
})

app.get('/users', async(req, res) => {
  try {
    res.send(await User.findAll())
  }
  catch(err){
    console.log(err)
  }
})

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ error: err });
});

module.exports = app;
