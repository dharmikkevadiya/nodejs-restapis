const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createWorker,
  getWorkers,
  getWorkerById,
  updateWorker,
  deleteWorker,
  getWorkerInintialId,
  createWorkerPdf,
  createWorkerIdCard,
  getMultipalIdCards,
} = require('../controllers/worker'); // Update the controller import accordingly
const {
  AddWorkerValidation,
  UpdateWorkerValidation,
  IdValidation,
} = require('../middleware/validationSchema');

const { uploadFile } = require('../helper/fileStorage');
const multiUpload = uploadFile.fields([
  { name: 'aadharCard', maxCount: 1 },
  { name: 'aadharCardBack', maxCount: 1 },
  { name: 'profile', maxCount: 1 },
  { name: 'bankPassbook', maxCount: 1 },
  { name: 'signature', maxCount: 1 },
]);

//@route    POST /api/workers
//@desc     Create a new worker
//@access   Private (requires authentication)
router.post('/', [multiUpload], AddWorkerValidation, createWorker);

//@route    GET /api/workers/getWorkerInintialId
//@desc     Get all workers
//@access   Private (requires authentication)
router.get('/getWorkerInintialId', getWorkerInintialId);

//@route    GET /api/workers
//@desc     Get all workers
//@access   Private (requires authentication)
router.get('/', auth, getWorkers);

//@route    GET /api/workers/get/:id
//@desc     Get a specific worker by ID
//@access   Private (requires authentication)
router.get('/get/:id', IdValidation, auth, getWorkerById);

//@route    PUT /api/workers/update/:id
//@desc     Update a worker by ID
//@access   Private (requires authentication)
router.put('/update/:id', [multiUpload], UpdateWorkerValidation, updateWorker);

//@route    DELETE /api/workers/delete/:id
//@desc     Delete a worker by ID
//@access   Private (requires authentication)
router.delete('/delete/:id', IdValidation, auth, deleteWorker);

//@route    GET /api/workers/get/:id/pdf
//@desc     Get a pdf
//@access   Private (requires authentication)
router.get('/get/:id/pdf', IdValidation, createWorkerPdf);

//@route    GET /api/workers/get/:id/idcard
//@desc     Get a idcard
//@access   Private (requires authentication)
router.get('/get/:id/idcard', IdValidation, createWorkerIdCard);

//@route    POST /api/workers/idCards
//@desc     Get a idcard
//@access   Private (requires authentication)
router.post('/idCards', getMultipalIdCards);

module.exports = router;
