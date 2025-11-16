const mongoose = require('mongoose');

const resourceRequestSchema = new mongoose.Schema({
    requesterName: {
        type: String,
        required: true,
        trim: true
    },

    type: {
        type: String,
        enum: ['Food', 'Water', 'Clothes', 'Shelter', 'Medical', 'Other'],
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        min: 1
    },

    description: {
        type: String,
        trim: true
    },

    location: {
        type: String,
        required: true
    },

    latitude: {
        type: Number
    },

    longitude: {
        type: Number
    },

    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Critical'],
        default: 'Medium'
    },

    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Assigned', 'Completed'],
        default: 'Pending'
    },

    assignedVolunteer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Volunteer',
        default: null
    }

}, { timestamps: true });

module.exports = mongoose.model('ResourceRequest', resourceRequestSchema);
