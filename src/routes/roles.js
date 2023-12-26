const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
} = require('../controllers/roles'); // Update the controller import accordingly
const { IdValidation } = require('../middleware/validationSchema');

//@route    POST /api/roles
//@desc     Create a new role
//@access   Private (requires authentication)
router.post('/', auth, createRole);

//@route    GET /api/roles/
//@desc     Get all roles
//@access   Private (requires authentication)
router.get('/', auth, getRoles);

//@route    GET /api/roles/:id
//@desc     Get a specific role by ID
//@access   Private (requires authentication)
router.get('/get/:id', IdValidation, auth, getRoleById);

//@route    PUT /api/roles/update/:id
//@desc     Update a role by ID
//@access   Private (requires authentication)
router.put('/update/:id', IdValidation, auth, updateRole);

//@route    DELETE /api/roles/delete/:id
//@desc     Delete a role by ID
//@access   Private (requires authentication)
router.delete('/delete/:id', IdValidation, auth, deleteRole);

module.exports = router;
