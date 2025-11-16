const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },

    phone: {
        type: String,
        required: true,
        trim: true
    },

    skills: {
        type: [String],
        default: []
    },

    availability: {
        type: String,
        enum: ['Available', 'Unavailable'],
        default: 'Available'
    },

    location: {
        type: String,
        trim: true
    },

    hoursCommitted: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        enum: ['Active', 'Busy', 'Completed'],
        default: 'Active'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Volunteer', volunteerSchema);
