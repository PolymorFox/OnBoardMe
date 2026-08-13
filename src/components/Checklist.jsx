import "../index.css"
import { useState } from "react";
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
