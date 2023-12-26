const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createStockin,
  getStockins,
  getStockinById,
  updateStockin,
  deleteStockin,
} = require('../controllers/stockin'); // Update the controller import accordingly
const {
  CreateStockinValidation,
  UpdateStockinValidation,
  IdValidation,
} = require('../middleware/validationSchema');

//@route    POST /api/stockins
//@desc     Create a new stockin
//@access   Private (requires authentication)
router.post('/', CreateStockinValidation, auth, createStockin);

//@route    GET /api/stockins
//@desc     Get all stockins
//@access   Private (requires authentication)
router.get('/', auth, getStockins);

//@route    GET /api/stockins/:id
//@desc     Get a specific stockin by ID
//@access   Private (requires authentication)
router.get('/get/:id', IdValidation, auth, getStockinById);

//@route    PUT /api/stockins/update/:id
//@desc     Update a stockin by ID
//@access   Private (requires authentication)
router.put('/update/:id', UpdateStockinValidation, auth, updateStockin);

//@route    DELETE /api/stockins/delete/:id
//@desc     Delete a stockin by ID
//@access   Private (requires authentication)
router.delete('/delete/:id', IdValidation, auth, deleteStockin);

module.exports = router;
