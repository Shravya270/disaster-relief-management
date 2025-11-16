import { useEffect, useState } from 'react';
import { statsAPI } from '../api/stats';
import { donationAPI } from '../api/donations';
import { requestAPI } from '../api/requests';
import { volunteerAPI } from '../api/volunteers';
import StatCard from '../components/StatCard';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { PieChartComponent, BarChartComponent } from '../components/Chart';
import { formatCurrency, formatDate } from '../utils/format';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    donations: [],
    requests: [],
    volunteers: [],
    recentDonations: [],
    allDonations: [],
    allRequests: [],
    allVolunteers: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [donationsByCategory, requestsByStatus, volunteersByAvailability, allDonations, allRequests, allVolunteers] = await Promise.all([
          statsAPI.getDonationsByCategory().catch(() => []),
          statsAPI.getRequestsByStatus().catch(() => []),
          statsAPI.getVolunteersByAvailability().catch(() => []),
          donationAPI.getAll().catch(() => []),
          requestAPI.getAll().catch(() => []),
          volunteerAPI.getAll().catch(() => []),
        ]);

        const donations = Array.isArray(allDonations) ? allDonations : [];
        const requests = Array.isArray(allRequests) ? allRequests : [];
        const volunteers = Array.isArray(allVolunteers) ? allVolunteers : [];
        const recentDonations = donations.slice(0, 5);

        // Transform donations by category: {_id: "Money", count: 5} -> {category: "Money", count: 5}
        const transformedDonations = Array.isArray(donationsByCategory) 
          ? donationsByCategory.map(item => ({ category: item._id || item.category, count: item.count || 0 }))
          : [];

        // Transform requests by status: {_id: "Pending", count: 3} -> {status: "Pending", count: 3}
        const transformedRequests = Array.isArray(requestsByStatus)
          ? requestsByStatus.map(item => ({ status: item._id || item.status, count: item.count || 0 }))
          : [];

        // Transform volunteers by availability: {_id: "Available", count: 10} -> {availability: "Available", count: 10}
        const transformedVolunteers = Array.isArray(volunteersByAvailability)
          ? volunteersByAvailability.map(item => ({ availability: item._id || item.availability, count: item.count || 0 }))
          : [];

        setStats({
          donations: transformedDonations,
          requests: transformedRequests,
          volunteers: transformedVolunteers,
          recentDonations,
          allDonations: donations,
          allRequests: requests,
          allVolunteers: volunteers,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        // Set empty stats on error
        setStats({
          donations: [],
          requests: [],
          volunteers: [],
          recentDonations: [],
          allDonations: [],
          allRequests: [],
          allVolunteers: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  // Calculate totals from actual data
  const totalDonations = stats.allDonations.reduce((sum, d) => sum + (d.amount || 0), 0);
  const totalVolunteers = stats.allVolunteers.length || 0;
  const pendingRequests = stats.allRequests.filter(r => r.status === 'Pending').length || 0;
  const activeRequests = stats.allRequests.filter(r => r.status === 'Assigned' || r.status === 'Approved').length || 0;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">Dashboard</h1>
          <div className="flex gap-4">
            <Link to="/dashboard/donations">
              <Button variant="outline">View All Donations</Button>
            </Link>
            <Link to="/dashboard/volunteers">
              <Button variant="outline">View All Volunteers</Button>
            </Link>
            <Link to="/dashboard/requests">
              <Button variant="outline">View All Requests</Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Donations"
            value={formatCurrency(totalDonations)}
            icon="💰"
          />
          <StatCard
            title="Total Volunteers"
            value={totalVolunteers}
            icon="🤝"
          />
          <StatCard
            title="Pending Requests"
            value={pendingRequests}
            icon="🆘"
          />
          <StatCard
            title="Active Requests"
            value={activeRequests}
            icon="📋"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card title="Donations by Category">
            {stats.donations && stats.donations.length > 0 ? (
              <PieChartComponent
                data={stats.donations}
                dataKey="count"
                nameKey="category"
              />
            ) : (
              <p className="text-center text-slate-500">No data available</p>
            )}
          </Card>
          <Card title="Requests by Status">
            {stats.requests && stats.requests.length > 0 ? (
              <BarChartComponent
                data={stats.requests}
                dataKey="count"
                nameKey="status"
              />
            ) : (
              <p className="text-center text-slate-500">No data available</p>
            )}
          </Card>
        </div>

        {/* Recent Donations */}
        <Card title="Recent Donations">
          {stats.recentDonations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300">Donor</th>
                    <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300">Amount</th>
                    <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300">Category</th>
                    <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300">Status</th>
                    <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentDonations.map((donation) => (
                    <tr key={donation._id} className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-3 px-4">{donation.anonymous ? 'Anonymous' : donation.donorName}</td>
                      <td className="py-3 px-4">{formatCurrency(donation.amount)}</td>
                      <td className="py-3 px-4">{donation.category}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-white text-xs ${
                          donation.status === 'Success' ? 'bg-green-500' :
                          donation.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}>
                          {donation.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{formatDate(donation.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-slate-500">No donations yet</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

