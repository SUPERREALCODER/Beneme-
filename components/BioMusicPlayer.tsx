
import React, { useState } from 'react';
import { BrainwaveMetrics } from '../types';
import { Volume2, VolumeX, Music, Waves, Wind } from 'lucide-react';

interface BioMusicPlayerProps {
  metrics: BrainwaveMetrics;
}

const BioMusicPlayer: React.FC<BioMusicPlayerProps> = ({ metrics }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [trackType, setTrackType] = useState<'forest' | 'ocean' | 'celestial'>('forest');

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white/70 backdrop-blur-2xl border border-white/50 p-4 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center gap-6 px-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#B2AC88]/20 flex items-center justify-center text-[#B2AC88]">
            {trackType === 'forest' && <Wind size={20} />}
            {trackType === 'ocean' && <Waves size={20} />}
            {trackType === 'celestial' && <Music size={20} />}
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Bio-Music Engine</p>
            <p className="text-sm font-bold text-[#003153] capitalize">{trackType} Resonance</p>
          </div>
        </div>

        <div className="h-8 w-[1px] bg-gray-100" />

        <div className="flex gap-2">
          <button 
            onClick={() => setTrackType('forest')}
            className={`p-2 rounded-full transition-all ${trackType === 'forest' ? 'bg-[#B2AC88] text-white' : 'text-gray-400 hover:bg-gray-50'}`}
          >
            <Wind size={18} />
          </button>
          <button 
            onClick={() => setTrackType('ocean')}
            className={`p-2 rounded-full transition-all ${trackType === 'ocean' ? 'bg-[#003153] text-white' : 'text-gray-400 hover:bg-gray-50'}`}
          >
            <Waves size={18} />
          </button>
          <button 
            onClick={() => setTrackType('celestial')}
            className={`p-2 rounded-full transition-all ${trackType === 'celestial' ? 'bg-[#E6E6FA] text-white' : 'text-gray-400 hover:bg-gray-50'}`}
          >
            <Music size={18} />
          </button>
        </div>

        <div className="h-8 w-[1px] bg-gray-100" />

        <div className="flex items-center gap-3">
           <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 text-gray-400 hover:text-[#003153] transition-colors"
           >
             {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
           </button>
           
           <div className="hidden md:flex gap-1 items-end h-6 w-12">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1 bg-[#B2AC88] rounded-full transition-all duration-300"
                  style={{ 
                    height: isMuted ? '4px' : `${20 + Math.random() * (metrics.focusScore / 2)}%`,
                    opacity: 0.3 + (i * 0.15)
                  }}
                />
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default BioMusicPlayer;
