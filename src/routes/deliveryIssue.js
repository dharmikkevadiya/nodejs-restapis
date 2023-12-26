const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createDeliveryIssue,
  getDeliveryIssues,
  getDeliveryIssueById,
  updateDeliveryIssue,
  deleteDeliveryIssue,
} = require('../controllers/deliveryIssue'); // Update the controller import accordingly
const {
  IdValidation,
  CreateDeliveryIssueValidation,
  UpdateDeliveryIssueValidation,
} = require('../middleware/validationSchema');

//@route    POST /api/delivery-issues
//@desc     Create a new delivery issue
//@access   Private (requires authentication)
router.post('/', CreateDeliveryIssueValidation, auth, createDeliveryIssue);

//@route    GET /api/delivery-issues/
//@desc     Get all delivery issues
//@access   Private (requires authentication)
router.get('/', auth, getDeliveryIssues);

//@route    GET /api/delivery-issues/:id
//@desc     Get a specific delivery issue by ID
//@access   Private (requires authentication)
router.get('/get/:id', IdValidation, auth, getDeliveryIssueById);

//@route    PUT /api/delivery-issues/update/:id
//@desc     Update a delivery issue by ID
//@access   Private (requires authentication)
router.put(
  '/update/:id',
  UpdateDeliveryIssueValidation,
  auth,
  updateDeliveryIssue
);

//@route    DELETE /api/delivery-issues/delete/:id
//@desc     Delete a delivery issue by ID
//@access   Private (requires authentication)
router.delete('/delete/:id', IdValidation, auth, deleteDeliveryIssue);

module.exports = router;
