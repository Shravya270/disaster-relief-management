const Donation = require('../models/donation');
const Volunteer = require('../models/volunteer');
const ResourceRequest = require('../models/request');

async function getOverviewStats() {
    const totalDonations = await Donation.countDocuments();
    const totalVolunteers = await Volunteer.countDocuments();
    const totalRequests = await ResourceRequest.countDocuments();

    return {
        totalDonations,
        totalVolunteers,
        totalRequests
    };
}

async function getDonationsByCategory() {
    const result = await Donation.aggregate([
        {
            $group: {
                _id: "$category",
                count: { $sum: 1 }
            }
        }
    ]);

    return result;
}

async function getDonationsByStatus(){
    const result = await Donation.aggregate([
        {
            $group:{
                _id:"$status",
                count:{$sum:1}
            }
        }
    ])
    
    return result;
}

async function getRequestsByStatus() {
    const result = await ResourceRequest.aggregate([
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 }
            }
        }
    ]);

    return result;
}

async function getRequestsByPriority() {
    const result = await ResourceRequest.aggregate([
        {
            $group: {
                _id: "$priority",
                count: { $sum: 1 }
            }
        }
    ]);

    return result;
}

async function getVolunteersByAvailability() {
    const result = await Volunteer.aggregate([
        {
            $group: {
                _id: "$availability",
                count: { $sum: 1 }
            }
        }
    ]);

    return result;
}

async function getDonationAmountByCategory() {
    const result = await Donation.aggregate([
        {
            $group: {
                _id: "$category",
                totalAmount: { $sum: "$amount" }
            }
        }
    ]);

    return result;
}

async function getVolunteersBySkills() {
    const result = await Volunteer.aggregate([
        { $unwind: "$skills" },
        {
            $group: {
                _id: "$skills",
                count: { $sum: 1 }
            }
        }
    ]);

    return result;
}



module.exports = {
    getOverviewStats,
    getDonationsByCategory,
    getDonationsByStatus,
    getRequestsByStatus,
    getRequestsByPriority,
    getVolunteersByAvailability,
    getDonationAmountByCategory,
    getVolunteersBySkills,
};
