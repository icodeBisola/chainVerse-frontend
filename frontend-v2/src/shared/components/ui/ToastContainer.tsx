import React from 'react';
import { Toast, ToastType } from './Toast';

// In a real app, use the Global Store (#108) to trigger these
export const ToastContainer: React.FC<{ 
  toasts: Array<{ id: string; message: string; type: ToastType }> 
  removeToast: (id: string) => void
}> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-3">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={removeToast} />
      ))}
    </div>
  );
};