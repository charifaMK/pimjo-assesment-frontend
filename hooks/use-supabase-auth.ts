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

export function useSupabaseAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    isSupabaseAuth: false
  })
  
  const router = useRouter()

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check for existing JWT token first
        const jwtToken = localStorage.getItem('auth_token')
        
        if (jwtToken) {
          setAuthState({
            user: null,
            loading: false,
            isSupabaseAuth: false
          })
          return
        }

        // Check Supabase session
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

    // Listen for auth changes
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
    if (authState.isSupabaseAuth) {
      const supabase = getSupabaseClient()
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Sign out error:', error)
        return false
      }
    } else {
      // Clear JWT token
      localStorage.removeItem('auth_token')
    }
    
    setAuthState({
      user: null,
      loading: false,
      isSupabaseAuth: false
    })
    
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