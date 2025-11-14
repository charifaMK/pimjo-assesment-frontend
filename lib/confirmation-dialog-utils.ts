export type ConfirmationType = 'delete' | 'remove' | 'archive' | 'restore';

interface ConfirmationMessageConfig {
  title: string;
  message: string;
  confirmText: string;
  icon: 'warning' | 'error' | 'info';
  confirmVariant: 'primary' | 'danger';
}

const confirmationConfigs: Record<ConfirmationType, Omit<ConfirmationMessageConfig, 'title'>> = {
  delete: {
    message: 'Are you sure you want to delete {itemName}? This action cannot be undone and all associated data will be permanently removed.',
    confirmText: 'Delete',
    icon: 'error',
    confirmVariant: 'danger',
  },
  remove: {
    message: 'Are you sure you want to remove {itemName}? This action cannot be undone and access will be permanently revoked.',
    confirmText: 'Remove',
    icon: 'warning',
    confirmVariant: 'danger',
  },
  archive: {
    message: 'Are you sure you want to archive {itemName}? You can restore it later if needed.',
    confirmText: 'Archive',
    icon: 'info',
    confirmVariant: 'primary',
  },
  restore: {
    message: 'Are you sure you want to restore {itemName}? It will be available for use again.',
    confirmText: 'Restore',
    icon: 'info',
    confirmVariant: 'primary',
  },
};

export const getConfirmationConfig = (
  type: ConfirmationType, 
  itemName?: string
): ConfirmationMessageConfig => {
  const config = confirmationConfigs[type];
  const title = `${type.charAt(0).toUpperCase() + type.slice(1)} Confirmation`;
  
  return {
    title,
    message: itemName ? config.message.replace('{itemName}', itemName) : config.message.replace('{itemName}', 'this item'),
    confirmText: config.confirmText,
    icon: config.icon,
    confirmVariant: config.confirmVariant,
  };
};