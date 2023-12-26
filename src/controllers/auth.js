const CustomErrorHandler = require('../helper/CustomErrorHandler');
let {
  Response,
  checkPasswordm,
  getRandomValue,
  checkPassword,
  genPasswordHash,
} = require('../helper/helper');
const Worker = require('../models/worker');
const Role = require('../models/role');
const Post = require('../models/post');
const LoginHistory = require('../models/loginHistory');
const Organization = require('../models/organization');
const VerificationCode = require('../models/verificationCode');
const { sendEmailOtp } = require('../helper/mailService');

module.exports.login = {
  controller: async function login(req, res, next) {
    try {
      const { emailAddress, password, latitude, longitude } = req.body;

      let user = await Worker.findOne({ emailAddress })
        .populate([
          { path: 'post', select: 'name' },
          { path: 'role', select: 'name' },
          { path: 'company', select: 'name' },
        ])
        .select('+password');

      // chack email
      if (!user)
        return Response(
          res,
          false,
          'Unauthorized: Invalid credentials.',
          null,
          401
        );

      // check password
      const isMatch = await checkPassword(password, user.password);
      if (!isMatch)
        return Response(
          res,
          false,
          'Unauthorized: Invalid credentials.',
          null,
          401
        );

      //latitude longitude
      if (latitude) user.latitude = latitude;
      if (longitude) user.longitude = longitude;

      // login history
      await LoginHistory.create({
        latitude: latitude,
        longitude: longitude,
        userId: user._id,
      });

      const token = await user.generateAuthToken();

      user = JSON.parse(JSON.stringify(user));
      delete user.password;
      user.token = token;

      return Response(res, true, 'Login Successfully', user);
    } catch (err) {
      next(err);
    }
  },
};

module.exports.getMe = {
  controller: async function getMe(req, res, next) {
    try {
      let result = await Worker.findById(req.userId).populate([
        { path: 'post', select: 'name' },
        { path: 'role', select: 'name' },
        { path: 'company', select: 'name' },
      ]);

      return Response(res, true, 'Success', result);
    } catch (err) {
      next(err);
    }
  },
};

module.exports.addData = {
  controller: async function addData(req, res, next) {
    try {
      // Sample data for Role
      const roles = [
        'Admin',
        'Master',
        'Stitching',
        'Checking',
        'Press',
        'Delivery',
        'Stitching Worker',
        'No Role',
      ];
      // Sample data for Post
      const posts = [
        'Master',
        'Line Master',
        'Cutter Master',
        'Helper + Lair Master',
        'Checker',
        'Sample Man',
        'Accountant',
        'Peon',
        'Stiching-Master',
      ];
      // Sample data for Organization
      const orgData = ['KKcreation', 'Maher Creation', 'Test Creation'];

      // remove
      await Role.remove();
      await Post.remove();
      await Organization.remove();

      // create
      await Role.create(roles.map((name) => ({ name })));
      await Post.create(posts.map((name) => ({ name })));
      await Organization.create(orgData.map((name) => ({ name })));

      return Response(res, true, 'Success');
    } catch (err) {
      next(err);
    }
  },
};

module.exports.forgotPassword = {
  controller: async function forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      const code = getRandomValue();
      console.log('Forgot Password', req.body);

      const worker = await Worker.findOne({
        emailAddress: email,
      }).select(['emailAddress', 'name']);

      if (!worker?._id) {
        return Response(res, false, 'Email address not registered.');
      }

      const htmlContent = `<p>Hello,</p>
          <p>Your OTP for resetting the password is: <strong>${code}</strong></p>
          <p>Please use this OTP to reset your account password. 
           If you did not request a password reset, please ignore this email
          </p>
          <p>Note: This OTP is valid for a limited time.</p>
          <p>Best regards,<br></p>`;

      sendEmailOtp(email, 'Forgot password OTP', htmlContent);
      const isEmailSent = true;

      if (isEmailSent) {
        const verificationCode = await VerificationCode.create({
          code,
          entity: worker._id,
          expiryAt: Date.now() + 1000 * 60 * 10,
          type: 'forgot-password',
          status: 'pending',
        });

        return Response(res, true, 'Verification Code Sent Successfully', {
          id: verificationCode._id,
          code: verificationCode.code,
        });
      }
    } catch (err) {
      next(err);
    }
  },
};

module.exports.verifyCode = {
  controller: async function verifyCode(req, res, next) {
    try {
      const { id, code, email, password } = req.body;
      console.log('Verify Code:', req.body);

      const worker = await Worker.findOne({ emailAddress: email }).select([
        'emailAddress',
      ]);

      if (!worker?._id) {
        return Response(res, false, 'Email address not registered');
      }

      const verificationCode = await VerificationCode.findOne({
        _id: id,
        code: code,
        entity: worker._id,
        expiryAt: { $gt: Date.now() },
      });

      if (!verificationCode?._id) {
        return Response(res, false, 'Invalid verification code.');
      }

      await VerificationCode.findByIdAndUpdate(verificationCode._id, {
        $set: {
          status: 'verified',
        },
      });

      const passwordHash = await genPasswordHash(password);
      worker.password = passwordHash;
      await worker.save();

      return Response(res, true, 'Password reset successfully');
    } catch (err) {
      next(err);
    }
  },
};
