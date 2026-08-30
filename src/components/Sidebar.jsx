import { Home, ClipboardList, Users } from "lucide-react";
import AdminModal from "./AdminModal";
import { useState } from "react";

export default function Sidebar({ role }) {
  const [isModalOpen, setModalOpen] = useState(false);

  // Open and close the admin modal from state
  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  let SidebarItems = [
    { name: "Overview", icon: Home },
    { name: "Team & buddy", icon: Users },
  ]
  return (
    <aside className="w-64 bg-gray-50 p-4 rounded-lg h-fit">
      <AdminModal isModalOpen={isModalOpen} closeModal={closeModal}/>
      <nav>
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Workspace</p>
        <ul className="space-y-2">
          {SidebarItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.name === "Team & buddy" ? "#onboarding-buddy" : "#progress"}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </a>
            </li>
          ))}
          {role === "admin" && (
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100"
                onClick={openModal}
              >
                <ClipboardList className="w-4 h-4" />
                Admin
              </a>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
}
