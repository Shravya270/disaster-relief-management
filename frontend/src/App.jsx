import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Donate from './pages/Donate';
import Volunteer from './pages/Volunteer';
import RequestHelp from './pages/RequestHelp';
import Dashboard from './pages/Dashboard';
import DonationsList from './pages/DonationsList';
import VolunteersList from './pages/VolunteersList';
import RequestsList from './pages/RequestsList';
import AssignVolunteer from './pages/AssignVolunteer';
import MapView from './pages/MapView';
import Login from './pages/Login';
import Register from './pages/Register';
import Unauthorized from './pages/Unauthorized';

// Auth wrapper
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>

              {/* Public pages */}
              <Route path="/" element={<Home />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/request-help" element={<RequestHelp />} />
              <Route path="/map" element={<MapView />} />

              {/* Auth pages */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Logged-in users only */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Admin-only pages */}
              <Route
                path="/dashboard/donations"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <DonationsList />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard/volunteers"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <VolunteersList />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard/requests"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'volunteer']}>
                    <RequestsList />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard/assign"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AssignVolunteer />
                  </ProtectedRoute>
                }
              />

            </Routes>
          </main>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
