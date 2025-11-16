const { VolunteerService } = require('../services');
const { ErrorResponse, SuccessResponse } = require('../utils/common');
const { StatusCodes } = require('http-status-codes');

async function createVolunteer(req, res) {
    try {
        const volunteer = await VolunteerService.createVolunteer(req.body);

        return res.status(StatusCodes.CREATED).json({
            ...SuccessResponse,
            data: volunteer
        });

    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...ErrorResponse,
            error
        });
    }
}

async function getVolunteer(req, res) {
    try {
        const volunteer = await VolunteerService.getVolunteer(req.params.id);

        return res.status(StatusCodes.OK).json({
            ...SuccessResponse,
            data: volunteer
        });

    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...ErrorResponse,
            error
        });
    }
}

async function getAllVolunteers(req, res) {
    try {
        const volunteers = await VolunteerService.getAllVolunteers();

        return res.status(StatusCodes.OK).json({
            ...SuccessResponse,
            data: volunteers
        });

    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...ErrorResponse,
            error
        });
    }
}

async function updateVolunteer(req, res) {
    try {
        const volunteer = await VolunteerService.updateVolunteer(req.params.id, req.body);

        return res.status(StatusCodes.OK).json({
            ...SuccessResponse,
            data: volunteer
        });

    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...ErrorResponse,
            error
        });
    }
}

async function deleteVolunteer(req, res) {
    try {
        const volunteer = await VolunteerService.deleteVolunteer(req.params.id);

        return res.status(StatusCodes.OK).json({
            ...SuccessResponse,
            data: volunteer
        });

    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...ErrorResponse,
            error
        });
    }
}

module.exports = {
    createVolunteer,
    getVolunteer,
    getAllVolunteers,
    updateVolunteer,
    deleteVolunteer,
};
