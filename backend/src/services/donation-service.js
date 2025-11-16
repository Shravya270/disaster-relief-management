const {StatusCodes} = require('http-status-codes');
const DonationRepository = require('../repositories/donation-repository');
const AppError = require('../utils/errors/app-error');

const donationRepository = new DonationRepository();

async function createDonation(data){
    try{
        const response = await donationRepository.create(data);
        return response;
    }
    catch(error){
        throw new AppError('Donation could not be created',StatusCodes.BAD_REQUEST);
    }
}

async function getDonation(id){
    try{
        const response = await donationRepository.get(id);
        return response;
    }
    catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('Cannot find the requested data',StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot find the donation',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllDonations(){
    try{
        const response = await donationRepository.getAll();
        return response;
    }
    catch(error){
        throw new AppError('Cannot fetch the donations',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteDonation(id){
    try{
        const response = await donationRepository.delete(id);
        return response;
    }
    catch(error){
        throw new AppError('Cannot find the data',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateDonation(id,data){
    try{
        const response = await donationRepository.update(id,data);
        return response;
    }
    catch(error){
        throw new AppError('Cannot find the data',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports={
    createDonation,
    getDonation,
    getAllDonations,
    deleteDonation,
    updateDonation,
}
