// API Configuration utility for Codespaces and localhost

/**
 * Get the API base URL based on environment
 * Uses VITE_CODESPACE_NAME environment variable if available
 * Falls back to localhost:8000 if not in Codespaces
 * 
 * VITE_CODESPACE_NAME must be defined in .env.local:
 * VITE_CODESPACE_NAME=your-codespace-name
 */
export const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  // If CODESPACE_NAME is defined, use Codespaces URL
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  
  // Fallback to localhost for local development
  return 'http://localhost:8000';
};

/**
 * Get a full API endpoint URL
 * @param {string} path - The API path (e.g., '/api/users')
 * @returns {string} Full API endpoint URL
 */
export const getApiEndpoint = (path) => {
  return `${getApiBaseUrl()}${path}`;
};

export default {
  getApiBaseUrl,
  getApiEndpoint,
};