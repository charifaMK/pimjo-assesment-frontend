"use client";

import { useCallback } from "react";
import { useUsers } from "@/hooks/use-users";
import { useDeleteConfirmation } from "@/hooks/use-delete-confirmation";
import { usePagination } from "@/hooks/use-pagination";

// custom hook for managing user actions and pagination controls
export const useOverviewActions = (totalUsers: number) => {
  const { deleteUser } = useUsers();
  const pagination = usePagination(totalUsers, 5);
  const { deleteConfirmation, isDeletingUser, openDeleteConfirmation, closeDeleteConfirmation, setDeletingState } = useDeleteConfirmation();

  const handleDeleteClick = useCallback((userId: string, userName: string): void => {
    openDeleteConfirmation(userId, userName);
  }, [openDeleteConfirmation]);

  const handleConfirmDelete = useCallback(async (): Promise<void> => {
    if (!deleteConfirmation.userId) return;
    
    try {
      setDeletingState(true);
      await deleteUser(deleteConfirmation.userId);
      
      // adjust pagination after user deletion if necessary
      pagination.adjustPageAfterDeletion(totalUsers - 1);
    } catch (error) {
      console.error("error deleting user:", error);
    } finally {
      setDeletingState(false);
      closeDeleteConfirmation();
    }
  }, [deleteConfirmation.userId, deleteUser, pagination, totalUsers, setDeletingState, closeDeleteConfirmation]);

  const handleCancelDelete = useCallback((): void => {
    closeDeleteConfirmation();
  }, [closeDeleteConfirmation]);

  return {
    pagination,
    deleteConfirmation,
    isDeletingUser,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete
  };
};