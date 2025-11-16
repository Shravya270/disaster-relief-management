const ResourceRequestRepository = require('../repositories/request-repository');

const resourceRequestRepository = new ResourceRequestRepository();

async function createResourceRequest(data) {
    return await resourceRequestRepository.create(data);
}

async function getResourceRequest(id) {
    return await resourceRequestRepository.get(id);
}

async function getAllResourceRequests() {
    return await resourceRequestRepository.getAll();
}

async function updateResourceRequest(id, data) {
    return await resourceRequestRepository.update(id, data);
}

async function deleteResourceRequest(id) {
    return await resourceRequestRepository.delete(id);
}

module.exports = {
    createResourceRequest,
    getResourceRequest,
    getAllResourceRequests,
    updateResourceRequest,
    deleteResourceRequest,
};
