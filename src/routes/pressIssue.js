const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createPressIssue,
  getPressIssues,
  getPressIssueById,
  updatePressIssue,
  deletePressIssue,
} = require('../controllers/pressIssue'); // Update the controller import accordingly
const {
  IdValidation,
  CreatePressIssueValidation,
  UpdatePressIssueValidation,
} = require('../middleware/validationSchema');

//@route    POST /api/press-issues
//@desc     Create a new press issue
//@access   Private (requires authentication)
router.post('/', CreatePressIssueValidation, auth, createPressIssue);

//@route    GET /api/press-issues/
//@desc     Get all press issues
//@access   Private (requires authentication)
router.get('/', auth, getPressIssues);

//@route    GET /api/press-issues/:id
//@desc     Get a specific press issue by ID
//@access   Private (requires authentication)
router.get('/get/:id', IdValidation, auth, getPressIssueById);

//@route    PUT /api/press-issues/update/:id
//@desc     Update a press issue by ID
//@access   Private (requires authentication)
router.put('/update/:id', UpdatePressIssueValidation, auth, updatePressIssue);

//@route    DELETE /api/press-issues/delete/:id
//@desc     Delete a press issue by ID
//@access   Private (requires authentication)
router.delete('/delete/:id', IdValidation, auth, deletePressIssue);

module.exports = router;
