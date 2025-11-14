"use client";

import { JSX } from "react";
import { Card } from "@/components/ui/card";
import { DeleteConfirmationDialog } from "@/components/confirmation-dialog/delete-confirmation-dialog";
import { 
  LoadingSpinner,
  StatsCards,
  SearchAndFilter,
  TableHeader,
  UserRow,
  PaginationControls
} from "@/components/overview";
import { useOverviewAuth } from "@/hooks/use-overview-auth";
import { useOverviewSearch } from "@/hooks/use-overview-search";
import { useOverviewActions } from "@/hooks/use-overview-actions";
import { useUsers } from "@/hooks/use-users";
import { getPageNumbers } from "@/utils/overviewUtils";
import { 
  getPaginatedUsers, 
  logPaginatedUsers, 
  shouldShowLoading, 
  shouldShowNoUsers
} from "@/overviewHelpers";

export default function OverviewPage(): JSX.Element | null {
  const { isAuthLoading, shouldRender } = useOverviewAuth();
  const { isLoadingUsers } = useUsers();
  const { searchQuery, setSearchQuery, filteredUsers } = useOverviewSearch();
  const {
    pagination,
    deleteConfirmation,
    isDeletingUser,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete
  } = useOverviewActions(filteredUsers.length);

  // show loading state while checking auth
  if (isAuthLoading) {
    return <LoadingSpinner />;
  }

  // don't render if not authenticated
  if (!shouldRender) {
    return null;
  }

  const paginatedUsers = getPaginatedUsers(filteredUsers, pagination.startIndex, pagination.endIndex);
  const pageNumbers = getPageNumbers(pagination.currentPage, pagination.totalPages);

  // log paginated users for debugging
  logPaginatedUsers(paginatedUsers);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-8 py-8">
        <StatsCards />

        <Card>
          <SearchAndFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          <div className="overflow-x-auto">
            {shouldShowLoading(isAuthLoading, isLoadingUsers) ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">loading users...</p>
                </div>
              </div>
            ) : shouldShowNoUsers(filteredUsers, isLoadingUsers) ? (
              <div className="flex items-center justify-center py-12">
                <p className="text-gray-500">no users found</p>
              </div>
            ) : (
              <table className="w-full">
                <TableHeader />
                <tbody>
                  {paginatedUsers.map((user) => (
                    <UserRow
                      key={user.dealId}
                      user={user}
                      onDeleteClick={handleDeleteClick}
                      isDeletingUser={isDeletingUser}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {!shouldShowLoading(isAuthLoading, isLoadingUsers) && filteredUsers.length > 0 && (
            <PaginationControls
              pagination={pagination}
              pageNumbers={pageNumbers}
              totalUsers={filteredUsers.length}
            />
          )}
        </Card>
      </main>

      <DeleteConfirmationDialog
        isOpen={deleteConfirmation.isOpen}
        userName={deleteConfirmation.userName || undefined}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};