const app = require('./app');
const { seeder } = require('./db/index');

const setUp = async()=> {
  try {
    await seeder();
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};

setUp();
