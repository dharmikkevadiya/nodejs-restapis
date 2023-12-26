const { ValidationError } = require('joi');
const { JsonWebTokenError } = require('jsonwebtoken');
const CustomErrorHandler = require('../helper/CustomErrorHandler');
const ErrorLog = require('../models/errorLog');
const { MulterError } = require('multer');
const { isCelebrateError } = require('celebrate');

const errorHandler = async (err, req, res, next) => {
  let statusCode = 500;
  let message = err.message;

  if (err instanceof CustomErrorHandler) {
    statusCode = err.status;
  } else if (err instanceof ValidationError) {
    statusCode = 422;
  } else if (err instanceof MulterError) {
    statusCode = 400;
  } else if (err instanceof JsonWebTokenError) {
    statusCode = 401;
    message = 'Unauthorized: Invalid credentials.';
  } else if (isCelebrateError(err)) {
    let msg = 'Invalid validation';
    const errorBody = err.details.get('body') || err.details.get('params');
    const {
      details: [errorDetails],
    } = errorBody;

    if (errorDetails?.message) msg = errorDetails.message.replace(/['"]+/g, ''); // Remove double quotes

    statusCode = 422;
    message = msg;
  } else {
    const user = req.userId;
    const body = req.body;
    const params = req.params;
    const query = req.query;

    await new ErrorLog({
      apiPath: req.method + req.url,
      message: message,
      statusCode,
      data: { user, body, params, query },
    }).save();
  }

  console.log('user:: ', req?.userId);
  console.log('body:: ', req.body);
  console.log('params:: ', req.params);
  console.log('query:: ', req.query);
  console.log('Err::', err);

  return res.json({ status: false, statusCode, message });
};

module.exports = errorHandler;
