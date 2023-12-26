const { S3 } = require('aws-sdk');
const fs = require('fs/promises');
const path = require('path');
const { MY_AWS_ACCESS_KEY_ID, MY_AWS_SECRET_ACCESS_KEY } = require('../config');

class S3Service {
  constructor() {
    this.logger = console;
    this.client = null;

    // Replace these values with your actual AWS credentials and configuration
    this.modelBucket = 'textile-user-images';
    this.defaultExpire = 3600;
    this.defaultRegion = 'ap-south-1';
    this.accessKeyId = MY_AWS_ACCESS_KEY_ID;
    this.secretAccessKey = MY_AWS_SECRET_ACCESS_KEY;
  }

  async getS3() {
    return new S3({
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      },
      endpoint: `s3-${this.defaultRegion}.amazonaws.com`,
      signatureVersion: 'v4',
      region: this.defaultRegion,
    });
  }

  async upload(file, bucket, key, acl) {
    const bucketS3 = bucket || this.modelBucket;
    const resp = await this.uploadS3(file, bucketS3, key, acl);
    console.log('resp', resp);
    return resp;
  }

  async uploadS3(
    buffer,
    bucket,
    key,
    acl = 'public-read',
    contentType = 'application/pdf'
  ) {
    try {
      const s3 = await this.getS3();
      const res = await s3
        .upload({
          Bucket: bucket,
          Key: key,
          Body: buffer,
          ACL: acl,
          ContentType: contentType,
        })
        .promise();

      // Uncomment the following line if you need to unlink the file
      // await this.unlinkFile(file);

      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async unlinkFile(file) {
    await fs.unlink(
      path.join(__dirname, '..', '..', '..', file.destination, file.filename)
    );
  }

  async GetUploadURL(key, bucket, acl = 'private') {
    this.client = await this.getS3();
    const params = {
      Bucket: bucket || this.modelBucket,
      Key: key,
      Expires: Number(this.defaultExpire),
      ACL: acl,
    };

    return this.client.getSignedUrlPromise('putObject', params);
  }

  async GetDownloadURL(key, bucket) {
    this.client = await this.getS3();
    const params = {
      Bucket: bucket || this.modelBucket,
      Key: key,
      Expires: this.defaultExpire,
    };

    return this.client.getSignedUrlPromise('getObject', params);
  }

  GetPublicUrl(key, bucket = 'ngon-assets') {
    return `https://${bucket}.s3.${this.defaultRegion}.amazonaws.com/${key}`;
  }

  async DeleteS3Object(key, bucket) {
    this.client = await this.getS3();

    return new Promise((resolve, reject) => {
      this.client.deleteObject({ Key: key, Bucket: bucket }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          console.log('Deleted S3 Object ---> ', key);
          resolve(data);
        }
      });
    });
  }

  async CheckIfExists(key, bucket) {
    this.client = await this.getS3();
    const params = { Key: key, Bucket: bucket };

    try {
      await this.client.headObject(params).promise();
      const signedUrl = await this.client.getSignedUrl('getObject', params);
      return true;
    } catch (error) {
      if (error.name === 'NotFound') {
        return false;
      } else {
        throw error;
        // Handle other errors here....
      }
    }
  }
}

module.exports = S3Service;
