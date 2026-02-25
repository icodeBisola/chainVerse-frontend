import React, { useState } from 'react';
import { authService } from '../services/auth.service';
import { LoginCredentials } from '../types/auth.types';

export const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In a real app: const response = await api.post('/login', credentials);
      // authService.saveToken(response.token);
      console.log('Logging in with:', credentials);
      authService.saveToken('dummy-token'); 
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto p-8 border rounded">
        <h1 className="text-xl font-bold">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input 
          type="email" 
          placeholder="Email"
          className="border p-2 rounded"
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        />
        <input 
          type="password" 
          placeholder="Password"
          className="border p-2 rounded"
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Sign In</button>
      </form>
    </div>
  );
};