const { StatusCodes } = require('http-status-codes');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { SuccessResponse, ErrorResponse } = require('../utils/common');
const DonationService = require('../services/donation-service');

async function createPaymentIntent(req, res) {
    try {
        const { donationId, amount } = req.body;

        if (!amount) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                ...ErrorResponse,
                error: "Amount is required"
            });
        }

        // stripe requires smallest currency unit → so amount * 100
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: "inr",
            payment_method_types: ['card'],
            metadata: {
                donationId: donationId || "none"
            }
        });

        return res.status(StatusCodes.OK).json({
            ...SuccessResponse,
            data: {
                clientSecret: paymentIntent.client_secret,
                paymentIntentId: paymentIntent.id
            }
        });

    } catch (error) {
        console.error("Stripe Error:", error);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...ErrorResponse,
            error: error.message
        });
    }
}

module.exports = { createPaymentIntent };
