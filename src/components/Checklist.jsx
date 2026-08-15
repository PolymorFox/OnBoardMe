import "../index.css"
import { useState } from "react";
import { Venus, Mars } from "lucide-react"
import PersonalInfo from "./PersonalInfo";
import Expertise from "./Expertise";
import WorkExperience from "./WorkExperience";
import logo from "../assets/logo.png"

export default function CheckList() {
  const [completedItems, setCompletedItems] = useState({
    personalinfo: { name: "", email: "", gender: "", completed: false },
    expertise: { name: "", programmingLanguages: [], completed: false },
    workExperience: {formerJobTitle: "", NumberOfYears: "", lastCompanyPosition: "", completed: false}
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

  function finishWorkExperience({ formerJobTitle, NumberOfYears, lastCompanyPosition }) {
    setCompletedItems((prev) => ({
      ...prev,
      workExperience: {formerJobTitle: formerJobTitle, NumberOfYears: NumberOfYears, lastCompanyPosition: lastCompanyPosition, completed: true}
  }))

  }

  return (
    <>
      {!completedItems.personalinfo.completed && (
        <div>
          <h1 className="text-3xl text-center font-bold">Welcome to <img className="inline" src={logo} alt="Payfonte Logo"/></h1>
          <PersonalInfo onComplete={finishPersonalInfo} />
        </div>
      )}
      {completedItems.personalinfo.completed &&
        !completedItems.expertise.completed && (
        <div>
          <h1 className="text-3xl text-center font-bold">Welcome to <img className="inline" src={logo} alt="Payfonte Logo"/></h1>
          <Expertise onComplete={finishExpertise} />
        </div>
        )}
      {completedItems.personalinfo.completed &&
        completedItems.expertise.completed &&
        !completedItems.workExperience.completed && (
        <div>
          <h1 className="text-3xl text-center font-bold">Welcome to <img className="inline" src={logo} alt="Payfonte Logo"/></h1>
          <WorkExperience onComplete={finishWorkExperience} />
        </div>
      )}
      {completedItems.personalinfo.completed &&
        completedItems.expertise.completed && completedItems.workExperience.completed && (
        <div className="max-w-md mx-auto p-6">
          <div className="mb-4">
            <h1 className="text-3xl font-semibold mb-2 text-center">So here is a summary</h1>
          </div>
          <div>
            <h2 className="font-semibold text-2xl">Personal Info:</h2>
            <ul class="max-w-md space-y-1 text-body list-inside">
                <li class="flex items-center">
                     <svg class="w-4 h-4 text-fg-success me-1.5 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                    Name: {completedItems.personalinfo.name}
                </li>
                <li class="flex items-center">
                     <svg className="w-4 h-4 text-fg-success me-1.5 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                    Email: {completedItems.personalinfo.email}
                </li>
                <li class="flex items-center">
                {completedItems.personalinfo.gender === "Female" && (<Venus className="w-4 h-4 text-fg-success me-1.5 shrink-0 " />)}
                {completedItems.personalinfo.gender === "Male" && (<Mars className="w-4 h-4 text-fg-success me-1.5 shrink-0"/>)}
                    Gender: {completedItems.personalinfo.gender}
                </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-2xl">Work Expertise:</h2>
            <ul class="max-w-md space-y-1 text-body list-inside">
                <li class="flex items-center">
                     <svg class="w-4 h-4 text-fg-success me-1.5 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                    Expertise: {completedItems.expertise.name}
              </li>
            </ul>
            <h3 className="font-semibold">Known technologies</h3>
            <div className="grid grid-cols-4 grid-rows-2 gap-1 max-w-full">
              {completedItems.expertise.programmingLanguages.map((language) => (
                <span key={language} className="bg-blue-500 rounded-md p-3">
                  {language}
                </span>
              ))}
              {/* Please finish this */}
            </div>
          </div>
          </div>
        )}
    </>
  );
}
