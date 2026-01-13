
import React, { useMemo } from 'react';
import { GardenPlant, BrainwaveMetrics } from '../types';
import { Sun, CloudRain, Wind, Sparkles, Brain, Trees as Garden, Zap, Waves, Leaf, Thermometer, Wind as AirIcon } from 'lucide-react';

interface GardenDashboardProps {
  plants: GardenPlant[];
  metrics: BrainwaveMetrics;
  isConnected: boolean;
  onConnect: () => void;
}

const GardenDashboard: React.FC<GardenDashboardProps> = ({ plants, metrics, isConnected, onConnect }) => {
  // AQI Level interpretation
  const aqiInfo = useMemo(() => {
    const val = metrics.aqi;
    if (val <= 50) return { label: 'Pristine Air', color: 'bg-green-50', text: 'text-green-600', icon: Sun, desc: 'Ideal for deep neural focus.' };
    if (val <= 100) return { label: 'Moderate Atmosphere', color: 'bg-yellow-50', text: 'text-yellow-600', icon: Wind, desc: 'Good conditions for light activity.' };
    return { label: 'Hazy Environment', color: 'bg-orange-50', text: 'text-orange-600', icon: CloudRain, desc: 'Prioritize internal breathing focus.' };
  }, [metrics.aqi]);

  const StatusIcon = aqiInfo.icon;

  const metricCards = [
    { 
      label: 'Atmospheric Clarity (AQI)', 
      icon: AirIcon, 
      value: isConnected ? Math.round(metrics.aqi) : 0, 
      max: 200, // Visual max for progress bar
      color: metrics.aqi < 50 ? 'from-green-400 to-emerald-500' : 'from-yellow-400 to-orange-500',
      desc: 'Lower is better. Measures the purity of your current surroundings.',
      suffix: ''
    },
    { 
      label: 'Stress Resilience', 
      icon: Brain, 
      value: isConnected ? metrics.calmScore : 0, 
      max: 100,
      color: 'from-blue-400 to-[#003153]',
      desc: 'Your biological response to environmental oxygen and stillness.',
      suffix: '%'
    }
  ];

  return (
    <div className="p-4 md:p-8 h-full flex flex-col">
      <header className="mb-6 md:mb-10 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <p className="text-gray-400 font-medium mb-1 text-sm">Environmental Foundation</p>
          <h2 className="text-3xl md:text-4xl font-quicksand font-bold text-[#003153]">Your Soul Garden</h2>
        </div>
        <div className={`flex items-center gap-3 px-5 py-2 md:py-3 rounded-full ${aqiInfo.color} shadow-sm border border-white w-fit transition-all duration-1000`}>
          <StatusIcon className={aqiInfo.text} size={18} />
          <div className="flex flex-col">
            <span className={`font-bold ${aqiInfo.text} text-xs md:text-sm`}>{aqiInfo.label}</span>
            <span className="text-[10px] text-gray-500 font-medium">{aqiInfo.desc}</span>
          </div>
        </div>
      </header>

      {/* Garden Visualization driven by AQI */}
      <div className={`flex-1 bg-white/60 rounded-[2.5rem] md:rounded-[4rem] border border-white shadow-xl relative overflow-hidden backdrop-blur-sm p-4 md:p-12 min-h-[400px] transition-all duration-[2000ms]`}>
        
        {/* Haze overlay for high AQI */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            opacity: isConnected ? Math.min(0.6, (metrics.aqi / 200)) : 0.2,
            backdropFilter: `blur(${isConnected ? Math.min(8, (metrics.aqi / 20)) : 2}px)`
          }}
        />

        {/* Garden Visualization Layer */}
        <div className="absolute inset-0 flex items-end justify-center pb-12 md:pb-20 overflow-hidden">
          <div className="absolute bottom-0 w-full h-32 bg-[#B2AC88]/20 blur-2xl" />
          
          <div className="relative w-full h-full max-w-4xl mx-auto flex items-end justify-around px-4">
            {plants.map((plant, idx) => (
              <div 
                key={plant.id} 
                className={`group relative flex flex-col items-center transition-all duration-1000 animate-float ${idx > 2 ? 'hidden sm:flex' : 'flex'}`}
                style={{ 
                  marginBottom: `${plant.stage * 10}px`,
                  animationDelay: `${idx * 0.5}s`
                }}
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

        {/* Environmental Overlay Stats */}
        <div className="absolute top-4 right-4 md:top-10 md:right-10 flex flex-col items-end space-y-3 md:space-y-4 max-w-[calc(100%-2rem)] z-20">
          {metricCards.map((stat, i) => (
            <div key={i} className="bg-white/60 backdrop-blur-xl p-4 md:p-5 rounded-[2rem] border border-white/50 w-full md:w-72 shadow-lg group hover:bg-white/80 transition-all">
               <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#003153]/70">{stat.label}</span>
                  <stat.icon size={14} className="text-[#003153]/60" />
               </div>
               <p className="text-[10px] text-[#003153]/50 mb-3 leading-tight hidden md:block">
                 {stat.desc}
               </p>
               <div className="h-2 w-full bg-gray-100/50 rounded-full overflow-hidden mb-2">
                  <div 
                    className={`h-full bg-gradient-to-r ${stat.color} transition-all duration-[2000ms]`} 
                    style={{ width: `${(stat.value / stat.max) * 100}%` }} 
                  />
               </div>
               <div className="flex justify-between items-end">
                  <p className="text-2xl font-quicksand font-bold text-[#003153] tabular-nums">
                    {isConnected ? Math.round(stat.value) : '--'}<span className="text-xs ml-1">{stat.suffix}</span>
                  </p>
                  <span className={`text-[9px] font-bold uppercase tracking-tighter ${isConnected ? 'text-[#B2AC88]' : 'text-gray-300'}`}>
                    {isConnected ? 'Live Environment' : 'Sync Pending'}
                  </span>
               </div>
            </div>
          ))}
        </div>
      </div>
      
      <footer className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 pb-4">
        {[
          { icon: Leaf, label: 'Neural Oxygenation', value: isConnected ? `${Math.round(metrics.oxygenation)}% Efficiency` : '--', color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { icon: AirIcon, label: 'Breath Sync', value: isConnected ? '14 Cycles/Min' : '--', color: 'text-blue-400', bg: 'bg-blue-50' },
          { icon: Thermometer, label: 'Ambient Clarity', value: 'Excellent (22 AQI)', color: 'text-indigo-400', bg: 'bg-indigo-50' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-4 md:p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-10 h-10 md:w-12 md:h-12 ${item.bg} rounded-xl md:rounded-2xl flex items-center justify-center ${item.color}`}>
               <item.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{item.label}</p>
              <p className="text-sm md:text-lg font-bold text-[#003153]">{item.value}</p>
            </div>
          </div>
        ))}
      </footer>
    </div>
  );
};

export default GardenDashboard;
