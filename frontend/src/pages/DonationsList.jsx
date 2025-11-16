import { useEffect, useState } from 'react';
import { donationAPI } from '../api/donations';
import Card from '../components/Card';
import Loader from '../components/Loader';
import Button from '../components/Button';
import { formatCurrency, formatDate, getStatusColor } from '../utils/format';
import { toast } from 'react-toastify';

const DonationsList = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const data = await donationAPI.getAll();
      setDonations(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to fetch donations');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this donation?')) return;
    
    try {
      setDeleting(id);
      await donationAPI.delete(id);
      toast.success('Donation deleted successfully');
      fetchDonations();
    } catch (error) {
      toast.error('Failed to delete donation');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">All Donations</h1>
        </div>

        <Card>
          {donations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300">Donor</th>
                    <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300">Email</th>
                    <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300">Amount</th>
                    <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300">Category</th>
                    <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300">Status</th>
                    <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300">Date</th>
                    <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation) => (
                    <tr key={donation._id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700">
                      <td className="py-3 px-4">{donation.anonymous ? 'Anonymous' : donation.donorName}</td>
                      <td className="py-3 px-4">{donation.email || '-'}</td>
                      <td className="py-3 px-4 font-semibold">{formatCurrency(donation.amount)}</td>
                      <td className="py-3 px-4">{donation.category}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-white text-xs ${getStatusColor(donation.status)}`}>
                          {donation.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{formatDate(donation.createdAt)}</td>
                      <td className="py-3 px-4">
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(donation._id)}
                          disabled={deleting === donation._id}
                        >
                          {deleting === donation._id ? <Loader size="sm" /> : 'Delete'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-slate-500 py-8">No donations found</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default DonationsList;

