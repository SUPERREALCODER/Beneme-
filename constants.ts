
import { MeditationSession } from './types';

export const COLORS = {
  ocean: '#003153',
  sage: '#B2AC88',
  lavender: '#E6E6FA',
  sand: '#F5DEB3',
  softWhite: '#fdfaf6'
};

export const MOCK_MEDITATIONS: MeditationSession[] = [
  {
    id: '1',
    title: 'Morning Dew Whispers',
    duration: '10 min',
    category: 'Focus',
    thumbnail: 'https://picsum.photos/seed/med1/400/300',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    intensity: 'Soft'
  },
  {
    id: '2',
    title: 'The Infinite Shore',
    duration: '15 min',
    category: 'Relaxation',
    thumbnail: 'https://picsum.photos/seed/med2/400/300',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    intensity: 'Medium'
  },
  {
    id: '3',
    title: 'Neural Bloom',
    duration: '20 min',
    category: 'Neuro-Sync',
    thumbnail: 'https://picsum.photos/seed/med3/400/300',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    intensity: 'Deep'
  },
  {
    id: '4',
    title: 'Forest Canopy Bath',
    duration: '12 min',
    category: 'Stress Relief',
    thumbnail: 'https://picsum.photos/seed/med4/400/300',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    intensity: 'Soft'
  },
  {
    id: '5',
    title: 'Cosmic Drift',
    duration: '30 min',
    category: 'Sleep',
    thumbnail: 'https://picsum.photos/seed/med5/400/300',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    intensity: 'Medium'
  }
];
