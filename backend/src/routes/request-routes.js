const express = require('express');
const resourceRequestController = require('../controllers/request-controller');

const router = express.Router();

// CREATE resource request
router.post('/', resourceRequestController.createResourceRequest);

// GET all requests
router.get('/', resourceRequestController.getAllResourceRequests);

// GET single request
router.get('/:id', resourceRequestController.getResourceRequest);

// UPDATE request
router.put('/:id', resourceRequestController.updateResourceRequest);

// DELETE request
router.delete('/:id', resourceRequestController.deleteResourceRequest);

router.post('/assign', resourceRequestController.assignVolunteer);

router.post('/unassign', resourceRequestController.unassignVolunteer);

router.post('/auto-assign', resourceRequestController.autoAssign);


module.exports = router;
