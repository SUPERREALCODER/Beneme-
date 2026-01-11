
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  NEUROFEEDBACK = 'NEUROFEEDBACK',
  PATHWAYS = 'PATHWAYS',
  MEDITATION = 'MEDITATION',
  SETTINGS = 'SETTINGS'
}

export interface BrainwaveMetrics {
  alpha: number; // Relaxation
  beta: number;  // Focus
  theta: number; // Meditation/Drowsiness
  delta: number; // Deep sleep
  focusScore: number; // 0-100
  calmScore: number;  // 0-100
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

export interface Challenge {
  id: string;
  title: string;
  description: string;
  metric: 'focus' | 'calm' | 'transition';
  targetValue: number;
  targetDuration: number; // seconds
}

export interface InsightMessage {
  text: string;
  type: 'encouragement' | 'guidance' | 'metric';
}
