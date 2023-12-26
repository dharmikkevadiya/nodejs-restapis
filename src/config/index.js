const MONGODB_URL = process.env.MONGODB_URL || '';
const JWT_SECRET = process.env.JWT_SECRET || 'thisjwtsecret';
const PORT = process.env.PORT || 5000;
const MY_AWS_ACCESS_KEY_ID = process.env.MY_AWS_ACCESS_KEY_ID;
const MY_AWS_SECRET_ACCESS_KEY = process.env.MY_AWS_SECRET_ACCESS_KEY;

module.exports = {
  MONGODB_URL,
  PORT,
  JWT_SECRET,
  MY_AWS_ACCESS_KEY_ID,
  MY_AWS_SECRET_ACCESS_KEY,
};
