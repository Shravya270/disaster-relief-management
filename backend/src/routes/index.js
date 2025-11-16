const express = require('express');

const donationRoutes = require('./donation-routes');
const volunteerRoutes = require('./volunteer-routes');
const resourceRequestRoutes = require('./request-routes');
const adminStatsRoutes = require('./admin-stats-routes');
const paymentRoutes = require('./payments-routes');
const router = express.Router();


router.use('/stats', adminStatsRoutes);
router.use('/donations', donationRoutes);
router.use('/volunteers', volunteerRoutes);
router.use('/requests', resourceRequestRoutes);
router.use('/payments', paymentRoutes);


module.exports = router;
