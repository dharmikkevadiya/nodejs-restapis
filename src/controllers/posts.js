const { Response } = require('../helper/helper');
const Post = require('../models/post');

module.exports.createPost = async (req, res, next) => {
  try {
    const { name } = req.body;

    // create
    const newPost = await Post.create({
      name,
    });

    return Response(res, true, 'Post created successfully', newPost);
  } catch (err) {
    next(err);
  }
};

module.exports.getPosts = async (req, res, next) => {
  try {
    const result = await Post.find({});

    return Response(res, true, 'Success', result);
  } catch (err) {
    next(err);
  }
};

module.exports.getPostById = async (req, res, next) => {
  try {
    const result = await Post.findById(req.params.id);
    if (!result) return Response(res, false, 'Post not found!');

    return Response(res, true, 'Success', result);
  } catch (err) {
    next(err);
  }
};

module.exports.updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await Post.findById(id);

    if (!result) return Response(res, false, 'Post not found!');

    // Update
    if (name) result.name = name;
    await result.save();

    return Response(res, true, 'Update successful', result);
  } catch (err) {
    next(err);
  }
};

module.exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Post.deleteOne({ _id: id });

    // check
    if (result.deletedCount === 0)
      return Response(res, false, 'Post not found!');

    return Response(res, true, 'Removed successfully');
  } catch (err) {
    next(err);
  }
};
