export interface AppContext {
  user: User;
  fetchFibermapAPI: (path: string, options?: RequestInit) => Promise<any>;
}

export interface User {
  email: string;
  role: string;
}

export interface Feature {}

export interface FeaturePanelProps {
  feature: Feature & any;
  context: AppContext;
}
