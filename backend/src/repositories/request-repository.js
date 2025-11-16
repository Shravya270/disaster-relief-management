const CrudRepository = require('./crud-repository');
const ResourceRequest = require('../models/request');

class ResourceRequestRepository extends CrudRepository {
    constructor() {
        super(ResourceRequest);
    }
}

module.exports = ResourceRequestRepository;
