import { useState } from "react";

export default function UserCreation({ formState, onFinish, closeForm }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    roleId: 2
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!formState) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const loginToken = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginToken}`
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 409) {
          throw new Error(data.error || 'Email already exists');
        }
        throw new Error(data.error || 'Failed to create user');
      }

      // Success!
      onFinish(); // Refresh user list
      closeForm(); // Close the form
      setFormData({ email: '', password: '', roleId: 2 }); // Reset form
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'roleId' ? parseInt(value) : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
      {error && (
        <div className="mb-3 p-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
          {error}
        </div>
      )}

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="user@example.com"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Min 6 characters"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
        <select
          name="roleId"
          value={formData.roleId}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={2}>User</option>
          <option value={1}>Admin</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creating...' : 'Create User'}
        </button>
        <button
          type="button"
          onClick={closeForm}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
