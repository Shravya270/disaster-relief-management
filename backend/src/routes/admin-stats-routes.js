const express = require('express');
const adminStatsController = require('../controllers/admin-stats-controller');
const { authMiddleware, authorize } = require('../middlewares/auth-middleware');

const router = express.Router();

// All statistics must be accessible ONLY by admin
router.get(
    '/overview',
    authMiddleware,
    authorize(['admin']),
    adminStatsController.getOverviewStats
);

router.get(
    '/donations/category',
    authMiddleware,
    authorize(['admin']),
    adminStatsController.getDonationsByCategory
);

router.get(
    '/requests/status',
    authMiddleware,
    authorize(['admin']),
    adminStatsController.getRequestsByStatus
);

router.get(
    '/requests/priority',
    authMiddleware,
    authorize(['admin']),
    adminStatsController.getRequestsByPriority
);

router.get(
    '/volunteers/availability',
    authMiddleware,
    authorize(['admin']),
    adminStatsController.getVolunteersByAvailability
);

router.get(
    '/donations/amount',
    authMiddleware,
    authorize(['admin']),
    adminStatsController.getDonationAmountByCategory
);

router.get(
    '/volunteers/skills',
    authMiddleware,
    authorize(['admin']),
    adminStatsController.getVolunteersBySkills
);

module.exports = router;
