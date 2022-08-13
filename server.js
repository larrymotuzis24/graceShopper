const app = require('./app');
const { conn, User, Product } = require('./db');
const { seeder } = require('./db/index');

const setUp = async()=> {
  try {
    await seeder();
    // await lucy.addToCart({ product: foo, quantity: 3 });
    // await lucy.addToCart({ product: bar, quantity: 4 });
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};

setUp();
