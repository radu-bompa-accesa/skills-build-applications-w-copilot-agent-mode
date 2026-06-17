// API Configuration for Codespaces and localhost

export const getApiBaseUrl = (): string => {
  // Check if we're running in Codespaces
  if (typeof process !== 'undefined' && process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
  }
  
  // Fallback to localhost for local development
  return 'http://localhost:8000';
};

export const API_ENDPOINTS = {
  USERS: `${getApiBaseUrl()}/api/users`,
  ACTIVITIES: `${getApiBaseUrl()}/api/activities`,
  TEAMS: `${getApiBaseUrl()}/api/teams`,
  WORKOUTS: `${getApiBaseUrl()}/api/workouts`,
  LEADERBOARD: `${getApiBaseUrl()}/api/leaderboard`,
  HEALTH: `${getApiBaseUrl()}/api/health`,
};

export default {
  getApiBaseUrl,
  API_ENDPOINTS,
};