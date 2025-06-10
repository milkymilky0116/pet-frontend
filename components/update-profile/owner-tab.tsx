import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AGE_GROUPS, REGIONS } from "./constants"

interface OwnerTabProps {
  ownerData: {
    nickname: string
    gender: string
    age: string
    region: string
    appeal: string
  }
  onOwnerDataChange: (data: any) => void
}

export function OwnerTab({ ownerData, onOwnerDataChange }: OwnerTabProps) {
  return (
    <div className="px-6 py-8 pb-24">
      <h2 className="text-2xl font-bold text-black mb-8">주인정보 등록</h2>

      <div className="space-y-6">
        {/* 닉네임 */}
        <div>
          <label className="block text-lg font-medium text-black mb-2">닉네임</label>
          <Input
            type="text"
            value={ownerData.nickname}
            onChange={(e) => onOwnerDataChange({ ...ownerData, nickname: e.target.value })}
            placeholder="닉네임을 입력해주세요"
            className="h-12 text-base"
          />
          {ownerData.nickname === "" && <p className="text-red-500 text-sm mt-1">닉네임을 입력해주세요.</p>}
        </div>

        {/* 성별 */}
        <div>
          <label className="block text-lg font-medium text-black mb-2">성별</label>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant={ownerData.gender === "female" ? "default" : "outline"}
              onClick={() => onOwnerDataChange({ ...ownerData, gender: "female" })}
              className="h-12 text-base"
            >
              여성
            </Button>
            <Button
              variant={ownerData.gender === "male" ? "default" : "outline"}
              onClick={() => onOwnerDataChange({ ...ownerData, gender: "male" })}
              className="h-12 text-base"
            >
              남성
            </Button>
          </div>
          {ownerData.gender === "" && <p className="text-red-500 text-sm mt-1">성별을 선택해주세요.</p>}
        </div>

        {/* 연령대 */}
        <div>
          <label className="block text-lg font-medium text-black mb-2">연령대</label>
          <Select value={ownerData.age} onValueChange={(value) => onOwnerDataChange({ ...ownerData, age: value })}>
            <SelectTrigger className="h-12 text-base">
              <SelectValue placeholder="연령대를 선택해주세요" />
            </SelectTrigger>
            <SelectContent>
              {AGE_GROUPS.map((age) => (
                <SelectItem key={age} value={age}>
                  {age}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {ownerData.age === "" && <p className="text-red-500 text-sm mt-1">연령대를 선택해주세요.</p>}
        </div>

        {/* 지역 */}
        <div>
          <label className="block text-lg font-medium text-black mb-2">지역</label>
          <Select value={ownerData.region} onValueChange={(value) => onOwnerDataChange({ ...ownerData, region: value })}>
            <SelectTrigger className="h-12 text-base">
              <SelectValue placeholder="지역을 선택해주세요" />
            </SelectTrigger>
            <SelectContent>
              {REGIONS.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {ownerData.region === "" && <p className="text-red-500 text-sm mt-1">지역을 선택해주세요.</p>}
        </div>

        {/* 자기소개 */}
        <div>
          <label className="block text-lg font-medium text-black mb-2">자기소개</label>
          <Textarea
            value={ownerData.appeal}
            onChange={(e) => onOwnerDataChange({ ...ownerData, appeal: e.target.value })}
            placeholder="자기소개를 입력해주세요"
            className="h-32 text-base resize-none"
          />
          {ownerData.appeal === "" && <p className="text-red-500 text-sm mt-1">자기소개를 입력해주세요.</p>}
        </div>
      </div>
    </div>
  )
} 