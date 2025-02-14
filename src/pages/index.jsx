import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Home() {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/goals')
      .then(res => res.json())
      .then(data => {
        setGoals(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching goals:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>SkillTracker - Track Your Progress</title>
        <meta name="description" content="Track your goals and progress with SkillTracker" />
      </Head>

      <div className="min-h-screen bg-slate-900">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              SKILLTRACKER
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              Track your goals and progress in style
            </p>
            <Link
              href="/goals"
              className="inline-block bg-neon-green text-black px-8 py-3 rounded-md text-lg font-semibold hover:bg-neon-glow hover:text-white transition-all duration-300"
            >
              Get Started
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg hover:border-neon-green transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-2">Track Goals</h3>
              <p className="text-slate-400">
                Set and track your goals with a beautiful and intuitive interface
              </p>
            </div>
            <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg hover:border-neon-blue transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-2">Monitor Progress</h3>
              <p className="text-slate-400">
                Keep track of your progress and achievements over time
              </p>
            </div>
            <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg hover:border-neon-pink transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-2">Stay Motivated</h3>
              <p className="text-slate-400">
                Stay motivated with visual progress indicators and achievements
              </p>
            </div>
          </div>

          {!isLoading && goals.length > 0 && (
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Recent Goals</h2>
                <Link
                  href="/goals"
                  className="text-neon-green hover:text-neon-glow transition-colors duration-300"
                >
                  View All Goals →
                </Link>
              </div>

              <div className="grid gap-4">
                {goals.slice(0, 3).map((goal) => (
                  <div
                    key={goal.id}
                    className="border border-slate-700 rounded-lg p-4 hover:border-neon-green transition-all duration-300"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-white">{goal.title}</h3>
                        {goal.description && (
                          <p className="text-slate-400 mt-1">{goal.description}</p>
                        )}
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          goal.status === 'COMPLETED'
                            ? 'bg-green-900 text-green-300'
                            : 'bg-blue-900 text-blue-300'
                        }`}
                      >
                        {goal.status === 'COMPLETED' ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
