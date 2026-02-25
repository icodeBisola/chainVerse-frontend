import React from 'react';
import { LoginPage } from '@/features/auth/pages/LoginPage';

/**
 * #102 Refactor: Login Route is now a thin wrapper.
 */
const LoginRoute: React.FC = () => {
  return <LoginPage />;
};

export default LoginRoute;