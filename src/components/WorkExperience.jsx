import "../index.css"
import { useState } from "react";

export default function WorkExperience({ onComplete }) {
  const [jobtitle, setJobTitlte] = useState("");
  const [lastcompany, setLastCompnay] = useState("");
  const [numberofyears, setNumberofYears] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onComplete({jobtitle, lastcompany, numberofyears})
  }

  return (
    <>
      <div className="max-w-md mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
        <p className="mb-4">What about previous work experience?</p>
        <form onSubmit={handleSubmit} className="space-y-2">
          <p className="text-x1">What was your last job title?</p>
          <label className="block">
            <input required onChange={(e) => setJobTitlte(e.target.value)} className="rounded-md w-7/8" type="text" name="jobtitle" id="jobtitle" placeholder="Full Stack Engineer, Backend Engineer, etc" />
          </label>
          <p className="text-x1">What about the last company you worked for?</p>
          <label className="block">
            <input required onChange={(e) => setLastCompnay(e.target.value)} className="rounded-md w-6/7" type="text" name="lastcompany" id="lastcompany" placeholder="Google, Microsoft, Amazon, Facebook"/>
          </label>
          <p className="text-x1">How many years of experience do you have?</p>
          {["1", "2", "3", "4", "5+"].map(year => (
          <label className="block" key={year}>
              <input required onChange={(e) => setNumberofYears(e.target.value)} className="mr-2" type="radio" name="NumberOfYears" value={year}></input>
              <span className="font-bold">{year}</span>
          </label>
          ))}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">Finish Onboarding</button>
        </form>
      </div>
    </>
  )
}
