const { Response } = require('../helper/helper');
const DeliveryIssue = require('../models/deliveryIssue');
const Item = require('../models/item');

module.exports.createDeliveryIssue = async (req, res, next) => {
  try {
    // Extract fields from the request body
    const {
      date,
      time,
      billNo,
      designId,
      partyName,
      sizes,
      totalPis,
      authFor,
    } = req.body;

    // item
    const itemData = await Item.findOne({
      _id: designId,
      process: 'Delivery Issue',
    });

    if (!itemData) return Response(res, false, 'Item not found!');

    // Create a new delivery issue
    const newDeliveryIssue = await DeliveryIssue.create({
      date,
      time,
      billNo,
      designId,
      partyName,
      sizes,
      totalPis,
      authFor,
    });

    // update status
    itemData.process = 'Deliver';
    itemData.deliverIssueId = newDeliveryIssue._id;
    await itemData.save();

    return Response(
      res,
      true,
      'Delivery issue created successfully',
      newDeliveryIssue
    );
  } catch (err) {
    next(err);
  }
};

module.exports.getDeliveryIssues = async (req, res, next) => {
  try {
    // Retrieve all delivery issues from the database
    const result = await DeliveryIssue.find({});

    return Response(res, true, 'Success', result);
  } catch (err) {
    next(err);
  }
};

module.exports.getDeliveryIssueById = async (req, res, next) => {
  try {
    // Retrieve a specific delivery issue by ID
    const result = await DeliveryIssue.findById(req.params.id);
    if (!result) return Response(res, false, 'Delivery issue not found!');

    return Response(res, true, 'Success', result);
  } catch (err) {
    next(err);
  }
};

module.exports.updateDeliveryIssue = async (req, res, next) => {
  try {
    // Extract fields from the request parameters and body
    const { id } = req.params;
    const { date, time, billNo, partyName, sizes, totalPis, authFor } =
      req.body;

    // Find the delivery issue by ID
    const result = await DeliveryIssue.findById(id);
    if (!result) return Response(res, false, 'Delivery issue not found!');

    // Update delivery issue fields only if they are provided in the request
    if (date) result.date = date;
    if (time) result.time = time;
    if (billNo) result.billNo = billNo;
    if (partyName) result.partyName = partyName;
    if (sizes) result.sizes = sizes;
    if (totalPis) result.totalPis = totalPis;
    if (authFor) result.authFor = authFor;

    // Save the updated delivery issue
    await result.save();

    return Response(res, true, 'Update successful', result);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteDeliveryIssue = async (req, res, next) => {
  try {
    // Extract the ID from the request parameters
    const { id } = req.params;

    // Delete the delivery issue by ID
    const result = await DeliveryIssue.deleteOne({ _id: id });

    // Check if the delivery issue was found and deleted
    if (result.deletedCount === 0)
      return Response(res, false, 'Delivery issue not found!');

    return Response(res, true, 'Removed successfully');
  } catch (err) {
    next(err);
  }
};
