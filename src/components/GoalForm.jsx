import { useState } from 'react';

export default function GoalForm({ goal, onSubmit, onCancel, isLoading }) {
  const [formData, setFormData] = useState({
    title: goal?.title || '',
    description: goal?.description || '',
    dueDate: goal?.dueDate ? new Date(goal.dueDate).toISOString().split('T')[0] : '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClasses = "mt-1 block w-full rounded-lg bg-slate-900 border-slate-700 text-white placeholder-slate-400 focus:border-neon-green focus:ring-neon-green transition-all duration-300";
  const labelClasses = "block text-sm font-medium text-slate-300 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className={labelClasses}>
          TITLE
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={inputClasses}
          placeholder="Enter goal title"
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="description" className={labelClasses}>
          DESCRIPTION
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className={inputClasses}
          placeholder="Enter goal description"
          rows={3}
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="dueDate" className={labelClasses}>
          DUE DATE
        </label>
        <input
          type="date"
          id="dueDate"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          className={inputClasses}
          disabled={isLoading}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 bg-slate-900 text-slate-300 border border-slate-700 rounded-lg hover:bg-slate-800 transition-all duration-300 disabled:opacity-50"
          disabled={isLoading}
        >
          CANCEL
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-slate-900 border border-neon-green text-neon-green rounded-lg hover:bg-slate-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {goal ? 'UPDATING...' : 'CREATING...'}
            </span>
          ) : (
            goal ? 'UPDATE GOAL' : 'CREATE GOAL'
          )}
        </button>
      </div>
    </form>
  );
}
