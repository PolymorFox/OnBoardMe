import { useState } from "react";
import Checklist from "./components/Checklist"
import { Login } from "./components/Login";

export default function App() {
  const storedUser = localStorage.getItem('user');
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  const [user, setUser] = useState(initialUser)

  if (!user) return (
  <>
    <Login setUser={setUser}/>
  </>)
  return (
    <>
      <Checklist user={user}/>
    </>
  )
}
