# Disaster Relief Management System - Frontend

A modern, responsive React frontend for the Disaster Relief Management System built with Vite, React, TailwindCSS, and integrated with Stripe payments and OpenStreetMap.

## Features

- ✅ **Donation System** with Stripe payment integration
- ✅ **Volunteer Registration** with skills and availability tracking
- ✅ **Resource Request Submission** with geolocation support
- ✅ **Volunteer Assignment** to resource requests
- ✅ **Admin Dashboard** with live statistics and charts
- ✅ **OpenStreetMap** integration showing all resource requests and volunteers
- ✅ **Dark/Light Mode** theme toggle
- ✅ **Fully Responsive** design for mobile and desktop
- ✅ **Toast Notifications** for user feedback
- ✅ **Error Handling** throughout the application

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Routing
- **TailwindCSS** - Styling
- **Axios** - HTTP client
- **Stripe React SDK** - Payment processing
- **React-Leaflet** - OpenStreetMap integration (free, no API key required)
- **Recharts** - Data visualization
- **React Toastify** - Toast notifications

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the `frontend` directory with the following variables:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
```

**Note:** Replace the placeholder values with your actual API keys:
- Get your Stripe publishable key from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
- **No map API key required!** This project uses OpenStreetMap via React-Leaflet, which is completely free and open-source.

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

### 4. Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Project Structure

```
src/
├── api/              # API client and endpoints
│   ├── axiosClient.js
│   ├── donations.js
│   ├── volunteers.js
│   ├── requests.js
│   ├── payments.js
│   └── stats.js
├── components/       # Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Card.jsx
│   ├── Loader.jsx
│   ├── StatCard.jsx
│   ├── Map.jsx
│   └── Chart.jsx
├── pages/            # Page components
│   ├── Home.jsx
│   ├── Donate.jsx
│   ├── Volunteer.jsx
│   ├── RequestHelp.jsx
│   ├── Dashboard.jsx
│   ├── DonationsList.jsx
│   ├── VolunteersList.jsx
│   ├── RequestsList.jsx
│   ├── AssignVolunteer.jsx
│   └── MapView.jsx
├── context/          # React context providers
│   └── ThemeContext.jsx
├── hooks/            # Custom React hooks
│   └── useFetch.js
├── utils/            # Utility functions
│   └── format.js
├── App.jsx           # Main app component with routing
├── main.jsx          # Entry point
└── index.css         # Global styles
```

## Routes

### Public Routes
- `/` - Home page
- `/donate` - Donation form with Stripe payment
- `/volunteer` - Volunteer registration
- `/request-help` - Resource request submission
- `/map` - Map view of all resource requests

### Admin Routes
- `/dashboard` - Main dashboard with statistics
- `/dashboard/donations` - List of all donations
- `/dashboard/volunteers` - List of all volunteers
- `/dashboard/requests` - List of all resource requests
- `/dashboard/assign` - Assign volunteers to requests

## API Integration

The frontend communicates with the backend API at the base URL specified in `VITE_API_BASE_URL`. All API calls are handled through the axios client with automatic error handling and toast notifications.

### API Endpoints Used

- `POST /api/donations` - Create donation
- `GET /api/donations` - Get all donations
- `POST /api/payments/create-intent` - Create Stripe payment intent
- `POST /api/volunteers` - Create volunteer
- `GET /api/volunteers` - Get all volunteers
- `POST /api/requests` - Create resource request
- `GET /api/requests` - Get all requests
- `POST /api/requests/assign` - Assign volunteer to request
- `GET /api/stats/*` - Get various statistics

## Features in Detail

### Stripe Payment Integration

The donation page uses Stripe Elements to securely collect payment information. The flow:
1. User fills donation form
2. Frontend creates donation record via API
3. Frontend creates payment intent via API
4. Stripe confirms payment
5. Donation status updated to "Success"

### OpenStreetMap Integration

The map view displays all resource requests and volunteers using OpenStreetMap (via React-Leaflet). Features:
- 🔴 Red markers - Critical priority requests
- 🟠 Orange markers - High priority requests
- 🟡 Yellow markers - Medium priority requests
- 🟢 Green markers - Low priority requests
- Blue markers - Volunteers

Clicking a marker shows detailed information in a popup. The map is fully interactive with zoom and pan capabilities. **No API key or billing required!**

### Dark Mode

The application supports dark/light mode with a toggle in the navbar. The preference is saved in localStorage.

### Responsive Design

All pages are fully responsive and work seamlessly on:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktops (1024px+)

## Troubleshooting

### Map not loading
- Ensure `react-leaflet` and `leaflet` are installed (`npm install`)
- Check browser console for any errors
- Verify that requests/volunteers have valid latitude and longitude coordinates

### Stripe payment not working
- Ensure `VITE_STRIPE_PUBLISHABLE_KEY` is set in `.env`
- Verify the backend Stripe secret key is configured
- Check browser console for errors

### API calls failing
- Verify the backend server is running
- Check `VITE_API_BASE_URL` matches your backend URL
- Ensure CORS is properly configured on the backend

## License

ISC

