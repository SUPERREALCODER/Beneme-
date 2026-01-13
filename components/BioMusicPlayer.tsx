
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
    <div className="fixed bottom-20 md:bottom-10 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] md:w-auto">
      <div className="bg-white/80 backdrop-blur-2xl border border-white/50 p-2 md:p-4 rounded-full shadow-2xl flex items-center justify-between md:justify-start gap-3 md:gap-6 px-4 md:px-8">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#B2AC88]/20 flex items-center justify-center text-[#B2AC88]">
            {trackType === 'forest' && <Wind size={16} />}
            {trackType === 'ocean' && <Waves size={16} />}
            {trackType === 'celestial' && <Music size={16} />}
          </div>
          <div className="hidden sm:block">
            <p className="text-[8px] font-bold uppercase tracking-widest text-gray-400">Bio-Music</p>
            <p className="text-xs font-bold text-[#003153] capitalize">{trackType}</p>
          </div>
        </div>

        <div className="h-6 w-[1px] bg-gray-100 hidden sm:block" />

        <div className="flex gap-1 md:gap-2">
          {[
            { id: 'forest', icon: Wind, color: 'bg-[#B2AC88]' },
            { id: 'ocean', icon: Waves, color: 'bg-[#003153]' },
            { id: 'celestial', icon: Music, color: 'bg-[#E6E6FA]' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setTrackType(item.id as any)}
              className={`p-2 rounded-full transition-all ${trackType === item.id ? `${item.color} text-white` : 'text-gray-400 hover:bg-gray-50'}`}
            >
              <item.icon size={16} />
            </button>
          ))}
        </div>

        <div className="h-6 w-[1px] bg-gray-100" />

        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="p-2 text-gray-400 hover:text-[#003153]"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </div>
  );
};

export default BioMusicPlayer;
