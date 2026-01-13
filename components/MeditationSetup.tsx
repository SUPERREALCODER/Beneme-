
import React, { useState, useEffect, useMemo } from 'react';
import { BrainwaveMetrics, MeditationMode } from '../types';
import { Cloud, Sun, Play, Square, Bluetooth, Waves, Wind, Flower2, Timer } from 'lucide-react';

interface MeditationSetupProps {
  metrics: BrainwaveMetrics;
  onConnect: () => void;
  isConnected: boolean;
}

const MEDITATION_MODES: MeditationMode[] = [
  { id: 'm1', title: 'Deep Presence', description: 'High-alpha focus for profound stillness.', targetMetric: 'calm', duration: 15 },
  { id: 'm2', title: 'Flow State', description: 'Theta-wave synchronization for creative work.', targetMetric: 'focus', duration: 20 },
  { id: 'm3', title: 'Rapid Reset', description: 'Quick biometric stabilization.', targetMetric: 'calm', duration: 5 },
];

const MeditationSetup: React.FC<MeditationSetupProps> = ({ metrics, onConnect, isConnected }) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedMode, setSelectedMode] = useState<MeditationMode>(MEDITATION_MODES[0]);
  const [timeRemaining, setTimeRemaining] = useState(selectedMode.duration * 60);

  useEffect(() => {
    setTimeRemaining(selectedMode.duration * 60);
  }, [selectedMode]);

  useEffect(() => {
    let interval: any;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(t => t - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const ambientColor = useMemo(() => {
    const score = selectedMode.targetMetric === 'calm' ? metrics.calmScore : metrics.focusScore;
    if (score > 80) return 'from-amber-200/40 to-blue-300/40';
    if (score > 50) return 'from-blue-200/40 to-indigo-300/40';
    return 'from-gray-300/40 to-slate-400/40';
  }, [metrics, selectedMode]);

  return (
    <div className="p-4 md:p-8 h-full flex flex-col">
      <header className="mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-quicksand font-bold text-[#003153] mb-2">Meditation</h2>
        <p className="text-gray-500 font-medium">Your inner sanctuary. Align your breath with your neural rhythm.</p>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-8">
        {/* Main Session View */}
        <div className="flex-1 relative rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl bg-white border border-white group">
          <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-[2000ms] ${ambientColor}`} />
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className={`w-64 h-64 md:w-96 md:h-96 rounded-full border border-white/30 transition-transform duration-[4000ms] ease-in-out ${isActive ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`} />
            <div className={`absolute w-48 h-48 md:w-72 md:h-72 rounded-full border border-white/50 transition-transform duration-[4000ms] ease-in-out delay-1000 ${isActive ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`} />
          </div>

          <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-6">
              {metrics.calmScore > 75 ? (
                <Flower2 size={64} className="text-[#B2AC88] animate-pulse" />
              ) : (
                <Wind size={64} className="text-[#003153]/40" />
              )}
            </div>

            <div className="text-5xl md:text-7xl font-quicksand font-bold text-[#003153] tabular-nums mb-4">
              {formatTime(timeRemaining)}
            </div>
            
            <p className="text-[#003153]/60 font-medium mb-10 max-w-xs">
              {isActive ? "Release all effort. Just be." : "Ready to begin your meditation?"}
            </p>

            <div className="flex gap-4">
              {!isConnected ? (
                <button onClick={onConnect} className="px-8 py-4 bg-[#003153] text-white rounded-full font-bold flex items-center gap-2 shadow-xl hover:scale-105 transition-transform">
                  <Bluetooth size={18} /> Link Headband
                </button>
              ) : !isActive ? (
                <button onClick={() => setIsActive(true)} className="px-12 py-4 bg-[#B2AC88] text-white rounded-full font-bold flex items-center gap-3 shadow-xl hover:scale-105 transition-transform">
                  <Play fill="currentColor" size={20} /> Start Meditation
                </button>
              ) : (
                <button onClick={() => setIsActive(false)} className="px-12 py-4 bg-white/80 backdrop-blur text-[#003153] rounded-full font-bold flex items-center gap-3 border border-white/50 shadow-lg">
                  <Square fill="currentColor" size={16} /> End Practice
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="w-full lg:w-96 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="font-quicksand font-bold text-lg mb-4 flex items-center gap-2">
              <Timer className="text-[#B2AC88]" size={18} /> Choose Mode
            </h3>
            <div className="space-y-3">
              {MEDITATION_MODES.map(mode => (
                <button 
                  key={mode.id}
                  onClick={() => !isActive && setSelectedMode(mode)}
                  disabled={isActive}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    selectedMode.id === mode.id 
                    ? 'bg-[#B2AC88]/10 border-[#B2AC88] ring-1 ring-[#B2AC88]' 
                    : 'bg-gray-50 border-transparent hover:bg-gray-100 opacity-60'
                  } ${isActive ? 'cursor-not-allowed' : ''}`}
                >
                  <p className="font-bold text-[#003153] text-sm">{mode.title}</p>
                  <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-tight font-medium">{mode.duration} Minutes • {mode.targetMetric} focus</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#003153] p-8 rounded-[2.5rem] text-white">
            <h3 className="font-quicksand font-bold mb-6 flex items-center gap-2">
              <Waves size={18} className="text-[#B2AC88]" /> Real-time Coherence
            </h3>
            <div className="space-y-6">
               <div>
                 <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
                    <span>Stillness</span>
                    <span>{Math.round(metrics.calmScore)}%</span>
                 </div>
                 <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#B2AC88] transition-all duration-1000" style={{ width: `${metrics.calmScore}%` }} />
                 </div>
               </div>
               <div>
                 <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
                    <span>Alpha Waves</span>
                    <span>{Math.round(metrics.alpha)}%</span>
                 </div>
                 <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-300 transition-all duration-1000" style={{ width: `${metrics.alpha}%` }} />
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeditationSetup;
