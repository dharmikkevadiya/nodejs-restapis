const {
  Response,
  genPasswordHash,
  createWorkerPdf,
  createMultipalWorkersPdf,
} = require('../helper/helper');
const Worker = require('../models/worker'); // Update the model import accordingly
const fs = require('fs');
const path = require('path');

module.exports.createWorker = async (req, res, next) => {
  try {
    const { workerNo, emailAddress, password } = req.body;
    const files_param = req.files;
    const defaultPassword = 'Textile@1234';

    // check worker exist
    const existingWorkerNo = await Worker.findOne({ workerNo });
    if (existingWorkerNo) {
      return Response(
        res,
        false,
        'Worker with the same workerNo already exists'
      );
    }

    const existingEmail = await Worker.findOne({ emailAddress });
    if (existingEmail) {
      return Response(res, false, 'Worker with the same email already exists');
    }

    // password hash
    const passwordHash = await genPasswordHash(password);

    // aws upload
    const objectArray = Object.entries(req.body);
    for (let key in files_param) {
      objectArray.push([key, files_param[key][0]['location']]);
    }
    const updatedObject = Object.fromEntries(objectArray);

    // create
    const newWorker = await Worker.create({
      ...updatedObject,
      password: passwordHash,
      mpassword: defaultPassword,
    });

    let workerResp = await Worker.findById(newWorker._id).populate([
      { path: 'post', select: 'name' },
      { path: 'role', select: 'name' },
      { path: 'company', select: 'name' },
    ]);
    workerResp = JSON.parse(JSON.stringify(workerResp));

    return Response(res, true, 'Worker created successfully', workerResp);
  } catch (err) {
    next(err);
  }
};

module.exports.getWorkerInintialId = async (req, res, next) => {
  try {
    let initialWorkerId = '010720200000';
    const lastWorker = await Worker.find({}).sort({ workerNo: -1 }).limit(1);
    console.log('lastWorker::', lastWorker);
    if (lastWorker?.[0]?.workerNo) {
      initialWorkerId = lastWorker?.[0].workerNo;
    }

    return Response(res, true, 'Success', { data: +initialWorkerId + 1 });
  } catch (err) {
    next(err);
  }
};

module.exports.getWorkers = async (req, res, next) => {
  try {
    const result = await Worker.find({}).populate([
      { path: 'post', select: 'name' },
      { path: 'role', select: 'name' },
      { path: 'company', select: 'name' },
    ]);

    return Response(res, true, 'Success', result);
  } catch (err) {
    next(err);
  }
};

module.exports.createWorkerPdf = async (req, res, next) => {
  try {
    const { id } = req.params;
    let workerDetails = await Worker.findById(id).populate([
      { path: 'post', select: 'name' },
      { path: 'role', select: 'name' },
      { path: 'company', select: 'name' },
    ]);
    if (!workerDetails?._id) {
      return Response(res, false, 'Worker not found!');
    }
    workerDetails = JSON.parse(JSON.stringify(workerDetails));

    const options = {
      format: 'A2',
      orientation: 'portrait',
      border: '10mm',
    };
    const html = fs.readFileSync(
      path.join(__dirname, '../../public/worker-pdf.html'),
      'utf8'
    );

    const document = {
      html: html,
      data: {
        workerNo: workerDetails?.workerNo ?? 'N/A',
        machineNo: workerDetails?.machineNo ?? 'N/A',
        alterNo: workerDetails?.alterNo ?? 'N/A',
        joiningDate: workerDetails?.joiningDate ?? 'N/A',
        name: workerDetails?.name ?? 'N/A',
        reference: workerDetails?.reference ?? 'N/A',
        mobileNo: workerDetails?.mobileNo ?? 'N/A',
        aadharNo: workerDetails?.aadharNo ?? 'N/A',
        emailAddress: workerDetails?.emailAddress ?? 'N/A',
        role: workerDetails?.role?.['name'] ?? 'N/A',
        post: workerDetails?.post?.['name'] ?? 'N/A',
        company: workerDetails?.company?.['name'] ?? 'N/A',
        ifscCode: workerDetails?.bankDetails?.ifscCode ?? 'N/A',
        bankAccountName: workerDetails?.bankDetails?.bankAccountName ?? 'N/A',
        bankAccountNumber:
          workerDetails?.bankDetails?.bankAccountNumber ?? 'N/A',
        status: workerDetails?.status ?? 'N/A',
        profile:
          workerDetails?.profile ??
          'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg',
        aadharCard:
          workerDetails?.aadharCard ??
          'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg',
        aadharCardBack:
          workerDetails?.aadharCardBack ??
          'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg',
        bankPassbook:
          workerDetails?.bankPassbook ??
          'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg',
      },
      path: '',
      type: 'buffer',
    };

    const uploadRes = await createWorkerPdf(document, options, workerDetails);

    return Response(res, true, 'Success', uploadRes);
  } catch (err) {
    console.log('err::', err);
    next(err);
  }
};

