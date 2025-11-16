import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Disaster Relief Management System</h1>
          <p className="text-xl mb-8 text-blue-100">
            Connecting communities in times of need. Together we can make a difference.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/donate">
              <Button variant="secondary" className="text-lg px-8 py-3">
                💰 Donate Now
              </Button>
            </Link>
            <Link to="/volunteer">
              <Button variant="secondary" className="text-lg px-8 py-3">
                🤝 Volunteer
              </Button>
            </Link>
            <Link to="/request-help">
              <Button variant="secondary" className="text-lg px-8 py-3">
                🆘 Request Help
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 dark:text-slate-200">
            How We Help
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Donations</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Support disaster relief efforts with monetary donations or essential supplies.
              </p>
            </Card>
            <Card className="text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-2">Volunteers</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Join our volunteer network and help those in need during critical times.
              </p>
            </Card>
            <Card className="text-center">
              <div className="text-5xl mb-4">🆘</div>
              <h3 className="text-xl font-bold mb-2">Resource Requests</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Request essential resources when you need help during a disaster.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 dark:text-slate-200">
            Impact So Far
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-slate-600 dark:text-slate-400">Donations</div>
            </Card>
            <Card className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-slate-600 dark:text-slate-400">Volunteers</div>
            </Card>
            <Card className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">800+</div>
              <div className="text-slate-600 dark:text-slate-400">Requests</div>
            </Card>
            <Card className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-slate-600 dark:text-slate-400">Success Rate</div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

