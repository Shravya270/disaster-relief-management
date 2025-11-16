const express = require('express');
const volunteerController = require('../controllers/volunteer-controller');

const router = express.Router();

// CREATE volunteer
router.post('/', volunteerController.createVolunteer);

// GET all volunteers
router.get('/', volunteerController.getAllVolunteers);

// GET single volunteer
router.get('/:id', volunteerController.getVolunteer);

// UPDATE volunteer
router.put('/:id', volunteerController.updateVolunteer);

// DELETE volunteer
router.delete('/:id', volunteerController.deleteVolunteer);

module.exports = router;
