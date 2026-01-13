
import React, { useState } from 'react';
import { BrainwaveMetrics } from '../types';
import { Volume2, VolumeX, Music, Waves, Wind, X } from 'lucide-react';

interface BioMusicPlayerProps {
  metrics: BrainwaveMetrics;
}

const BioMusicPlayer: React.FC<BioMusicPlayerProps> = ({ metrics }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [trackType, setTrackType] = useState<'forest' | 'ocean' | 'celestial'>('forest');
  const [isExpanded, setIsExpanded] = useState(false);

  const getTrackIcon = () => {
    switch (trackType) {
      case 'forest': return <Wind size={20} />;
      case 'ocean': return <Waves size={20} />;
      case 'celestial': return <Music size={20} />;
    }
  };

  const getTrackColor = () => {
    switch (trackType) {
      case 'forest': return 'bg-[#B2AC88]';
      case 'ocean': return 'bg-[#003153]';
      case 'celestial': return 'bg-[#E6E6FA]';
    }
  };

  return (
    <div className={`fixed z-50 transition-all duration-500 ${
      isExpanded 
        ? 'bottom-24 md:bottom-10 left-4 right-4 md:left-auto md:right-10' 
        : 'bottom-24 md:bottom-10 right-6 md:right-10'
    }`}>
      {/* Expanded Controls */}
      {isExpanded && (
        <div className="w-full md:w-auto bg-white/95 backdrop-blur-2xl border border-white/50 p-4 md:p-3 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-center gap-4 md:gap-4 px-6 animate-in slide-in-from-bottom-4 md:slide-in-from-right-4 fade-in duration-300">
          
          <div className="flex items-center w-full md:w-auto justify-between md:justify-start gap-4">
            <div className="flex flex-col">
              <p className="text-[8px] font-extrabold uppercase tracking-widest text-gray-400">Atmosphere</p>
              <p className="text-sm font-bold text-[#003153] capitalize">{trackType}</p>
            </div>
            
            <button 
              onClick={() => setIsExpanded(false)}
              className="md:hidden p-2 text-gray-300 hover:text-gray-500 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="hidden md:block h-8 w-[1px] bg-gray-100 mx-2" />
          <div className="md:hidden w-full h-[1px] bg-gray-100" />

          <div className="flex justify-around w-full md:w-auto gap-3 md:gap-2">
            {[
              { id: 'forest', icon: Wind, color: 'bg-[#B2AC88]', label: 'Forest' },
              { id: 'ocean', icon: Waves, color: 'bg-[#003153]', label: 'Ocean' },
              { id: 'celestial', icon: Music, color: 'bg-[#E6E6FA]', label: 'Space' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setTrackType(item.id as any)}
                className={`flex-1 md:flex-none flex items-center justify-center p-3 md:p-2.5 rounded-2xl transition-all hover:scale-105 ${
                  trackType === item.id 
                    ? `${item.color} text-white shadow-md` 
                    : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                }`}
              >
                <item.icon size={18} />
                <span className="md:hidden ml-2 text-[10px] font-bold uppercase">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="hidden md:block h-8 w-[1px] bg-gray-100 mx-2" />

          <div className="flex items-center gap-4 w-full md:w-auto">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 p-3 md:p-2.5 rounded-2xl transition-all ${
                isMuted 
                  ? 'text-red-400 bg-red-50' 
                  : 'bg-gray-50 text-[#003153] md:bg-transparent md:text-gray-400 hover:text-[#003153] hover:bg-gray-50'
              }`}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              <span className="md:hidden text-[10px] font-bold uppercase">{isMuted ? 'Muted' : 'Sound On'}</span>
            </button>

            <button 
              onClick={() => setIsExpanded(false)}
              className="hidden md:flex p-1.5 text-gray-300 hover:text-gray-500 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Mini Player / Toggle Button */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className={`relative group w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-xl border-2 border-white overflow-hidden ${getTrackColor()}`}
        >
          {/* Animated Ripple for "Running" state */}
          {!isMuted && (
            <>
              <div className="absolute inset-0 bg-white/30 rounded-full animate-ping opacity-20" />
              <div className="absolute inset-2 bg-white/20 rounded-full animate-pulse opacity-40" />
            </>
          )}
          
          <div className={`text-white transition-transform duration-500 ${!isMuted ? 'animate-float' : ''}`}>
            {getTrackIcon()}
          </div>

          {/* Mute Indicator on small icon */}
          {isMuted && (
            <div className="absolute top-0 right-0 p-1">
              <VolumeX size={10} className="text-white opacity-80" />
            </div>
          )}
        </button>
      )}

      {/* Tooltip hint for users - only visible on desktop hover */}
      {!isExpanded && (
        <div className="hidden md:block absolute -top-10 right-0 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full shadow-sm border border-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
           <p className="text-[10px] font-bold text-[#003153]">Tune your atmosphere</p>
        </div>
      )}
    </div>
  );
};

export default BioMusicPlayer;
