const { Response } = require('../helper/helper');
const Item = require('../models/item');
const Program = require('../models/program');

module.exports.createProgram = async (req, res, next) => {
  try {
    // Extract fields from the request body
    const { designId, size, stockInPic, finalPis, programDetails, remark } =
      req.body;

    // check
    const itemData = await Item.findOne({
      _id: designId,
      process: 'Pending',
    });

    if (!itemData) return Response(res, false, 'Item not found!');

    // Create a new program
    const newProgram = await new Program({
      designId,
      size,
      stockInPic,
      finalPis,
      programDetails,
      remark,
    }).save();

    // update status
    itemData.process = 'Cutting Okay';
    itemData.programId = newProgram._id;
    await itemData.save();

    return Response(res, true, 'Program created successfully', newProgram);
  } catch (err) {
    next(err);
  }
};

module.exports.uploadById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const files_param = req.files;
    // Find
    const result = await Program.findById(id);
    if (!result) return Response(res, false, 'Program not found!');

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
    const updatedItemData = await Program.findOneAndUpdate(
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

module.exports.getPrograms = async (req, res, next) => {
  try {
    // Retrieve all programs from the database
    const result = await Program.find({});

    return Response(res, true, 'Success', result);
  } catch (err) {
    next(err);
  }
};

module.exports.getProgramById = async (req, res, next) => {
  try {
    // Retrieve a specific program by ID
    const result = await Program.findById(req.params.id);
    if (!result) return Response(res, false, 'Program not found!');

    return Response(res, true, 'Success', result);
  } catch (err) {
    next(err);
  }
};

module.exports.updateProgram = async (req, res, next) => {
  try {
    // Extract fields from the request parameters and body
    const { id } = req.params;
    const { designId, size, stockInPic, finalPis, programDetails, remark } =
      req.body;

    // Find the program by ID
    const result = await Program.findById(id);
    if (!result) return Response(res, false, 'Program not found!');

    // Update program fields only if they are provided in the request
    if (designId) result.designId = designId;
    if (size) result.size = size;
    if (stockInPic) result.stockInPic = stockInPic;
    if (finalPis) result.finalPis = finalPis;
    if (programDetails) result.programDetails = programDetails;
    if (remark) result.remark = remark;

    // Save the updated program
    await result.save();

    return Response(res, true, 'Update successful', result);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteProgram = async (req, res, next) => {
  try {
    // Extract the ID from the request parameters
    const { id } = req.params;

    // Delete the program by ID
    const result = await Program.deleteOne({ _id: id });

    // Check if the program was found and deleted
    if (result.deletedCount === 0)
      return Response(res, false, 'Program not found!');

    return Response(res, true, 'Removed successfully');
  } catch (err) {
    next(err);
  }
};
