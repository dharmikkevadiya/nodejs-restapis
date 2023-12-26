const { Response } = require('../helper/helper');
const Item = require('../models/item');
const PressIssue = require('../models/pressIssue');

module.exports.createPressIssue = async (req, res, next) => {
  try {
    // Extract fields from the request body
    const { date, time, designId, details, rejectPis, finalPis, totalAmount } =
      req.body;

    // item
    const itemData = await Item.findOne({
      _id: designId,
      process: 'Press Issue',
    });

    if (!itemData) return Response(res, false, 'Item not found!');

    // Create a new press issue
    const newPressIssue = await PressIssue.create({
      date,
      time,
      designId,
      details,
      rejectPis,
      finalPis,
      totalAmount,
    });

    // update status
    itemData.process = 'Delivery Issue';
    itemData.pressIssueId = newPressIssue._id;
    await itemData.save();

    return Response(
      res,
      true,
      'Press issue created successfully',
      newPressIssue
    );
  } catch (err) {
    next(err);
  }
};

module.exports.getPressIssues = async (req, res, next) => {
  try {
    // Retrieve all press issues from the database
    const result = await PressIssue.find({});

    return Response(res, true, 'Success', result);
  } catch (err) {
    next(err);
  }
};

module.exports.getPressIssueById = async (req, res, next) => {
  try {
    // Retrieve a specific press issue by ID
    const result = await PressIssue.findById(req.params.id);
    if (!result) return Response(res, false, 'Press issue not found!');

    return Response(res, true, 'Success', result);
  } catch (err) {
    next(err);
  }
};

module.exports.updatePressIssue = async (req, res, next) => {
  try {
    // Extract fields from the request parameters and body
    const { date, time, designId, details, rejectPis, finalPis, totalAmount } =
      req.body;

    // Find the press issue by ID
    const result = await PressIssue.findById(req.params.id);
    if (!result) return Response(res, false, 'Press issue not found!');

    // Update press issue fields only if they are provided in the request
    if (date) result.date = date;
    if (time) result.time = time;
    if (designId) result.designId = designId;
    if (details) result.details = details;
    if (rejectPis) result.rejectPis = rejectPis;
    if (finalPis) result.finalPis = finalPis;
    if (totalAmount) result.totalAmount = totalAmount;

    // Save the updated press issue
    await result.save();

    return Response(res, true, 'Update successful', result);
  } catch (err) {
    next(err);
  }
};

module.exports.deletePressIssue = async (req, res, next) => {
  try {
    // Extract the ID from the request parameters
    const { id } = req.params;

    // Delete the press issue by ID
    const result = await PressIssue.deleteOne({ _id: id });

    // Check if the press issue was found and deleted
    if (result.deletedCount === 0)
      return Response(res, false, 'Press issue not found!');

    return Response(res, true, 'Removed successfully');
  } catch (err) {
    next(err);
  }
};
