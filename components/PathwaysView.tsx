
import React, { useState } from 'react';
import { Pathway, BrainwaveMetrics } from '../types';
import { generatePathway } from '../services/geminiService';
import { Sparkles, Music, Wind, Library, Play, ArrowRight, Loader2, Plus } from 'lucide-react';

interface PathwaysViewProps {
  metrics: BrainwaveMetrics;
}

const PathwaysView: React.FC<PathwaysViewProps> = ({ metrics }) => {
  const [goal, setGoal] = useState('');
  const [activePathway, setActivePathway] = useState<Pathway | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreatePathway = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim()) return;
    setIsLoading(true);
    const result = await generatePathway(goal, metrics);
    if (result) {
      setActivePathway({
        id: Math.random().toString(36).substr(2, 9),
        goal: goal,
        name: result.name,
        steps: result.steps
      });
    }
    setIsLoading(false);
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'music': return <Music size={18} />;
      case 'meditation': return <Library size={18} />;
      default: return <Wind size={18} />;
    }
  };

  return (
    <div className="p-4 md:p-8 h-full flex flex-col">
      <header className="mb-8 md:mb-10">
        <h2 className="text-3xl md:text-4xl font-quicksand font-bold text-[#003153] mb-1">Personalized Pathways</h2>
        <p className="text-gray-500 text-sm">Tailored for your neural needs.</p>
      </header>

      {!activePathway ? (
        <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto text-center w-full">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-[#F5DEB3] rounded-full flex items-center justify-center text-[#003153] mb-6 shadow-lg animate-float">
             <Plus size={24} md:size={32} />
          </div>
          <h3 className="text-xl md:text-2xl font-quicksand font-bold mb-6">What is your intention today?</h3>
          <form onSubmit={handleCreatePathway} className="w-full relative px-2">
            <input 
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Sleep, stress, focus..."
              className="w-full px-6 md:px-8 py-5 md:py-6 rounded-[2rem] md:rounded-[2.5rem] bg-white border-2 border-transparent shadow-lg focus:border-[#B2AC88] focus:outline-none text-base md:text-lg transition-all pr-24 md:pr-32"
            />
            <button 
              type="submit"
              disabled={isLoading || !goal}
              className="absolute right-4 md:right-5 top-2.5 bottom-2.5 px-4 md:px-6 bg-[#003153] text-white rounded-full font-bold text-sm flex items-center gap-2"
            >
              {isLoading ? <Loader2 className="animate-spin size={16}" /> : <Sparkles size={16} />}
              <span className="hidden sm:inline">Curate</span>
            </button>
          </form>
          <div className="mt-6 flex flex-wrap justify-center gap-2 px-4">
            {['Sleep', 'Focus', 'Anxiety', 'Reset'].map(suggestion => (
              <button key={suggestion} onClick={() => setGoal(suggestion)} className="px-3 py-1.5 rounded-full bg-white/50 border border-gray-100 text-[10px] md:text-xs text-[#003153] font-bold uppercase tracking-tight">
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 max-w-3xl mx-auto w-full">
          <div className="bg-white/60 backdrop-blur-md rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 border border-white shadow-xl">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B2AC88]">Active Pathway</span>
                <h3 className="text-2xl md:text-3xl font-quicksand font-bold text-[#003153]">{activePathway.name}</h3>
              </div>
              <button onClick={() => setActivePathway(null)} className="text-gray-400 text-xs font-bold uppercase tracking-tighter">New</button>
            </div>

            <div className="space-y-4 relative">
              {activePathway.steps.map((step, idx) => (
                <div key={step.id} className="flex items-center gap-4 md:gap-6 group">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#B2AC88] flex-shrink-0">
                    {getStepIcon(step.type)}
                  </div>
                  <div className="flex-1 bg-white p-4 md:p-5 rounded-2xl md:rounded-[2rem] border border-gray-50 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">{step.type} • {step.intensity}</p>
                      <h4 className="text-sm md:text-lg font-quicksand font-bold">{step.title}</h4>
                    </div>
                    <span className="text-sm font-bold text-[#003153]">{step.duration}m</span>
                  </div>
                  {idx < activePathway.steps.length - 1 && <ArrowRight className="hidden md:block text-gray-200" />}
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <button className="w-full sm:w-auto px-10 py-4 bg-[#B2AC88] text-white rounded-full font-bold flex items-center justify-center gap-3 shadow-lg">
                <Play fill="currentColor" size={20} /> Initiate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PathwaysView;
