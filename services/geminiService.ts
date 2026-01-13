
import { BrainwaveMetrics } from "../types";

/**
 * DETERMINISTIC INSIGHTS
 * Focused on Environmental & Biological harmony.
 */
export async function getPersonalizedInsight(metrics: BrainwaveMetrics): Promise<string> {
  if (metrics.aqi < 30) return "Exceptional air quality today. Your brain is receiving optimal oxygen for deep focus.";
  if (metrics.aqi > 100) return "The atmosphere is heavy. Use the 'Ocean Breath' meditation to filter your internal state.";
  if (metrics.calmScore > 85) return "Your inner silence matches the clarity of your surroundings.";
  if (metrics.calmScore < 40) return "Stress is a cloud; breathing is the wind that moves it. Focus on long exhales.";
  
  const defaults = [
    "Clean air is the first step toward a quiet mind.",
    "Breathe deep. Your environment is currently in sync with your biology.",
    "Presence begins with the simple act of noticing the air around you.",
    "The rhythm of your breath dictates the pace of your thoughts."
  ];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

/**
 * RULE-BASED MUSIC RECOMMENDATIONS
 */
export async function getBioMusicRecommendation(metrics: BrainwaveMetrics): Promise<{ tempo: string, instrument: string, mood: string }> {
  if (metrics.aqi < 50) {
    return { tempo: "adagio", instrument: "ambient-piano", mood: "serene" };
  } else {
    return { tempo: "slow", instrument: "cello", mood: "grounded" };
  }
}

/**
 * KEYWORD-BASED PATHWAY GENERATOR
 */
export async function generatePathway(goal: string, metrics: BrainwaveMetrics): Promise<any> {
  const normalizedGoal = goal.toLowerCase();
  await new Promise(resolve => setTimeout(resolve, 800));

  if (normalizedGoal.includes('sleep') || normalizedGoal.includes('night')) {
    return {
      name: "The Lunar Descent",
      steps: [
        { id: 's1', type: 'music', title: 'Celestial Resonance', duration: 10, intensity: 'Soft' },
        { id: 's2', type: 'meditation', title: 'Atmospheric Ease', duration: 15, intensity: 'Medium' },
        { id: 's3', type: 'breathing', title: '4-7-8 Purifying Cycles', duration: 5, intensity: 'Soft' }
      ]
    };
  }

  return {
    name: "Environmental Alignment",
    steps: [
      { id: 'd1', type: 'breathing', title: 'Centering Breath', duration: 3, intensity: 'Medium' },
      { id: 'd2', type: 'music', title: 'Morning Dew', duration: 7, intensity: 'Soft' },
      { id: 'd3', type: 'meditation', title: 'Oxygen Awareness', duration: 5, intensity: 'Medium' }
    ]
  };
}
