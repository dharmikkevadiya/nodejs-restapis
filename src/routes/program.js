const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createProgram,
  getPrograms,
  getProgramById,
  updateProgram,
  deleteProgram,
  uploadById,
} = require('../controllers/program'); // Update the controller import accordingly
const {
  IdValidation,
  CreateProgramValidation,
  UpdateProgramValidation,
} = require('../middleware/validationSchema');

const { uploadFileOfItem } = require('../helper/fileStorage');
const multiUpload = uploadFileOfItem.fields([
  { name: 'stockInPic', maxCount: 1 },
]);

//@route    POST /api/programs
//@desc     Create a new program
//@access   Private (requires authentication)
router.post('/', CreateProgramValidation, auth, createProgram);

//@route    GET /api/programs/
//@desc     Get all programs
//@access   Private (requires authentication)
router.get('/', auth, getPrograms);

//@route    POST /api/programs/upload/:id
//@desc     upload
//@access   Private (requires authentication)
router.post('/upload/:id', IdValidation, [multiUpload], auth, uploadById);

//@route    GET /api/programs/:id
//@desc     Get a specific program by ID
//@access   Private (requires authentication)
router.get('/get/:id', IdValidation, auth, getProgramById);

//@route    PUT /api/programs/update/:id
//@desc     Update a program by ID
//@access   Private (requires authentication)
router.put('/update/:id', UpdateProgramValidation, auth, updateProgram);

//@route    DELETE /api/programs/delete/:id
//@desc     Delete a program by ID
//@access   Private (requires authentication)
router.delete('/delete/:id', IdValidation, auth, deleteProgram);

module.exports = router;
