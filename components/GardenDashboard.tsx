
import React, { useMemo } from 'react';
import { GardenPlant, BrainwaveMetrics } from '../types';
// Fix: Consolidate lucide-react imports and alias Trees as Garden
import { Sun, CloudRain, Wind, Sparkles, Brain, Trees as Garden } from 'lucide-react';

interface GardenDashboardProps {
  plants: GardenPlant[];
  metrics: BrainwaveMetrics;
}

const GardenDashboard: React.FC<GardenDashboardProps> = ({ plants, metrics }) => {
  const currentStatus = useMemo(() => {
    if (metrics.calmScore > 80) return { label: 'Blissful Morning', color: 'bg-yellow-50', icon: Sun };
    if (metrics.calmScore > 50) return { label: 'Gentle Breeze', color: 'bg-blue-50', icon: Wind };
    return { label: 'Nurturing Rain', color: 'bg-indigo-50', icon: CloudRain };
  }, [metrics.calmScore]);

  const StatusIcon = currentStatus.icon;

  return (
    <div className="p-8 h-full flex flex-col">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <p className="text-gray-400 font-medium mb-1">Welcome back, Traveler</p>
          <h2 className="text-4xl font-quicksand font-bold text-[#003153]">Your Soul Garden</h2>
        </div>
        <div className={`flex items-center gap-4 px-6 py-3 rounded-full ${currentStatus.color} shadow-sm border border-white`}>
          <StatusIcon className="text-[#003153]" size={20} />
          <span className="font-bold text-[#003153]">{currentStatus.label}</span>
        </div>
      </header>

      <div className="flex-1 bg-white/60 rounded-[4rem] border border-white shadow-xl relative overflow-hidden backdrop-blur-sm p-12">
        {/* Garden Visualization Layer */}
        <div className="absolute inset-0 flex items-end justify-center pb-20 overflow-hidden">
          {/* Base Grass/Ground */}
          <div className="absolute bottom-0 w-full h-32 bg-[#B2AC88]/20 blur-2xl" />
          
          {/* Plants */}
          <div className="relative w-full h-full max-w-4xl mx-auto flex items-end justify-around">
            {plants.map((plant) => (
              <div 
                key={plant.id} 
                className="group relative flex flex-col items-center transition-all duration-1000 animate-float"
                style={{ marginBottom: `${plant.stage * 10}px` }}
              >
                {/* Visual Plant Metaphor using SVG Shapes */}
                <div className="relative">
                   {plant.type === 'tree' && (
                     <svg width="80" height="200" viewBox="0 0 80 200" className="transition-all duration-1000">
                       <rect x="35" y="100" width="10" height="100" fill="#8B4513" opacity="0.6" />
                       <circle cx="40" cy="80" r={30 + plant.stage * 10} fill="#B2AC88" opacity="0.8" />
                       <circle cx="20" cy="100" r={20 + plant.stage * 5} fill="#B2AC88" opacity="0.6" />
                       <circle cx="60" cy="100" r={20 + plant.stage * 5} fill="#B2AC88" opacity="0.6" />
                     </svg>
                   )}
                   {plant.type === 'flower' && (
                     <svg width="60" height="120" viewBox="0 0 60 120">
                        <line x1="30" y1="120" x2="30" y2={60 - plant.stage * 15} stroke="#B2AC88" strokeWidth="4" />
                        <circle cx="30" cy={60 - plant.stage * 15} r={15 + plant.stage * 3} fill="#E6E6FA" />
                        <circle cx="30" cy={60 - plant.stage * 15} r="8" fill="#F5DEB3" />
                     </svg>
                   )}
                   {plant.type === 'bush' && (
                      <svg width="100" height="80" viewBox="0 0 100 80">
                        <circle cx="30" cy="50" r={20 + plant.stage * 5} fill="#B2AC88" opacity="0.5" />
                        <circle cx="70" cy="50" r={20 + plant.stage * 5} fill="#B2AC88" opacity="0.5" />
                        <circle cx="50" cy="40" r={25 + plant.stage * 5} fill="#B2AC88" opacity="0.7" />
                      </svg>
                   )}
                </div>
                
                {/* Tooltip on hover */}
                <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-white px-3 py-1 rounded-full text-xs shadow-md border border-gray-100">
                  Growth Stage: {plant.stage + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ambient Overlay */}
        <div className="absolute top-10 right-10 flex flex-col items-end space-y-4">
          <div className="bg-white/40 backdrop-blur-md p-4 rounded-3xl border border-white/50 w-64 shadow-lg">
             <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#003153]/60">Atmospheric Focus</span>
                <Sparkles size={14} className="text-[#B2AC88]" />
             </div>
             <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#B2AC88] to-[#E6E6FA] transition-all duration-1000" 
                  style={{ width: `${metrics.focusScore}%` }} 
                />
             </div>
             <p className="mt-2 text-xl font-quicksand font-bold text-[#003153]">{metrics.focusScore}%</p>
          </div>

          <div className="bg-white/40 backdrop-blur-md p-4 rounded-3xl border border-white/50 w-64 shadow-lg">
             <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#003153]/60">Inner Stillness</span>
                <Wind size={14} className="text-blue-300" />
             </div>
             <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-200 to-indigo-300 transition-all duration-1000" 
                  style={{ width: `${metrics.calmScore}%` }} 
                />
             </div>
             <p className="mt-2 text-xl font-quicksand font-bold text-[#003153]">{metrics.calmScore}%</p>
          </div>
        </div>
      </div>
      
      <footer className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-400">
             <Brain size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase">Weekly Sessions</p>
            <p className="text-lg font-bold">12 Cycles Complete</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-400">
             <Garden size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase">Biodiversity</p>
            <p className="text-lg font-bold">8 Species Flourishing</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-400">
             <Sparkles size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase">Zen Level</p>
            <p className="text-lg font-bold">Lvl 4: Calm Observer</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GardenDashboard;
