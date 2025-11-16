import { useEffect, useState } from 'react';
import { requestAPI } from '../api/requests';
import { volunteerAPI } from '../api/volunteers';
import Card from '../components/Card';
import Loader from '../components/Loader';
import Button from '../components/Button';
import Input from '../components/Input';
import { toast } from 'react-toastify';

const AssignVolunteer = () => {
  const [requests, setRequests] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    requestId: '',
    volunteerId: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [requestsData, volunteersData] = await Promise.all([
        requestAPI.getAll(),
        volunteerAPI.getAll(),
      ]);
      
      setRequests(Array.isArray(requestsData) ? requestsData : []);
      setVolunteers(Array.isArray(volunteersData) ? volunteersData : []);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.requestId || !formData.volunteerId) {
      toast.error('Please select both a request and a volunteer');
      return;
    }

    try {
      setSubmitting(true);
      await requestAPI.assignVolunteer({
        requestId: formData.requestId,
        volunteerId: formData.volunteerId,
      });
      toast.success('Volunteer assigned successfully!');
      setFormData({ requestId: '', volunteerId: '' });
      fetchData();
    } catch (error) {
      toast.error(error.message || 'Failed to assign volunteer');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  // Filter available volunteers
  const availableVolunteers = volunteers.filter(v => v.availability === 'Available' && v.status === 'Active');
  // Filter pending/approved requests
  const assignableRequests = requests.filter(r => r.status === 'Pending' || r.status === 'Approved');

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card title="Assign Volunteer to Request">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                Select Request
              </label>
              <select
                name="requestId"
                value={formData.requestId}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Choose a request...</option>
                {assignableRequests.map((request) => (
                  <option key={request._id} value={request._id}>
                    {request.requesterName} - {request.type} ({request.quantity}) - {request.priority} Priority
                  </option>
                ))}
              </select>
              {assignableRequests.length === 0 && (
                <p className="text-sm text-slate-500 mt-1">No assignable requests available</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                Select Volunteer
              </label>
              <select
                name="volunteerId"
                value={formData.volunteerId}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Choose a volunteer...</option>
                {availableVolunteers.map((volunteer) => (
                  <option key={volunteer._id} value={volunteer._id}>
                    {volunteer.name} - {volunteer.skills?.join(', ') || 'No skills listed'} - {volunteer.location || 'No location'}
                  </option>
                ))}
              </select>
              {availableVolunteers.length === 0 && (
                <p className="text-sm text-slate-500 mt-1">No available volunteers</p>
              )}
            </div>

            <Button type="submit" disabled={submitting || !formData.requestId || !formData.volunteerId} className="w-full">
              {submitting ? <Loader size="sm" /> : 'Assign Volunteer'}
            </Button>
          </form>
        </Card>

        {/* Show assigned requests */}
        <Card title="Currently Assigned Requests" className="mt-8">
          {requests.filter(r => r.status === 'Assigned' && r.assignedVolunteer).length > 0 ? (
            <div className="space-y-4">
              {requests
                .filter(r => r.status === 'Assigned' && r.assignedVolunteer)
                .map((request) => {
                  const volunteer = volunteers.find(v => v._id === request.assignedVolunteer?._id || v._id === request.assignedVolunteer);
                  return (
                    <div key={request._id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-lg">{request.type} - {request.requesterName}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Assigned to: <strong>{volunteer?.name || 'Unknown'}</strong>
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Location: {request.location}
                          </p>
                        </div>
                        <span className="px-2 py-1 bg-purple-500 text-white rounded text-xs">
                          Assigned
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <p className="text-center text-slate-500 py-4">No assigned requests</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AssignVolunteer;

