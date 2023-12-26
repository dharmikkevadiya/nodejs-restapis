const { Response } = require('../helper/helper');
const Organization = require('../models/organization'); // Update the model import accordingly

module.exports.createOrganization = async (req, res, next) => {
  try {
    const { name } = req.body;

    // create
    const newOrganization = await Organization.create({
      name,
    });

    return Response(
      res,
      true,
      'Organization created successfully',
      newOrganization
    );
  } catch (err) {
    next(err);
  }
};

module.exports.getOrganizations = async (req, res, next) => {
  try {
    const result = await Organization.find({});

    return Response(res, true, 'Success', result);
  } catch (err) {
    next(err);
  }
};

module.exports.getOrganizationById = async (req, res, next) => {
  try {
    const result = await Organization.findById(req.params.id);
    if (!result) return Response(res, false, 'Organization not found!');

    return Response(res, true, 'Success', result);
  } catch (err) {
    next(err);
  }
};

module.exports.updateOrganization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await Organization.findById(id);

    if (!result) return Response(res, false, 'Organization not found!');

    // Update
    if (name) result.name = name;
    await result.save();

    return Response(res, true, 'Update successful', result);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteOrganization = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Organization.deleteOne({ _id: id });

    // check
    if (result.deletedCount === 0)
      return Response(res, false, 'Organization not found!');

    return Response(res, true, 'Removed successfully');
  } catch (err) {
    next(err);
  }
};
