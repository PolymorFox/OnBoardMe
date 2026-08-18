import { Check } from "lucide-react";

export default function PhaseCard({
  phase,
  title,
  description,
  status = "pending", // "pending" | "complete" | "current"
}) {
  const statusConfig = {
    pending: {
      badge: null,
      icon: null,
      phaseColor: "text-gray-400",
    },
    complete: {
      badge: null,
      icon: <Check className="text-green-600 w-5 h-5" />,
      phaseColor: "text-green-600",
    },
    current: {
      badge: (
        <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
          CURRENT
        </span>
      ),
      icon: null,
      phaseColor: "text-gray-800",
    },
  };

  const { badge, icon, phaseColor } = statusConfig[status];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-2">
        <p className={`text-sm font-medium ${phaseColor}`}>{phase}</p>
        {badge || icon}
      </div>
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
