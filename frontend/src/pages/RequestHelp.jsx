import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestAPI } from '../api/requests';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

const RequestHelp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    requesterName: '',
    type: 'Food',
    quantity: '',
    description: '',
    location: '',
    latitude: '',
    longitude: '',
    priority: 'Medium',
    status: 'Pending',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
          toast.success('Location captured successfully!');
        },
        (error) => {
          toast.error('Failed to get location: ' + error.message);
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await requestAPI.create({
        ...formData,
        quantity: parseInt(formData.quantity),
        latitude: formData.latitude ? parseFloat(formData.latitude) : undefined,
        longitude: formData.longitude ? parseFloat(formData.longitude) : undefined,
      });
      toast.success('Resource request submitted successfully!');
      navigate('/dashboard/requests');
    } catch (error) {
      toast.error(error.message || 'Request failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card title="Request Help">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Requester Name"
              name="requesterName"
              value={formData.requesterName}
              onChange={handleChange}
              required
            />
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                Resource Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="Food">Food</option>
                <option value="Water">Water</option>
                <option value="Clothes">Clothes</option>
                <option value="Shelter">Shelter</option>
                <option value="Medical">Medical</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <Input
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="1"
            />
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="input-field"
                placeholder="Describe your needs..."
              />
            </div>
            <Input
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Address or location description"
            />
            <div className="mb-4">
              <Button type="button" variant="outline" onClick={handleGetLocation}>
                📍 Get Current Location
              </Button>
              {(formData.latitude && formData.longitude) && (
                <p className="mt-2 text-sm text-green-600">
                  Location: {formData.latitude.toFixed(4)}, {formData.longitude.toFixed(4)}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <Loader size="sm" /> : 'Submit Request'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RequestHelp;

