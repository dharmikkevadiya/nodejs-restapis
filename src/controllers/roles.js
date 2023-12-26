const { Response } = require('../helper/helper');
const Role = require('../models/role'); // Update the model import accordingly

module.exports.createRole = async (req, res, next) => {
  try {
    const { name } = req.body;

    // create
    const newRole = await Role.create({
      name,
    });

    return Response(res, true, 'Role created successfully', newRole);
  } catch (err) {
    next(err);
  }
};

module.exports.getRoles = async (req, res, next) => {
  try {
    const result = await Role.find({});

    return Response(res, true, 'Success', result);
  } catch (err) {
    next(err);
  }
};

module.exports.getRoleById = async (req, res, next) => {
  try {
    const result = await Role.findById(req.params.id);
    if (!result) return Response(res, false, 'Role not found!');

    return Response(res, true, 'Success', result);
  } catch (err) {
    next(err);
  }
};

module.exports.updateRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await Role.findById(id);

    if (!result) return Response(res, false, 'Role not found!');

    // Update
    if (name) result.name = name;
    await result.save();

    return Response(res, true, 'Update successful', result);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteRole = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Role.deleteOne({ _id: id });

    // check
    if (result.deletedCount === 0)
      return Response(res, false, 'Role not found!');

    return Response(res, true, 'Removed successfully');
  } catch (err) {
    next(err);
  }
};
