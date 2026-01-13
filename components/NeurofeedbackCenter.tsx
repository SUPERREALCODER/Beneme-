
import React, { useState, useEffect, useMemo } from 'react';
import { BrainwaveMetrics, Challenge } from '../types';
import { Cloud, Sun, Play, Square, Bluetooth, Trophy, Mountain, Waves, Zap, Target } from 'lucide-react';

interface NeurofeedbackCenterProps {
  metrics: BrainwaveMetrics;
  onConnect: () => void;
  isConnected: boolean;
}

const MOCK_CHALLENGES: Challenge[] = [
  { id: 'c1', title: 'Ascent', description: 'Maintain Focus > 80% for 2m.', metric: 'focus', targetValue: 80, targetDuration: 120 },
  { id: 'c2', title: 'Ripple', description: 'Quick focus/calm transition.', metric: 'transition', targetValue: 70, targetDuration: 30 },
  { id: 'c3', title: 'Ocean', description: 'Keep Calm > 90% for 1m.', metric: 'calm', targetValue: 90, targetDuration: 60 },
];

const NeurofeedbackCenter: React.FC<NeurofeedbackCenterProps> = ({ metrics, onConnect, isConnected }) => {
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [challengeProgress, setChallengeProgress] = useState(0);
  const [isChallengeComplete, setIsChallengeComplete] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(t => t - 1);
        if (selectedChallenge && !isChallengeComplete) {
          const currentMetric = selectedChallenge.metric === 'focus' ? metrics.focusScore : metrics.calmScore;
          if (currentMetric >= selectedChallenge.targetValue) {
            setChallengeProgress(prev => Math.min(100, prev + (100 / selectedChallenge.targetDuration)));
          } else {
             setChallengeProgress(prev => Math.max(0, prev - 0.5));
          }
        }
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeRemaining, selectedChallenge, metrics, isChallengeComplete]);

  useEffect(() => {
    if (challengeProgress >= 99.9) setIsChallengeComplete(true);
  }, [challengeProgress]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const cloudCount = useMemo(() => {
    const focusLevel = metrics.focusScore;
    if (focusLevel > 90) return 0;
    if (focusLevel > 70) return 2;
    return 4;
  }, [metrics.focusScore]);

  const toggleChallenge = (challenge: Challenge) => {
    setSelectedChallenge(selectedChallenge?.id === challenge.id ? null : challenge);
    setChallengeProgress(0);
    setIsChallengeComplete(false);
  };

  return (
    <div className="p-4 md:p-8 h-full flex flex-col">
      <header className="mb-6 md:mb-10 flex flex-col md:flex-row md:justify-between md:items-start gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-quicksand font-bold text-[#003153] mb-1">Neuro Center</h2>
          <p className="text-gray-500 text-sm md:text-base">Shape your world with your mind.</p>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
           {MOCK_CHALLENGES.map(c => (
             <button 
              key={c.id}
              onClick={() => toggleChallenge(c)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-[10px] md:text-xs font-bold transition-all border ${
                selectedChallenge?.id === c.id 
                  ? 'bg-[#003153] text-white border-transparent' 
                  : 'bg-white text-gray-400 border-gray-100 hover:bg-gray-50'
              }`}
             >
               {c.metric === 'focus' ? <Mountain size={14} /> : <Waves size={14} />}
               {c.title}
             </button>
           ))}
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 md:gap-8">
        <div className="flex-1 min-h-[350px] bg-[#003153] rounded-[2.5rem] md:rounded-[4rem] relative overflow-hidden shadow-2xl flex items-center justify-center">
          <div className={`absolute inset-0 transition-all duration-[3000ms] ${
            metrics.focusScore > 70 ? 'bg-gradient-to-b from-blue-400 to-blue-200' : 'bg-gradient-to-b from-gray-500 to-gray-700'
          }`} />

          {[...Array(cloudCount)].map((_, i) => (
            <Cloud 
              key={i} 
              className={`absolute text-white/40 animate-float`}
              style={{
                top: `${10 + (i * 20)}%`,
                left: `${10 + (i * 30) % 70}%`,
                width: `${40 + (i * 20)}px`,
                filter: 'blur(2px)',
                animationDelay: `${i * 0.8}s`
              }}
            />
          ))}

          <div className="relative z-10 flex flex-col items-center p-4">
            <div className={`w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white/20 flex items-center justify-center transition-transform duration-1000 ${isActive ? 'scale-110' : 'scale-100'}`}>
               <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center transition-all duration-700 ${
                 metrics.focusScore > 80 ? 'bg-white shadow-xl' : 'bg-white/20'
               }`}>
                  {metrics.focusScore > 80 ? <Sun size={48} className="text-yellow-400" /> : <Cloud size={48} className="text-white/60" />}
               </div>
            </div>
            
            {isActive && <div className="mt-4 md:mt-8 text-white font-quicksand text-3xl md:text-4xl font-bold tabular-nums">{formatTime(timeRemaining)}</div>}
            
            {!isConnected ? (
              <button onClick={onConnect} className="mt-6 px-6 py-2.5 bg-white text-[#003153] rounded-full text-sm font-bold flex items-center gap-2">
                <Bluetooth size={16} /> Connect
              </button>
            ) : !isActive ? (
              <button onClick={() => setIsActive(true)} className="mt-6 px-8 py-3 bg-[#B2AC88] text-white rounded-full font-bold flex items-center gap-3 shadow-xl">
                <Play size={18} fill="currentColor" /> Begin
              </button>
            ) : (
              <button onClick={() => setIsActive(false)} className="mt-6 px-8 py-3 bg-red-400/20 text-white border border-white/20 rounded-full font-bold flex items-center gap-3">
                <Square size={16} fill="currentColor" /> Stop
              </button>
            )}
          </div>
        </div>

        <div className="w-full lg:w-80 flex flex-col gap-4 md:gap-6">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-lg">
             <h3 className="font-quicksand font-bold text-lg mb-3 flex items-center gap-2">
                <Target className="text-blue-500" size={18} /> Objective
             </h3>
             <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
               {selectedChallenge ? selectedChallenge.description : "Select a challenge above."}
             </p>
          </div>

          <div className="bg-[#B2AC88]/10 p-6 rounded-[2rem] border border-[#B2AC88]/20">
             <h3 className="font-quicksand font-bold text-base mb-4">Neural Activity</h3>
             <div className="space-y-4">
                {[
                  { label: 'Alpha', val: metrics.alpha, color: 'bg-[#E6E6FA]' },
                  { label: 'Beta', val: metrics.beta, color: 'bg-[#003153]' },
                  { label: 'Theta', val: metrics.theta, color: 'bg-[#B2AC88]' }
                ].map(r => (
                  <div key={r.label}>
                     <div className="flex justify-between mb-1 text-[10px] font-bold uppercase text-gray-400">
                        <span>{r.label}</span>
                        <span>{Math.round(r.val)}%</span>
                     </div>
                     <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full ${r.color} transition-all duration-1000`} style={{ width: `${r.val}%` }} />
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeurofeedbackCenter;
