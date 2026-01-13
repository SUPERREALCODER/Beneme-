
import React, { useMemo } from 'react';
import { GardenPlant, BrainwaveMetrics } from '../types';
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
    <div className="p-4 md:p-8 h-full flex flex-col">
      <header className="mb-6 md:mb-10 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <p className="text-gray-400 font-medium mb-1 text-sm">Welcome back, Traveler</p>
          <h2 className="text-3xl md:text-4xl font-quicksand font-bold text-[#003153]">Your Soul Garden</h2>
        </div>
        <div className={`flex items-center gap-3 px-5 py-2 md:py-3 rounded-full ${currentStatus.color} shadow-sm border border-white w-fit`}>
          <StatusIcon className="text-[#003153]" size={18} />
          <span className="font-bold text-[#003153] text-sm md:text-base">{currentStatus.label}</span>
        </div>
      </header>

      <div className="flex-1 bg-white/60 rounded-[2.5rem] md:rounded-[4rem] border border-white shadow-xl relative overflow-hidden backdrop-blur-sm p-4 md:p-12 min-h-[400px]">
        {/* Garden Visualization Layer */}
        <div className="absolute inset-0 flex items-end justify-center pb-12 md:pb-20 overflow-hidden">
          <div className="absolute bottom-0 w-full h-32 bg-[#B2AC88]/20 blur-2xl" />
          
          <div className="relative w-full h-full max-w-4xl mx-auto flex items-end justify-around px-4">
            {plants.map((plant, idx) => (
              <div 
                key={plant.id} 
                className={`group relative flex flex-col items-center transition-all duration-1000 animate-float ${idx > 2 ? 'hidden sm:flex' : 'flex'}`}
                style={{ marginBottom: `${plant.stage * 10}px` }}
              >
                <div className="relative transform scale-75 md:scale-100 origin-bottom">
                   {plant.type === 'tree' && (
                     <svg width="80" height="160" viewBox="0 0 80 160">
                       <rect x="35" y="80" width="10" height="80" fill="#8B4513" opacity="0.6" />
                       <circle cx="40" cy="60" r={25 + plant.stage * 8} fill="#B2AC88" opacity="0.8" />
                       <circle cx="20" cy="80" r={15 + plant.stage * 4} fill="#B2AC88" opacity="0.6" />
                       <circle cx="60" cy="80" r={15 + plant.stage * 4} fill="#B2AC88" opacity="0.6" />
                     </svg>
                   )}
                   {plant.type === 'flower' && (
                     <svg width="60" height="100" viewBox="0 0 60 100">
                        <line x1="30" y1="100" x2="30" y2={50 - plant.stage * 12} stroke="#B2AC88" strokeWidth="4" />
                        <circle cx="30" cy={50 - plant.stage * 12} r={12 + plant.stage * 2} fill="#E6E6FA" />
                        <circle cx="30" cy={50 - plant.stage * 12} r="6" fill="#F5DEB3" />
                     </svg>
                   )}
                   {plant.type === 'bush' && (
                      <svg width="100" height="80" viewBox="0 0 100 80">
                        <circle cx="30" cy="50" r={15 + plant.stage * 4} fill="#B2AC88" opacity="0.5" />
                        <circle cx="70" cy="50" r={15 + plant.stage * 4} fill="#B2AC88" opacity="0.5" />
                        <circle cx="50" cy="40" r={20 + plant.stage * 4} fill="#B2AC88" opacity="0.7" />
                      </svg>
                   )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ambient Overlay Stats - Stacks on mobile */}
        <div className="absolute top-4 right-4 md:top-10 md:right-10 flex flex-col items-end space-y-3 md:space-y-4 max-w-[calc(100%-2rem)]">
          {[
            { label: 'Atmospheric Focus', icon: Sparkles, value: metrics.focusScore, color: 'from-[#B2AC88] to-[#E6E6FA]' },
            { label: 'Inner Stillness', icon: Wind, value: metrics.calmScore, color: 'from-blue-200 to-indigo-300' }
          ].map((stat, i) => (
            <div key={i} className="bg-white/40 backdrop-blur-md p-3 md:p-4 rounded-2xl md:rounded-3xl border border-white/50 w-full md:w-64 shadow-lg">
               <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#003153]/60 truncate">{stat.label}</span>
                  <stat.icon size={12} className="text-[#003153]/60" />
               </div>
               <div className="h-1.5 w-full bg-gray-100/50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${stat.color} transition-all duration-1000`} 
                    style={{ width: `${stat.value}%` }} 
                  />
               </div>
               <p className="mt-1 text-lg font-quicksand font-bold text-[#003153]">{Math.round(stat.value)}%</p>
            </div>
          ))}
        </div>
      </div>
      
      <footer className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 pb-4">
        {[
          { icon: Brain, label: 'Weekly Sessions', value: '12 Cycles Complete', color: 'text-indigo-400', bg: 'bg-indigo-50' },
          { icon: Garden, label: 'Biodiversity', value: '8 Species Flourishing', color: 'text-green-400', bg: 'bg-green-50' },
          { icon: Sparkles, label: 'Zen Level', value: 'Lvl 4: Calm Observer', color: 'text-orange-400', bg: 'bg-orange-50' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-4 md:p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-10 h-10 md:w-12 md:h-12 ${item.bg} rounded-xl md:rounded-2xl flex items-center justify-center ${item.color}`}>
               <item.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">{item.label}</p>
              <p className="text-sm md:text-lg font-bold">{item.value}</p>
            </div>
          </div>
        ))}
      </footer>
    </div>
  );
};

export default GardenDashboard;
