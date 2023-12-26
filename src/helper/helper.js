const bcrypt = require('bcryptjs');
const Worker = require('../models/worker');
const S3Service = require('./awsService');
const s3Service = new S3Service();
const { create } = require('pdf-creator-node');

const getRandomValue = function (str = '1234567890', length = 4) {
  // const str = '1234567890'; //Random Generate Every Time From This Given Char
  // const length = 4;

  let randomValue = '';
  for (let i = 0; i < length; i++) {
    const value = Math.floor(Math.random() * str.length);
    randomValue += str.substring(value, value + 1).toUpperCase();
  }

  return randomValue;
};

const getUniqueValue = function (
  length = 16,
  options = { numericOnly: false }
) {
  let text = '';
  const possible =
    options && options.numericOnly
      ? '0123456789'
      : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const checkPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const genPasswordHash = async (password) => {
  // const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, 10);
};

const Response = (res, status, message, data = {}, statusCode) => {
  if (statusCode) statusCode = statusCode;
  else if (!status) statusCode = 400;
  else statusCode = 200;
  res.json({
    status,
    statusCode,
    message,
    data,
  });
};

const createWorkerPdf = async (document, options, workerDetails) => {
  const res = await create(document, options);

  const key = `org/${workerDetails?.company?._id}/${workerDetails?.aadharNo}/${workerDetails?._id}_worker.pdf`;
  const bucket = 'textile-user-images';
  const { Location } = await s3Service.upload(res, bucket, key, 'public-read');

  return { url: Location };
};

const createMultipalWorkersPdf = async (document, options) => {
  const res = await create(document, options);

  const key = `multipal/workers_idcards.pdf`;
  const bucket = 'textile-user-images';
  const { Location } = await s3Service.upload(res, bucket, key, 'public-read');

  return { url: Location };
};
// createPdf('input.pdf', 'output.pdf');

module.exports = {
  getRandomValue,
  getUniqueValue,
  checkPassword,
  genPasswordHash,
  Response,
  createWorkerPdf,
  createMultipalWorkersPdf,
};
