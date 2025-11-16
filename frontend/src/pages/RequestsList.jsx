import { useEffect, useState } from 'react';
import { requestAPI } from '../api/requests';
import Card from '../components/Card';
import Loader from '../components/Loader';
import Button from '../components/Button';
import { formatDate, getPriorityColor, getStatusColor } from '../utils/format';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const RequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await requestAPI.getAll();
      setRequests(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this request?')) return;
    
    try {
      setDeleting(id);
      await requestAPI.delete(id);
      toast.success('Request deleted successfully');
      fetchRequests();
    } catch (error) {
      toast.error('Failed to delete request');
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
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">All Resource Requests</h1>
          <Link to="/dashboard/assign">
            <Button>Assign Volunteers</Button>
          </Link>
        </div>

        <Card>
          {requests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300">Requester</th>
                    <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300">Type</th>
                    <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300">Quantity</th>
                    <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300">Location</th>
                    <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300">Priority</th>
                    <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300">Status</th>
                    <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300">Date</th>
                    <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={request._id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700">
                      <td className="py-3 px-4 font-semibold">{request.requesterName}</td>
                      <td className="py-3 px-4">{request.type}</td>
                      <td className="py-3 px-4">{request.quantity}</td>
                      <td className="py-3 px-4">{request.location}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-white text-xs ${getPriorityColor(request.priority)}`}>
                          {request.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-white text-xs ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{formatDate(request.createdAt)}</td>
                      <td className="py-3 px-4">
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(request._id)}
                          disabled={deleting === request._id}
                        >
                          {deleting === request._id ? <Loader size="sm" /> : 'Delete'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-slate-500 py-8">No requests found</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default RequestsList;

