
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import GardenDashboard from './components/GardenDashboard';
import NeurofeedbackCenter from './components/NeurofeedbackCenter';
import MeditationLibrary from './components/MeditationLibrary';
import BioMusicPlayer from './components/BioMusicPlayer';
import PathwaysView from './components/PathwaysView';
import { AppView, BrainwaveMetrics, GardenPlant } from './types';
import { getPersonalizedInsight } from './services/geminiService';
import { Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.DASHBOARD);
  const [isConnected, setIsConnected] = useState(false);
  const [insight, setInsight] = useState<string>("Your garden is waiting for your attention.");
  
  // Simulated Bio-metrics
  const [metrics, setMetrics] = useState<BrainwaveMetrics>({
    alpha: 45,
    beta: 20,
    theta: 30,
    delta: 5,
    focusScore: 65,
    calmScore: 72
  });

  // Simulated Garden Data
  const [plants] = useState<GardenPlant[]>([
    { id: 'p1', type: 'tree', stage: 2, lastWatered: new Date(), position: { x: 10, y: 0 } },
    { id: 'p2', type: 'flower', stage: 3, lastWatered: new Date(), position: { x: 30, y: 0 } },
    { id: 'p3', type: 'bush', stage: 1, lastWatered: new Date(), position: { x: 50, y: 0 } },
    { id: 'p4', type: 'tree', stage: 1, lastWatered: new Date(), position: { x: 70, y: 0 } },
    { id: 'p5', type: 'flower', stage: 2, lastWatered: new Date(), position: { x: 90, y: 0 } },
  ]);

  // Handle Simulation of real-time data
  useEffect(() => {
    if (isConnected) {
      const interval = setInterval(() => {
        setMetrics(prev => ({
          ...prev,
          focusScore: Math.min(100, Math.max(0, prev.focusScore + (Math.random() * 4 - 2))),
          calmScore: Math.min(100, Math.max(0, prev.calmScore + (Math.random() * 4 - 2))),
          alpha: Math.min(100, Math.max(0, prev.alpha + (Math.random() * 2 - 1))),
          beta: Math.min(100, Math.max(0, prev.beta + (Math.random() * 2 - 1))),
        }));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isConnected]);

  // Fetch Insight via Gemini when metrics significantly change
  useEffect(() => {
    const fetchInsight = async () => {
      try {
        const msg = await getPersonalizedInsight(metrics);
        setInsight(msg);
      } catch (e) {
        console.error("Gemini failed", e);
      }
    };
    
    if (isConnected) {
      const timeout = setTimeout(fetchInsight, 10000);
      return () => clearTimeout(timeout);
    }
  }, [metrics.focusScore, isConnected]);

  const handleConnect = () => {
    setIsConnected(true);
  };

  const renderContent = () => {
    switch (activeView) {
      case AppView.DASHBOARD:
        return <GardenDashboard plants={plants} metrics={metrics} />;
      case AppView.NEUROFEEDBACK:
        return <NeurofeedbackCenter metrics={metrics} onConnect={handleConnect} isConnected={isConnected} />;
      case AppView.PATHWAYS:
        return <PathwaysView metrics={metrics} />;
      case AppView.MEDITATION:
        return <MeditationLibrary />;
      case AppView.SETTINGS:
        return (
          <div className="p-8">
            <h2 className="text-3xl font-quicksand font-bold mb-8 text-[#003153]">System Calibration</h2>
            <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm max-w-2xl">
              <div className="space-y-6">
                 <div className="flex justify-between items-center">
                    <div>
                       <h4 className="font-bold text-[#003153]">Haptic Feedback</h4>
                       <p className="text-sm text-gray-400">Gentle pulses during peak focus</p>
                    </div>
                    <div className="w-12 h-6 bg-[#B2AC88] rounded-full relative">
                       <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
                    </div>
                 </div>
                 <div className="flex justify-between items-center">
                    <div>
                       <h4 className="font-bold text-[#003153]">Privacy Shield</h4>
                       <p className="text-sm text-gray-400">On-device neural processing only</p>
                    </div>
                    <div className="w-12 h-6 bg-[#B2AC88] rounded-full relative">
                       <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        );
      default:
        return <GardenDashboard plants={plants} metrics={metrics} />;
    }
  };

  return (
    <Layout activeView={activeView} setActiveView={setActiveView} isHeadbandConnected={isConnected}>
      {/* Top Banner Insight */}
      <div className="px-8 pt-8">
        <div className="bg-[#E6E6FA]/40 backdrop-blur-md border border-white/50 px-6 py-3 rounded-full flex items-center gap-3 w-fit animate-float shadow-sm">
           <Sparkles size={16} className="text-[#003153]" />
           <span className="text-sm font-medium italic text-[#003153]/80">"{insight}"</span>
        </div>
      </div>

      {renderContent()}
      
      <BioMusicPlayer metrics={metrics} />
    </Layout>
  );
};

export default App;
