const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} = require('../controllers/posts'); // Update the controller import accordingly
const { IdValidation } = require('../middleware/validationSchema');

//@route    POST /api/posts
//@desc     Create a new post
//@access   Private (requires authentication)
router.post('/', auth, createPost);

//@route    GET /api/posts/
//@desc     Get all posts
//@access   Private (requires authentication)
router.get('/', auth, getPosts);

//@route    GET /api/posts/:id
//@desc     Get a specific post by ID
//@access   Private (requires authentication)
router.get('/get/:id', IdValidation, auth, getPostById);

//@route    PUT /api/posts/update/:id
//@desc     Update a post by ID
//@access   Private (requires authentication)
router.put('/update/:id', IdValidation, auth, updatePost);

//@route    DELETE /api/posts/delete/:id
//@desc     Delete a post by ID
//@access   Private (requires authentication)
router.delete('/delete/:id', IdValidation, auth, deletePost);

module.exports = router;
