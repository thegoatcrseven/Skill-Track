import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  const isActive = (path) => {
    return router.pathname === path ? 'border-neon-green text-neon-green' : 'border-transparent text-white hover:text-neon-green';
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-8">
            <Link href="/">
              <span className="text-3xl font-bold text-white hover:text-neon-green transition-colors duration-300" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                SKILLTRACKER
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/">
                <span className={`border-b-2 px-1 py-2 text-sm font-medium transition-all duration-300 ${isActive('/')}`}>
                  DASHBOARD
                </span>
              </Link>
              <Link href="/goals">
                <span className={`border-b-2 px-1 py-2 text-sm font-medium transition-all duration-300 ${isActive('/goals')}`}>
                  GOALS
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
