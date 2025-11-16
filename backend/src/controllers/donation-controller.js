const { DonationService } = require('../services');
const { ErrorResponse, SuccessResponse } = require('../utils/common');
const { StatusCodes } = require('http-status-codes');

async function createDonation(req, res) {
    try {
        const response = await DonationService.createDonation(req.body);

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

async function getDonation(req, res) {
    try {
        const response = await DonationService.getDonation(req.params.id);

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

async function getAllDonations(req, res) {
    try {
        const response = await DonationService.getAllDonations();

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

async function deleteDonation(req, res) {
    try {
        const response = await DonationService.deleteDonation(req.params.id);

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

async function updateDonation(req, res) {
    try {
        const response = await DonationService.updateDonation(req.params.id, req.body);

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

module.exports = {
    createDonation,
    getDonation,
    getAllDonations,
    deleteDonation,
    updateDonation,
};
