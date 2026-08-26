import { useState } from "react";

export default function UpdateUser({ formState, users, closeForm, onFinish }) {
  const [error, setError] = useState('');

  async function updateUserBackend(id, email, role_id) {
    try {
      const loginToken = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginToken}`
        },
        body: JSON.stringify({
          'email': email,
          'role_id': role_id,
        })
      });

      if (response.ok) {
        closeForm();
        onFinish();
      }
    } catch (error) {
      console.error(error)
      setError(error)
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const id = e.target.id.value;
    const role_id = e.target.role_id.value;

    updateUserBackend(id, email, role_id)
  }

  if (!formState) return null
  return (
    <>
      <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
        <h4 className="text-lg font-semibold text-gray-700 mb-3">Update User Record</h4>
        <form onSubmit={handleFormSubmit}>
          {error && (
            <div className="mb-3 p-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
              {error}
            </div>
          )}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
            <select name="id" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              {users.map((user) => (
                <option key={user.id} value={user.id}>{ user.id }</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">New Email</label>
            <input
              type="email"
              name="email"
              placeholder="New email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">New Role</label>
            <select name="role_id" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value={2}>User</option>
              <option value={1}>Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Update User
          </button>
        </form>
      </div>
    </>
  )
}
