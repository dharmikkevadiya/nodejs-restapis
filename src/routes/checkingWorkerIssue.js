const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createCheckingWorkerIssue,
  getCheckingWorkerIssue,
  getCheckingWorkerIssueById,
  updateCheckingWorkerIssue,
  deleteCheckingWorkerIssue,
  uploadCheckrPic,
} = require('../controllers/checkingWorkerIssue'); // Update the controller import accordingly
const {
  IdValidation,
  CreateCheckingWorkerIssueValidation,
  UpdateCheckingWorkerIssueValidation,
} = require('../middleware/validationSchema');

const { uploadFileOfItem } = require('../helper/fileStorage');
const multiUpload = uploadFileOfItem.fields([
  { name: 'checkrPic', maxCount: 1 },
]);

//@route    POST /api/checkingWorkerIssue
//@desc     Create a new checking worker issue entry
//@access   Private (requires authentication)
router.post(
  '/',
  CreateCheckingWorkerIssueValidation,
  auth,
  createCheckingWorkerIssue
);

//@route    POST /api/checkingWorkerIssue/:id/upload
//@desc     Create a new checking worker issue entry
//@access   Private (requires authentication)
router.post('/:id/upload', IdValidation, [multiUpload], auth, uploadCheckrPic);

//@route    GET /api/checkingWorkerIssue/
//@desc     Get all checking worker issue entries
//@access   Private (requires authentication)
router.get('/', auth, getCheckingWorkerIssue);

//@route    GET /api/checkingWorkerIssue/:id
//@desc     Get a specific checking worker issue entry by ID
//@access   Private (requires authentication)
router.get('/get/:id', IdValidation, auth, getCheckingWorkerIssueById);

//@route    PUT /api/checkingWorkerIssue/update/:id
//@desc     Update a checking worker issue entry by ID
//@access   Private (requires authentication)
router.put(
  '/update/:id',
  UpdateCheckingWorkerIssueValidation,
  auth,
  updateCheckingWorkerIssue
);

//@route    DELETE /api/checkingWorkerIssue/delete/:id
//@desc     Delete a checking worker issue entry by ID
//@access   Private (requires authentication)
router.delete('/delete/:id', IdValidation, auth, deleteCheckingWorkerIssue);

module.exports = router;
