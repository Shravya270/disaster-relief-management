import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { getPriorityColor } from '../utils/format';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icon colors based on priority
const createCustomIcon = (priority) => {
  const colors = {
    Critical: '#ef4444',
    High: '#f97316',
    Medium: '#eab308',
    Low: '#22c55e',
  };
  const color = colors[priority] || '#6b7280';

  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path fill="${color}" stroke="#fff" stroke-width="1.5" d="M12.5 0C5.596 0 0 5.596 0 12.5c0 8.75 12.5 28.5 12.5 28.5s12.5-19.75 12.5-28.5C25 5.596 19.404 0 12.5 0z"/>
        <circle cx="12.5" cy="12.5" r="5" fill="#fff"/>
      </svg>
    `)}`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });
};

const Map = ({ requests = [], volunteers = [], height = '500px', center = [37.7749, -122.4194], zoom = 10 }) => {
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-lg" style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Resource Request Markers */}
        {requests.map((request) => {
          if (!request.latitude || !request.longitude) return null;
          
          return (
            <Marker
              key={request._id}
              position={[request.latitude, request.longitude]}
              icon={createCustomIcon(request.priority)}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-lg mb-2">{request.type}</h3>
                  <p className="text-sm text-slate-600 mb-1">
                    <strong>Requester:</strong> {request.requesterName}
                  </p>
                  <p className="text-sm text-slate-600 mb-1">
                    <strong>Quantity:</strong> {request.quantity}
                  </p>
                  <p className="text-sm text-slate-600 mb-1">
                    <strong>Priority:</strong>{' '}
                    <span className={`px-2 py-1 rounded text-white text-xs ${getPriorityColor(request.priority)}`}>
                      {request.priority}
                    </span>
                  </p>
                  <p className="text-sm text-slate-600 mb-1">
                    <strong>Status:</strong> {request.status}
                  </p>
                  {request.description && (
                    <p className="text-sm text-slate-600 mt-2">{request.description}</p>
                  )}
                  {request.location && (
                    <p className="text-sm text-slate-500 mt-1">{request.location}</p>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Volunteer Markers */}
        {volunteers.map((volunteer) => {
          if (!volunteer.latitude || !volunteer.longitude) return null;
          
          return (
            <Marker
              key={volunteer._id}
              position={[volunteer.latitude, volunteer.longitude]}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-lg mb-2">{volunteer.name}</h3>
                  <p className="text-sm text-slate-600 mb-1">
                    <strong>Volunteer</strong>
                  </p>
                  {volunteer.email && (
                    <p className="text-sm text-slate-600 mb-1">
                      <strong>Email:</strong> {volunteer.email}
                    </p>
                  )}
                  {volunteer.phone && (
                    <p className="text-sm text-slate-600 mb-1">
                      <strong>Phone:</strong> {volunteer.phone}
                    </p>
                  )}
                  {volunteer.skills && volunteer.skills.length > 0 && (
                    <p className="text-sm text-slate-600 mb-1">
                      <strong>Skills:</strong> {volunteer.skills.join(', ')}
                    </p>
                  )}
                  {volunteer.location && (
                    <p className="text-sm text-slate-500 mt-1">{volunteer.location}</p>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
