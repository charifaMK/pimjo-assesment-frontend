"use client"

import { useState, useEffect } from "react"

interface MenuColumn {
  title: string
  description: string
  icon: string
  href: string
}

interface MenuItem {
  id: string
  label: string
  type?: string
  href?: string
  columns?: MenuColumn[]
}

interface MenuState {
  items: MenuItem[]
  loading: boolean
  error: string | null
}

// global cache to persist across component re-renders and navigation
let menuCache: MenuState | null = null
let cachePromise: Promise<MenuState> | null = null

export function useMenuData() {
  const [menuState, setMenuState] = useState<MenuState>(() => {
    // return cached data if available
    if (menuCache) {
      return menuCache
    }
    return { items: [], loading: true, error: null }
  })

  useEffect(() => {
    // if we already have cached data, don't fetch again
    if (menuCache) {
      return
    }

    // if a fetch is already in progress, use the existing promise
    if (cachePromise) {
      cachePromise.then((result) => {
        setMenuState(result)
      })
      return
    }

    // create the fetch promise
    cachePromise = (async () => {
      try {
        const response = await fetch("https://69102d7545e65ab24ac5d435.mockapi.io/mega-menu")
        if (!response.ok) {
          throw new Error("Failed to fetch menu")
        }
        const data = await response.json()
        
        const result: MenuState = {
          items: data,
          loading: false,
          error: null
        }

        // cache the result globally
        menuCache = result
        
        return result
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
        const result: MenuState = {
          items: [],
          loading: false,
          error: errorMessage
        }
        
        // cache the error state to prevent repeated failed requests
        menuCache = result
        
        return result
      }
    })()

    // update state when the promise resolves
    cachePromise.then((result) => {
      setMenuState(result)
    })
  }, [])

  return menuState
}

// fnction to manually clear cache if needed
export function clearMenuCache() {
  menuCache = null
  cachePromise = null
}