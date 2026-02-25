import React, { useEffect } from 'react';
import { cn } from '@/lib';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  onClose: (id: string) => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ 
  id, 
  message, 
  type, 
  onClose, 
  duration = 5000 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, onClose, duration]);

  const styles = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  const icons = {
    success: "✅",
    error: "❌",
    info: "ℹ️",
  };

  return (
    <div 
      className={cn(
        "flex items-center gap-3 p-4 rounded-lg border shadow-lg min-w-[300px] animate-in slide-in-from-right-full",
        styles[type]
      )}
      role="alert"
    >
      <span className="text-xl">{icons[type]}</span>
      <div className="flex-1 text-sm font-medium">{message}</div>
      <button 
        onClick={() => onClose(id)}
        className="text-gray-400 hover:text-gray-600 transition"
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
};