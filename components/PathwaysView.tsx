
import React, { useState } from 'react';
import { Pathway, PathwayStep, BrainwaveMetrics } from '../types';
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
      case 'music': return <Music size={20} />;
      case 'meditation': return <Library size={20} />;
      default: return <Wind size={20} />;
    }
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <header className="mb-10">
        <h2 className="text-4xl font-quicksand font-bold text-[#003153] mb-2">Personalized Pathways</h2>
        <p className="text-gray-500">Intelligent curation for your unique neural needs.</p>
      </header>

      {!activePathway ? (
        <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-[#F5DEB3] rounded-full flex items-center justify-center text-[#003153] mb-6 shadow-xl animate-float">
             <Plus size={32} />
          </div>
          <h3 className="text-2xl font-quicksand font-bold mb-4">What is your intention today?</h3>
          <form onSubmit={handleCreatePathway} className="w-full relative group">
            <input 
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g., Wind down for sleep, manage work stress..."
              className="w-full px-8 py-6 rounded-[2.5rem] bg-white border-2 border-transparent shadow-lg focus:border-[#B2AC88] focus:outline-none text-lg transition-all pr-32"
            />
            <button 
              type="submit"
              disabled={isLoading || !goal}
              className="absolute right-3 top-3 bottom-3 px-6 bg-[#003153] text-white rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
              Curate
            </button>
          </form>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {['Better Sleep', 'Creative Flow', 'Public Speaking Anxiety', 'Quick Reset'].map(suggestion => (
              <button 
                key={suggestion}
                onClick={() => setGoal(suggestion)}
                className="px-4 py-2 rounded-full bg-white/50 border border-gray-100 text-sm text-[#003153] hover:bg-white transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 max-w-4xl mx-auto w-full">
          <div className="bg-white/60 backdrop-blur-md rounded-[3rem] p-12 border border-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#B2AC88]">Active Pathway</span>
                  <h3 className="text-3xl font-quicksand font-bold text-[#003153]">{activePathway.name}</h3>
                </div>
                <button 
                  onClick={() => setActivePathway(null)}
                  className="text-gray-400 hover:text-[#003153] text-sm font-bold"
                >
                  Start New Journey
                </button>
              </div>

              <div className="space-y-6 relative">
                {/* Winding trail line */}
                <div className="absolute left-10 top-10 bottom-10 w-[2px] bg-gradient-to-b from-[#B2AC88] via-[#F5DEB3] to-[#E6E6FA] opacity-30" />
                
                {activePathway.steps.map((step, index) => (
                  <div 
                    key={step.id} 
                    className="flex items-center gap-8 group"
                  >
                    <div className="w-20 h-20 rounded-[2rem] bg-white shadow-md flex items-center justify-center text-[#B2AC88] z-10 border border-gray-50 group-hover:scale-110 transition-transform">
                      {getStepIcon(step.type)}
                    </div>
                    <div className="flex-1 bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm flex items-center justify-between group-hover:shadow-md transition-shadow">
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">{step.type} • {step.intensity}</p>
                        <h4 className="text-xl font-quicksand font-bold">{step.title}</h4>
                      </div>
                      <div className="text-right">
                         <span className="text-lg font-bold text-[#003153]">{step.duration}m</span>
                      </div>
                    </div>
                    {index < activePathway.steps.length - 1 && (
                      <ArrowRight className="text-gray-200 hidden md:block" />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-12 flex justify-center">
                <button className="px-12 py-5 bg-[#B2AC88] text-white rounded-full font-bold text-xl flex items-center gap-3 shadow-xl hover:scale-105 transition-all">
                  <Play fill="currentColor" size={24} />
                  Initiate Sequence
                </button>
              </div>
            </div>
            
            {/* Organic background shapes */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#E6E6FA] rounded-full blur-[100px] opacity-30" />
            <div className="absolute top-40 -left-20 w-60 h-60 bg-[#F5DEB3] rounded-full blur-[80px] opacity-30" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PathwaysView;
