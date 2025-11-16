const VolunteerRepository = require('../repositories/volunteer-repository');

const volunteerRepository = new VolunteerRepository();

async function createVolunteer(data) {
    return await volunteerRepository.create(data);
}

async function getVolunteer(id) {
    return await volunteerRepository.get(id);
}

async function getAllVolunteers() {
    return await volunteerRepository.getAll();
}

async function updateVolunteer(id, data) {
    return await volunteerRepository.update(id, data);
}

async function deleteVolunteer(id) {
    return await volunteerRepository.delete(id);
}

module.exports = {
    createVolunteer,
    getVolunteer,
    getAllVolunteers,
    updateVolunteer,
    deleteVolunteer
};
