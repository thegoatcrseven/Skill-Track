export default function GoalItem({ goal, onEdit, onDelete, onStatusToggle, isLoading }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-neon-green transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-4">
            <h3 className="text-xl font-medium">{goal.title}</h3>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                goal.status === 'COMPLETED'
                  ? 'bg-green-900 text-green-300 border border-green-500'
                  : 'bg-yellow-900 text-yellow-300 border border-yellow-500'
              }`}
            >
              {goal.status === 'COMPLETED' ? 'COMPLETED' : 'IN PROGRESS'}
            </span>
          </div>
          <p className="mt-2 text-slate-400">{goal.description}</p>
          {goal.dueDate && (
            <p className="mt-2 text-sm text-slate-500">
              Due: {new Date(goal.dueDate).toLocaleDateString()}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onStatusToggle(goal)}
            className={`px-4 py-2 rounded text-sm font-medium transition-all duration-300 disabled:opacity-50 ${
              goal.status === 'COMPLETED'
                ? 'bg-yellow-900/30 text-yellow-300 hover:bg-yellow-900/50'
                : 'bg-green-900/30 text-green-300 hover:bg-green-900/50'
            }`}
            disabled={isLoading}
          >
            {goal.status === 'COMPLETED' ? 'Mark In Progress' : 'Mark Complete'}
          </button>
          <button
            onClick={() => onEdit(goal)}
            className="px-4 py-2 rounded text-sm font-medium bg-blue-900/30 text-blue-300 hover:bg-blue-900/50 transition-all duration-300 disabled:opacity-50"
            disabled={isLoading}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(goal)}
            className="px-4 py-2 rounded text-sm font-medium bg-red-900/30 text-red-300 hover:bg-red-900/50 transition-all duration-300 disabled:opacity-50"
            disabled={isLoading}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
