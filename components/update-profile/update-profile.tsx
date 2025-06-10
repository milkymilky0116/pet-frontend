import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TABS } from "./constants"
import { PhotoTab } from "./photo-tab"
import { ProfileTab } from "./profile-tab"
import { IdealTypeTab } from "./ideal-type-tab"
import { OwnerTab } from "./owner-tab"
import { LocationTab } from "./location-tab"
import { ProfileData, UpdateProfileProps } from "./types"

export function UpdateProfile({ onClose, onComplete, initialData, isSubmitting }: UpdateProfileProps) {
  const [profileData, setProfileData] = useState<ProfileData>(() => ({
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
      age: "",
      region: "",
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
    ...initialData,
  }))

  const handleTabChange = (tab: string) => {
    setProfileData((prev) => ({ ...prev, activeTab: tab }))
  }

  const handleComplete = () => {
    onComplete(profileData)
  }

  const isFormComplete = () => {
    const {
      images,
      representativeImageIndex,
      profileData: petProfile,
      ownerData,
    } = profileData

    // Check if at least one image is uploaded and representative image is selected
    if (images.length === 0 || representativeImageIndex === -1) {
      return false
    }

    // Check profile data
    if (
      !petProfile.breed ||
      !petProfile.gender ||
      !petProfile.name.trim() ||
      !petProfile.color ||
      petProfile.personality.length === 0
    ) {
      return false
    }

    // Check owner data
    if (
      !ownerData.nickname.trim() ||
      !ownerData.gender ||
      !ownerData.age ||
      !ownerData.region ||
      !ownerData.appeal.trim()
    ) {
      return false
    }

    return true
  }

  const renderTab = () => {
    switch (profileData.activeTab) {
      case "사진 등록":
        return (
          <PhotoTab
            images={profileData.images}
            representativeImageIndex={profileData.representativeImageIndex}
            onImagesChange={(images) => setProfileData((prev) => ({ ...prev, images }))}
            onRepresentativeImageChange={(index) => setProfileData((prev) => ({ ...prev, representativeImageIndex: index }))}
          />
        )
      case "프로필 등록":
        return (
          <ProfileTab
            profileData={profileData.profileData}
            vaccinationCertificate={profileData.vaccinationCertificate}
            certificateFileName=""
            onProfileDataChange={(data) => setProfileData((prev) => ({ ...prev, profileData: data }))}
            onVaccinationCertificateChange={(certificate) =>
              setProfileData((prev) => ({ ...prev, vaccinationCertificate: certificate }))
            }
          />
        )
      case "이상형 정보":
        return (
          <IdealTypeTab
            idealTypeData={profileData.idealTypeData}
            onIdealTypeDataChange={(data) => setProfileData((prev) => ({ ...prev, idealTypeData: data }))}
          />
        )
      case "주인정보 등록":
        return (
          <OwnerTab
            ownerData={profileData.ownerData}
            onOwnerDataChange={(data) => setProfileData((prev) => ({ ...prev, ownerData: data }))}
          />
        )
      case "위치정보 등록":
        return (
          <LocationTab
            locationData={profileData.locationData}
            onLocationDataChange={(data) => setProfileData((prev) => ({ ...prev, locationData: data }))}
            onMapLoad={() => setProfileData((prev) => ({ ...prev, locationData: { ...prev.locationData, isMapLoaded: true } }))}
          />
        )
      default:
        return null
    }
  }

  return (

    <div className="fixed inset-0 bg-white z-50 flex flex-col">

      <div className="w-[450px] mx-auto">
        {/* Header */}
        <div className="h-14 flex items-center justify-between px-4 border-b">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-bold">프로필 수정</h1>
          </div>
          <Button
            onClick={handleComplete}
            className="h-8 px-4"
            disabled={isSubmitting || !isFormComplete()}
          >
            {isSubmitting ? "저장 중..." : "완료"}
          </Button>
        </div>
      </div>

      <div className="min-h-screen max-w-md mx-auto">
        {/* Top Tab Navigation */}
        <div className="w-full flex gap-2 px-2 py-3 border-b overflow-x-auto bg-white">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors duration-150 text-sm font-medium ${profileData.activeTab === tab
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-500"
                }`}
              style={{ minWidth: 'fit-content' }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {renderTab()}
        </div>
      </div>

    </div>
  )
}

