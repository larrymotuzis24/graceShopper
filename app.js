const express = require('express');
const app = express();
app.use(express.json());
const { User, Product } = require('./db');
const path = require('path');
const bcrypt = require('bcrypt');

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
