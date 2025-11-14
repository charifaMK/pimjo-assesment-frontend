 "use client"

import { useAuthCallback } from '@/hooks/use-auth-callback'
import { AuthLoading } from '@/components/auth-loading'

export const dynamic = 'force-dynamic'

const AuthCallback = () => {
  const { isProcessing, error } = useAuthCallback()

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600">Authentication failed</p>
        </div>
      </div>
    )
  }

  return <AuthLoading />
};

export default AuthCallback;