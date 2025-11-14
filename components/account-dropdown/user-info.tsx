"use client"

interface UserInfoProps {
  userName?: string
  userEmail?: string
}

export const UserInfo = ({ userName, userEmail }: UserInfoProps) => {
  return (
    <div className="px-6 py-4 border-b border-gray-200">
      <p className="font-semibold text-gray-900">{userName}</p>
      <p className="text-sm text-gray-500">{userEmail}</p>
    </div>
  );
};