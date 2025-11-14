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
    // skip fetch if cached data already exists
    if (menuCache) {
      return
    }

    // use existing promise if fetch is already in progress
    if (cachePromise) {
      cachePromise.then((result) => {
        setMenuState(result)
      })
      return
    }

    // create fetch promise
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

        // store result in global cache
        menuCache = result
        
        return result
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
        const result: MenuState = {
          items: [],
          loading: false,
          error: errorMessage
        }
        
        // cache error state to prevent repeated failed requests
        menuCache = result
        
        return result
      }
    })()

    // update state when promise resolves
    cachePromise.then((result) => {
      setMenuState(result)
    })
  }, [])

  return menuState
}

// function to manually clear cache when needed
export function clearMenuCache() {
  menuCache = null
  cachePromise = null
}