import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const isLoggedIn = Boolean(token);
  const role = user?.role;

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-slate-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            🚨 Disaster Relief
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">

            {/* Always visible */}
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg ${
                isActive('/') ? 'bg-primary text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Home
            </Link>

            <Link
              to="/donate"
              className={`px-3 py-2 rounded-lg ${
                isActive('/donate') ? 'bg-primary text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Donate
            </Link>

            <Link
              to="/volunteer"
              className={`px-3 py-2 rounded-lg ${
                isActive('/volunteer') ? 'bg-primary text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Volunteer
            </Link>

            <Link
              to="/request-help"
              className={`px-3 py-2 rounded-lg ${
                isActive('/request-help') ? 'bg-primary text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Request Help
            </Link>

            <Link
              to="/map"
              className={`px-3 py-2 rounded-lg ${
                isActive('/map') ? 'bg-primary text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Map
            </Link>

            {/* If logged in – show dashboard */}
            {isLoggedIn && (
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-lg ${
                  isActive('/dashboard') ? 'bg-primary text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                Dashboard
              </Link>
            )}

            {/* Admin-only links */}
            {isLoggedIn && role === "admin" && (
              <>
                <Link
                  to="/dashboard/donations"
                  className={`px-3 py-2 rounded-lg ${
                    isActive('/dashboard/donations')
                      ? 'bg-primary text-white'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  Admin: Donations
                </Link>

                <Link
                  to="/dashboard/volunteers"
                  className={`px-3 py-2 rounded-lg ${
                    isActive('/dashboard/volunteers')
                      ? 'bg-primary text-white'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  Admin: Volunteers
                </Link>

                <Link
                  to="/dashboard/requests"
                  className={`px-3 py-2 rounded-lg ${
                    isActive('/dashboard/requests')
                      ? 'bg-primary text-white'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  Admin: Requests
                </Link>

                <Link
                  to="/dashboard/assign"
                  className={`px-3 py-2 rounded-lg ${
                    isActive('/dashboard/assign')
                      ? 'bg-primary text-white'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  Assign
                </Link>
              </>
            )}

            {/* Auth buttons */}
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className={`px-3 py-2 rounded-lg ${
                    isActive('/login')
                      ? 'bg-primary text-white'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className={`px-3 py-2 rounded-lg ${
                    isActive('/register')
                      ? 'bg-primary text-white'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
