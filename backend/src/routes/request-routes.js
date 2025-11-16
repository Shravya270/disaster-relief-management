const express = require('express');
const resourceRequestController = require('../controllers/request-controller');
const { authMiddleware, authorize } = require('../middlewares/auth-middleware');

const router = express.Router();

/**
 * RESOURCE REQUEST PERMISSIONS:
 *
 * Donor + Admin  → Create requests
 * Admin + Volunteer → View all requests
 * Admin only → Update, Delete, Assign, Unassign, Auto Assign
 */

// CREATE resource request (Donor + Admin)
router.post(
    '/',
    authMiddleware,
    authorize(['donor', 'admin']),
    resourceRequestController.createResourceRequest
);

// GET all requests (Admin + Volunteer)
router.get(
    '/',
    authMiddleware,
    authorize(['admin', 'volunteer']),
    resourceRequestController.getAllResourceRequests
);

// GET single request (Admin + Volunteer)
router.get(
    '/:id',
    authMiddleware,
    authorize(['admin', 'volunteer']),
    resourceRequestController.getResourceRequest
);

// UPDATE request (Admin only)
router.put(
    '/:id',
    authMiddleware,
    authorize(['admin']),
    resourceRequestController.updateResourceRequest
);

// DELETE request (Admin only)
router.delete(
    '/:id',
    authMiddleware,
    authorize(['admin']),
    resourceRequestController.deleteResourceRequest
);

// Assign volunteer (Admin only)
router.post(
    '/assign',
    authMiddleware,
    authorize(['admin']),
    resourceRequestController.assignVolunteer
);

// Unassign volunteer (Admin only)
router.post(
    '/unassign',
    authMiddleware,
    authorize(['admin']),
    resourceRequestController.unassignVolunteer
);

// Auto-assign based on distance (Admin only)
router.post(
    '/auto-assign',
    authMiddleware,
    authorize(['admin']),
    resourceRequestController.autoAssign
);

module.exports = router;
