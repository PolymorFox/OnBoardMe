import { useState } from "react";
import Checklist from "./components/Checklist"
import { Login } from "./components/Login";

export default function App() {
  const storedUser = localStorage.getItem('user');
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(initialUser);

  // Set up tasks before passing them to the checklist
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      return JSON.parse(saved);
    }
    if (user && user.tasks) {
      return user.tasks;
    }
    return []; // Default empty array if no user
  });
  if (!user && !storedToken) return (
  <>
      <Login setUser={setUser}/>
  </>)
  return (
    <>
      <Checklist tasks={tasks} setTasks={setTasks} user={user} setUser={setUser}/>
    </>
  )
}
