import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface PhotoTabProps {
  images: string[]
  representativeImageIndex: number
  onImagesChange: (images: string[]) => void
  onRepresentativeImageChange: (index: number) => void
}

export function PhotoTab({ images, representativeImageIndex, onImagesChange, onRepresentativeImageChange }: PhotoTabProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      const newImages = files.map((file) => URL.createObjectURL(file))
      const updatedImages = [...images, ...newImages].slice(0, 5)
      onImagesChange(updatedImages)
      if (representativeImageIndex === -1) {
        onRepresentativeImageChange(0)
      }
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
    if (representativeImageIndex === index) {
      onRepresentativeImageChange(newImages.length > 0 ? 0 : -1)
    } else if (representativeImageIndex > index) {
      onRepresentativeImageChange(representativeImageIndex - 1)
    }
  }

  const handleUploadClick = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.multiple = true
    input.onchange = (e) => handleFileChange(e as any)
    input.click()
  }

  return (

    <div className="px-6 py-8 pb-24">
      <h2 className="text-2xl font-bold text-black mb-8">사진 등록</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-square">
              <img src={image} alt={`Uploaded ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70"
              >
                ×
              </button>
              <button
                onClick={() => onRepresentativeImageChange(index)}
                className={`absolute top-2 left-2 w-8 h-8 rounded-full flex items-center justify-center ${representativeImageIndex === index
                  ? "bg-yellow-400 text-black"
                  : "bg-black bg-opacity-50 text-white hover:bg-opacity-70"
                  }`}
              >
                <Star className="w-5 h-5" fill={representativeImageIndex === index ? "currentColor" : "none"} />
              </button>
            </div>
          ))}
        </div>

        {images.length < 5 && (
          <Button onClick={handleUploadClick} className="w-full h-12 text-base">
            사진 추가하기
          </Button>
        )}

        {images.length === 0 && <p className="text-red-500 text-sm">최소 1장 이상의 사진을 등록해주세요.</p>}
        {representativeImageIndex === -1 && images.length > 0 && (
          <p className="text-red-500 text-sm">대표 사진을 선택해주세요.</p>
        )}
      </div>
    </div>

  )
} 
