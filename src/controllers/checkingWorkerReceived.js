const { Response } = require('../helper/helper');
const CheckingWorkerReceived = require('../models/checkingWorkerReceived');
const Item = require('../models/item');

module.exports.createCheckingWorkerReceived = async (req, res, next) => {
  try {
    // Extract fields from the request body
    const { designId, reciverName, reciveTime } = req.body;

    // check
    const itemData = await Item.findOne({
      _id: designId,
      process: 'Stiching',
    });

    if (!itemData) return Response(res, false, 'Item not found!');

    // Create a new checking worker received entry
    const newCheckingWorkerReceived = await CheckingWorkerReceived.create({
      designId,
      reciverName,
      reciveTime,
    });

    // update status
    itemData.process = 'Checking Worker Received';
    itemData.checkingWorkerReceivedId = newCheckingWorkerReceived._id;
    await itemData.save();

    return Response(
      res,
      true,
      'Checking worker received entry created successfully',
      newCheckingWorkerReceived
    );
  } catch (err) {
    next(err);
  }
};

module.exports.getCheckingWorkerReceived = async (req, res, next) => {
  try {
    // Retrieve all checking worker received entries from the database
    const result = await CheckingWorkerReceived.find({});

    return Response(res, true, 'Success', result);
  } catch (err) {
    next(err);
  }
};

module.exports.getCheckingWorkerReceivedById = async (req, res, next) => {
  try {
    // Retrieve a specific checking worker received entry by ID
    const result = await CheckingWorkerReceived.findById(req.params.id);
    if (!result)
      return Response(res, false, 'Checking worker received entry not found!');

    return Response(res, true, 'Success', result);
  } catch (err) {
    next(err);
  }
};
