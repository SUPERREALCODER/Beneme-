
import React from 'react';
import { MOCK_MEDITATIONS } from '../constants';
import { Play, Clock, Heart } from 'lucide-react';

const MeditationLibrary: React.FC = () => {
  const categories = ['All', 'Focus', 'Stress Relief', 'Sleep', 'Deep Relaxation'];

  return (
    <div className="p-8 h-full">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-quicksand font-bold text-[#003153] mb-2">Knowledge & Peace</h2>
          <p className="text-gray-500">Curated paths for your neural evolution.</p>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button key={cat} className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
              cat === 'All' ? 'bg-[#003153] text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-100 hover:bg-gray-50'
            }`}>
              {cat}
            </button>
          ))}
        </div>
      </header>

      <section className="space-y-12">
        {['Featured Journeys', 'Recently Discovered', 'Morning Rituals'].map((rowTitle) => (
          <div key={rowTitle}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-quicksand font-bold text-[#003153]">{rowTitle}</h3>
              <button className="text-sm font-bold text-[#B2AC88] hover:underline">Explore All</button>
            </div>
            
            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
              {MOCK_MEDITATIONS.map((session) => (
                <div key={session.id} className="min-w-[280px] md:min-w-[340px] group cursor-pointer">
                  <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden mb-4 shadow-xl">
                    <img 
                      src={session.thumbnail} 
                      alt={session.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    
                    <button className="absolute bottom-6 right-6 w-14 h-14 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-[#003153] opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <Play fill="currentColor" size={24} />
                    </button>
                    
                    <div className="absolute top-6 left-6 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold uppercase tracking-widest">
                       {session.intensity}
                    </div>
                  </div>
                  
                  <div className="px-4">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-quicksand font-bold text-xl">{session.title}</h4>
                      <Heart size={18} className="text-gray-300 hover:text-red-400 transition-colors" />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
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
