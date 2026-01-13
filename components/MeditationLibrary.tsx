
import React from 'react';
import { MOCK_MEDITATIONS } from '../constants';
import { Play, Clock, Heart } from 'lucide-react';

const MeditationLibrary: React.FC = () => {
  const categories = ['All', 'Focus', 'Stress Relief', 'Sleep', 'Deep Relaxation'];

  return (
    <div className="p-4 md:p-8 h-full">
      <header className="mb-6 md:mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-quicksand font-bold text-[#003153] mb-2">Neural Archive</h2>
          <p className="text-gray-500 text-sm">Curated paths for your neural evolution.</p>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button key={cat} className={`px-5 py-2 rounded-full whitespace-nowrap text-xs font-bold uppercase tracking-tight transition-all ${
              cat === 'All' ? 'bg-[#003153] text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-100 hover:bg-gray-50'
            }`}>
              {cat}
            </button>
          ))}
        </div>
      </header>

      <section className="space-y-12">
        {['Featured Journeys', 'Morning Rituals'].map((rowTitle) => (
          <div key={rowTitle}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl md:text-2xl font-quicksand font-bold text-[#003153]">{rowTitle}</h3>
              <button className="text-xs font-bold text-[#B2AC88] hover:underline uppercase tracking-widest">Explore All</button>
            </div>
            
            <div className="flex gap-4 md:gap-8 overflow-x-auto pb-6 no-scrollbar px-1">
              {MOCK_MEDITATIONS.map((session) => (
                <div key={session.id} className="min-w-[260px] md:min-w-[320px] group cursor-pointer">
                  <div className="relative aspect-[4/3] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden mb-4 shadow-xl">
                    <img 
                      src={session.thumbnail} 
                      alt={session.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                    
                    <button className="absolute bottom-6 right-6 w-12 h-12 md:w-14 md:h-14 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-[#003153] opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                      <Play fill="currentColor" size={20} />
                    </button>
                    
                    <div className="absolute top-6 left-6 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold uppercase tracking-widest text-[#003153]">
                       {session.intensity}
                    </div>
                  </div>
                  
                  <div className="px-2">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-quicksand font-bold text-lg md:text-xl">{session.title}</h4>
                      <Heart size={16} className="text-gray-300 hover:text-red-400 transition-colors" />
                    </div>
                    <div className="flex items-center gap-4 text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-tighter">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        {session.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        {session.category}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default MeditationLibrary;
