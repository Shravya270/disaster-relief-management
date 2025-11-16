const Footer = () => {
  return (
    <footer className="bg-secondary text-white mt-auto py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Disaster Relief Management</h3>
            <p className="text-slate-300">
              Connecting communities in times of need. Together we can make a difference.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="/donate" className="hover:text-white transition-colors">Donate</a></li>
              <li><a href="/volunteer" className="hover:text-white transition-colors">Volunteer</a></li>
              <li><a href="/request-help" className="hover:text-white transition-colors">Request Help</a></li>
              <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-slate-300">
              Email: support@disasterrelief.org<br />
              Phone: 1-800-HELP-NOW
            </p>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2024 Disaster Relief Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

