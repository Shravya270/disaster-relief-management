const CrudRepository = require('./crud-repository')
const Donation = require('../models/donation');

class DonationRepository extends CrudRepository{
    constructor(){
        super(Donation);
    }
}

module.exports = DonationRepository;