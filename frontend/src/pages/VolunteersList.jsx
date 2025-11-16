import { useEffect, useState } from 'react';
import { volunteerAPI } from '../api/volunteers';
import Card from '../components/Card';
import Loader from '../components/Loader';
import Button from '../components/Button';
import { formatDate, getStatusColor } from '../utils/format';
import { toast } from 'react-toastify';

const VolunteersList = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      setLoading(true);
      const data = await volunteerAPI.getAll();
      setVolunteers(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to fetch volunteers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this volunteer?')) return;
    
    try {
      setDeleting(id);
      await volunteerAPI.delete(id);
      toast.success('Volunteer deleted successfully');
      fetchVolunteers();
    } catch (error) {
      toast.error('Failed to delete volunteer');
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
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">All Volunteers</h1>
        </div>

        <Card>
          {volunteers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300">Name</th>
                    <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300">Email</th>
                    <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300">Phone</th>
                    <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300">Skills</th>
                    <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300">Availability</th>
                    <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300">Status</th>
                    <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300">Hours</th>
                    <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {volunteers.map((volunteer) => (
                    <tr key={volunteer._id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700">
                      <td className="py-3 px-4 font-semibold">{volunteer.name}</td>
                      <td className="py-3 px-4">{volunteer.email}</td>
                      <td className="py-3 px-4">{volunteer.phone}</td>
                      <td className="py-3 px-4">
                        {volunteer.skills && volunteer.skills.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {volunteer.skills.map((skill, idx) => (
                              <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-white text-xs ${
                          volunteer.availability === 'Available' ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          {volunteer.availability}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-white text-xs ${getStatusColor(volunteer.status)}`}>
                          {volunteer.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{volunteer.hoursCommitted || 0}</td>
                      <td className="py-3 px-4">
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(volunteer._id)}
                          disabled={deleting === volunteer._id}
                        >
                          {deleting === volunteer._id ? <Loader size="sm" /> : 'Delete'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-slate-500 py-8">No volunteers found</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default VolunteersList;

