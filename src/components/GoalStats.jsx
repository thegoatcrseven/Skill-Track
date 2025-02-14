import { useState, useEffect } from 'react';

export default function GoalStats({ goals }) {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    completionRate: 0
  });

  useEffect(() => {
    const completed = goals.filter(goal => goal.status === 'COMPLETED').length;
    const total = goals.length;
    const inProgress = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    setStats({
      total,
      completed,
      inProgress,
      completionRate
    });
  }, [goals]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-neon-green transition-all duration-300">
        <h3 className="text-lg font-medium text-slate-400 mb-2">Total Goals</h3>
        <p className="text-4xl font-bold text-white">{stats.total}</p>
      </div>
      
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-neon-blue transition-all duration-300">
        <h3 className="text-lg font-medium text-slate-400 mb-2">Completed</h3>
        <p className="text-4xl font-bold text-green-400">{stats.completed}</p>
      </div>
      
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-neon-pink transition-all duration-300">
        <h3 className="text-lg font-medium text-slate-400 mb-2">In Progress</h3>
        <p className="text-4xl font-bold text-blue-400">{stats.inProgress}</p>
      </div>
      
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-neon-purple transition-all duration-300">
        <h3 className="text-lg font-medium text-slate-400 mb-2">Completion Rate</h3>
        <div className="flex items-center">
          <p className="text-4xl font-bold text-purple-400">{stats.completionRate}%</p>
          <div className="ml-4 flex-1 bg-slate-700 rounded-full h-3">
            <div
              className="bg-purple-400 h-3 rounded-full transition-all duration-500"
              style={{ width: `${stats.completionRate}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
