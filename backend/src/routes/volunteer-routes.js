const express = require('express');
const volunteerController = require('../controllers/volunteer-controller');
const { authMiddleware, authorize } = require('../middlewares/auth-middleware');

const router = express.Router();

router.post('/', authMiddleware, authorize(['admin']), volunteerController.createVolunteer);

router.get('/', authMiddleware, authorize(['admin']), volunteerController.getAllVolunteers);

router.get('/:id', authMiddleware, authorize(['admin']), volunteerController.getVolunteer);

router.put('/:id', authMiddleware, authorize(['admin']), volunteerController.updateVolunteer);

router.delete('/:id', authMiddleware, authorize(['admin']), volunteerController.deleteVolunteer);


module.exports = router;
