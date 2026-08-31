import { useEffect, useState } from "react";
import Checklist from "./components/Checklist";
import { Login } from "./components/Login";
import { mergePhases, PROGRESS_KEY } from "./phases";

export default function App() {
  const [user, setUser] = useState(null);
  const [phases, setPhases] = useState(null);
  const [loading, setLoading] = useState(false);

  // On mount: if there's a stored token, fetch the user profile and initialize phases
  useEffect(() => {
    if (!localStorage.getItem('token')) return;
    const abort = new AbortController();
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      signal: abort.signal,
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
      .then((data) => {
        if (abort.signal.aborted) return;
        const profile = data.user;
        setUser(profile);
        const progress = localStorage.getItem(PROGRESS_KEY) ? JSON.parse(localStorage.getItem(PROGRESS_KEY)) : profile?.progress;
        if (profile?.phaseTemplate?.length) {
          setPhases(mergePhases(profile.phaseTemplate, progress));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => abort.abort();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogin = (newUser, newToken) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    // Re-fetch fresh template on login — the useEffect above won't re-run
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
      .then((data) => {
        const profile = data.user;
        if (profile?.phaseTemplate?.length) {
          setPhases(mergePhases(profile.phaseTemplate, JSON.parse(profile?.progress) || null));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('onboardme_phaseProgress');
    // Keep the phase template cached — it's cheap and role-based
    setUser(null);
    setPhases(null);
  };

  if (!user && !localStorage.getItem('token')) {
    return <Login onLogin={handleLogin} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading…</p>
      </div>
    );
  }

  if (!phases) {
    // No template available — show a minimal fallback
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <p className="text-gray-500">No onboarding phases available.</p>
      </div>
    );
  }

  return (
    <>
      <Checklist
        user={user}
        phases={phases}
        token={localStorage.getItem('token')}
        userId={user?.id}
        onLogout={handleLogout}
      />
    </>
  );
}
