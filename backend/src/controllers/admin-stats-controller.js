const { AdminStatsService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { StatusCodes } = require('http-status-codes');

async function getOverviewStats(req, res) {
    try {
        const stats = await AdminStatsService.getOverviewStats();

        return res.status(StatusCodes.OK).json({
            ...SuccessResponse,
            data: stats
        });

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...ErrorResponse,
            error
        });
    }
}

async function getDonationsByCategory(req,res){
    try{
        const data = await AdminStatsService.getDonationsByCategory();

        return res.status(StatusCodes.OK).json({
            ...SuccessResponse,
            data
        });
    }
    catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...ErrorResponse,
            error
        });
    }
}

async function getRequestsByStatus(req, res) {
    try {
        const data = await AdminStatsService.getRequestsByStatus();

        return res.status(StatusCodes.OK).json({
            ...SuccessResponse,
            data
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...ErrorResponse,
            error
        });
    }
}

async function getRequestsByPriority(req, res) {
    try {
        const data = await AdminStatsService.getRequestsByPriority();
        return res.status(StatusCodes.OK).json({
            ...SuccessResponse,
            data
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...ErrorResponse,
            error
        });
    }
}

async function getVolunteersByAvailability(req, res) {
    try {
        const data = await AdminStatsService.getVolunteersByAvailability();

        return res.status(StatusCodes.OK).json({
            ...SuccessResponse,
            data
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...ErrorResponse,
            error
        });
    }
}

async function getDonationAmountByCategory(req, res) {
    try {
        const data = await AdminStatsService.getDonationAmountByCategory();

        return res.status(StatusCodes.OK).json({
            ...SuccessResponse,
            data
        });

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...ErrorResponse,
            error
        });
    }
}

async function getVolunteersBySkills(req, res) {
    try {
        const data = await AdminStatsService.getVolunteersBySkills();

        return res.status(StatusCodes.OK).json({
            ...SuccessResponse,
            data
        });

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...ErrorResponse,
            error
        });
    }
}




module.exports = {
    getOverviewStats,
    getDonationsByCategory,
    getRequestsByStatus,
    getRequestsByPriority,
    getVolunteersByAvailability,
    getDonationAmountByCategory,
    getVolunteersBySkills,
    
};
