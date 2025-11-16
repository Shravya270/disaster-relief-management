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

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/request-help" element={<RequestHelp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/donations" element={<DonationsList />} />
              <Route path="/dashboard/volunteers" element={<VolunteersList />} />
              <Route path="/dashboard/requests" element={<RequestsList />} />
              <Route path="/dashboard/assign" element={<AssignVolunteer />} />
              <Route path="/map" element={<MapView />} />
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

