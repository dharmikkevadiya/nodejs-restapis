const { Response } = require('../helper/helper');
const StockIn = require('../models/stockin');

module.exports.createStockin = async (req, res, next) => {
  try {
    const { name, type } = req.body;

    // create
    const newStockIn = await StockIn.create({
      name,
      type,
    });

    return Response(res, true, 'StockIn Create successfully', newStockIn);
  } catch (err) {
    next(err);
  }
};

module.exports.getStockins = async (req, res, next) => {
  try {
    const { type } = req.query;
    const query = {};

    // filter by type
    if (type) query.type = type;

    const result = await StockIn.find(query);

    return Response(res, true, 'Success', result);
  } catch (err) {
    next(err);
  }
};

module.exports.getStockinById = async (req, res, next) => {
  try {
    const result = await StockIn.findById(req.params.id);
    if (!result) return Response(res, false, 'StockIn not found!');

    return Response(res, true, 'Success', result);
  } catch (err) {
    next(err);
  }
};

module.exports.updateStockin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, type } = req.body;
    const result = await StockIn.findById(id);

    if (!result) return Response(res, false, 'StockIn not found!');

    // Update
    if (name) result.name = name;
    if (type) result.type = type;
    await result.save();

    return Response(res, true, 'Update successfully', result);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteStockin = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await StockIn.deleteOne({ _id: id });

    // check
    if (result.deletedCount === 0)
      return Response(res, false, 'StockIn not found!');

    return Response(res, true, 'Removed successfully');
  } catch (err) {
    next(err);
  }
};
