"use client"

import { useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

interface AuthCallbackOptions {
  onSuccess?: () => void
  onError?: (error: string) => void
  redirectTo?: string
}

interface AuthCallbackResult {
  isProcessing: boolean
  error: string | null
}

export function useAuthCallback(options: AuthCallbackOptions = {}): AuthCallbackResult {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const redirectTo = options.redirectTo || '/overview'
  const defaultOnError = options.onError || ((error: string) => toast.error(error))
  const defaultOnSuccess = options.onSuccess || (() => toast.success('Successfully signed in!'))

  const handleAuthCallback = useCallback(async () => {
    try {
      // extract authorization code and error from url parameters
      const code = searchParams.get('code')
      const error = searchParams.get('error')
      const errorDescription = searchParams.get('error_description')

      if (error) {
        console.error('OAuth error:', error, errorDescription)
        const errorMessage = errorDescription || 'Authentication failed. Please try again.'
        defaultOnError(errorMessage)
        router.push('/signin')
        return
      }

      if (code) {
        // convert authorization code to user session
        const { exchangeCodeForSession } = await import('@/lib/auth-utils')
        const { data, error: sessionError } = await exchangeCodeForSession(code)
        
        if (sessionError) {
          console.error('Session exchange error:', sessionError)
          defaultOnError(`Authentication error: ${sessionError.message}`)
          router.push('/signin')
          return
        }

        if (data.session) {
          console.log('Session created successfully:', data.session)
          defaultOnSuccess()
          router.push(redirectTo)
          return
        } else {
          console.error('No session returned from exchange')
          defaultOnError('Failed to create session. Please try again.')
          router.push('/signin')
          return
        }
      }

      // fallback verification for existing active session
      const { getCurrentSession } = await import('@/lib/auth-utils')
      const { session, error: sessionCheckError } = await getCurrentSession()
      
      if (sessionCheckError) {
        console.error('Session check error:', sessionCheckError)
        defaultOnError('Authentication failed. Please try again.')
        router.push('/signin')
        return
      }

      if (session) {
        defaultOnSuccess()
        router.push(redirectTo)
      } else {
        defaultOnError('No authentication session found. Please try again.')
        router.push('/signin')
      }
    } catch (error) {
      console.error('Unexpected error:', error)
      defaultOnError('An unexpected error occurred. Please try again.')
      router.push('/signin')
    }
  }, [router, searchParams, redirectTo, defaultOnError, defaultOnSuccess])

  useEffect(() => {
    handleAuthCallback()
  }, [handleAuthCallback])

  return {
    isProcessing: true,
    error: null
  }
};