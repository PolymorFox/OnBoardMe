import "../index.css"
import { useState } from "react";
import { ArrowRight } from 'lucide-react'

export default function PersonalInfo({ onComplete }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");

  function handleSubmit(e) {
    e.preventDefault();
    // Store the values and mark this step as done
    onComplete({ name, email, gender });
  }

  return (
    <>
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Personal Info</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <h2 className="text-4x1 font-semibold mb-1">What's your gender?</h2>
        <div>
          <select name="gender" onChange={(e) => setGender(e.target.value)}>
            {["Male", "Female"].map(gender => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 hover:pl-40 ease-in transition"
          >
            <span className="mr-1">Move to the next section</span>
          <ArrowRight id="rightarrow"/>
        </button>
      </form>
      </div>
    </>
  );
}
