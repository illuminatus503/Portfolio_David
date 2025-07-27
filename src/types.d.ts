// Type definitions for David Fernández-Cuenca Portfolio

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export interface AppContextType {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  language: 'es' | 'en';
  setLanguage: (language: 'es' | 'en') => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export interface GitHubProject {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  topics: string[];
}

export interface GitHubData {
  repos: number;
  stars: number;
  commits: number;
}

export interface FeaturedProject {
  title: string;
  brief: string;
  more: string;
  tags: string[];
  url: string;
}

export interface Skill {
  icon: string;
  name: string;
  description: string;
  details: string;
}

export interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FormStatus {
  type: 'success' | 'error' | '';
  message: string;
}

export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
} 