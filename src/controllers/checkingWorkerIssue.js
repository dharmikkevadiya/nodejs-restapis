const { Response } = require('../helper/helper');
const CheckingWorkerIssue = require('../models/checkingWorkerIssue');
const Item = require('../models/item');

module.exports.createCheckingWorkerIssue = async (req, res, next) => {
  try {
    const { date, time, designId, details, rejectPis, checkrName, chekerPic } =
      req.body;

    // item
    const itemData = await Item.findOne({
      _id: designId,
      process: 'Checking Worker Received',
    });
    if (!itemData) return Response(res, false, 'Item not found!');

    const newCheckingWorkerIssue = await CheckingWorkerIssue.create({
      date,
      time,
      designId,
      details,
      rejectPis,
      checkrName,
      chekerPic,
    });

    // update status
    itemData.process = 'Press Issue';
    itemData.checkingWorkerIssueId = newCheckingWorkerIssue._id;
    await itemData.save();

    return Response(
      res,
      true,
      'Checking worker issue entry created successfully',
      newCheckingWorkerIssue
    );
  } catch (err) {
    next(err);
  }
};

module.exports.uploadCheckrPic = async (req, res, next) => {
  try {
    // item
    const { id } = req.params;
    const files_param = req.files;
    const result = await CheckingWorkerIssue.findById(id);
    if (!result)
      return Response(res, false, 'Checking worker issue entry not found!');

    // aws upload
    const objectArray = Object.entries(req.body);
    for (let key in files_param) {
      objectArray.push([key, files_param[key][0]['location']]);
    }
    const updatedObject = Object.fromEntries(objectArray);

    // Update
    const updatedItemData = await CheckingWorkerIssue.findOneAndUpdate(
      { _id: id },
      {
        $set: updatedObject,
      },
      {
        new: true,
      }
    );

    return Response(res, true, 'Upload Successfully', updatedItemData);
  } catch (err) {
    next(err);
  }
};

module.exports.getCheckingWorkerIssue = async (req, res, next) => {
  try {
    const result = await CheckingWorkerIssue.find({});
    return Response(res, true, 'Success', result);
  } catch (err) {
    next(err);
  }
};

module.exports.getCheckingWorkerIssueById = async (req, res, next) => {
  try {
    const result = await CheckingWorkerIssue.findById(req.params.id);
    if (!result)
      return Response(res, false, 'Checking worker issue entry not found!');

    return Response(res, true, 'Success', result);
  } catch (err) {
    next(err);
  }
};

module.exports.updateCheckingWorkerIssue = async (req, res, next) => {
  try {
    const { date, time, designId, details, rejectPis, checkrName, chekerPic } =
      req.body;

    const result = await CheckingWorkerIssue.findById(req.params.id);
    if (!result)
      return Response(res, false, 'Checking worker issue entry not found!');

    if (date) result.date = date;
    if (time) result.time = time;
    if (designId) result.designId = designId;
    if (details) result.details = details;
    if (rejectPis) result.rejectPis = rejectPis;
    if (checkrName) result.checkrName = checkrName;
    if (chekerPic) result.chekerPic = chekerPic;

    await result.save();

    return Response(res, true, 'Update successful', result);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCheckingWorkerIssue = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await CheckingWorkerIssue.deleteOne({ _id: id });

    if (result.deletedCount === 0)
      return Response(res, false, 'Checking worker issue entry not found!');

    return Response(res, true, 'Removed successfully');
  } catch (err) {
    next(err);
  }
};
