import Navbar from '../components/Navbar';

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-4">
            {/* Profile information will be populated from database */}
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
              <div>
                <h2 className="text-xl font-semibold">User Name</h2>
                <p className="text-gray-600">user@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
