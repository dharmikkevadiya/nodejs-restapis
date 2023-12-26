const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createWorkerIssue,
  getWorkerIssues,
  getWorkerIssueById,
  updateWorkerIssue,
  deleteWorkerIssue,
} = require('../controllers/workerIssue'); // Update the controller import accordingly
const {
  IdValidation,
  CreateWorkerIssueValidation,
  UpdateWorkerIssueValidation,
} = require('../middleware/validationSchema');

//@route    POST /api/worker-issues
//@desc     Create a new worker issue
//@access   Private (requires authentication)
router.post('/', CreateWorkerIssueValidation, auth, createWorkerIssue);

//@route    GET /api/worker-issues/
//@desc     Get all worker issues
//@access   Private (requires authentication)
router.get('/', auth, getWorkerIssues);

//@route    GET /api/worker-issues/:id
//@desc     Get a specific worker issue by ID
//@access   Private (requires authentication)
router.get('/get/:id', IdValidation, auth, getWorkerIssueById);

//@route    PUT /api/worker-issues/update/:id
//@desc     Update a worker issue by ID
//@access   Private (requires authentication)
router.put('/update/:id', UpdateWorkerIssueValidation, auth, updateWorkerIssue);

//@route    DELETE /api/worker-issues/delete/:id
//@desc     Delete a worker issue by ID
//@access   Private (requires authentication)
router.delete('/delete/:id', IdValidation, auth, deleteWorkerIssue);

module.exports = router;
