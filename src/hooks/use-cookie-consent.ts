"use client"

import { useState, useEffect, useCallback } from "react"

type ConsentStatus = "accepted" | "declined" | "pending"

interface CookiePreferences {
  necessary: true
  analytics: boolean
  marketing: boolean
  functional: boolean
}

const STORAGE_KEY = "ai-commerce-os-cookie-consent"

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
}

export function useCookieConsent() {
  const [status, setStatus] = useState<ConsentStatus>("pending")
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setStatus(parsed.status)
        setPreferences(parsed.preferences)
      } catch {
        setShowBanner(true)
      }
    } else {
      setShowBanner(true)
    }
  }, [])

  const acceptAll = useCallback(() => {
    const prefs: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    }
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ status: "accepted", preferences: prefs })
    )
    setStatus("accepted")
    setPreferences(prefs)
    setShowBanner(false)
  }, [])

  const declineAll = useCallback(() => {
    const prefs: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    }
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ status: "declined", preferences: prefs })
    )
    setStatus("declined")
    setPreferences(prefs)
    setShowBanner(false)
  }, [])

  const savePreferences = useCallback(
    (prefs: Partial<CookiePreferences>) => {
      const merged = { ...preferences, ...prefs, necessary: true }
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ status: "accepted", preferences: merged })
      )
      setPreferences(merged)
      setStatus("accepted")
      setShowBanner(false)
    },
    [preferences]
  )

  return {
    status,
    preferences,
    showBanner,
    acceptAll,
    declineAll,
    savePreferences,
  }
}
