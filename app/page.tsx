"use client"

import { useState } from "react"
import { Home, User, Heart, MessageCircle, Users } from "lucide-react"
import LoginScreen from "@/components/login-screen"
import { UpdateProfile } from "@/components/update-profile/update-profile"
import { ProfileData } from "@/components/update-profile/types"
import MatchResultCard, { MatchResultCardProps } from "@/components/MatchResultCard"

type Screen = "login" | "profile" | "preview" | "matching" | "match-success" | "message" | "community"

interface DogInput {
  name: string
  age_month: number
  weight: number
  color: string
  personality: string
  region: string
  vaccinated: string
  preference_age_range: string
  preference_weight_range: string
  preference_color: string
  preference_personality: string
  preference_region: string
  preference_vaccine: string
  lat: number
  lon: number
}

export default function Page() {
  // Screen state
  const [currentScreen, setCurrentScreen] = useState<Screen>("login")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [matchResult, setMatchResult] = useState<MatchResultCardProps[]>([])
  const [carouselIndex, setCarouselIndex] = useState(0)

  // Profile state
  const [savedFormData, setSavedFormData] = useState<ProfileData>({
    activeTab: "사진 등록",
    images: [],
    representativeImageIndex: -1,
    vaccinationCertificate: null,
    profileData: {
      breed: "",
      gender: "",
      name: "",
      age: [1],
      weight: [0.1],
      color: "",
      personality: [],
      mateType: [],
    },
    idealTypeData: {
      preferredGender: "",
      preferredAgeRange: [1, 180],
      preferredWeightRange: [0.1, 50],
      preferredColor: "",
      preferredPersonality: [],
      preferredMateType: [],
    },
    ownerData: {
      nickname: "",
      gender: "",
      age: "", region: "",
      appeal: "",
    },
    locationData: {
      nearbyRange: "",
      selectedLocation: null,
      latitude: 0,
      longitude: 0,
      accuracy: 0,
      isMapLoaded: false,
      zoom: 15,
    },
  })

  // Navigation handlers
  const handleSignIn = () => {
    setCurrentScreen("profile")
  }

  const handleCloseProfile = () => {
    setCurrentScreen("login")
  }

  const transformProfileData = (data: ProfileData): DogInput => {
    return {
      name: data.profileData.name,
      age_month: data.profileData.age[0],
      weight: data.profileData.weight[0],
      color: data.profileData.color,
      personality: data.profileData.personality.join(","),
      region: data.ownerData.region,
      vaccinated: data.vaccinationCertificate ? "yes" : "no",
      preference_age_range: `${data.idealTypeData.preferredAgeRange[0]}-${data.idealTypeData.preferredAgeRange[1]}`,
      preference_weight_range: `${data.idealTypeData.preferredWeightRange[0]}-${data.idealTypeData.preferredWeightRange[1]}`,
      preference_color: data.idealTypeData.preferredColor,
      preference_personality: data.idealTypeData.preferredPersonality.join(","),
      preference_region: data.ownerData.region, // Using owner's region as preferred region
      preference_vaccine: "yes", // Default to yes for vaccine preference
      lat: data.locationData.latitude,
      lon: data.locationData.longitude,
    }
  }

  const handleProfileComplete = async (data: ProfileData) => {
    try {
      setIsSubmitting(true)
      setError(null)

      const transformedData = transformProfileData(data)
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedData),
      })

      if (!response.ok) {
        throw new Error('Failed to save profile data')
      }

      const result = await response.json()
      setMatchResult(result.recommendations)
      setCarouselIndex(0) // Reset carousel to first result
      setSavedFormData(data)
      setCurrentScreen("preview")
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while saving the profile')
      console.error('Error saving profile:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Carousel navigation handlers
  const handlePrev = () => {
    setCarouselIndex((prev) => (prev > 0 ? prev - 1 : matchResult.length - 1))
  }
  const handleNext = () => {
    setCarouselIndex((prev) => (prev < matchResult.length - 1 ? prev + 1 : 0))
  }

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto relative">
      <div className="overflow-y-auto" style={{ minHeight: "100vh", maxWidth: "600px" }}>
        {currentScreen === "login" && <LoginScreen onSignIn={handleSignIn} />}
        {currentScreen === "profile" && (
          <>
            <UpdateProfile
              onClose={handleCloseProfile}
              onComplete={handleProfileComplete}
              initialData={savedFormData}
              isSubmitting={isSubmitting}
            />
            {error && (
              <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
          </>
        )}
        {currentScreen === "preview" && matchResult.length > 0 && (
          <div className="relative">
            <MatchResultCard {...matchResult[carouselIndex]} />
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border flex items-center justify-center text-2xl"
                aria-label="Previous"
              >
                ‹
              </button>
              <span className="text-sm text-gray-500">
                {carouselIndex + 1} / {matchResult.length}
              </span>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border flex items-center justify-center text-2xl"
                aria-label="Next"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
