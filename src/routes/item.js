const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createItem,
  getItems,
  uploadById,
  getItemById,
  updateItem,
  deleteItem,
} = require('../controllers/item'); // Update the controller import accordingly
const {
  IdValidation,
  CreateItemValidation,
  UpdateItemValidation,
} = require('../middleware/validationSchema');

const { uploadFileOfItem } = require('../helper/fileStorage');
const multiUpload = uploadFileOfItem.fields([
  { name: 'itemCreatorPic', maxCount: 1 },
  { name: 'challanPic', maxCount: 5 },
  { name: 'mtrDetailPic', maxCount: 5 },
  { name: 'cuttingSizeRatioPic', maxCount: 5 },
]);

//@route    POST /api/items
//@desc     Create a new item
//@access   Private (requires authentication)
router.post('/', CreateItemValidation, auth, createItem);

//@route    POST /api/items/upload/:id
//@desc     upload
//@access   Private (requires authentication)
router.post('/upload/:id', IdValidation, [multiUpload], auth, uploadById);

//@route    GET /api/items
//@desc     Get all items
//@access   Private (requires authentication)
router.get('/', auth, getItems);

//@route    GET /api/items/:id
//@desc     Get a specific item by ID
//@access   Private (requires authentication)
router.get('/get/:id', IdValidation, auth, getItemById);

//@route    PUT /api/items/update/:id
//@desc     Update an item by ID
//@access   Private (requires authentication)
router.put('/update/:id', UpdateItemValidation, auth, updateItem);

//@route    DELETE /api/items/delete/:id
//@desc     Delete an item by ID
//@access   Private (requires authentication)
router.delete('/delete/:id', IdValidation, auth, deleteItem);

module.exports = router;
