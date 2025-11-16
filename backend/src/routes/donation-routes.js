const express = require('express');
const donationController = require('../controllers/donation-controller');
const { authMiddleware, authorize } = require('../middlewares/auth-middleware');


const router = express.Router();

router.post('/', authMiddleware, authorize(['donor', 'admin']), donationController.createDonation);

router.get('/', authMiddleware, authorize(['admin']), donationController.getAllDonations);

router.get('/:id', authMiddleware, authorize(['admin']), donationController.getDonation);

router.put('/:id', authMiddleware, authorize(['admin']), donationController.updateDonation);

router.delete('/:id', authMiddleware, authorize(['admin']), donationController.deleteDonation);


module.exports = router;
