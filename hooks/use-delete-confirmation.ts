import { useState } from "react";

interface DeleteConfirmationState {
  isOpen: boolean;
  userId: string | null;
  userName: string | null;
};

export const useDeleteConfirmation = () => {
  const [deleteConfirmation, setDeleteConfirmation] = useState<DeleteConfirmationState>({
    isOpen: false,
    userId: null,
    userName: null
  });

  const [isDeletingUser, setIsDeletingUser] = useState(false);

  const openDeleteConfirmation = (userId: string, userName: string): void => {
    setDeleteConfirmation({
      isOpen: true,
      userId,
      userName
    });
  };

  const closeDeleteConfirmation = (): void => {
    setDeleteConfirmation({
      isOpen: false,
      userId: null,
      userName: null
    });
  };

  const setDeletingState = (isDeleting: boolean): void => {
    setIsDeletingUser(isDeleting);
  };

  return {
    deleteConfirmation,
    isDeletingUser,
    openDeleteConfirmation,
    closeDeleteConfirmation,
    setDeletingState
  };
};