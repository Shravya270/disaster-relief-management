const express = require('express');
const donationController = require('../controllers/donation-controller');

const router = express.Router();

// CREATE
router.post('/', donationController.createDonation);

// GET ALL
router.get('/', donationController.getAllDonations);

// GET ONE
router.get('/:id', donationController.getDonation);

// UPDATE
router.put('/:id', donationController.updateDonation);

// DELETE
router.delete('/:id', donationController.deleteDonation);

module.exports = router;
