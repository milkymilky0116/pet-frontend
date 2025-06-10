import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { PERSONALITY_TRAITS, COLOR_OPTIONS } from "./constants"

interface IdealTypeTabProps {
  idealTypeData: {
    preferredGender: string
    preferredAgeRange: [number, number]
    preferredWeightRange: [number, number]
    preferredColor: string
    preferredPersonality: string[]
    preferredMateType: string[]
  }
  onIdealTypeDataChange: (data: any) => void
}

export function IdealTypeTab({ idealTypeData, onIdealTypeDataChange }: IdealTypeTabProps) {
  const togglePersonality = (trait: string) => {
    const newPersonality = idealTypeData.preferredPersonality.includes(trait)
      ? idealTypeData.preferredPersonality.filter((p) => p !== trait)
      : [...idealTypeData.preferredPersonality, trait]

    onIdealTypeDataChange({ ...idealTypeData, preferredPersonality: newPersonality })
  }

  const toggleMateType = (type: string) => {
    const newMateType = idealTypeData.preferredMateType.includes(type)
      ? idealTypeData.preferredMateType.filter((t) => t !== type)
      : [...idealTypeData.preferredMateType, type]

    onIdealTypeDataChange({ ...idealTypeData, preferredMateType: newMateType })
  }

  return (
    <div className="px-6 py-8 pb-24">
      <h2 className="text-2xl font-bold text-black mb-8">이상형 정보 등록</h2>

      <div className="space-y-6">
        {/* 성별 */}
        <div>
          <label className="block text-lg font-medium text-black mb-2">성별</label>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant={idealTypeData.preferredGender === "female" ? "default" : "outline"}
              onClick={() => onIdealTypeDataChange({ ...idealTypeData, preferredGender: "female" })}
              className="h-12 text-base"
            >
              암컷
            </Button>
            <Button
              variant={idealTypeData.preferredGender === "male" ? "default" : "outline"}
              onClick={() => onIdealTypeDataChange({ ...idealTypeData, preferredGender: "male" })}
              className="h-12 text-base"
            >
              수컷
            </Button>
          </div>
          {idealTypeData.preferredGender === "" && <p className="text-red-500 text-sm mt-1">성별을 선택해주세요.</p>}
        </div>

        {/* 선호월령 */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="text-lg font-medium text-black">선호월령</label>
            <span className="text-lg font-medium">
              {idealTypeData.preferredAgeRange[0]} - {idealTypeData.preferredAgeRange[1]}개월
            </span>
          </div>
          <div className="relative px-4 mt-6">
            <div className="relative h-2 bg-gray-200 rounded-full">
              <div
                className="absolute h-2 bg-black rounded-full"
                style={{
                  left: `${((idealTypeData.preferredAgeRange[0] - 1) / (180 - 1)) * 100}%`,
                  width: `${((idealTypeData.preferredAgeRange[1] - idealTypeData.preferredAgeRange[0]) / (180 - 1)) * 100}%`,
                }}
              />
              <div
                className="absolute w-5 h-5 bg-white border-2 border-black rounded-full -translate-y-2 -translate-x-2.5 cursor-pointer"
                style={{ left: `${((idealTypeData.preferredAgeRange[0] - 1) / (180 - 1)) * 100}%` }}
              />
              <div
                className="absolute w-5 h-5 bg-white border-2 border-black rounded-full -translate-y-2 -translate-x-2.5 cursor-pointer"
                style={{ left: `${((idealTypeData.preferredAgeRange[1] - 1) / (180 - 1)) * 100}%` }}
              />
            </div>
            <Slider
              value={idealTypeData.preferredAgeRange}
              onValueChange={(value) => onIdealTypeDataChange({ ...idealTypeData, preferredAgeRange: value as [number, number] })}
              max={180}
              min={1}
              step={1}
              className="absolute inset-0 opacity-0"
            />
          </div>
        </div>

        {/* 몸무게 */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="text-lg font-medium text-black">몸무게</label>
            <span className="text-lg font-medium">
              {idealTypeData.preferredWeightRange[0].toFixed(1)} kg - {idealTypeData.preferredWeightRange[1].toFixed(1)} kg
            </span>
          </div>
          <div className="relative px-4 mt-6">
            <div className="relative h-2 bg-gray-200 rounded-full">
              <div
                className="absolute h-2 bg-black rounded-full"
                style={{
                  left: `${((idealTypeData.preferredWeightRange[0] - 0.1) / (50 - 0.1)) * 100}%`,
                  width: `${((idealTypeData.preferredWeightRange[1] - idealTypeData.preferredWeightRange[0]) / (50 - 0.1)) * 100}%`,
                }}
              />
              <div
                className="absolute w-5 h-5 bg-white border-2 border-black rounded-full -translate-y-2 -translate-x-2.5 cursor-pointer"
                style={{ left: `${((idealTypeData.preferredWeightRange[0] - 0.1) / (50 - 0.1)) * 100}%` }}
              />
              <div
                className="absolute w-5 h-5 bg-white border-2 border-black rounded-full -translate-y-2 -translate-x-2.5 cursor-pointer"
                style={{ left: `${((idealTypeData.preferredWeightRange[1] - 0.1) / (50 - 0.1)) * 100}%` }}
              />
            </div>
            <Slider
              value={idealTypeData.preferredWeightRange}
              onValueChange={(value) => onIdealTypeDataChange({ ...idealTypeData, preferredWeightRange: value as [number, number] })}
              max={50}
              min={0.1}
              step={0.1}
              className="absolute inset-0 opacity-0"
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
                onClick={() => onIdealTypeDataChange({ ...idealTypeData, preferredColor: colorOption.name })}
                className={`h-10 rounded-lg border-2 flex items-center justify-center ${
                  idealTypeData.preferredColor === colorOption.name ? "border-black" : "border-gray-300"
                }`}
              >
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: colorOption.color }} />
              </button>
            ))}
          </div>
          {idealTypeData.preferredColor === "" && <p className="text-red-500 text-sm mt-1">모색을 선택해주세요.</p>}
        </div>

        {/* 성격 */}
        <div>
          <label className="block text-lg font-medium text-black mb-2">성격</label>
          <div className="grid grid-cols-3 gap-2">
            {PERSONALITY_TRAITS.map((trait) => (
              <Button
                key={trait}
                variant={idealTypeData.preferredPersonality.includes(trait) ? "default" : "outline"}
                onClick={() => togglePersonality(trait)}
                className="h-10 text-sm"
              >
                {trait}
              </Button>
            ))}
          </div>
          {idealTypeData.preferredPersonality.length === 0 && (
            <p className="text-red-500 text-sm mt-1">성격을 최소 1개 이상 선택해주세요.</p>
          )}
        </div>

        {/* 목적 */}
        <div>
          <label className="block text-lg font-medium text-black mb-2">목적</label>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant={idealTypeData.preferredMateType.includes("walk") ? "default" : "outline"}
              onClick={() => toggleMateType("walk")}
              className="h-12 text-base"
            >
              🐾 산책메이트
            </Button>
            <Button
              variant={idealTypeData.preferredMateType.includes("soul") ? "default" : "outline"}
              onClick={() => toggleMateType("soul")}
              className="h-12 text-base"
            >
              ❤️ 소울메이트
            </Button>
          </div>
          {idealTypeData.preferredMateType.length === 0 && (
            <p className="text-red-500 text-sm mt-2 whitespace-normal">목적을 최소 1개 이상 선택해주세요.</p>
          )}
        </div>
      </div>
    </div>
  )
} 