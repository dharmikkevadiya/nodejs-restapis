const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const User = require('../models/worker');
const CustomErrorHandler = require('../helper/CustomErrorHandler');

const auth = async (req, res, next) => {
  try {
    // get token from header
    let authHeader = req.headers.authorization;
    if (!authHeader) throw CustomErrorHandler.unAuthorized();

    const token = authHeader.split(' ')[1];

    //verify token
    const verifyuser = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ _id: verifyuser._id });
    if (!user) throw CustomErrorHandler.unAuthorized();

    req.userId = user?._id;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { auth };
