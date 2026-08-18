import { CheckCircle, Clock, Hash } from "lucide-react";

export default function NextSteps({ tasks, updateTaskStatus, finishPhase, setCompletedTasks, completedTasks }) {

  const statusConfig = {
    completed: {
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      badge: (
        <span className="text-green-600 text-sm font-medium">Completed</span>
      ),
    },
    inProgress: {
      icon: <Clock className="w-5 h-5 text-orange-500" />,
      badge: (
        <span className="text-orange-600 text-sm font-medium">In progress</span>
      ),
    },
    upcoming: {
      icon: <Hash className="w-5 h-5 text-gray-400" />,
      badge: (
        <span className="text-gray-500 text-sm font-medium">Upcoming</span>
      ),
    },
  };

  // Keep track of completed tasks in this component
  let completedCount = tasks.filter(task => task.status === "completed").length;
  // completedCount cannot be greater than 5 in this component, as completedCount is only the number of completed tasks per phase, not as a whole
  completedCount > 5 ? completedCount = 5 : completedCount;
  // Calculate the percentage of completion based on completedCount
  const progressPercentage = (completedCount / tasks.length) * 100;


  const updateCompletedTasks = (newStatus) => {
    if (newStatus === "completed") {
      setCompletedTasks(completedTasks + 1);
    } else if (newStatus === "inProgress" || newStatus === "upcoming") {
      if (completedTasks === 0) {
        setCompletedTasks(0);
      } else {
        setCompletedTasks(completedTasks - 1);
      }
    }
  }

  const handleStatusChange = (taskIndex, newStatus) => {
    updateCompletedTasks(newStatus);
    updateTaskStatus(taskIndex, newStatus);
  };


  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 w-full mt-5">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Next steps</h2>
          <p className="text-sm text-gray-500">
            Focus on these tasks this week.
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-500">Progress</span>
          <span className="text-sm font-medium text-gray-700">
            {completedCount} of {tasks.length} completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => {
          const currentStatus = task.status;
          const { icon } = statusConfig[currentStatus] || {};

          return (
            <div
              key={task.index}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {icon}
                  <div>
                    <p className="font-medium text-gray-900">{task.title}</p>
                    <p className="text-sm text-gray-500">{task.category}</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <select
                  value={currentStatus}
                  onChange={(e) => handleStatusChange(task.index, e.target.value)}
                  className="bg-transparent border-none text-sm font-medium cursor-pointer appearance-none pr-6"
                >
                  <option value="completed">Completed</option>
                  <option value="inProgress">In progress</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>
            </div>
          );
        })}
        <button disabled={completedTasks < 5} onClick={finishPhase} className={`mt-8 px-2.5 py-2.5 rounded-md font-semibold ${completedCount < 5 ? "bg-gray-300 text-gray-400" : "text-white bg-indigo-600 hover:bg-indigo-800"} `}>Finish This Phase</button>
      </div>
    </div>
  );
}
