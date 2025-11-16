const { ResourceRequestService } = require('../services');
const { ErrorResponse, SuccessResponse } = require('../utils/common');
const { StatusCodes } = require('http-status-codes');

async function createResourceRequest(req, res) {
    try {
        const response = await ResourceRequestService.createResourceRequest(req.body);

        return res.status(StatusCodes.CREATED).json({
            ...SuccessResponse,
            data: response
        });

    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...ErrorResponse,
            error
        });
    }
}

async function getResourceRequest(req, res) {
    try {
        const response = await ResourceRequestService.getResourceRequest(req.params.id);

        return res.status(StatusCodes.OK).json({
            ...SuccessResponse,
            data: response
        });

    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...ErrorResponse,
            error
        });
    }
}

async function getAllResourceRequests(req, res) {
    try {
        const response = await ResourceRequestService.getAllResourceRequests();

        return res.status(StatusCodes.OK).json({
            ...SuccessResponse,
            data: response
        });

    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...ErrorResponse,
            error
        });
    }
}

async function updateResourceRequest(req, res) {
    try {
        const response = await ResourceRequestService.updateResourceRequest(req.params.id, req.body);

        return res.status(StatusCodes.OK).json({
            ...SuccessResponse,
            data: response
        });

    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...ErrorResponse,
            error
        });
    }
}

async function deleteResourceRequest(req, res) {
    try {
        const response = await ResourceRequestService.deleteResourceRequest(req.params.id);

        return res.status(StatusCodes.OK).json({
            ...SuccessResponse,
            data: response
        });

    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...ErrorResponse,
            error
        });
    }
}

async function assignVolunteer(req, res) {
    try {
        const { requestId, volunteerId } = req.body;

        const updatedRequest = await ResourceRequestService.updateResourceRequest(
            requestId,
            { assignedVolunteer: volunteerId, status: "Assigned" }
        );

        return res.status(StatusCodes.OK).json({
            ...SuccessResponse,
            data: updatedRequest
        });

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...ErrorResponse,
            error
        });
    }
}

async function unassignVolunteer(req, res) {
    try {
        const { requestId } = req.body;

        const updatedRequest = await ResourceRequestService.updateResourceRequest(
            requestId,
            { assignedVolunteer: null, status: "Pending" }
        );

        return res.status(StatusCodes.OK).json({
            ...SuccessResponse,
            data: updatedRequest
        });

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...ErrorResponse,
            error
        });
    }
}

async function autoAssign(req, res) {
    try {
        const { requestId } = req.body;

        const request = await ResourceRequestService.getResourceRequest(requestId);
        const volunteers = await VolunteerService.getAllVolunteers();

        const distances = volunteers.map(v => {
            const distance = calculateDistance(
                request.location.latitude,
                request.location.longitude,
                v.location.latitude,
                v.location.longitude
            );

            return { volunteer: v, distance };
        });

        // sort by closest volunteer
        distances.sort((a, b) => a.distance - b.distance);

        const nearest = distances[0].volunteer;

        const updatedRequest = await ResourceRequestService.updateResourceRequest(
            requestId,
            {
                assignedVolunteer: nearest._id,
                status: "Assigned"
            }
        );

        return res.status(StatusCodes.OK).json({
            ...SuccessResponse,
            data: updatedRequest
        });

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...ErrorResponse,
            error
        });
    }
}




module.exports = {
    createResourceRequest,
    getResourceRequest,
    getAllResourceRequests,
    updateResourceRequest,
    deleteResourceRequest,
    assignVolunteer,
    unassignVolunteer,
    autoAssign,
};
