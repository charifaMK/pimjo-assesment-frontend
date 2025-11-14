// extracts a subset of users for pagination display
export const getPaginatedUsers = (users: any[], startIndex: number, endIndex: number): any[] => {
  return users.slice(startIndex, endIndex);
};

// logs paginated user data for debugging purposes
export const logPaginatedUsers = (users: any[]): void => {
  console.log('paginated users', users);
};

// determines if loading indicator should be displayed
export const shouldShowLoading = (isAuthLoading: boolean, isLoadingUsers: boolean): boolean => {
  return isAuthLoading || isLoadingUsers;
};

// checks if empty state should be shown when no users exist
export const shouldShowNoUsers = (users: any[], isLoadingUsers: boolean): boolean => {
  return !isLoadingUsers && users.length === 0;
};

// formats pagination display text with current range and total count
export const getPaginationText = (startIndex: number, endIndex: number, totalLength: number): string => {
  return `showing ${startIndex + 1} to ${Math.min(endIndex, totalLength)} of ${totalLength}`;
};
