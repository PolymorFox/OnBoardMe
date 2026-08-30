// This component is meant for the onboarding buddy ui component

export default function Buddy() {
  const onboardingBuddy = "Ikenna Okafor";

  return (
    <>
      <section id="onboarding-buddy" className="bg-white shadow-sm p-6 rounded-lg border border-gray-100 w-full mt-5">
        <h3 className="text-xs tracking-wider uppercase text-slate-400">Your onboarding buddy</h3>
        <div className="mt-4 flex items-center gap-3 flex-row">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold">
            {onboardingBuddy.split(" ").map(part => part[0]).reduce((acc, n) => acc += n) }
          </div>
          <div>
            <p className="text-sm font-semibold">{onboardingBuddy}</p>
            <p className="text-xs text-slate-500">
              Senior Product Manager
            </p>
          </div>
          <a href="mailto:sylvestreanderson5@gmail.com" className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm cursor-pointer font-medium hover:bg-slate-50">
            Email {onboardingBuddy.split(" ")[0]}
          </a>
        </div>
      </section>
    </>
  )
}
