import { useEffect, useState } from 'react';
import { requestAPI } from '../api/requests';
import { volunteerAPI } from '../api/volunteers';
import Card from '../components/Card';
import Loader from '../components/Loader';
import Map from '../components/Map';

const MapView = () => {
  const [requests, setRequests] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [center, setCenter] = useState([37.7749, -122.4194]);

  useEffect(() => {
    fetchData();
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          // Default to San Francisco if geolocation fails
          console.log('Using default location');
        }
      );
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [requestsData, volunteersData] = await Promise.all([
        requestAPI.getAll(),
        volunteerAPI.getAll(),
      ]);
      
      const requestsArray = Array.isArray(requestsData) ? requestsData : [];
      const volunteersArray = Array.isArray(volunteersData) ? volunteersData : [];
      
      setRequests(requestsArray.filter(r => r.latitude && r.longitude));
      setVolunteers(volunteersArray.filter(v => v.latitude && v.longitude));
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Resource Requests Map
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            View all resource requests on the map. Click on markers to see details.
          </p>
        </div>

        <Card>
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-red-500 text-white rounded text-sm">Critical</span>
            <span className="px-3 py-1 bg-orange-500 text-white rounded text-sm">High</span>
            <span className="px-3 py-1 bg-yellow-500 text-white rounded text-sm">Medium</span>
            <span className="px-3 py-1 bg-green-500 text-white rounded text-sm">Low</span>
          </div>
          <Map requests={requests} volunteers={volunteers} center={center} zoom={10} height="600px" />
        </Card>

        <div className="mt-8">
          <Card title="Requests Summary">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {requests.filter(r => r.priority === 'Critical').length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Critical</div>
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {requests.filter(r => r.priority === 'High').length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">High</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {requests.filter(r => r.priority === 'Medium').length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Medium</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {requests.filter(r => r.priority === 'Low').length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Low</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MapView;

