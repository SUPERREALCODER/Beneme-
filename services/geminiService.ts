
import { BrainwaveMetrics } from "../types";

/**
 * DETERMINISTIC INSIGHTS
 * Focused on core mental states: Focus and Calm.
 */
export async function getPersonalizedInsight(metrics: BrainwaveMetrics): Promise<string> {
  if (metrics.calmScore > 85) return "Your internal state is profoundly serene. A perfect moment for deep creative work.";
  if (metrics.focusScore > 80) return "High-frequency engagement detected. You are in a state of peak cognitive flow.";
  if (metrics.calmScore < 40) return "A ripple in your stillness. Try to anchor your awareness on the sensation of your exhale.";
  if (metrics.focusScore < 30) return "Gentle cognitive drift. Use a short breath cycle to bring your presence back to center.";
  
  const defaults = [
    "Your garden thrives as your mind settles.",
    "Presence is the only place where growth occurs.",
    "Each deep breath is a drop of water for your internal garden.",
    "Focus isn't about effort; it's about the absence of distraction."
  ];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

/**
 * RULE-BASED MUSIC RECOMMENDATIONS
 */
export async function getBioMusicRecommendation(metrics: BrainwaveMetrics): Promise<{ tempo: string, instrument: string, mood: string }> {
  if (metrics.calmScore > 70) {
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
        { id: 's2', type: 'meditation', title: 'Deep Stillness', duration: 15, intensity: 'Medium' },
        { id: 's3', type: 'breathing', title: '4-7-8 Centering Cycles', duration: 5, intensity: 'Soft' }
      ]
    };
  }

  return {
    name: "Neural Realignment",
    steps: [
      { id: 'd1', type: 'breathing', title: 'Centering Breath', duration: 3, intensity: 'Medium' },
      { id: 'd2', type: 'music', title: 'Morning Dew', duration: 7, intensity: 'Soft' },
      { id: 'd3', type: 'meditation', title: 'Presence Awareness', duration: 5, intensity: 'Medium' }
    ]
  };
}
