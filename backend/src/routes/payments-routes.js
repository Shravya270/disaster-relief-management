const express = require('express');
const paymentsController = require('../controllers/payments-controller');

const router = express.Router();

router.post('/create-intent', paymentsController.createPaymentIntent);

module.exports = router;
