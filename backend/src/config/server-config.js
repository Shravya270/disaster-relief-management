const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT:process.env.PORT,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
}