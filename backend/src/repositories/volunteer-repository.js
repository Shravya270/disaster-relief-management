const CrudRepository = require('./crud-repository');
const Volunteer = require('../models/volunteer');

class VolunteerRepository extends CrudRepository {
    constructor() {
        super(Volunteer);
    }
}

module.exports = VolunteerRepository;
