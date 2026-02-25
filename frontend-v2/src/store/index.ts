/**
 * #108 Refactor: Global Store Index
 * Central entry point for application-wide state management.
 */

// 1. Exporting types for Global State
export interface GlobalState {
  isSidebarOpen: boolean;
  theme: 'light' | 'dark';
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

// 2. Placeholder for Root Provider
// As the app grows, you will wrap your App component in a Provider exported from here.
// Example: export { StoreProvider } from './StoreContext';

/**
 * FUTURE: 
 * If using Zustand: export * from './useStore';
 * If using Redux: export * from './configureStore';
 */

export const INITIAL_STATE: GlobalState = {
  isSidebarOpen: true,
  theme: 'light',
  notifications: [],
};