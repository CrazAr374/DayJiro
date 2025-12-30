
import React from 'react';
import { STYLES, Icons, COLORS } from '../constants';

interface LandingViewProps {
  onStart: () => void;
}

const LandingView: React.FC<LandingViewProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col -mx-6 bg-[#FDFDF5]">
      {/* SECTION 1 — HERO */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-b-[3px] border-black min-h-[70vh]">
        <div className="p-8 md:p-12 flex flex-col justify-center border-b-[3px] md:border-b-0 md:border-r-[3px] border-black bg-white">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl font-black leading-[0.85] tracking-tighter uppercase">
              Turn goals into <span className="text-[#FF4D4D]">daily execution.</span>
            </h2>
            <p className="text-xl md:text-2xl font-bold leading-tight max-w-md">
              Build skills with AI-generated roadmaps, daily tasks, and streaks that keep you consistent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button onClick={onStart} className={STYLES.buttonPrimary + " px-10"}>
                Start Building
              </button>
              <button onClick={() => window.scrollTo({top: 800, behavior: 'smooth'})} className={STYLES.buttonOutline}>
                See How It Works
              </button>
            </div>
          </div>
        </div>
        <div className="p-8 md:p-12 flex items-center justify-center bg-[#FFD700]">
          {/* Mockup Visual */}
          <div className="w-full max-w-sm aspect-[4/5] border-[3px] border-black bg-white neubrutalist-shadow p-4 flex flex-col">
            <div className="h-6 w-full border-b-2 border-black flex space-x-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-black"></div>
              <div className="w-2 h-2 rounded-full bg-black"></div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="h-4 w-2/3 bg-black"></div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-16 border-2 border-black bg-[#FF9F1C]"></div>
                <div className="h-16 border-2 border-black"></div>
              </div>
              <div className="space-y-2">
                <div className="h-8 border-2 border-black flex items-center px-2">
                  <div className="w-3 h-3 border border-black mr-2"></div>
                  <div className="h-2 w-full bg-gray-200"></div>
                </div>
                <div className="h-8 border-2 border-black flex items-center px-2">
                  <div className="w-3 h-3 bg-black mr-2"></div>
                  <div className="h-2 w-full bg-gray-200"></div>
                </div>
                <div className="h-8 border-2 border-black"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — THE PROBLEM */}
      <section className="p-8 md:p-16 border-b-[3px] border-black bg-white">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1 space-y-6">
            <h3 className="text-3xl font-black uppercase italic tracking-tighter">The Reality Check</h3>
            <p className="text-2xl font-bold leading-snug">
              Learning plans fail not because of lack of resources, but because there’s no structure, no feedback, and no consistency.
            </p>
          </div>
          <div className="flex-1 space-y-4 font-black uppercase text-sm tracking-widest border-l-[3px] border-black pl-8">
            <div className="flex items-start">
              <span className="mr-4">01</span>
              <span>Random tutorials lead nowhere</span>
            </div>
            <div className="flex items-start">
              <span className="mr-4">02</span>
              <span>No clear daily plan = decision fatigue</span>
            </div>
            <div className="flex items-start">
              <span className="mr-4">03</span>
              <span>Motivation drops after Day 3</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — THE SOLUTION */}
      <section className="p-8 md:p-16 border-b-[3px] border-black bg-[#FDFDF5]">
        <h3 className="text-4xl font-black uppercase tracking-tighter mb-12 text-center">
          A roadmap you can actually follow.
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={STYLES.card}>
            <div className="mb-4 text-[#FF4D4D]"><Icons.Map /></div>
            <h4 className="text-xl font-black uppercase mb-2">AI Roadmaps</h4>
            <p className="font-bold text-sm leading-tight">Tailored day-by-day plans based on your goal and time. No generic fluff.</p>
          </div>
          <div className={STYLES.card}>
            <div className="mb-4 text-[#FF9F1C]"><Icons.Tasks /></div>
            <h4 className="text-xl font-black uppercase mb-2">Daily Tasks</h4>
            <p className="font-bold text-sm leading-tight">Clear actions every day. No guessing what to do next. Just execute.</p>
          </div>
          <div className={STYLES.card}>
            <div className="mb-4 text-black"><Icons.Streak /></div>
            <h4 className="text-xl font-black uppercase mb-2">Streaks</h4>
            <p className="font-bold text-sm leading-tight">Miss a day, streak resets. Build real consistency that lasts beyond motivation.</p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — HOW IT WORKS */}
      <section className="border-b-[3px] border-black bg-white">
        <div className="grid grid-cols-1 md:grid-cols-4">
          {[
            { n: "01", t: "Set Your Goal", d: "Choose what you want to learn" },
            { n: "02", t: "Get the Map", d: "Get a structured roadmap" },
            { n: "03", t: "Execute Daily", d: "Complete daily tasks" },
            { n: "04", t: "Never Break", d: "Maintain your streak" }
          ].map((s, idx) => (
            <div key={idx} className={`p-8 border-b-[3px] md:border-b-0 ${idx < 3 ? 'md:border-r-[3px]' : ''} border-black`}>
              <span className="block text-4xl font-black mb-4">{s.n}</span>
              <h5 className="text-lg font-black uppercase mb-2 leading-none">{s.t}</h5>
              <p className="text-sm font-bold opacity-60">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — PHILOSOPHY */}
      <section className="p-16 md:p-32 bg-[#FF4D4D] text-white border-b-[3px] border-black">
        <div className="max-w-2xl mx-auto text-center border-[3px] border-white p-8">
          <p className="text-3xl md:text-4xl font-black leading-tight uppercase italic">
            This isn’t about motivation. It’s about systems, consistency, and showing up every day.
          </p>
        </div>
      </section>

      {/* SECTION 6 — FINAL CTA */}
      <section className="p-16 md:p-24 bg-[#FFD700] text-center border-b-[3px] border-black">
        <div className="space-y-8">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
            Start building today.
          </h2>
          <button onClick={onStart} className={STYLES.buttonPrimary + " px-12 py-6 text-2xl"}>
            Create your roadmap
          </button>
          <p className="font-black text-sm uppercase tracking-widest mt-4">No fluff. Just execution.</p>
        </div>
      </section>

      {/* SECTION 7 — FOOTER */}
      <footer className="p-12 md:p-16 bg-white flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-black tracking-tighter">DAYJIRO</h1>
          <p className="text-sm font-bold max-w-xs leading-tight">The 0 to 1 engine for mastering anything through brutal consistency.</p>
        </div>
        <div className="flex flex-col font-black text-sm uppercase tracking-widest gap-2">
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="mailto:support@dayjiro.com" className="hover:underline">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingView;
