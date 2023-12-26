const { Response } = require('../helper/helper');
const Item = require('../models/item');
const WorkerIssue = require('../models/workerIssue');

module.exports.createWorkerIssue = async (req, res, next) => {
  try {
    // Extract fields from the request body
    const {
      designId,
      workerId,
      alterNo,
      time,
      date,
      size,
      issuePis,
      totalPis,
    } = req.body;

    // check
    const itemData = await Item.findOne({
      _id: designId,
      process: 'Cutting Okay',
    });

    if (!itemData) return Response(res, false, 'Item not found!');

    // Create a new worker issue
    const newWorkerIssue = await WorkerIssue.create({
      designId,
      workerId,
      alterNo,
      time,
      date,
      size,
      issuePis,
      totalPis,
    });

    // update status
    itemData.process = 'Stiching';
    itemData.workerIssueId = newWorkerIssue._id;
    await itemData.save();

    return Response(
      res,
      true,
      'Worker issue created successfully',
      newWorkerIssue
    );
  } catch (err) {
    next(err);
  }
};

module.exports.getWorkerIssues = async (req, res, next) => {
  try {
    // Retrieve all worker issues from the database
    const result = await WorkerIssue.find({});

    return Response(res, true, 'Success', result);
  } catch (err) {
    next(err);
  }
};

module.exports.getWorkerIssueById = async (req, res, next) => {
  try {
    // Retrieve a specific worker issue by ID
    const result = await WorkerIssue.findById(req.params.id);
    if (!result) return Response(res, false, 'Worker issue not found!');

    return Response(res, true, 'Success', result);
  } catch (err) {
    next(err);
  }
};

module.exports.updateWorkerIssue = async (req, res, next) => {
  try {
    // Extract fields from the request parameters and body
    const { id } = req.params;
    const {
      designId,
      workerId,
      alterNo,
      time,
      date,
      size,
      issuePis,
      totalPis,
    } = req.body;

    // Find the worker issue by ID
    const result = await WorkerIssue.findById(id);
    if (!result) return Response(res, false, 'Worker issue not found!');

    // Update worker issue fields only if they are provided in the request
    if (designId) result.designId = designId;
    if (workerId) result.workerId = workerId;
    if (alterNo) result.alterNo = alterNo;
    if (workerName) result.workerName = workerName;
    if (time) result.time = time;
    if (date) result.date = date;
    if (size) result.size = size;
    if (issuePis) result.issuePis = issuePis;
    if (totalPis) result.totalPis = totalPis;

    // Save the updated worker issue
    await result.save();

    return Response(res, true, 'Update successful', result);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteWorkerIssue = async (req, res, next) => {
  try {
    // Extract the ID from the request parameters
    const { id } = req.params;

    // Delete the worker issue by ID
    const result = await WorkerIssue.deleteOne({ _id: id });

    // Check if the worker issue was found and deleted
    if (result.deletedCount === 0)
      return Response(res, false, 'Worker issue not found!');

    return Response(res, true, 'Removed successfully');
  } catch (err) {
    next(err);
  }
};
