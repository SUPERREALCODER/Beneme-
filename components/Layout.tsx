
import React from 'react';
import { AppView } from '../types';
import { Home, Brain, Library, Settings, Wind, Route } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  isHeadbandConnected: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView, isHeadbandConnected }) => {
  const navItems = [
    { id: AppView.DASHBOARD, icon: Home, label: 'Garden' },
    { id: AppView.NEUROFEEDBACK, icon: Brain, label: 'Neuro' },
    { id: AppView.PATHWAYS, icon: Route, label: 'Path' },
    { id: AppView.MEDITATION, icon: Library, label: 'Library' },
    { id: AppView.SETTINGS, icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-[#fdfaf6] overflow-hidden text-[#003153]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-100 flex-col p-6 transition-all duration-300">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-[#B2AC88] rounded-full flex items-center justify-center text-white shadow-lg">
            <Wind size={24} />
          </div>
          <h1 className="text-2xl font-quicksand font-bold tracking-tight text-[#003153]">Beneme</h1>
        </div>

        <nav className="flex-1 space-y-4 w-full">
          {navItems.map((item) => (
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
              <span className="font-medium">{item.label}</span>
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
            <span className="font-medium">
              {isHeadbandConnected ? 'Sync Active' : 'No Headband'}
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto relative bg-[#fdfaf6] pb-24 md:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 flex justify-around items-center p-4 z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeView === item.id ? 'text-[#B2AC88]' : 'text-gray-400'
            }`}
          >
            <item.icon size={20} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
