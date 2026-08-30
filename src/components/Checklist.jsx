import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import PhaseCard from "./PhaseCard";
import NextSteps from "./NextSteps";
import Buddy from "./Buddy";
import { persistProgress } from "../phases";
import WelcomeScreenModal from "./WelcomeScreen";

export default function Checklist({ user, phases, token, userId, onLogout }) {

  const [welcomeScreenState, setWelcomeScreenState] = useState(false);
  // We create a local copy of phases so we only have one way to update phases in state
  const [localPhases, setLocalPhases] = useState(phases);
  const [globalCompletedTasks, setGlobalCompletedTasks] = useState(localPhases.reduce((total, phase) =>
    total + phase.tasks.reduce((count, task) =>
      count + (task.status === "completed" ? 1 : 0),
  0),
  0) || 0);
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const taskNumber = localPhases.reduce((acc, value) => acc += value.tasks.length,0)

  // Keep localPhases in sync if the parent sends a new phases array
  // (e.g. after a re-login or a refresh)
  useEffect(() => {
    setLocalPhases(phases);
  }, [phases]);

  function updateTaskStatus(phaseIndex, taskIndex, newStatus) {
    setLocalPhases((prev) => {
      const updated = prev.map((phase, pi) => {
        if (pi !== phaseIndex) return phase;
        return {
          ...phase,
          tasks: phase.tasks.map((task, ti) =>
            ti === taskIndex ? { ...task, status: newStatus } : task
          ),
        };
      });
      persistProgress(updated, token, userId);
      return updated;
    });

    setGlobalCompletedTasks((prev) => {
      const oldStatus = phases[phaseIndex]?.tasks[taskIndex]?.status;
      if (oldStatus === "completed" && newStatus !== "completed") return prev - 1;
      if (oldStatus !== "completed" && newStatus === "completed") return prev + 1;
      return prev;
    });

  }

  function finishPhase(phaseIndex) {
    setLocalPhases(prev => {
      const updated = prev.map((phase, pi) => {
        if (pi === phaseIndex) return { ...phase, status: "complete" };
        if (pi === phaseIndex + 1) return { ...phase, status: "current" };
        return phase;
      });
      persistProgress(updated, token, userId);
      return updated;
    });

  }

  let currentPhaseIndex = localPhases.findIndex((p) => p.status === "current");
  const currentPhase = localPhases[currentPhaseIndex]
  if (currentPhaseIndex < 0) currentPhaseIndex = 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <WelcomeScreenModal modalState={welcomeScreenState} closeModal={() => setWelcomeScreenState(false)} />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-gray-500">{currentDate}</p>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome {user?.email}{" "}
              {user?.role === "admin" && (
                <span className="text-xs align-middle bg-red-300 border-red-600 border text-red-600 rounded-sm px-3 py-1.5">
                  Admin
                </span>
              )}
            </h1>
          </div>
          <button
            onClick={onLogout}
            className="self-end font-semibold bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md hover:shadow-md"
          >
            Sign out
          </button>
        </div>

        <div className="flex gap-6">
          <Sidebar role={user?.role} />
          <main className="flex-1">
            {/* Progress Tracker */}
            <div id="progress" className="bg-gray-800 text-white p-6 rounded-lg mb-6">
              <p className="text-sm mb-2">Your onboarding journey</p>
              <h2 className="text-2xl font-bold mb-2">
                You're making great progress. Keep building your foundation.
              </h2>
              <p className="text-gray-300 text-sm mb-4">
                Complete your role-specific learning and practical challenges to
                become fully productive.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm">Overall progress</p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                    <div
                      className="bg-white h-2 rounded-full"
                      style={{ width: `${Number((globalCompletedTasks / taskNumber) * 100)}%` }}
                    />
                  </div>
                </div>
                <p className="text-2xl font-bold">
                  {`${Math.floor((globalCompletedTasks / taskNumber) * 100)}%`}
                </p>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                {globalCompletedTasks} of {taskNumber} tasks completed
              </p>
            </div>

            {/* Your Journey Section */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                Your journey
              </h2>
              <p className="text-gray-500 text-sm">
                A structured path from first day to long-term development.
              </p>
            </div>

            {/* Phase Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {localPhases.map((phase) => (
                <PhaseCard
                  key={phase.phase}
                  title={phase.title}
                  description={phase.description}
                  status={phase.status}
                />
              ))}
            </div>

            <NextSteps
              tasks={currentPhase.tasks}
              phaseLength={phases.length}
              updateTaskStatus={(taskIndex, newStatus) =>
                updateTaskStatus(currentPhaseIndex, taskIndex, newStatus)
              }
              openWelcomeScreen={() => setWelcomeScreenState(true)}
              currentPhaseIndex={currentPhaseIndex}
              finishPhase={() => finishPhase(currentPhaseIndex)}
              setCompletedTasks={setGlobalCompletedTasks}
              globalCompletedTasks={globalCompletedTasks}
            />
            <Buddy />
          </main>
        </div>
      </div>
    </div>
  );
}
