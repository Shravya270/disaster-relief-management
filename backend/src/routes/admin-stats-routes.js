const express = require('express');
const adminStatsController = require('../controllers/admin-stats-controller');

const router = express.Router();

router.get('/overview', adminStatsController.getOverviewStats);
router.get('/donations/category', adminStatsController.getDonationsByCategory);
router.get('/requests/status', adminStatsController.getRequestsByStatus);
router.get('/requests/priority', adminStatsController.getRequestsByPriority);
router.get('/volunteers/availability', adminStatsController.getVolunteersByAvailability);
router.get('/donations/amount', adminStatsController.getDonationAmountByCategory);
router.get('/volunteers/skills', adminStatsController.getVolunteersBySkills);



module.exports = router;
