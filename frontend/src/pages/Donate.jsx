import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { donationAPI } from '../api/donations';
import { paymentAPI } from '../api/payments';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

const stripePromise = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY 
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  : null;

const DonationForm = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    donorName: '',
    email: '',
    phone: '',
    amount: '',
    category: 'Money',
    message: '',
    anonymous: false,
    paymentMethod: 'Stripe',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      toast.error('Stripe is not loaded');
      return;
    }

    setLoading(true);

    try {
      // Create donation
      const donation = await donationAPI.create({
        ...formData,
        amount: parseFloat(formData.amount),
        status: 'Pending',
      });

      // Create payment intent
      const paymentIntent = await paymentAPI.createIntent({
        donationId: donation._id,
        amount: Math.round(parseFloat(formData.amount) * 100), // Convert to cents
      });

      // Confirm payment
      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent: confirmedPayment } = await stripe.confirmCardPayment(
        paymentIntent.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: formData.donorName,
              email: formData.email,
            },
          },
        }
      );

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      if (confirmedPayment.status === 'succeeded') {
        // Update donation status
        await donationAPI.update(donation._id, {
          status: 'Success',
          transactionId: confirmedPayment.id,
        });

        toast.success('Donation successful! Thank you for your contribution.');
        navigate('/dashboard/donations');
      }
    } catch (error) {
      toast.error(error.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card title="Make a Donation">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Donor Name"
              name="donorName"
              value={formData.donorName}
              onChange={handleChange}
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
            <Input
              label="Amount ($)"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              required
              min="1"
              step="0.01"
            />
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="Money">Money</option>
                <option value="Food">Food</option>
                <option value="Clothes">Clothes</option>
                <option value="Medicine">Medicine</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                Message (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="input-field"
                placeholder="Add a message..."
              />
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="anonymous"
                  checked={formData.anonymous}
                  onChange={handleChange}
                  className="mr-2 w-4 h-4"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  Make this donation anonymous
                </span>
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                Payment Method
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="Stripe">Stripe (Credit Card)</option>
                <option value="Cash">Cash</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>
            {formData.paymentMethod === 'Stripe' && (
              <div className="mb-4 p-4 border border-slate-300 dark:border-slate-600 rounded-xl">
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Card Details
                </label>
                <CardElement options={cardElementOptions} />
              </div>
            )}
            <Button
              type="submit"
              disabled={loading || !stripe}
              className="w-full"
            >
              {loading ? <Loader size="sm" /> : `Donate $${formData.amount || '0'}`}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

const Donate = () => {
  if (!stripePromise) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <p className="text-red-500 text-center">
              Stripe is not configured. Please add VITE_STRIPE_PUBLISHABLE_KEY to your .env file.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <DonationForm />
    </Elements>
  );
};

export default Donate;

