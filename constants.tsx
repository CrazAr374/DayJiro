
import React from 'react';

export const COLORS = {
  primaryRed: '#FF4D4D',
  primaryYellow: '#FFD700',
  primaryOrange: '#FF9F1C',
  primaryBg: '#FDFDF5',
  black: '#000000',
};

export const STYLES = {
  card: "bg-white border-[3px] border-black neubrutalist-shadow p-6",
  buttonPrimary: "bg-[#FF4D4D] text-white font-bold py-3 px-6 border-[3px] border-black neubrutalist-shadow neubrutalist-active text-xl tracking-tight uppercase",
  buttonSecondary: "bg-[#FFD700] text-black font-bold py-3 px-6 border-[3px] border-black neubrutalist-shadow neubrutalist-active text-lg uppercase",
  buttonOutline: "bg-transparent text-black font-bold py-3 px-6 border-[3px] border-black neubrutalist-shadow neubrutalist-active text-lg uppercase",
  input: "w-full bg-white border-[3px] border-black p-4 text-lg font-bold placeholder-gray-400 focus:bg-[#FDFDF5]",
  label: "block text-sm font-black uppercase tracking-widest mb-2",
  badge: "inline-block px-3 py-1 border-2 border-black font-bold text-xs uppercase bg-[#FF9F1C]",
};

export const Icons = {
  Streak: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
  Check: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
    </svg>
  ),
  ArrowRight: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
    </svg>
  ),
  Map: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
      <path d="M3 7l6-3 6 3 6-3v13l-6 3-6-3-6 3V7z" />
      <path d="M9 4v13" />
      <path d="M15 7v13" />
    </svg>
  ),
  Tasks: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
};
