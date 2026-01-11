
import { BrainwaveMetrics, Pathway } from "../types";

/**
 * DETERMINISTIC INSIGHTS
 * Replaces AI generation with a library of curated poetic reflections based on metrics.
 */
export async function getPersonalizedInsight(metrics: BrainwaveMetrics): Promise<string> {
  if (metrics.calmScore > 85) return "Your inner silence is a vast and welcoming ocean.";
  if (metrics.focusScore > 85) return "Your attention is a bright beam of light, steady and clear.";
  if (metrics.calmScore < 40) return "Gently return to your breath; even the storm moves across the sky.";
  if (metrics.focusScore < 40) return "Let your thoughts drift like clouds until they find their own path.";
  
  const defaults = [
    "Your inner garden is thriving in its own time.",
    "Presence is the only place where life happens.",
    "Be as you are, and you will find the peace you seek.",
    "The rhythm of your mind is a unique melody."
  ];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

/**
 * RULE-BASED MUSIC RECOMMENDATIONS
 */
export async function getBioMusicRecommendation(metrics: BrainwaveMetrics): Promise<{ tempo: string, instrument: string, mood: string }> {
  if (metrics.calmScore > 70) {
    return { tempo: "adagio", instrument: "ambient-piano", mood: "serene" };
  } else if (metrics.focusScore > 70) {
    return { tempo: "moderato", instrument: "warm-synth", mood: "energetic" };
  }
  return { tempo: "slow", instrument: "cello", mood: "grounded" };
}

/**
 * KEYWORD-BASED PATHWAY GENERATOR
 * Replaces LLM logic with a structured mapping of user goals to wellness sequences.
 */
export async function generatePathway(goal: string, metrics: BrainwaveMetrics): Promise<any> {
  const normalizedGoal = goal.toLowerCase();
  
  // Simulation of a small delay to maintain the "curation" feel
  await new Promise(resolve => setTimeout(resolve, 800));

  if (normalizedGoal.includes('sleep') || normalizedGoal.includes('night') || normalizedGoal.includes('wind down')) {
    return {
      name: "The Lunar Descent",
      steps: [
        { id: 's1', type: 'music', title: 'Celestial Resonance', duration: 10, intensity: 'Soft' },
        { id: 's2', type: 'meditation', title: 'The Infinite Shore', duration: 15, intensity: 'Medium' },
        { id: 's3', type: 'breathing', title: '4-7-8 Rhythmic Cycles', duration: 5, intensity: 'Soft' }
      ]
    };
  }

  if (normalizedGoal.includes('work') || normalizedGoal.includes('focus') || normalizedGoal.includes('study')) {
    return {
      name: "Neural Peak Flow",
      steps: [
        { id: 'f1', type: 'music', title: 'Binaural Alpha Waves', duration: 20, intensity: 'Medium' },
        { id: 'f2', type: 'breathing', title: 'Box Breathing', duration: 5, intensity: 'Medium' },
        { id: 'f3', type: 'meditation', title: 'Focused Observation', duration: 10, intensity: 'Deep' }
      ]
    };
  }

  if (normalizedGoal.includes('stress') || normalizedGoal.includes('anxiety') || normalizedGoal.includes('calm')) {
    return {
      name: "The Anchor's Peace",
      steps: [
        { id: 'a1', type: 'breathing', title: 'Ocean Breath', duration: 5, intensity: 'Soft' },
        { id: 'a2', type: 'music', title: 'Forest Canopy Bath', duration: 15, intensity: 'Soft' },
        { id: 'a3', type: 'meditation', title: 'Loving Kindness', duration: 10, intensity: 'Soft' }
      ]
    };
  }

  // Default "Quick Reset" Pathway
  return {
    name: "A Moment of Grace",
    steps: [
      { id: 'd1', type: 'breathing', title: 'Centering Breath', duration: 3, intensity: 'Medium' },
      { id: 'd2', type: 'music', title: 'Morning Dew', duration: 7, intensity: 'Soft' },
      { id: 'd3', type: 'meditation', title: 'Gratitude Scan', duration: 5, intensity: 'Medium' }
    ]
  };
}
