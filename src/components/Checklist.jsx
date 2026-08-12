import "../index.css"
import { useState } from "react";
import logo from "../assets/logo.png"

function PersonalInfo({ onComplete }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // Store the values and mark this step as done
    onComplete({ name, email, gender });
  }

  return (
    <>
    <h1 className="text-3xl text-center font-bold">Welcome to <img className="inline" src={logo} alt="Payfonte Logo"/> </h1>
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
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Move onto the next step =&gt;
        </button>
      </form>
      </div>
    </>
  );
}

function Expertise({ onComplete }) {
  const [expertise, setExpertise] = useState("");
  const [languages, setLanguages] = useState([]);
  const [selected, setSelected] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setExpertise(e.target.expertise.value);
    onComplete({ expertise, languages });
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
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default function CheckList() {
  const [completedItems, setCompletedItems] = useState({
    personalinfo: { name: "", email: "", gender: "", completed: false },
    expertise: { name: "", programmingLanguages: [], completed: false },
  });

  function finishPersonalInfo(data) {
    setCompletedItems((prev) => ({
      ...prev,
      personalinfo: { ...data, completed: true },
    }));
  }

  function finishExpertise({expertise, languages}) {
    setCompletedItems((prev) => ({
      ...prev,
      expertise: { name: expertise, programmingLanguages: languages, completed: true },
    }));
  }

  return (
    <>
      {!completedItems.personalinfo.completed && (
        <PersonalInfo onComplete={finishPersonalInfo} />
      )}
      {completedItems.personalinfo.completed &&
        !completedItems.expertise.completed && (
          <Expertise onComplete={finishExpertise} />
        )}
      {completedItems.personalinfo.completed &&
        completedItems.expertise.completed && (
          <div className="max-w-md mx-auto p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Done!</h2>
            <p className="text-gray-600">
              Welcome aboard, {completedItems.personalinfo.name}!
            </p>
          </div>
        )}
    </>
  );
}
