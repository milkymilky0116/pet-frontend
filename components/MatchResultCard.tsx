import Image from "next/image"
import { motion } from "framer-motion"

export interface MatchResultCardProps {
  id: string
  image: string
  lat: number
  lon: number
  name: string
  score: number
  // You can add more fields as needed
}

export default function MatchResultCard({ id, image, lat, lon, name, score }: MatchResultCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl border p-4 max-w-md mx-auto mt-4 mb-2"
    >
      <div className="relative w-full h-56 rounded-lg overflow-hidden mb-4 group">
        <Image
          src={image ? `/images/${image}` : "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900 truncate max-w-[70%]">{name}</h3>
          <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-3 py-1 font-medium">점수: {score}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="bg-pink-50 text-pink-600 px-3 py-1 rounded-full text-xs font-medium">귀여움</span>
          <span className="bg-pink-50 text-pink-600 px-3 py-1 rounded-full text-xs font-medium">사교적</span>
          <span className="bg-pink-50 text-pink-600 px-3 py-1 rounded-full text-xs font-medium">영리함</span>
        </div>

        <p className="text-gray-600 text-xs leading-relaxed">
          산책을 좋아하고 활동적입니다. 매일/주말 산책 함께할 짝궁/친구를 찾고있어요!
        </p>

        <div className="flex justify-center gap-4 pt-2">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 text-xl hover:border-gray-300 hover:text-gray-500 transition-colors"
          >
            ✗
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white flex items-center justify-center text-xl shadow hover:shadow-md transition-shadow"
          >
            ♥
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 text-xl hover:border-gray-300 hover:text-gray-500 transition-colors"
          >
            💬
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
} 
