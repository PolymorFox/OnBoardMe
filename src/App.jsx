import { useState } from "react";
import Checklist from "./components/Checklist"
import { Login } from "./components/Login";

export default function App() {
  const storedUser = localStorage.getItem('user');
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(initialUser);

  // Set up tasks before passing them to the checklist
  localStorage.setItem('tasks', user.tasks)
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : JSON.parse(user.tasks);
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
