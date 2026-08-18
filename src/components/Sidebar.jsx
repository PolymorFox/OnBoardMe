import { Home, ClipboardList, BookOpen, Users, FileText } from "lucide-react";
export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-50 p-4 rounded-lg h-fit">
      <nav>
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Workspace</p>
        <ul className="space-y-2">
          {[
            { name: "Overview", icon: Home },
            { name: "My onboarding", icon: ClipboardList },
            { name: "Training", icon: BookOpen },
            { name: "Docs", icon: FileText },
            { name: "Team & buddy", icon: Users },
          ].map((item) => (
            <li key={item.name}>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
