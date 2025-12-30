
import React from 'react';
import { Roadmap, Streak } from '../types';
import { STYLES, Icons, COLORS } from '../constants';

interface DashboardViewProps {
  roadmap: Roadmap;
  streak: Streak;
  onTaskToggle: (taskId: string) => void;
  onViewFullRoadmap: () => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ 
  roadmap, 
  streak, 
  onTaskToggle,
  onViewFullRoadmap
}) => {
  const currentDayData = roadmap.days.find(d => d.day === roadmap.currentDay);
  const completedTasks = currentDayData?.tasks.filter(t => t.completed).length || 0;
  const totalTasks = currentDayData?.tasks.length || 0;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const overallProgress = (roadmap.days.filter(d => d.tasks.every(t => t.completed)).length / roadmap.duration) * 100;

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="grid grid-cols-2 gap-4">
        {/* Streak Component */}
        <div className={`${STYLES.card} bg-[#FF9F1C] flex flex-col items-center justify-center py-4 overflow-hidden relative`}>
          <div className="mb-1">
            <Icons.Streak />
          </div>
          <div className="flex flex-col items-center text-center">
            <span 
              key={streak.currentCount} 
              className="text-5xl font-black tracking-tighter animate-streak-pop leading-none"
            >
              {streak.currentCount}
            </span>
            <div className="mt-1 flex flex-col items-center">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-80">STREAK</span>
              <div className="h-[2px] w-8 bg-black my-1" />
              <span className="text-[9px] font-black uppercase">BEST: {streak.bestCount}</span>
            </div>
          </div>
        </div>

        {/* Progress Component */}
        <div className={`${STYLES.card} bg-[#FFD700] flex flex-col items-center justify-center py-4`}>
          <span className="text-5xl font-black tracking-tighter leading-none">{Math.round(overallProgress)}%</span>
          <div className="mt-1 flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-80">TOTAL PROGRESS</span>
            <div className="h-[2px] w-8 bg-black my-1" />
            <span className="text-[9px] font-black uppercase">GOAL: 100%</span>
          </div>
        </div>
      </div>

      {/* Today's Mission */}
      <div className={STYLES.card}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className={STYLES.badge + " bg-black text-white"}>MISSION DAY {roadmap.currentDay}</span>
            <h3 className="text-2xl font-black uppercase mt-2 tracking-tighter leading-none">
              {currentDayData?.title || "Mission Accomplished"}
            </h3>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 border-2 border-black h-8 relative mb-6 overflow-hidden">
          <div 
            className="bg-[#FF4D4D] h-full transition-all duration-500 border-r-2 border-black" 
            style={{ width: `${progress}%` }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-xs font-black uppercase mix-blend-difference text-white">
            {completedTasks} / {totalTasks} TASKS
          </span>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {currentDayData?.tasks.map(task => (
            <div 
              key={task.id} 
              onClick={() => onTaskToggle(task.id)}
              className={`flex items-center p-3 border-2 border-black cursor-pointer transition-colors ${task.completed ? 'bg-green-100' : 'bg-white'}`}
            >
              <div className={`w-6 h-6 border-2 border-black mr-3 flex items-center justify-center ${task.completed ? 'bg-black text-white' : 'bg-white'}`}>
                {task.completed && <Icons.Check />}
              </div>
              <span className={`font-bold text-sm ${task.completed ? 'line-through opacity-50' : ''}`}>
                {task.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex space-x-4">
        <button 
          onClick={onViewFullRoadmap}
          className={STYLES.buttonSecondary + " flex-1 flex items-center justify-center space-x-2"}
        >
          <span>VIEW FULL ROADMAP</span>
          <Icons.ArrowRight />
        </button>
      </div>

      {/* Info Card */}
      <div className="bg-black text-white border-[3px] border-black p-4 italic font-bold text-xs uppercase tracking-tight">
        "I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times."
      </div>
    </div>
  );
};

export default DashboardView;
