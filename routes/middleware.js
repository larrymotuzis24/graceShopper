const { User } = require('../db');

const isLoggedIn = async(req, res, next)=> {
  try {
    const token = req.headers?.authorization || req.body?.headers?.authorization;
    req.user = await User.findByToken(token);
    next();
  }
  catch(ex){
    next(ex);
  }
};

module.exports = {
  isLoggedIn
};
