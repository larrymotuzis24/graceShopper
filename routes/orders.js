const express = require('express');
const app = express.Router();
const { isLoggedIn } = require('./middleware');
const { WishList, Product, Order, LineItem } = require('../db')

module.exports = app;

app.put('/', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await req.user.createOrderFromCart());
  }
  catch(ex){
    next(ex)
  }

});

app.put('/cart', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await req.user.addToCart(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/cart', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await req.user.getCart());
  }
  catch(ex){
    next(ex);
  }
});

app.post('/wish', isLoggedIn, async(req, res, next) =>{
  try {
    
  } catch (ex) {
    next(ex);
  }
})

app.put('/wish/:id', isLoggedIn, async(req, res, next)=> {
  try {
    const wishList = await WishList.findOne({
      where: {
        productId: req.params.id
      }
    });
    if(wishList){
      await wishList.update(req.body);
      res.send(wishList);
    }else{
      res.status(201).send(await WishList.create(req.body));
    }
  }
  catch(ex){
    next(ex);
  }
});

app.get('/wish/:id', isLoggedIn ,async(req, res, next)=> {
  try {
    res.send(await WishList.findAll({
      where: {
        userId: req.params.id
      },
      include: [Product]
    }));
  }
  catch(ex){
    next(ex);
  }
});


app.delete('/wish/:id', isLoggedIn, async(req, res, next) =>{
  try {
    const wishList = await WishList.findByPk(req.params.id);
    await wishList.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
})

app.get('/history/:id', async(req, res, next) =>{
  try {
    res.send(await Order.findAll({
      where: {
        userId: req.params.id,
        isCart: false
      },
      include: [
        {
          model: LineItem,
          include: [ Product ]
        }
      ]
    }))
  } catch (ex) {
    next(ex);
  }
})