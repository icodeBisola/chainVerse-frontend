/**
 * #100 Refactor: Auth Service
 * Manages authentication state, token storage, and API interaction.
 */

const TOKEN_KEY = 'auth_token';

export const authService = {
  /**
   * Returns the stored JWT token
   */
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Saves the token to local storage
   */
  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  /**
   * Removes token and clears auth state
   */
  logout: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    // Optional: window.location.href = '/login';
  },

  /**
   * Helper to generate Authorization headers for fetch/axios
   */
  getAuthHeaders: (): Record<string, string> => {
    const token = authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  /**
   * Placeholder for future API integration
   */
  isAuthenticated: (): boolean => {
    const token = authService.getToken();
    // In a real app, you would also validate token expiration (JWT decoding)
    return !!token;
  }
};