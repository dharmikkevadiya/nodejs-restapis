const nodemailer = require('nodemailer');

const sendEmailOtp = async (email, subject, body) => {
  try {
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'yogibadatya143@gmail.com',
        pass: 'mmkdjfjyqgbooncg',
      },
    });
    let mailOptions = {
      from: 'noreply@textile.com',
      to: email,
      subject,
      html: body,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.log(err.message);
      if (info) console.log('email send successfully:', info);
    });

    return true;
    // return successResponse(StatusCodes.OK, 'email send' + MSG.SUCCESSFULLY);
  } catch (err) {
    console.log('err', err);
    // return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
  }
};

module.exports = { sendEmailOtp };
