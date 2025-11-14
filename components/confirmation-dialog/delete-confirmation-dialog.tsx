"use client";

import { ConfirmationDialog } from './confirmation-dialog';
import { getConfirmationConfig } from '@/lib/confirmation-dialog-utils';

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  userName?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const DeleteConfirmationDialog = ({ 
  isOpen, 
  userName, 
  onConfirm, 
  onCancel 
}: DeleteConfirmationDialogProps) => {
  const config = getConfirmationConfig('remove', userName);

  return (
    <ConfirmationDialog
      isOpen={isOpen}
      onClose={onCancel}
      onConfirm={onConfirm}
      title={config.title}
      message={config.message}
      userName={userName}
      icon={config.icon}
      cancelText="Cancel"
      confirmText={config.confirmText}
      confirmVariant={config.confirmVariant}
    />
  );
};