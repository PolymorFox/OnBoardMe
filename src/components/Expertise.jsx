import "../index.css"
import { useState } from "react";
import { ArrowRight } from 'lucide-react';

export default function Expertise({ onComplete }) {
  const [languages, setLanguages] = useState([]);
  const [selected, setSelected] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const expertiseValue = e.target.expertise.value;
    onComplete({
        expertise: expertiseValue,
        languages: languages
    });
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Expertise</h2>
      <p className="mb-4">Hi! What expertise do you have?</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <label>
          <input type="text" name="expertise" placeholder="Enter your expertise" onChange={(e) => setSelected(e.target.value !== "")}/>
        </label>
        <h2 className="mt-2.5">What programming languages do you know?</h2>
        {["Python", "Java", "C", "C++", "Javascript", "Typescript", "React", "Vue", "Svelte"].map(language => (
          <label className="block" key={language}>
            <input
              type="checkbox"
              value={language}
              onChange={(e) => setLanguages(prev =>
                e.target.checked
                  ? [...prev, e.target.value]
                  : prev.filter(l => l !== e.target.value)
              )}
            /> {language}
          </label>
        ))}
        <button
          disabled={!selected}
          type="submit"
          className={`w-full py-2 rounded-md text-white transition ${
            selected
              ? "bg-blue-600 hover:bg-blue-700 hover:pl-35"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          <span>Move onto the next section</span>
          <ArrowRight />
        </button>
      </form>
    </div>
  );
}
