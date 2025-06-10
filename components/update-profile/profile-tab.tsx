import { useRef, type ChangeEvent } from "react"
import { Plus, FileText, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { BREEDS, PERSONALITY_TRAITS, COLOR_OPTIONS } from "./constants"

interface ProfileTabProps {
  profileData: {
    breed: string
    gender: string
    name: string
    age: number[]
    weight: number[]
    color: string
    personality: string[]
    mateType: string[]
  }
  vaccinationCertificate: string | null
  certificateFileName: string
  onProfileDataChange: (data: any) => void
  onVaccinationCertificateChange: (certificate: string | null, fileName: string) => void
}

export function ProfileTab({
  profileData,
  vaccinationCertificate,
  certificateFileName,
  onProfileDataChange,
  onVaccinationCertificateChange,
}: ProfileTabProps) {
  const certificateInputRef = useRef<HTMLInputElement>(null)

  const handleCertificateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"]
    if (!allowedTypes.includes(file.type)) {
      alert("이미지 파일(JPG, PNG) 또는 PDF 파일만 업로드 가능합니다.")
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("파일 크기는 10MB 이하여야 합니다.")
      return
    }

    const fileUrl = URL.createObjectURL(file)
    onVaccinationCertificateChange(fileUrl, file.name)

    if (certificateInputRef.current) {
      certificateInputRef.current.value = ""
    }
  }

  const handleCertificateUploadClick = () => {
    if (certificateInputRef.current) {
      certificateInputRef.current.click()
    }
  }

  const handleRemoveCertificate = () => {
    onVaccinationCertificateChange(null, "")
  }

  const togglePersonality = (trait: string) => {
    const newPersonality = profileData.personality.includes(trait)
      ? profileData.personality.filter((p) => p !== trait)
      : [...profileData.personality, trait]

    onProfileDataChange({ ...profileData, personality: newPersonality })
  }

  const toggleMateType = (type: string) => {
    const newMateType = profileData.mateType.includes(type)
      ? profileData.mateType.filter((t) => t !== type)
      : [...profileData.mateType, type]

    onProfileDataChange({ ...profileData, mateType: newMateType })
  }

  return (
    <div className="px-6 py-8 pb-4">
      <h2 className="text-2xl font-bold text-black mb-8">반려동물 프로필 등록</h2>

      <div className="space-y-6">
        {/* 품종 */}
        <div>
          <label className="block text-lg font-medium text-black mb-2">품종</label>
          <Select value={profileData.breed} onValueChange={(value) => onProfileDataChange({ ...profileData, breed: value })}>
            <SelectTrigger className="w-full h-12 text-base">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {BREEDS.map((breed) => (
                <SelectItem key={breed} value={breed}>
                  {breed}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {profileData.breed === "선택" && <p className="text-red-500 text-sm mt-1">품종을 선택해주세요.</p>}
        </div>

        {/* 성별 */}
        <div>
          <label className="block text-lg font-medium text-black mb-2">성별</label>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant={profileData.gender === "female" ? "default" : "outline"}
              onClick={() => onProfileDataChange({ ...profileData, gender: "female" })}
              className="h-12 text-base"
            >
              암컷
            </Button>
            <Button
              variant={profileData.gender === "male" ? "default" : "outline"}
              onClick={() => onProfileDataChange({ ...profileData, gender: "male" })}
              className="h-12 text-base"
            >
              수컷
            </Button>
          </div>
        </div>

        {/* 이름 */}
        <div>
          <label className="block text-lg font-medium text-black mb-2">이름</label>
          <Input
            value={profileData.name}
            onChange={(e) => onProfileDataChange({ ...profileData, name: e.target.value })}
            className="h-12 text-base"
            placeholder="반려동물 이름을 입력하세요"
          />
          {profileData.name.trim() === "" && <p className="text-red-500 text-sm mt-1">이름을 입력해주세요.</p>}
        </div>

        {/* 나이 */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-lg font-medium text-black">나이(월령)</label>
            <span className="text-lg font-medium">{profileData.age[0]}개월</span>
          </div>
          <div className="mt-6">
            <Slider
              value={profileData.age}
              onValueChange={(value) => onProfileDataChange({ ...profileData, age: value })}
              max={120}
              min={1}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* 몸무게 */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-lg font-medium text-black">몸무게</label>
            <span className="text-lg font-medium">{profileData.weight[0]}kg</span>
          </div>
          <div className="mt-6">
            <Slider
              value={profileData.weight}
              onValueChange={(value) => onProfileDataChange({ ...profileData, weight: value })}
              max={50}
              min={0.1}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>

        {/* 모색 */}
        <div>
          <label className="block text-lg font-medium text-black mb-2">모색</label>
          <div className="grid grid-cols-3 gap-4">
            {COLOR_OPTIONS.map((colorOption) => (
              <button
                key={colorOption.name}
                onClick={() => onProfileDataChange({ ...profileData, color: colorOption.name })}
                className={`h-10 rounded-lg border-2 flex items-center justify-center ${
                  profileData.color === colorOption.name ? "border-black" : "border-gray-300"
                }`}
              >
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: colorOption.color }} />
              </button>
            ))}
          </div>
        </div>

        {/* 성격 */}
        <div>
          <label className="block text-lg font-medium text-black mb-2">성격</label>
          <div className="grid grid-cols-3 gap-2">
            {PERSONALITY_TRAITS.map((trait) => {
              const isSelected = profileData.personality.includes(trait)
              const isMale = profileData.gender === "male"

              return (
                <Button
                  key={trait}
                  variant={isSelected ? "default" : "outline"}
                  onClick={() => togglePersonality(trait)}
                  className={`h-10 text-sm ${
                    isSelected
                      ? isMale
                        ? "bg-[#D0E2F6] hover:bg-[#D0E2F6]/90 text-gray-800 border-[#D0E2F6]"
                        : "bg-[#F6D0D0] hover:bg-[#F6D0D0]/90 text-gray-800 border-[#F6D0D0]"
                      : "border-gray-300 hover:border-gray-400 text-gray-700"
                  }`}
                >
                  {trait}
                </Button>
              )
            })}
          </div>
        </div>

        {/* 목적 */}
        <div>
          <label className="block text-lg font-medium text-black mb-2">목적</label>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant={profileData.mateType.includes("walk") ? "default" : "outline"}
              onClick={() => toggleMateType("walk")}
              className="h-12 text-base"
            >
              🐾 산책메이트
            </Button>
            <Button
              variant={profileData.mateType.includes("soul") ? "default" : "outline"}
              onClick={() => toggleMateType("soul")}
              className="h-12 text-base"
            >
              ❤️ 소울메이트
            </Button>
          </div>
          {profileData.mateType.length === 0 && (
            <p className="text-red-500 text-sm mt-2 whitespace-normal">목적을 최소 1개 이상 선택해주세요.</p>
          )}
        </div>

        {/* 예방접종 증명서 */}
        <div>
          <label className="block text-lg font-medium text-black mb-2">예방접종 증명서 등록하기</label>

          <input
            type="file"
            ref={certificateInputRef}
            onChange={handleCertificateChange}
            accept="image/*,.pdf"
            className="hidden"
          />

          {vaccinationCertificate ? (
            <div className="border border-gray-300 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 truncate max-w-48">{certificateFileName}</p>
                    <p className="text-sm text-green-600">업로드 완료</p>
                  </div>
                </div>
                <button onClick={handleRemoveCertificate} className="p-1 hover:bg-gray-100 rounded">
                  <Trash2 className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={handleCertificateUploadClick}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:bg-gray-50 transition-colors min-h-[140px] flex flex-col justify-center"
            >
              <Plus className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-600 mb-2">건강 정보 기반의 짝궁 추천을 받을 수 있어요.</p>
              <p className="text-xs text-gray-500">이미지 파일(JPG, PNG) 또는 PDF 파일 (최대 10MB)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 