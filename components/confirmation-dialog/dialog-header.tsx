import { X } from 'lucide-react';

interface DialogHeaderProps {
  onClose: () => void;
};

export const DialogHeader = ({ onClose }: DialogHeaderProps) => {
  return (
    <button 
      onClick={onClose} 
      className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
      aria-label="Close dialog"
    >
      <X className="w-5 h-5" />
    </button>
  );
};