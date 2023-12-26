const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const { MY_AWS_ACCESS_KEY_ID, MY_AWS_SECRET_ACCESS_KEY } = require('../config');

const s3 = new aws.S3({
  accessKeyId: MY_AWS_ACCESS_KEY_ID,
  secretAccessKey: MY_AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
});

const uploadFile = multer({
  storage: multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: 'textile-user-images',
    key: function (req, file, cb) {
      console.log('req.body::upload ', req.body);
      const { company, workerNo } = req.body;

      const key = `org/${company}/${workerNo}/${
        file.fieldname
      }.${file.mimetype.replace('image/', '')}`;
      cb(null, key);
    },
  }),
});

const uploadFileOfItem = multer({
  storage: multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: 'textile-user-images',
    key: function (req, file, cb) {
      console.log('req.body::upload ', req.body);
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

      const key = `stockin/${uniqueName}/${
        file.fieldname
      }.${file.mimetype.replace('image/', '')}`;
      cb(null, key);
    },
  }),
});

module.exports = { uploadFile, uploadFileOfItem };
