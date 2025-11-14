"use client";

import { UserInfo } from "./user-info";
import { MenuItem } from "./menu-item";
import type { MenuItem as MenuItemType } from "./use-account-dropdown";

interface AccountDropdownContentProps {
  userName?: string
  userEmail?: string
  menuItems: MenuItemType[]
  onMenuItemClick: (item: MenuItemType) => void
}

export const AccountDropdownContent = ({
  userName,
  userEmail,
  menuItems,
  onMenuItemClick
}: AccountDropdownContentProps) => {
  return (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <UserInfo userName={userName} userEmail={userEmail} />
      
      <div className="py-2">
        {menuItems.map((item) => (
          <MenuItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            href={item.href}
            onClick={() => onMenuItemClick(item)}
          />
        ))}
      </div>
    </div>
  );
};