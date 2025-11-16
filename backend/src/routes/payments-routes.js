const express = require('express');
const paymentsController = require('../controllers/payments-controller');
const { authMiddleware, authorize } = require('../middlewares/auth-middleware');

const router = express.Router();

router.post('/create-intent', authMiddleware, authorize(['donor', 'admin']), paymentsController.createPaymentIntent);


module.exports = router;
