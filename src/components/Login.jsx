import { useState } from "react";
import logo from "../../public/favicon.ico"

async function fetchUser(token) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      return data.user;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Network error", error);
    return null;
  }
}

async function fetchToken(email, password) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': email,
        'password': password
      })
    });

    if(response.ok){
      const data = await response.json();
      return data.token;
    } else {
      console.error("Login failed");
      return null;
    }
  } catch (error) {
    console.error("Network error", error);
    return null;
  }
}

export function Login({ setUser }) {
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      console.error("Please a enter a username or password");
      return;
    }

    setError('');

    try {
      const token = await fetchToken(email, password)

      if (token) {
        localStorage.setItem('token', token);

        const user = await fetchUser(token);
        if (!user) setError("Invalid or expired login token");
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        console.error("Login failed");
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error", error);
      setError("Login error", error)
    }
  }

  return (
    <main className="bg-gray-50 px-4 md:px-8">
       <div className="min-h-screen flex flex-col items-center justify-center">
         <div className="max-w-md w-full">
             <a href="#"><img src={logo} alt="logo"
                   className="w-14 min-h-14 mb-8 mx-auto block" />
             </a>
             <div
                className="p-6 rounded-lg bg-white border border-slate-300 shadow-xs md:p-8">
                  <h1 className="text-slate-900 text-center text-3xl font-bold">Sign in</h1>
                  <form className="space-y-6 mt-10" onSubmit={handleLogin}>
                   <div>
                      <label for="email"
                         className="mb-2 text-slate-900 font-medium text-sm inline-block">Email</label>
                      <input type="email" id="email" name="email" placeholder="john@payfonte.com" required
                         className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600" />
                   </div>
                   <div>
                      <label for="password"
                         className="mb-2 text-slate-900 font-medium text-sm inline-block">Password</label>
                      <input type="password" id="password" name="password" placeholder="••••••••" required
                         className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600" />
              </div>

              {error && (
                <div className="w-full text-center bg-red-300 p-1.5 rounded-sm text-red-600 border border-red-600">{ error }</div>
              )}

                   <button type="submit"
                      class="w-full py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                    Sign in
              </button>
                </form>
             </div>
          </div>
       </div>
    </main>
  )
}
