import { useState } from "react";
import Sidebar from "./Sidebar";
import PhaseCard from "./PhaseCard";
import NextSteps from "./NextSteps";
import Buddy from "./Buddy";

export default function Checklist() {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [phases, setPhases] = useState([
    {
      phase: "PHASE 01",
      title: "Foundation & Trust",
      description: "Compliance, security, access and culture",
      status: "current",
      tasks: [
        {
            index: 0,
            title: "Complete AML & KYC training",
            category: "Compliance",
            status: "upcoming",
          },
        {
            index: 1,
            title: "Acknowledge Code of Conduct",
            category: "Compliance",
            status: "upcoming",
          },
        {
            index: 2,
            title: "Complete information security training",
            category: "Security",
            status: "upcoming",
          },
        {
            index: 3,
            title: "Set up company email and MFA",
            category: "IT & Systems",
            status: "upcoming",
          },
        {
            index: 4,
            title: "Set up VPN and password manager",
            category: "IT & Systems",
            status: "upcoming",
          },
      ]
    },
    {
      phase: "PHASE 02",
      title: "Role Immersion",
      description: "Deep-dive into your role, tools, and team workflows",
      status: "pending",
      tasks: [
        {
            index: 0,
            title: "Complete Payfonte product overview",
            category: "Product",
            status: "upcoming",
          },
        {
            index: 1,
            title: "Complete role-specific compliance training",
            category: "Compliance",
            status: "upcoming",
          },
        {
            index: 2,
            title: "Review payment and transaction flows",
            category: "Role immersion",
            status: "upcoming",
          },
        {
            index: 3,
            title: "Complete your first practical challenge",
            category: "Role immersion",
            status: "upcoming",
          },
        {
            index: 4,
            title: "Complete your first independent task",
            category: "Role immersion",
            status: "upcoming",
          },
      ]
    },
    {
      phase: "PHASE 03",
      title: "Continuous Development",
      description: "Feedback, learning and long-term growth",
      status: "pending",
      tasks: [
        {
            index: 0,
            title: "Complete Payfonte product overview",
            category: "Product",
            status: "upcoming",
          },
        {
            index: 1,
            title: "Complete role-specific compliance training",
            category: "Compliance",
            status: "upcoming",
          },
        {
            index: 2,
            title: "Review payment and transaction flows",
            category: "Role immersion",
            status: "upcoming",
          },
        {
            index: 3,
            title: "Complete your first practical challenge",
            category: "Role immersion",
            status: "upcoming",
          },
        {
            index: 4,
            title: "Complete your first independent task",
            category: "Role immersion",
            status: "upcoming",
          },
      ]
    }
  ])
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  function updateTaskStatus(phaseIndex, taskIndex, newStatus) {
    // This function is meant to update the main state version of the phase
    setPhases((prevPhases) => {
      const updatedPhases = [...prevPhases];
      if (updatedPhases[phaseIndex] && updatedPhases[phaseIndex].tasks[taskIndex]) {
        // We only run this when both are undefined
        updatedPhases[phaseIndex].tasks[taskIndex].status = newStatus;
      }
      return updatedPhases;
    })
  }

  function finishPhase(phaseIndex) {
    setPhases((prevPhases) => {
      const updatedPhases = [...prevPhases];
      updatedPhases[phaseIndex].status = "complete";
      updatedPhases[phaseIndex + 1].status = "current";
      return updatedPhases;
    })
  }

  // Always default currentPhase to 0, when it is undefined
  const currentPhase = phases.find((phase) => phase.status === "current") || phases[0];
  let currentPhaseIndex = phases.findIndex((phase) => phase.status === "current");
  if (currentPhaseIndex < 0) {
    currentPhaseIndex = 1; // Default to first phase if none are current
  }
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-gray-500">{currentDate}</p>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome to Payfonte
            </h1>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1">
            {/* Progress Tracker */}
            <div className="bg-gray-800 text-white p-6 rounded-lg mb-6">
              <p className="text-sm mb-2">Your onboarding journey</p>
              <h2 className="text-2xl font-bold mb-2">
                You’re making great progress. Keep building your foundation.
              </h2>
              <p className="text-gray-300 text-sm mb-4">
                Complete your role-specific learning and practical challenges to become fully productive.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm">Overall progress</p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                    <div
                      className="bg-white h-2 rounded-full"
                      style={{ width: `${Number(completedTasks / 15)*100}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-2xl font-bold">{`${Math.floor(Number(completedTasks / 15)*100)}%`}</p>
              </div>
              <p className="text-sm text-gray-400 mt-1">{completedTasks} of 15 tasks completed</p>
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
              {phases.map((phase) => (
                <PhaseCard key={phase.phase} title={phase.title} description={phase.description} status={phase.status}/>
              ))}
            </div>

            <NextSteps
              tasks={currentPhase.tasks}
              updateTaskStatus={(taskIndex, newStatus) => updateTaskStatus(currentPhaseIndex, taskIndex, newStatus)}
              finishPhase={() => finishPhase(currentPhaseIndex)}
              setCompletedTasks={setCompletedTasks}
              completedTasks={completedTasks}
            />
            <Buddy />
          </main>
        </div>
      </div>
    </div>
  );
}
