import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import GoalStats from '../components/GoalStats';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    dueDate: ''
  });
  const [filter, setFilter] = useState('ALL');

  const fetchGoals = async () => {
    try {
      const res = await fetch('/api/goals');
      const data = await res.json();
      setGoals(data);
    } catch (error) {
      console.error('Error fetching goals:', error);
      toast.error('Failed to load goals');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGoal),
      });

      if (!res.ok) throw new Error('Failed to create goal');

      const goal = await res.json();
      setGoals([goal, ...goals]);
      setNewGoal({ title: '', description: '', dueDate: '' });
      toast.success('Goal created successfully!');
    } catch (error) {
      console.error('Error creating goal:', error);
      toast.error('Failed to create goal');
    }
  };

  const handleComplete = async (id) => {
    try {
      const res = await fetch(`/api/goals/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'COMPLETED' }),
      });

      if (!res.ok) throw new Error('Failed to update goal');

      setGoals(goals.map(goal => 
        goal.id === id ? { ...goal, status: 'COMPLETED' } : goal
      ));
      toast.success('Goal marked as completed!');
    } catch (error) {
      console.error('Error updating goal:', error);
      toast.error('Failed to update goal');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/goals/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete goal');

      setGoals(goals.filter(goal => goal.id !== id));
      toast.success('Goal deleted successfully!');
    } catch (error) {
      console.error('Error deleting goal:', error);
      toast.error('Failed to delete goal');
    }
  };

  const filteredGoals = goals.filter(goal => {
    if (filter === 'COMPLETED') return goal.status === 'COMPLETED';
    if (filter === 'IN_PROGRESS') return goal.status === 'IN_PROGRESS';
    return true;
  });

  return (
    <>
      <Head>
        <title>Goals - SkillTracker</title>
        <meta name="description" content="Manage your goals with SkillTracker" />
      </Head>

      <div className="min-h-screen bg-slate-900">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <motion.h1 
              className="text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Goals Dashboard
            </motion.h1>

            <GoalStats goals={goals} />
            
            <motion.form 
              onSubmit={handleSubmit} 
              className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="grid gap-6 mb-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    className="w-full bg-slate-700 border border-slate-600 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                    className="w-full bg-slate-700 border border-slate-600 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-transparent"
                    rows="3"
                  />
                </div>
                
                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium text-slate-300 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    value={newGoal.dueDate}
                    onChange={(e) => setNewGoal({ ...newGoal, dueDate: e.target.value })}
                    className="w-full bg-slate-700 border border-slate-600 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-transparent"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-neon-green text-black font-semibold py-2 px-4 rounded-md hover:bg-neon-glow hover:text-white transition-all duration-300"
              >
                Create Goal
              </button>
            </motion.form>

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Your Goals</h2>
              <div className="flex space-x-4">
                <button
                  onClick={() => setFilter('ALL')}
                  className={`px-4 py-2 rounded-md transition-all duration-300 ${
                    filter === 'ALL'
                      ? 'bg-neon-green text-black'
                      : 'text-white hover:bg-slate-800'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('IN_PROGRESS')}
                  className={`px-4 py-2 rounded-md transition-all duration-300 ${
                    filter === 'IN_PROGRESS'
                      ? 'bg-blue-500 text-white'
                      : 'text-white hover:bg-slate-800'
                  }`}
                >
                  In Progress
                </button>
                <button
                  onClick={() => setFilter('COMPLETED')}
                  className={`px-4 py-2 rounded-md transition-all duration-300 ${
                    filter === 'COMPLETED'
                      ? 'bg-green-500 text-white'
                      : 'text-white hover:bg-slate-800'
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-green mx-auto"></div>
                <p className="mt-4 text-slate-400">Loading goals...</p>
              </div>
            ) : filteredGoals.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <p>No goals found. {filter !== 'ALL' ? 'Try changing the filter or ' : ''}Start by creating your first goal!</p>
              </div>
            ) : (
              <div className="grid gap-6">
                <AnimatePresence>
                  {filteredGoals.map((goal) => (
                    <motion.div
                      key={goal.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-neon-green transition-all duration-300"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">{goal.title}</h3>
                          {goal.description && (
                            <p className="text-slate-400 mb-4">{goal.description}</p>
                          )}
                          {goal.dueDate && (
                            <p className="text-sm text-slate-500">
                              Due: {new Date(goal.dueDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            goal.status === 'COMPLETED'
                              ? 'bg-green-900 text-green-300'
                              : 'bg-blue-900 text-blue-300'
                          }`}
                        >
                          {goal.status === 'COMPLETED' ? 'Completed' : 'In Progress'}
                        </span>
                      </div>
                      
                      <div className="mt-4 flex space-x-4">
                        {goal.status !== 'COMPLETED' && (
                          <button
                            onClick={() => handleComplete(goal.id)}
                            className="text-green-400 hover:text-green-300 transition-colors duration-300"
                          >
                            Complete
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(goal.id)}
                          className="text-red-400 hover:text-red-300 transition-colors duration-300"
                        >
                          Delete
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
