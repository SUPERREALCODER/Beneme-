
import React, { useState, useEffect, useMemo } from 'react';
import { BrainwaveMetrics, Challenge } from '../types';
import { ShieldCheck, Cloud, Sun, Play, Square, Bluetooth, Trophy, Target, Mountain, Waves, Zap } from 'lucide-react';

interface NeurofeedbackCenterProps {
  metrics: BrainwaveMetrics;
  onConnect: () => void;
  isConnected: boolean;
}

const MOCK_CHALLENGES: Challenge[] = [
  { 
    id: 'c1', 
    title: 'The Ascent', 
    description: 'Maintain a Focus score > 80% for 2 minutes.', 
    metric: 'focus', 
    targetValue: 80, 
    targetDuration: 120 
  },
  { 
    id: 'c2', 
    title: 'Zen Ripple', 
    description: 'Transition from Focus to Calm in under 30s.', 
    metric: 'transition', 
    targetValue: 70, 
    targetDuration: 30 
  },
  { 
    id: 'c3', 
    title: 'Silent Ocean', 
    description: 'Keep Calm score > 90% for 1 minute.', 
    metric: 'calm', 
    targetValue: 90, 
    targetDuration: 60 
  },
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
        
        // Track challenge progress
        if (selectedChallenge && !isChallengeComplete) {
          const currentMetric = selectedChallenge.metric === 'focus' ? metrics.focusScore : metrics.calmScore;
          if (currentMetric >= selectedChallenge.targetValue) {
            setChallengeProgress(prev => Math.min(100, prev + (100 / selectedChallenge.targetDuration)));
          } else {
             // Subtle regression if focus slips
             setChallengeProgress(prev => Math.max(0, prev - 1));
          }
        }
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeRemaining, selectedChallenge, metrics, isChallengeComplete]);

  useEffect(() => {
    if (challengeProgress >= 99.9) {
      setIsChallengeComplete(true);
    }
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
    if (focusLevel > 50) return 4;
    return 10;
  }, [metrics.focusScore]);

  const toggleChallenge = (challenge: Challenge) => {
    if (selectedChallenge?.id === challenge.id) {
      setSelectedChallenge(null);
      setChallengeProgress(0);
      setIsChallengeComplete(false);
    } else {
      setSelectedChallenge(challenge);
      setChallengeProgress(0);
      setIsChallengeComplete(false);
    }
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <header className="mb-10 flex justify-between items-start">
        <div>
          <h2 className="text-4xl font-quicksand font-bold text-[#003153] mb-2">Neuro Center</h2>
          <p className="text-gray-500">Shape your world with the power of your mind.</p>
        </div>
        
        <div className="flex gap-2">
           {MOCK_CHALLENGES.map(c => (
             <button 
              key={c.id}
              onClick={() => toggleChallenge(c)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border ${
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

      <div className="flex-1 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-[#003153] rounded-[4rem] relative overflow-hidden shadow-2xl flex items-center justify-center group">
          <div className={`absolute inset-0 transition-all duration-[3000ms] ${
            metrics.focusScore > 70 ? 'bg-gradient-to-b from-blue-400 to-blue-200' : 'bg-gradient-to-b from-gray-500 to-gray-700'
          }`} />

          {metrics.focusScore > 60 && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] opacity-30 animate-pulse pointer-events-none">
                <div className="absolute inset-0 bg-yellow-100 blur-[100px] rounded-full" />
            </div>
          )}

          {[...Array(cloudCount)].map((_, i) => (
            <Cloud 
              key={i} 
              className={`absolute text-white/40 transition-all duration-[5000ms] animate-float`}
              style={{
                top: `${20 + (i * 15) % 40}%`,
                left: `${10 + (i * 25) % 80}%`,
                width: `${60 + (i * 40)}px`,
                height: `${40 + (i * 20)}px`,
                filter: 'blur(4px)',
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}

          {/* Gamified Challenge Visualizer */}
          {selectedChallenge && isActive && (
            <div className="absolute bottom-20 left-10 right-10 z-20">
               <div className="flex items-center gap-4 mb-2">
                  <span className="text-white text-xs font-bold uppercase tracking-widest">{selectedChallenge.title} Progress</span>
                  {isChallengeComplete && <Trophy className="text-yellow-400 animate-bounce" size={16} />}
               </div>
               <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-md">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-400 to-green-400 transition-all duration-1000"
                    style={{ width: `${challengeProgress}%` }}
                  />
               </div>
            </div>
          )}

          {/* Center Focus Totem / Character Ascent */}
          <div className="relative z-10 flex flex-col items-center">
            {selectedChallenge?.metric === 'focus' && isActive ? (
              <div 
                className="transition-all duration-1000 relative"
                style={{ transform: `translateY(${-challengeProgress * 2}px)` }}
              >
                <div className="w-24 h-24 bg-white/90 rounded-3xl flex items-center justify-center shadow-2xl animate-float rotate-45">
                   <Mountain className="-rotate-45 text-[#B2AC88]" size={40} />
                </div>
              </div>
            ) : (
              <div className={`w-48 h-48 rounded-full border-4 border-white/20 flex items-center justify-center transition-transform duration-1000 ${
                isActive ? 'scale-110' : 'scale-100'
              }`}>
                 <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-700 ${
                   metrics.focusScore > 80 ? 'bg-white shadow-[0_0_50px_rgba(255,255,255,0.5)]' : 'bg-white/20'
                 }`}>
                    {metrics.focusScore > 80 ? <Sun size={64} className="text-yellow-400" /> : <Cloud size={64} className="text-white/60" />}
                 </div>
              </div>
            )}
            
            {isActive && (
              <div className="mt-8 text-white font-quicksand text-4xl font-bold tracking-widest tabular-nums">
                {formatTime(timeRemaining)}
              </div>
            )}
            
            {!isConnected && (
              <button 
                onClick={onConnect}
                className="mt-8 px-8 py-3 bg-white text-[#003153] rounded-full font-bold flex items-center gap-2 hover:bg-[#F5DEB3] transition-colors"
              >
                <Bluetooth size={18} />
                Connect Headband
              </button>
            )}

            {isConnected && !isActive && (
              <button 
                onClick={() => setIsActive(true)}
                className="mt-8 px-10 py-4 bg-[#B2AC88] text-white rounded-full font-bold flex items-center gap-3 hover:scale-105 transition-all shadow-xl"
              >
                <Play size={20} fill="currentColor" />
                Begin Session
              </button>
            )}

            {isActive && (
               <button 
                onClick={() => setIsActive(false)}
                className="mt-8 px-10 py-4 bg-red-400/20 text-white border border-white/20 rounded-full font-bold flex items-center gap-3 hover:bg-red-400/40 transition-all"
              >
                <Square size={18} fill="currentColor" />
                End Journey
              </button>
            )}
          </div>

          <div className="absolute bottom-10 left-10 text-white/60 text-sm font-medium">
             Focus Metric: {metrics.focusScore}%
          </div>
        </div>

        <div className="w-full lg:w-80 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-[3rem] border border-gray-100 shadow-lg">
             <h3 className="font-quicksand font-bold text-lg mb-4 flex items-center gap-2">
                <Target className="text-blue-500" size={20} />
                Current Objective
             </h3>
             <p className="text-sm text-gray-500 leading-relaxed">
               {selectedChallenge ? selectedChallenge.description : "Select a challenge above to begin a gamified training session."}
             </p>
             {isChallengeComplete && (
               <div className="mt-4 p-4 bg-green-50 rounded-2xl flex items-center gap-3 text-green-700">
                  <Zap size={20} fill="currentColor" />
                  <span className="text-xs font-bold uppercase">Reward Unlocked: Garden Seed</span>
               </div>
             )}
          </div>

          <div className="flex-1 bg-[#B2AC88]/10 p-8 rounded-[3rem] border border-[#B2AC88]/20">
             <h3 className="font-quicksand font-bold text-lg mb-6">Current Rhythm</h3>
             <div className="space-y-6">
                <div>
                   <div className="flex justify-between mb-2">
                      <span className="text-xs font-bold uppercase text-gray-400">Alpha (Rest)</span>
                      <span className="text-xs font-bold text-[#003153]">{metrics.alpha}%</span>
                   </div>
                   <div className="h-1 w-full bg-gray-200 rounded-full">
                      <div className="h-full bg-[#E6E6FA] transition-all duration-1000" style={{ width: `${metrics.alpha}%` }} />
                   </div>
                </div>
                <div>
                   <div className="flex justify-between mb-2">
                      <span className="text-xs font-bold uppercase text-gray-400">Beta (Focus)</span>
                      <span className="text-xs font-bold text-[#003153]">{metrics.beta}%</span>
                   </div>
                   <div className="h-1 w-full bg-gray-200 rounded-full">
                      <div className="h-full bg-[#003153] transition-all duration-1000" style={{ width: `${metrics.beta}%` }} />
                   </div>
                </div>
                <div>
                   <div className="flex justify-between mb-2">
                      <span className="text-xs font-bold uppercase text-gray-400">Theta (Depth)</span>
                      <span className="text-xs font-bold text-[#003153]">{metrics.theta}%</span>
                   </div>
                   <div className="h-1 w-full bg-gray-200 rounded-full">
                      <div className="h-full bg-[#B2AC88] transition-all duration-1000" style={{ width: `${metrics.theta}%` }} />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeurofeedbackCenter;
