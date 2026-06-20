// api/data.ts

export interface Subtitle {
  language: string;
  label: string;
}

export interface AudioTrack {
  language: string;
  label: string;
}

export interface Episode {
  episodeNumber: number;
  title: string;
  durationMinutes: number;
  videoUrl: string;
}

export interface Season {
  seasonNumber: number;
  title: string;
  episodes: Episode[];
}

export interface ReleaseInfo {
  year: number;
  status: 'released' | 'ongoing' | 'upcoming';
  durationMinutes: number;
}

export interface MediaPersona {
  id: string;
  type: 'movie' | 'tv_series';
  title: string;
  subtitle: string;
  description: string;
  trailerUrl: string;
  posterUrl: string;
  genres: string[];
  releaseInfo: ReleaseInfo;
  subtitles: Subtitle[];
  audioTracks: AudioTrack[];
  quality: string[];
  seasons?: Season[]; // Optional because it is ignored if type === "movie"
}

// Your new mock database array
export const mediaCatalog: MediaPersona[] = [
  {
    id: "mv_001",
    type: "movie",
    title: "Neon Rift",
    subtitle: "Beyond the Digital Horizon",
    description: "A cyber-noir thriller where a rogue AI begins rewriting human memories inside a simulated megacity.",
    trailerUrl: "https://cdn.yourapi.com/trailers/neon-rift.mp4",
    posterUrl: "https://cdn.yourapi.com/posters/neon-rift.jpg",
    genres: ["Sci-Fi", "Thriller", "Cyberpunk"],
    releaseInfo: {
      year: 2026,
      status: "upcoming",
      durationMinutes: 128
    },
    subtitles: [
      { language: "en", label: "English" },
      { language: "fr", label: "French" },
      { language: "rw", label: "Kinyarwanda" }
    ],
    audioTracks: [
      { language: "en", label: "Original English" },
      { language: "fr", label: "French Dub" }
    ],
    quality: ["360p", "480p", "720p", "1080p", "4K"]
  }
];