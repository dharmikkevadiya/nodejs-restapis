const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createOrganization,
  getOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
} = require('../controllers/organizations'); // Update the controller import accordingly
const { IdValidation } = require('../middleware/validationSchema');

//@route    POST /api/organizations
//@desc     Create a new organization
//@access   Private (requires authentication)
router.post('/', auth, createOrganization);

//@route    GET /api/organizations/
//@desc     Get all organizations
//@access   Private (requires authentication)
router.get('/', auth, getOrganizations);

//@route    GET /api/organizations/:id
//@desc     Get a specific organization by ID
//@access   Private (requires authentication)
router.get('/get/:id', IdValidation, auth, getOrganizationById);

//@route    PUT /api/organizations/update/:id
//@desc     Update an organization by ID
//@access   Private (requires authentication)
router.put('/update/:id', IdValidation, auth, updateOrganization);

//@route    DELETE /api/organizations/delete/:id
//@desc     Delete an organization by ID
//@access   Private (requires authentication)
router.delete('/delete/:id', IdValidation, auth, deleteOrganization);

module.exports = router;
