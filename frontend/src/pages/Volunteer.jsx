import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { volunteerAPI } from '../api/volunteers';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

const Volunteer = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    availability: 'Available',
    location: '',
    hoursCommitted: 0,
    status: 'Active',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s);
      await volunteerAPI.create({
        ...formData,
        skills: skillsArray,
        hoursCommitted: parseInt(formData.hoursCommitted) || 0,
      });
      toast.success('Volunteer registration successful!');
      navigate('/dashboard/volunteers');
    } catch (error) {
      toast.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card title="Volunteer Registration">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
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
              required
            />
            <Input
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, State"
            />
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                Skills (comma-separated)
              </label>
              <Input
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g., Medical, Logistics, Communication"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                Availability
              </label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
            <Input
              label="Hours Committed"
              name="hoursCommitted"
              type="number"
              value={formData.hoursCommitted}
              onChange={handleChange}
              min="0"
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <Loader size="sm" /> : 'Register as Volunteer'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Volunteer;