module.exports.createWorkerIdCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    let workerDetails = await Worker.findById(id).populate([
      { path: 'post', select: 'name' },
      { path: 'role', select: 'name' },
      { path: 'company', select: 'name' },
    ]);

    if (!workerDetails) {
      return Response(res, false, 'Worker not found!');
    }
    workerDetails = JSON.parse(JSON.stringify(workerDetails));

    const options = {
      format: 'A3', // Use a smaller format for ID card
      orientation: 'portrait',
      border: '5mm',
    };
    const html = fs.readFileSync(
      path.join(__dirname, '../../public/id-card.html'),
      'utf8'
    );

    const document = {
      html: html,
      data: {
        workerNo: workerDetails?.workerNo ?? 'N/A',
        alterNo: workerDetails?.alterNo ?? 'N/A',
        joiningDate: workerDetails?.joiningDate ?? 'N/A',
        dateOfBirth: workerDetails?.dateOfBirth ?? 'N/A',
        name: workerDetails?.name ?? 'N/A',
        reference: workerDetails?.reference ?? 'N/A',
        blockNo: workerDetails?.blockNo ?? 'N/A',
        age: workerDetails?.age ?? 'N/A',
        emailAddress: workerDetails?.emailAddress ?? 'N/A',
        role: workerDetails?.role?.['name'] ?? 'N/A',
        post: workerDetails?.post?.['name'] ?? 'N/A',
        company: workerDetails?.company?.['name'] ?? 'N/A',
        profile:
          workerDetails?.profile ||
          'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg',
      },
      path: '',
      type: 'buffer',
    };

    const uploadRes = await createWorkerPdf(document, options, workerDetails);

    return Response(res, true, 'Success', uploadRes);
  } catch (err) {
    console.log('err::', err);
    next(err);
  }
};

module.exports.getMultipalIdCards = async (req, res, next) => {
  try {
    const { ids } = req.body;

    console.log('ids::', ids);
    let workerDetails = await Worker.find({ _id: { $in: ids } }).populate([
      { path: 'post', select: 'name' },
      { path: 'role', select: 'name' },
      { path: 'company', select: 'name' },
    ]);
    if (!workerDetails?.length) {
      return Response(res, false, 'Worker not found!');
    }
    workerDetails = JSON.parse(JSON.stringify(workerDetails));

    const options = {
      format: 'A3', // Use a smaller format for ID card
      orientation: 'portrait',
      border: '5mm',
    };
    const html = fs.readFileSync(
      path.join(__dirname, '../../public/id-cards-multipal.html'),
      'utf8'
    );

    const dataArrays = [];

    // Loop through each worker and create a data array
    for (const worker of workerDetails) {
      const data = {
        workerNo: worker?.workerNo ?? 'N/A',
        alterNo: worker?.alterNo ?? 'N/A',
        joiningDate: worker?.joiningDate ?? 'N/A',
        dateOfBirth: worker?.dateOfBirth ?? 'N/A',
        name: worker?.name ?? 'N/A',
        reference: worker?.reference ?? 'N/A',
        blockNo: worker?.blockNo ?? 'N/A',
        age: worker?.age ?? 'N/A',
        emailAddress: worker?.emailAddress ?? 'N/A',
        role: worker?.role?.['name'] ?? 'N/A',
        post: worker?.post?.['name'] ?? 'N/A',
        company: worker?.company?.['name'] ?? 'N/A',
        profile:
          worker?.profile ||
          'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg',
      };

      dataArrays.push(data);
    }

    const document = {
      html: html,
      data: {
        workers: dataArrays,
      },
      path: '',
      type: 'buffer',
    };

    const uploadRes = await createMultipalWorkersPdf(document, options);

    return Response(res, true, 'Success', uploadRes);
  } catch (err) {
    console.log('err::', err);
    next(err);
  }
};

module.exports.getWorkerById = async (req, res, next) => {
  try {
    const result = await Worker.findById(req.params.id).populate([
      { path: 'post', select: 'name' },
      { path: 'role', select: 'name' },
      { path: 'company', select: 'name' },
    ]);
    if (!result) return Response(res, false, 'Worker not found!');

    return Response(res, true, 'Success', result);
  } catch (err) {
    next(err);
  }
};

module.exports.updateWorker = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { workerNo, emailAddress } = req.body;
    const result = await Worker.findById(id);
    const files_param = req.files;
    const url = {};

    if (!result) return Response(res, false, 'Worker not found!');
    const _id = result._id;

    // check worker exist
    // if (workerNo) {
    //   const existingWorkerNo = await Worker.findOne({
    //     _id: { $ne: _id },
    //     workerNo,
    //   });
    //   if (existingWorkerNo)
    //     return Response(
    //       res,
    //       false,
    //       'Worker with the same workerNo already exists'
    //     );
    // }

    // if (emailAddress) {
    //   const existingEmail = await Worker.findOne({
    //     _id: { $ne: _id },
    //     emailAddress,
    //   });
    //   if (existingEmail)
    //     return Response(
    //       res,
    //       false,
    //       'Worker with the same email already exists'
    //     );
    // }

    // aws upload
    const objectArray = Object.entries(req.body);
    for (let key in files_param) {
      objectArray.push([key, files_param[key][0]['location']]);
    }
    const updatedObject = Object.fromEntries(objectArray);
    console.log('updatedObject::', updatedObject);

    if (updatedObject?.aadharCard) url.aadharCard = updatedObject?.aadharCard;
    if (updatedObject?.aadharCardBack)
      url.aadharCardBack = updatedObject?.aadharCardBack;
    if (updatedObject?.profile) url.profile = updatedObject?.profile;
    if (updatedObject?.signature) url.signature = updatedObject?.signature;
    if (updatedObject?.bankPassbook)
      url.bankPassbook = updatedObject?.bankPassbook;

    const workerData = await Worker.findByIdAndUpdate(
      id,
      { ...req.body, ...url },
      {
        new: true,
      }
    ).populate([
      { path: 'post', select: 'name' },
      { path: 'role', select: 'name' },
      { path: 'company', select: 'name' },
    ]);

    return Response(res, true, 'Update successful', workerData);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteWorker = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Worker.deleteOne({ _id: id });

    // check
    if (result.deletedCount === 0)
      return Response(res, false, 'Worker not found!');

    return Response(res, true, 'Removed successfully');
  } catch (err) {
    next(err);
  }
};
