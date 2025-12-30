
import React from 'react';
import { Roadmap } from '../types';
import { STYLES, Icons } from '../constants';

interface RoadmapViewProps {
  roadmap: Roadmap;
  onBack: () => void;
  onDaySelect: (day: number) => void;
}

const RoadmapView: React.FC<RoadmapViewProps> = ({ roadmap, onBack, onDaySelect }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="border-2 border-black p-2 bg-white neubrutalist-shadow-sm font-black">
          ← BACK
        </button>
        <h2 className="text-3xl font-black uppercase tracking-tighter">THE MASTER PLAN</h2>
      </div>

      <div className="space-y-4 pb-10">
        {roadmap.days.map((day) => {
          const isCompleted = day.tasks.every(t => t.completed);
          const isCurrent = day.day === roadmap.currentDay;
          const isLocked = day.day > roadmap.currentDay && !isCompleted;

          return (
            <div 
              key={day.day}
              onClick={() => onDaySelect(day.day)}
              className={`
                ${STYLES.card} cursor-pointer relative transition-all
                ${isCurrent ? 'bg-[#FFD700] ring-4 ring-black ring-offset-2' : 'bg-white'}
                ${isLocked ? 'opacity-60 grayscale' : 'opacity-100'}
              `}
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-black text-xs uppercase tracking-widest opacity-60">DAY {day.day}</span>
                  <h4 className="text-xl font-black uppercase tracking-tight mt-1">{day.title}</h4>
                </div>
                {isCompleted ? (
                  <div className="bg-black text-white p-1 border-2 border-black">
                    <Icons.Check />
                  </div>
                ) : isCurrent ? (
                  <div className="animate-pulse bg-[#FF4D4D] text-white px-2 py-1 text-[10px] font-black uppercase">ACTIVE</div>
                ) : null}
              </div>
              
              <div className="mt-4 flex space-x-2">
                {day.tasks.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-2 flex-1 border border-black ${day.tasks[idx].completed ? 'bg-black' : 'bg-transparent'}`} 
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapView;
