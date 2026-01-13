
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  MEDITATION_SESSION = 'MEDITATION_SESSION',
  APPOINTMENTS = 'APPOINTMENTS',
  PATHWAYS = 'PATHWAYS',
  MEDITATION_LIBRARY = 'MEDITATION_LIBRARY'
}

export interface BrainwaveMetrics {
  alpha: number; // Relaxation
  beta: number;  // Focus
  theta: number; // Meditation/Drowsiness
  delta: number; // Deep sleep
  focusScore: number; // 0-100
  calmScore: number;  // 0-100
  aqi: number;        // 0-500 (standard AQI)
  oxygenation: number; // 0-100 (simulated biological benefit)
}

export interface GardenPlant {
  id: string;
  type: 'flower' | 'tree' | 'bush';
  stage: number; // 0 to 3
  lastWatered: Date;
  position: { x: number; y: number };
}

export interface MeditationSession {
  id: string;
  title: string;
  duration: string;
  category: string;
  thumbnail: string;
  audioUrl: string;
  intensity: 'Soft' | 'Medium' | 'Deep';
}

export interface PathwayStep {
  id: string;
  type: 'music' | 'meditation' | 'breathing';
  title: string;
  duration: number; // minutes
  intensity: string;
}

export interface Pathway {
  id: string;
  name: string;
  goal: string;
  steps: PathwayStep[];
}

export interface MeditationMode {
  id: string;
  title: string;
  description: string;
  targetMetric: 'focus' | 'calm';
  duration: number; // minutes
}

export interface InsightMessage {
  text: string;
  type: 'encouragement' | 'guidance' | 'metric';
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  metric: 'focus' | 'calm' | 'transition';
  targetValue: number;
  targetDuration: number; // duration in seconds
}
