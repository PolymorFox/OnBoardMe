import { Trash2 } from "lucide-react"
import { useState } from "react"

export default function DeleteUser({ formState, users, closeForm, onFinish }) {
  const [error, setError] = useState('');

  async function deleteUser(id) {
    try {
      const loginToken = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
        headers: {
          "Authorization": `Bearer ${loginToken}`
        },
        method: "DELETE"
      });

      if (response.ok) {
        onFinish();
        closeForm();
      }
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const id = e.target.id.value;
    // Users should not be able to delete the user they are logged in as
    if (JSON.parse(localStorage.getItem('user')).id === id) {
      alert("You can't delete the user you are logged in as")
      e.target.reset();
    } else {
      deleteUser(id);
    }
  }

  if(!formState) return null

  return (
    <>
      <div className="mt-4 p-4 border border-red-200 rounded-md bg-red-50">
        <h4 className="text-lg font-semibold text-red-700 mb-3 flex items-center gap-2">
          <Trash2 className="w-5 h-5" />
          Delete User
        </h4>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-3 p-2 bg-red-100 border border-red-300 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select User to Delete
            </label>
            <select
              name="id"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select a user...</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  ID: {user.id} - {user.email} ({user.role})
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500">
              ⚠️ This action cannot be undone
            </p>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Trash2 /> Delete This User
          </button>
        </form>
      </div>
    </>
  )
}
