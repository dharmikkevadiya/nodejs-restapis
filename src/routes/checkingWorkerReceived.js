const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createCheckingWorkerReceived,
  getCheckingWorkerReceived,
  getCheckingWorkerReceivedById,
} = require('../controllers/checkingWorkerReceived'); // Update the controller import accordingly
const {
  IdValidation,
  CreateCheckingWorkerReceivedValidation,
} = require('../middleware/validationSchema');

//@route    POST /api/checking-worker-received
//@desc     Create a new checking worker received entry
//@access   Private (requires authentication)
router.post(
  '/',
  CreateCheckingWorkerReceivedValidation,
  auth,
  createCheckingWorkerReceived
);

//@route    GET /api/checking-worker-received/
//@desc     Get all checking worker received entries
//@access   Private (requires authentication)
router.get('/', auth, getCheckingWorkerReceived);

//@route    GET /api/checking-worker-received/:id
//@desc     Get a specific checking worker received entry by ID
//@access   Private (requires authentication)
router.get('/get/:id', IdValidation, auth, getCheckingWorkerReceivedById);

module.exports = router;
