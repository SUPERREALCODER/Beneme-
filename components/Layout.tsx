
import React from 'react';
import { AppView } from '../types';
import { Home, Brain, Library, Settings, Trees as Garden, Wind, Route } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  isHeadbandConnected: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView, isHeadbandConnected }) => {
  return (
    <div className="flex h-screen w-full bg-[#fdfaf6] overflow-hidden text-[#003153]">
      {/* Sidebar Navigation */}
      <aside className="w-24 md:w-64 bg-white border-r border-gray-100 flex flex-col p-6 items-center md:items-start transition-all duration-300">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-[#B2AC88] rounded-full flex items-center justify-center text-white shadow-lg">
            <Wind size={24} />
          </div>
          <h1 className="hidden md:block text-2xl font-quicksand font-bold tracking-tight text-[#003153]">Beneme</h1>
        </div>

        <nav className="flex-1 space-y-4 w-full">
          {[
            { id: AppView.DASHBOARD, icon: Home, label: 'Garden' },
            { id: AppView.NEUROFEEDBACK, icon: Brain, label: 'Neuro Center' },
            { id: AppView.PATHWAYS, icon: Route, label: 'My Path' },
            { id: AppView.MEDITATION, icon: Library, label: 'Library' },
            { id: AppView.SETTINGS, icon: Settings, label: 'Settings' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 ${
                activeView === item.id 
                  ? 'bg-[#B2AC88] text-white shadow-md transform scale-105' 
                  : 'text-gray-400 hover:bg-gray-50 hover:text-[#003153]'
              }`}
            >
              <item.icon size={24} />
              <span className="hidden md:block font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto w-full">
          <div className={`p-4 rounded-3xl text-sm flex items-center gap-3 transition-colors ${
            isHeadbandConnected ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'
          }`}>
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              isHeadbandConnected ? 'bg-green-500' : 'bg-orange-500'
            }`} />
            <span className="hidden md:block font-medium">
              {isHeadbandConnected ? 'Sync Active' : 'No Headband'}
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto relative bg-[#fdfaf6]">
        {children}
      </main>
    </div>
  );
};

export default Layout;
