"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabase'

interface User {
  id: string
  email?: string
  name?: string
  image?: string
}

interface AuthState {
  user: User | null
  loading: boolean
  isSupabaseAuth: boolean
}

export function useAuthSupabase() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    isSupabaseAuth: false
  })
  
  const router = useRouter()

  useEffect(() => {
    const initAuth = async () => {
      try {
        // check for existing jwt token first
        const jwtToken = localStorage.getItem('auth_token')
        
        if (jwtToken) {
          // user authenticated with existing jwt system
          setAuthState({
            user: null,
            loading: false,
            isSupabaseAuth: false
          })
          return
        }

        // retrieve supabase session
        const supabase = getSupabaseClient()
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (session?.user) {
          setAuthState({
            user: {
              id: session.user.id,
              email: session.user.email,
              name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
              image: session.user.user_metadata?.avatar_url
            },
            loading: false,
            isSupabaseAuth: true
          })
        } else {
          setAuthState({
            user: null,
            loading: false,
            isSupabaseAuth: false
          })
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        setAuthState({
          user: null,
          loading: false,
          isSupabaseAuth: false
        })
      }
    }

    initAuth()

    // monitor authentication state changes
    const supabase = getSupabaseClient()
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setAuthState({
            user: {
              id: session.user.id,
              email: session.user.email,
              name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
              image: session.user.user_metadata?.avatar_url
            },
            loading: false,
            isSupabaseAuth: true
          })
        } else if (event === 'SIGNED_OUT') {
          setAuthState({
            user: null,
            loading: false,
            isSupabaseAuth: false
          })
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    // capture token before clearing localstorage for server cleanup
    const token = localStorage.getItem('auth_token')

    // immediate ui update - clear auth state first for instant feedback
    setAuthState({
      user: null,
      loading: false,
      isSupabaseAuth: false
    })

    // clear token immediately
    localStorage.removeItem('auth_token')

    // perform background cleanup without blocking ui
    const cleanup = async () => {
      try {
        if (authState.isSupabaseAuth) {
          const supabase = getSupabaseClient()
          await supabase.auth.signOut()
        } else {
          // call server to clean up session (fire and forget)
          if (token) {
            fetch('/api/auth/signout', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }).catch(() => {
              // ignore errors during cleanup - user is already logged out locally
            })
          }
        }
      } catch (error) {
        console.warn('Background cleanup warning:', error)
      }
    }

    // start cleanup in background
    cleanup()

    // navigate immediately without waiting for cleanup
    router.push('/signin')
    return true
  }

  return {
    user: authState.user,
    loading: authState.loading,
    isSupabaseAuth: authState.isSupabaseAuth,
    signOut: handleSignOut,
    isAuthenticated: !!authState.user
  }
};