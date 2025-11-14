"use client";

import { useState, useMemo } from "react";
import { useUsers } from "@/hooks/use-users";

// custom hook for search and filter operations
export const useOverviewSearch = () => {
  const { users } = useUsers();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) {
      return users;
    }

    const query = searchQuery.toLowerCase();
    return users.filter((user) => 
      user.customer.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.product.toLowerCase().includes(query) ||
      user.dealId.toLowerCase().includes(query) ||
      user.status.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredUsers,
    hasSearchResults: filteredUsers.length > 0 || !searchQuery.trim()
  };
};