import { Link, useLocation } from 'react-router-dom';
import Button from './Button';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-slate-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            🚨 Disaster Relief
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/') ? 'bg-primary text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Home
            </Link>
            <Link
              to="/donate"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/donate') ? 'bg-primary text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Donate
            </Link>
            <Link
              to="/volunteer"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/volunteer') ? 'bg-primary text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Volunteer
            </Link>
            <Link
              to="/request-help"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/request-help') ? 'bg-primary text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Request Help
            </Link>
            <Link
              to="/dashboard"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/dashboard') ? 'bg-primary text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/map"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/map') ? 'bg-primary text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Map
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

