
import React, { useState, useEffect, useRef } from 'react';
import Layout from './components/Layout';
import GardenDashboard from './components/GardenDashboard';
import MeditationSetup from './components/MeditationSetup';
import MeditationLibrary from './components/MeditationLibrary';
import BioMusicPlayer from './components/BioMusicPlayer';
import PathwaysView from './components/PathwaysView';
import AppointmentsView from './components/AppointmentsView';
import { AppView, BrainwaveMetrics, GardenPlant } from './types';
import { getPersonalizedInsight } from './services/geminiService';
import { Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.DASHBOARD);
  const [isConnected, setIsConnected] = useState(false);
  const [insight, setInsight] = useState<string>("Your garden is waiting for your attention.");
  const lastInsightUpdate = useRef<number>(0);
  
  // Initial state includes zeroed environmentals
  const [metrics, setMetrics] = useState<BrainwaveMetrics>({
    alpha: 0,
    beta: 0,
    theta: 0,
    delta: 0,
    focusScore: 0,
    calmScore: 0,
    aqi: 22, // Default "good" baseline
    oxygenation: 0
  });

  // Simulated Garden Data
  const [plants] = useState<GardenPlant[]>([
    { id: 'p1', type: 'tree', stage: 2, lastWatered: new Date(), position: { x: 10, y: 0 } },
    { id: 'p2', type: 'flower', stage: 3, lastWatered: new Date(), position: { x: 30, y: 0 } },
    { id: 'p3', type: 'bush', stage: 1, lastWatered: new Date(), position: { x: 50, y: 0 } },
    { id: 'p4', type: 'tree', stage: 1, lastWatered: new Date(), position: { x: 70, y: 0 } },
    { id: 'p5', type: 'flower', stage: 2, lastWatered: new Date(), position: { x: 90, y: 0 } },
  ]);

  // Handle Simulation of real-time data only when connected
  useEffect(() => {
    if (isConnected) {
      setMetrics(prev => ({
        ...prev,
        alpha: 45,
        beta: 20,
        theta: 30,
        delta: 5,
        focusScore: 65,
        calmScore: 72,
        oxygenation: 88,
        aqi: 22
      }));

      const interval = setInterval(() => {
        setMetrics(prev => ({
          ...prev,
          focusScore: Math.min(100, Math.max(0, prev.focusScore + (Math.random() * 4 - 2))),
          calmScore: Math.min(100, Math.max(0, prev.calmScore + (Math.random() * 4 - 2))),
          aqi: Math.min(200, Math.max(10, prev.aqi + (Math.random() * 2 - 1))),
          oxygenation: Math.min(100, Math.max(0, 95 - (prev.aqi / 10))), // Correlation: high AQI drops oxygenation efficiency
        }));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isConnected]);

  // Fetch Insight periodically
  useEffect(() => {
    const fetchInsight = async () => {
      const now = Date.now();
      if (now - lastInsightUpdate.current < 8000) return;
      
      try {
        const msg = await getPersonalizedInsight(metrics);
        setInsight(msg);
        lastInsightUpdate.current = now;
      } catch (e) {
        console.error("Insight generation failed", e);
      }
    };
    
    if (isConnected) {
      fetchInsight();
    }
  }, [metrics, isConnected]);

  const handleConnect = () => {
    setIsConnected(true);
  };

  const renderContent = () => {
    switch (activeView) {
      case AppView.DASHBOARD:
        return <GardenDashboard plants={plants} metrics={metrics} isConnected={isConnected} onConnect={handleConnect} />;
      case AppView.MEDITATION_SESSION:
        return <MeditationSetup metrics={metrics} onConnect={handleConnect} isConnected={isConnected} />;
      case AppView.PATHWAYS:
        return <PathwaysView metrics={metrics} />;
      case AppView.MEDITATION_LIBRARY:
        return <MeditationLibrary />;
      case AppView.APPOINTMENTS:
        return <AppointmentsView />;
      default:
        return <GardenDashboard plants={plants} metrics={metrics} isConnected={isConnected} onConnect={handleConnect} />;
    }
  };

  return (
    <Layout activeView={activeView} setActiveView={setActiveView} isHeadbandConnected={isConnected}>
      {/* Top Banner Insight - Linking Environment to Calm */}
      <div className="px-4 md:px-8 pt-4 md:pt-8">
        <div className="bg-[#E6E6FA]/40 backdrop-blur-md border border-white/50 px-4 md:px-6 py-2 md:py-3 rounded-full flex items-center gap-3 w-fit animate-float shadow-sm">
           <Sparkles size={14} className="text-[#003153]" />
           <span className="text-xs md:text-sm font-medium italic text-[#003153]/80">
            "{isConnected ? insight : "Your garden senses the atmosphere. Are you ready?"}"
           </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
      
      <BioMusicPlayer metrics={metrics} />
    </Layout>
  );
};

export default App;
