import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'info';
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  onClose,
  duration = 3200,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#202923] text-white text-sm font-medium rounded-lg shadow-xl border border-white/10 transition-all animate-in fade-in slide-in-from-bottom-2"
    >
      {type === 'success' ? (
        <CheckCircle2 className="w-4 h-4 text-[#43AD35] shrink-0" />
      ) : (
        <AlertCircle className="w-4 h-4 text-[#E94F9A] shrink-0" />
      )}
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-white/60 hover:text-white transition-colors p-1"
        aria-label="Tutup notifikasi"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
