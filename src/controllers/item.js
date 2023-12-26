const { Response } = require('../helper/helper');
const Item = require('../models/item');

module.exports.createItem = async (req, res, next) => {
  try {
    const files_param = req.files;

    const {
      addDate,
      challanNo,
      designId,
      l,
      panna,
      programPis,
      details,
      patti,
      gala,
      dupatta,
      partyName,
      companyId,
    } = req.body;
    console.log('req.body::', req.body);

    // aws upload
    const objectArray = Object.entries(req.body);
    for (let key in files_param) {
      objectArray.push([key, files_param[key][0]['location']]);
    }
    const updatedObject = Object.fromEntries(objectArray);

    // Create
    const newItem = await Item.create({
      addDate,
      challanNo,
      designId,
      l,
      panna,
      programPis,
      details,
      patti,
      gala,
      dupatta,
      partyName,
      companyId,
      ...updatedObject,
    });

    return Response(res, true, 'Stock item add successfully', newItem);
  } catch (err) {
    next(err);
  }
};

module.exports.uploadById = async (req, res, next) => {
  try {
    console.log('req.files log::', req.files);

    const { id } = req.params;
    const files_param = req.files;
    // Find the stockin by ID
    const stockin = await Item.findById(id);
    if (!stockin) return Response(res, false, 'Item not found!');
    console.log('files_param::', files_param);

    // aws upload
    const updatedObject = {};
    for (const [key, files] of Object.entries(files_param)) {
      if (Array.isArray(updatedObject[key])) {
        // If the key already exists as an array, push new file locations
        updatedObject[key].push(...files.map((file) => file.location));
      } else {
        // If the key is not an array, check the number of files
        if (files.length === 1) {
          // If there's only one file, add it to the existing value
          updatedObject[key] = files[0].location;
        } else {
          // If there are multiple files, create a new array for file locations
          updatedObject[key] = files.map((file) => file.location);
        }
      }
    }

    // Update
    const updatedItemData = await Item.findOneAndUpdate(
      { _id: id },
      {
        $set: updatedObject,
      },
      {
        new: true,
      }
    );

    return Response(res, true, 'Upload successfully', updatedItemData);
  } catch (err) {
    next(err);
  }
};

module.exports.getItems = async (req, res, next) => {
  try {
    const workerId = req.userId;
    const { process } = req.query;
    const query = {};
    if (process) query.process = process;
    if (process === 'Stiching') query.workerId = workerId;

    const result = await Item.find(query).populate([
      { path: 'designId' },
      { path: 'programId' },
      {
        path: 'workerIssueId',
      },
      { path: 'checkingWorkerReceivedId' },
      { path: 'checkingWorkerIssueId' },
      { path: 'pressIssueId' },
      { path: 'deliverIssueId' },
      { path: 'companyId' },
      {
        path: 'workerId',
        select: 'name emailAddress alterNo post role company workerNo',
      },
    ]);

    return Response(res, true, 'Success', result);
  } catch (err) {
    next(err);
  }
};

module.exports.getItemById = async (req, res, next) => {
  try {
    const result = await Item.findById(req.params.id).populate([
      { path: 'designId' },
      { path: 'programId' },
      {
        path: 'workerIssueId',
        populate: {
          path: 'workerId',
          model: 'Worker',
          select: 'name alterNo workerNo post role company',
        },
      },
      { path: 'checkingWorkerReceivedId' },
      { path: 'checkingWorkerIssueId' },
      { path: 'pressIssueId' },
      { path: 'deliverIssueId' },
      { path: 'companyId' },
    ]);

    if (!result) return Response(res, false, 'Item not found!');

    return Response(res, true, 'Success', result);
  } catch (err) {
    next(err);
  }
};

module.exports.updateItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      addDate,
      challanNo,
      designId,
      l,
      panna,
      programPis,
      details,
      patti,
      gala,
      dupatta,
      partyName,
      companyId,
      challanPic,
      mtrDetailPic,
      cuttingSizeRatioPic,
      workerPic,
    } = req.body;

    // Find the stockin by ID
    const stockin = await Item.findById(id);
    if (!stockin) return Response(res, false, 'Item not found!');

    // Update stockin fields
    if (addDate) stockin.addDate = addDate;
    if (challanNo) stockin.challanNo = challanNo;
    if (designId) stockin.designId = designId;
    if (l) stockin.l = l;
    if (panna) stockin.panna = panna;
    if (programPis) stockin.programPis = programPis;
    if (details) stockin.details = details;
    if (patti) stockin.patti = patti;
    if (gala) stockin.gala = gala;
    if (dupatta) stockin.dupatta = dupatta;
    if (partyName) stockin.partyName = partyName;
    if (companyId) stockin.companyId = companyId;
    // if (challanPic) stockin.challanPic = challanPic;
    // if (mtrDetailPic) stockin.mtrDetailPic = mtrDetailPic;
    // if (cuttingSizeRatioPic) stockin.cuttingSizeRatioPic = cuttingSizeRatioPic;
    // if (workerPic) stockin.workerPic = workerPic;

    // Save the updated stockin
    await stockin.save();

    return Response(res, true, 'Updated successfully', stockin);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Item.deleteOne({ _id: id });

    // Check
    if (result.deletedCount === 0)
      return Response(res, false, 'Stock item not found!');

    return Response(res, true, 'Removed successfully');
  } catch (err) {
    next(err);
  }
};
