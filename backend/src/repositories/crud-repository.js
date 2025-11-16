const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose');
const AppError = require('../utils/errors/app-error');

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            return await this.model.create(data);
        } catch (error) {
            throw new AppError(error.message, StatusCodes.BAD_REQUEST);
        }
    }

    async delete(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError('Invalid ID format', StatusCodes.BAD_REQUEST);
        }

        const response = await this.model.findByIdAndDelete(id);

        if (!response) {
            throw new AppError('Resource not found!', StatusCodes.NOT_FOUND);
        }

        return response;
    }

    async get(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError('Invalid ID format', StatusCodes.BAD_REQUEST);
    }

    let query = this.model.findById(id);

    // If model has assignedVolunteer, populate it
    if (this.model.schema.paths.assignedVolunteer) {
        query = query.populate("assignedVolunteer");
    }

    const response = await query;

    if (!response) {
        throw new AppError('Resource not found!', StatusCodes.NOT_FOUND);
    }

    return response;
}


    async getAll() {
    let query = this.model.find({});

    if (this.model.schema.paths.assignedVolunteer) {
        query = query.populate("assignedVolunteer");
    }

    return await query;
    }

    async update(id, data) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError('Invalid ID format', StatusCodes.BAD_REQUEST);
        }

        const response = await this.model.findByIdAndUpdate(
            id,
            data,
            { new: true, runValidators: true }
        );

        if (!response) {
            throw new AppError('Resource not found', StatusCodes.NOT_FOUND);
        }

        return response;
    }
}

module.exports = CrudRepository;
